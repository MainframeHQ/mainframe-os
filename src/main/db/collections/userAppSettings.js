// @flow

import { createSecretStreamKey } from '@mainframe/utils-crypto'

import OwnFeed from '../../swarm/OwnFeed'

import { COLLECTION_NAMES } from '../constants'
import type { Collection, CollectionParams, Doc } from '../types'

import type { WebDomainDefinition } from '../schemas/appManifest'
import schema, {
  type ApprovedContact,
  type UserAppSettingsData,
} from '../schemas/userAppSettings'
import { generateKeyPair, generateLocalID } from '../utils'

import type { ContactAppData } from './contacts'

export type UserAppApprovedContact = {|
  aliasID: string,
  contact: ContactAppData,
|}

type UserAppSettingsMethods = {|
  getStorageFeed(): OwnFeed,
  getStorageKey(): Buffer,
  getApprovedContacts(
    approvedContacts: Array<ApprovedContact>,
  ): Promise<Array<UserAppApprovedContact>>,
  getContacts(aliasIDs: Array<string>): Promise<Array<UserAppApprovedContact>>,
  getAllContacts(): Promise<Array<UserAppApprovedContact>>,
  addContacts(contactsIDs: Array<string>): Promise<Array<string>>,
  setWebDomainGrant(grant: WebDomainDefinition): Promise<void>,
|}

export type UserAppSettingsDoc = Doc<
  UserAppSettingsData,
  UserAppSettingsMethods,
>

type UserAppSettingsStatics = {|
  create(data: $Shape<UserAppSettingsData>): Promise<UserAppSettingsDoc>,
|}

export type UserAppSettingsCollection = Collection<UserAppSettingsData> &
  UserAppSettingsStatics

export default async (
  params: CollectionParams,
): Promise<UserAppSettingsCollection> => {
  const { db } = params

  return await db.collection<
    UserAppSettingsData,
    UserAppSettingsDoc,
    UserAppSettingsMethods,
    UserAppSettingsStatics,
  >({
    name: COLLECTION_NAMES.USER_APP_SETTINGS,
    schema,
    statics: {
      async create(
        data: $Shape<UserAppSettingsData>,
      ): Promise<UserAppSettingsDoc> {
        return await this.insert({
          ...data,
          localID: generateLocalID(),
          storageKeyPair: generateKeyPair(),
          storageEncryptionKey: createSecretStreamKey().toString('base64'),
        })
      },
    },
    methods: {
      getStorageFeed(): OwnFeed {
        if (this._storageFeed == null) {
          this._storageFeed = new OwnFeed(this.storageKeyPair.privateKey)
        }
        return this._storageFeed
      },

      getStorageKey(): Buffer {
        return Buffer.from(this.storageEncryptionKey, 'base64')
      },

      async getApprovedContacts(
        approvedContacts: Array<ApprovedContact>,
      ): Promise<Array<UserAppApprovedContact>> {
        const contacts = approvedContacts.map(async a => ({
          aliasID: a.aliasID,
          contact: await db.contacts.getAppData(a.contact),
        }))
        const loaded = await Promise.all(contacts)
        return loaded.filter(a => a.contact !== null)
      },

      async getContacts(
        aliasIDs: Array<string>,
      ): Promise<Array<UserAppApprovedContact>> {
        const contacts = this.approvedContacts.filter(a => {
          return aliasIDs.includes(a.aliasID)
        })
        return await this.getApprovedContacts(contacts)
      },

      async getAllContacts(): Promise<Array<UserAppApprovedContact>> {
        return await this.getApprovedContacts(this.approvedContacts)
      },

      async addContacts(contactsIDs: Array<string>): Promise<Array<string>> {
        const aliasIDs = []
        await this.atomicUpdate(doc => {
          const existingIDs = []
          doc.approvedContacts.forEach(a => {
            if (contactsIDs.includes(a.contact)) {
              aliasIDs.push(a.aliasID)
              existingIDs.push(a.contact)
            }
          })
          const toAdd = []
          contactsIDs.forEach(id => {
            if (!existingIDs.includes(id)) {
              const aliasID = generateLocalID()
              aliasIDs.push(aliasID)
              toAdd.push({ aliasID, contact: id })
            }
          })
          doc.approveContacts = doc.approveContacts.concat(toAdd)
        })
        return aliasIDs
      },

      async setWebDomainGrant(grant: WebDomainDefinition): Promise<void> {
        await this.atomicUpdate(doc => {
          const index = doc.webDomains.findIndex(w => w.domain === grant.domain)
          if (index === -1) {
            doc.webDomains.push(grant)
          } else {
            Object.assign(doc.webDomains[index], grant)
          }
          return doc
        })
      },
    },
  })
}
