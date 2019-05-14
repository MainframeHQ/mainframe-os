// @flow

import { generateMnemonic, mnemonicToSeed } from 'bip39'
import sigUtil from 'eth-sig-util'
import type EthWallet from 'ethereumjs-wallet'
import HDkey from 'ethereumjs-wallet/hdkey'
import nanoid from 'nanoid'

import { COLLECTION_NAMES } from '../constants'
import type { CollectionParams } from '../types'

import schema from '../schemas/ethWalletHD'

const getAddress = (wallet: EthWallet): string => {
  return sigUtil.normalize(wallet.getAddress().toString('hex'))
}

const getWallet = (root: any, index: number): EthWallet => {
  return root.deriveChild(index).getWallet()
}

export default async (params: CollectionParams) => {
  const db = params.db
  const logger = params.logger.child({
    collection: COLLECTION_NAMES.ETH_WALLETS_HD,
  })

  return await db.collection({
    name: COLLECTION_NAMES.ETH_WALLETS_HD,
    schema,
    statics: {
      async create(data: { name: string, mnemonic?: ?string }) {
        const localID = nanoid()
        logger.log({
          level: 'debug',
          message: 'Create HD wallet',
          name: data.name,
          mnemonicProvided: data.mnemonic != null,
          localID,
        })
        if (data.mnemonic == null) {
          data.mnemonic = generateMnemonic()
        }
        const doc = this.newDocument({ ...data, localID })
        const root = await doc.getRoot()
        doc.activeAccounts = [
          {
            index: 0,
            address: getAddress(getWallet(root, 0)),
          },
        ]
        logger.log({
          level: 'debug',
          message: 'HD wallet created',
          name: data.name,
          localID,
        })
        await doc.save()
        return doc
      },
    },
    methods: {
      async getSeed() {
        if (this._seed == null) {
          logger.log({
            level: 'debug',
            message: 'Create seed from mnemonic',
            localID: this.localID,
          })
          this._seed = await mnemonicToSeed(this.mnemonic)
        }
        return this._seed
      },

      async getHDKey() {
        if (this._hdKey == null) {
          logger.log({
            level: 'debug',
            message: 'Create HD key from seed',
            localID: this.localID,
          })
          this._hdKey = HDkey.fromMasterSeed(await this.getSeed())
        }
        return this._hdKey
      },

      async getRoot() {
        if (this._root == null) {
          logger.log({
            level: 'debug',
            message: 'Create root from HD key',
            localID: this.localID,
          })
          const key = await this.getHDKey()
          this._root = key.derivePath(this.hdPath)
        }
        return this._root
      },

      async addAccounts(indexes: Array<number>) {
        const existingIndexes = this.activeAccounts.map(a => a.index)
        const addIndexes = indexes.filter(i => !existingIndexes.includes(i))

        if (addIndexes.length === 0) {
          logger.log({
            level: 'debug',
            message: 'Accounts to add already existing',
            localID: this.localID,
            indexes,
            existingIndexes,
          })
          return
        }

        logger.log({
          level: 'debug',
          message: 'Add accounts',
          localID: this.localID,
          indexes,
          existingIndexes,
          addIndexes,
        })
        const root = await this.getRoot()
        const addAccounts = addIndexes.map(index => ({
          index,
          address: getAddress(getWallet(root, index)),
        }))

        const accounts = this.activeAccounts.concat(addAccounts)

        await this.atomicSet('activeAccounts', accounts)
        logger.log({
          level: 'debug',
          message: 'Accounts added',
          localID: this.localID,
          addAccounts,
        })
      },

      async getUsers() {
        return await db.users
          .find({ 'ethWallets.hd': { $in: [this.localID] } })
          .exec()
      },

      async safeRemove() {
        logger.log({
          level: 'debug',
          message: 'Remove linked references to self',
          localID: this.localID,
        })

        const users = await this.getUsers()
        const filter = id => id !== this.localID
        const addresses = this.activeAccounts.map(a => a.address)
        await Promise.all(
          users.map(async u => {
            if (this.addresses.includes(u.profile.ethAddress)) {
              await u.setProfileEthAddress(null)
            }
            await u.update({
              $set: { 'ethWallets.hd': u.ethWallets.hd.filter(filter) },
            })
          }),
        )

        await this.remove()
        logger.log({
          level: 'debug',
          message: 'Removed',
          localID: this.localID,
        })
      },
    },
  })
}
