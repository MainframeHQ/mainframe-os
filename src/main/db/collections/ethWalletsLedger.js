// @flow

import { COLLECTION_NAMES } from '../constants'
import type { Collection, CollectionParams, Doc } from '../types'
import { getAddressAtIndex } from '../../wallets/ledgerClient'

import { generateLocalID } from '../utils'

import schema, { type EthWalletLedgerData } from '../schemas/ethWalletLedger'

type EthWalletLedgerMethods = {|
  addAccounts(indexes: Array<number>): Promise<void>,
|}

export type EthWalletLedgerDoc = Doc<
  EthWalletLedgerData,
  EthWalletLedgerMethods,
>

type EthWalletLedgersStatics = {|
  create(data: {
    name: string,
    firstAddress: string,
    legacyPath: boolean,
  }): Promise<EthWalletLedgerDoc>,
  getOrCreate(data: {
    name: string,
    legacyPath?: boolean,
  }): Promise<EthWalletLedgerDoc>,
  getByAddress(address: string): Promise<EthWalletLedgerDoc | null>,
|}

export type EthWalletsLedgerCollection = Collection<
  EthWalletLedgerData,
  EthWalletLedgerDoc,
> &
  EthWalletLedgersStatics

export default async (
  params: CollectionParams,
): Promise<EthWalletsLedgerCollection> => {
  const logger = params.logger.child({
    collection: COLLECTION_NAMES.ETH_WALLETS_LEDGER,
  })

  return await params.db.collection({
    name: COLLECTION_NAMES.ETH_WALLETS_LEDGER,
    schema,
    statics: {
      async create(data: {
        name: string,
        firstAddress: string,
        legacyPath: boolean,
      }) {
        const localID = generateLocalID()
        logger.log({
          level: 'debug',
          message: 'Create Ledger wallet',
          name: data.name,
          firstAddress: data.firstAddress,
          localID,
        })
        const doc = this.newDocument({ ...data, localID })
        doc.activeAccounts = [
          {
            index: 0,
            address: data.firstAddress,
          },
        ]
        logger.log({
          level: 'debug',
          message: 'Ledger wallet created',
          name: data.name,
          localID,
        })
        await doc.save()
        return doc
      },

      async getOrCreate(data: {
        name: string,
        legacyPath?: boolean,
      }): Promise<EthWalletLedgerDoc> {
        const rootAddr = await getAddressAtIndex(0, data.legacyPath)
        let wallet = await params.db.eth_wallets_ledger
          .findOne()
          .where('firstAddress')
          .eq(rootAddr)
          .exec()
        if (!wallet) {
          wallet = await this.create({ ...data, firstAddress: rootAddr })
        }
        return wallet
      },

      async getByAddress(address: string): Promise<EthWalletLedgerDoc | null> {
        return this.findOne({ activeAccounts: { $in: [address] } }).exec()
      },
    },
    methods: {
      async addAccounts(indexes: Array<number>): Promise<void> {
        const newAccounts = []
        for (let i = 0; i < indexes.length; i++) {
          const index = indexes[i]
          const stringIndex = String(index)
          if (!this.activeAccounts[stringIndex]) {
            const address = await getAddressAtIndex(index, this.legacyPath)
            newAccounts.push({
              index,
              address,
            })
          }
        }

        if (newAccounts.length === 0) {
          logger.log({
            level: 'debug',
            message: 'Accounts to add already existing',
            localID: this.localID,
            indexes,
          })
          return
        }

        logger.log({
          level: 'debug',
          message: 'Add accounts',
          localID: this.localID,
          indexes,
        })

        const accounts = this.activeAccounts.concat(newAccounts)

        await this.atomicSet('activeAccounts', accounts)

        logger.log({
          level: 'debug',
          message: 'Accounts added',
          localID: this.localID,
          newAccounts,
        })
      },
    },
  })
}
