/**
 * @flow
 * @relayHash da1b3ae87742c55cadfd800b61795aac
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WalletsScreen_user$ref = any;
export type SupportedWallets = "ETHEREUM" | "%future added value";
export type CreateHDWalletInput = {
  blockchain: SupportedWallets,
  name: string,
  setAsDefault?: ?boolean,
  clientMutationId?: ?string,
};
export type WalletCreateModalCreateHDWalletMutationVariables = {|
  input: CreateHDWalletInput
|};
export type WalletCreateModalCreateHDWalletMutationResponse = {|
  +createHDWallet: ?{|
    +hdWallet: ?{|
      +accounts: $ReadOnlyArray<{|
        +address: string
      |}>,
      +mnemonic: string,
      +localID: string,
    |},
    +viewer: {|
      +$fragmentRefs: WalletsScreen_user$ref
    |},
  |}
|};
export type WalletCreateModalCreateHDWalletMutation = {|
  variables: WalletCreateModalCreateHDWalletMutationVariables,
  response: WalletCreateModalCreateHDWalletMutationResponse,
|};
*/


/*
mutation WalletCreateModalCreateHDWalletMutation(
  $input: CreateHDWalletInput!
) {
  createHDWallet(input: $input) {
    hdWallet {
      accounts {
        address
      }
      mnemonic
      localID
      id
    }
    viewer {
      ...WalletsScreen_user
      id
    }
  }
}

fragment WalletsScreen_user on User {
  profile {
    ethAddress
  }
  ethWallets {
    hd {
      name
      localID
      accounts {
        address
        balances {
          eth
          mft
        }
      }
      id
    }
    ledger {
      name
      localID
      accounts {
        address
        balances {
          eth
          mft
        }
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateHDWalletInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateHDWalletInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "address",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "accounts",
  "storageKey": null,
  "args": null,
  "concreteType": "WalletAccount",
  "plural": true,
  "selections": [
    v2
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mnemonic",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "localID",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  },
  v5,
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "accounts",
    "storageKey": null,
    "args": null,
    "concreteType": "WalletAccount",
    "plural": true,
    "selections": [
      v2,
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "balances",
        "storageKey": null,
        "args": null,
        "concreteType": "WalletBalances",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "eth",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "mft",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  v6
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "WalletCreateModalCreateHDWalletMutation",
  "id": null,
  "text": "mutation WalletCreateModalCreateHDWalletMutation(\n  $input: CreateHDWalletInput!\n) {\n  createHDWallet(input: $input) {\n    hdWallet {\n      accounts {\n        address\n      }\n      mnemonic\n      localID\n      id\n    }\n    viewer {\n      ...WalletsScreen_user\n      id\n    }\n  }\n}\n\nfragment WalletsScreen_user on User {\n  profile {\n    ethAddress\n  }\n  ethWallets {\n    hd {\n      name\n      localID\n      accounts {\n        address\n        balances {\n          eth\n          mft\n        }\n      }\n      id\n    }\n    ledger {\n      name\n      localID\n      accounts {\n        address\n        balances {\n          eth\n          mft\n        }\n      }\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "WalletCreateModalCreateHDWalletMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createHDWallet",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateHDWalletPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "hdWallet",
            "storageKey": null,
            "args": null,
            "concreteType": "EthHDWallet",
            "plural": false,
            "selections": [
              v3,
              v4,
              v5
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewer",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "WalletsScreen_user",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WalletCreateModalCreateHDWalletMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createHDWallet",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateHDWalletPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "hdWallet",
            "storageKey": null,
            "args": null,
            "concreteType": "EthHDWallet",
            "plural": false,
            "selections": [
              v3,
              v4,
              v5,
              v6
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewer",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "profile",
                "storageKey": null,
                "args": null,
                "concreteType": "NamedProfile",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "ethAddress",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "ethWallets",
                "storageKey": null,
                "args": null,
                "concreteType": "EthWallets",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "hd",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EthHDWallet",
                    "plural": true,
                    "selections": v7
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "ledger",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EthLedgerWallet",
                    "plural": true,
                    "selections": v7
                  }
                ]
              },
              v6
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '462bef3452ad0763284c91602129d44b';
module.exports = node;
