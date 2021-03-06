/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type InviteContactModal_user$ref: FragmentReference;
declare export opaque type InviteContactModal_user$fragmentType: InviteContactModal_user$ref;
export type InviteContactModal_user = {|
  +contactInviteStake: string,
  +profile: {|
    +ethAddress: ?string
  |},
  +$refType: InviteContactModal_user$ref,
|};
export type InviteContactModal_user$data = InviteContactModal_user;
export type InviteContactModal_user$key = {
  +$data?: InviteContactModal_user$data,
  +$fragmentRefs: InviteContactModal_user$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "InviteContactModal_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "contactInviteStake",
      "args": null,
      "storageKey": null
    },
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'd57cf7b33cee5bb1e53dd762b6447aa5';
module.exports = node;
