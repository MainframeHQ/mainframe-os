// @flow

import { COLLECTION_NAMES } from '../constants'

import {
  webDomainsDefinitions,
  type WebDomainsDefinitions,
} from './appManifest'
import bzzHash from './bzzHash'
import profile, { type GenericProfileData } from './genericProfile'
import keyPair, { type KeyPairData } from './keyPair'

export type OwnAppVersionData = {|
  version: string,
  contentsHash: ?string,
  versionHash: ?string,
  webDomains: WebDomainsDefinitions,
|}

export type OwnAppData = {|
  localID: string,
  developer: string,
  keyPair: KeyPairData,
  profile: GenericProfileData,
  contentsPath: string,
  versions: Array<OwnAppVersionData>,
|}

const appVersion = {
  title: 'own app version',
  version: 0,
  type: 'object',
  properties: {
    version: {
      type: 'string', // semver
    },
    contentsHash: bzzHash,
    versionHash: bzzHash, // chapter ID
    webDomains: webDomainsDefinitions,
  },
  required: ['version', 'webDomains'],
}

export default {
  title: 'own app',
  version: 0,
  type: 'object',
  properties: {
    localID: {
      type: 'string',
      primary: true,
    },
    developer: {
      type: 'string',
      ref: COLLECTION_NAMES.OWN_DEVELOPERS,
      index: true,
    },
    keyPair,
    profile,
    contentsPath: {
      type: 'string',
    },
    versions: {
      type: 'array',
      items: appVersion,
      default: [],
    },
  },
  required: ['contentsPath', 'developer', 'keyPair', 'profile'],
}
