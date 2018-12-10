//@flow

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native-web'

import OnboardContainer from '../UIComponents/OnboardContainer'
import Button from '../UIComponents/Button'
import MFTextInput from '../UIComponents/TextInput'
import Text from '../UIComponents/Text'
import colors from '../colors'
import globalStyles from '../styles'

import rpc from './rpc'

type Props = {
  onComplete: () => void,
}

type State = {
  error?: ?string,
  mnemonic: string,
  walletAddress?: ?string,
  errorMsg?: ?string,
  successMsg?: ?string,
}

export default class OnboardWalletView extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mnemonic: '',
    }
  }

  onChangeMnemonic = (value: string) => {
    this.setState({
      mnemonic: value,
    })
  }

  onPressImportMnemonic = async () => {
    try {
      const res = await rpc.importWalletFromMnemonic(this.state.mnemonic)
      this.setState({
        successMsg: 'Import Complete!',
        walletAddress: res.accounts[0],
      })
    } catch (err) {
      this.setState({
        errorMsg: err.message,
      })
    }
  }

  onPressCreateWallet = async () => {
    try {
      const res = await rpc.createEthWallet()
      this.setState({
        successMsg: 'Wallet Created!',
        mnemonic: res.mnemonic,
        walletAddress: res.accounts[0],
      })
    } catch (err) {
      this.setState({
        errorMsg: err.message,
      })
    }
  }

  renderAddress() {
    const sectionLabelStyles = [globalStyles.boldText, styles.bottomPad]
    if (this.state.walletAddress) {
      return (
        <View>
          <Text style={sectionLabelStyles}>ETH Address</Text>
          <View style={styles.resultContainer}>
            <Text>{this.state.walletAddress}</Text>
          </View>
          <Text style={sectionLabelStyles}>Mnemonic</Text>
          <Text style={[globalStyles.darkGreyText, styles.bottomPad]}>
            Ensure you backup your mnemonic seed, this will be used to recover
            your eth accounts.
          </Text>
          <View style={styles.resultContainer}>
            <Text>{this.state.mnemonic}</Text>
          </View>
          <Button
            title="Continue"
            onPress={this.props.onComplete}
            testID="create-wallet-continue-button"
          />
        </View>
      )
    }
  }

  renderImportOrCreate() {
    return (
      <View>
        <View style={styles.sectionContainer}>
          <Text style={[globalStyles.boldText, styles.bottomPad]}>
            Create wallet
          </Text>
          <Text style={[globalStyles.darkGreyText, styles.bottomPad]}>
            Create a new Ethereum wallet.
          </Text>
          <Button
            title="Create Wallet"
            style={styles.createButton}
            testID="create-wallet-button"
            onPress={this.onPressCreateWallet}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[globalStyles.boldText, styles.bottomPad]}>
            Import wallet
          </Text>
          <Text style={[globalStyles.darkGreyText, styles.bottomPad]}>
            Import existing accounts from a mnemonic passphrase
          </Text>
          <MFTextInput
            multiline
            style={styles.input}
            value={this.state.mnemonic}
            placeholder="12 word mneomnic phrase"
            onChangeText={this.onChangeMnemonic}
          />
          <Button title="Import Wallet" onPress={this.onPressImportMnemonic} />
        </View>
      </View>
    )
  }

  render() {
    // TODO: show error
    const content = this.state.walletAddress
      ? this.renderAddress()
      : this.renderImportOrCreate()
    return (
      <OnboardContainer title={this.state.successMsg || 'Setup a Wallet'}>
        {content}
      </OnboardContainer>
    )
  }
}

const styles = StyleSheet.create({
  bottomPad: {
    paddingBottom: 12,
  },
  sectionContainer: {
    borderColor: colors.LIGHT_GREY_DE,
    borderRadius: 4,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 70,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: colors.PRIMARY_RED,
  },
  resultContainer: {
    padding: 10,
    backgroundColor: colors.LIGHT_GREY_F7,
    borderRadius: 4,
    marginBottom: 15,
  },
})
