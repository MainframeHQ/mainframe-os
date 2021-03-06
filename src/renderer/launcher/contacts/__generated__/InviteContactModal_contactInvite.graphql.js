/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type ContactStakeState = "RECLAIMED" | "RECLAIMING" | "SEIZED" | "STAKED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type InviteContactModal_contactInvite$ref: FragmentReference;
declare export opaque type InviteContactModal_contactInvite$fragmentType: InviteContactModal_contactInvite$ref;
export type InviteContactModal_contactInvite = {|
  +ethNetwork: string,
  +fromAddress: string,
  +inviteTX: string,
  +stakeState: ContactStakeState,
  +stakeAmount: string,
  +reclaimedStakeTX: ?string,
  +$refType: InviteContactModal_contactInvite$ref,
|};
export type InviteContactModal_contactInvite$data = InviteContactModal_contactInvite;
export type InviteContactModal_contactInvite$key = {
  +$data?: InviteContactModal_contactInvite$data,
  +$fragmentRefs: InviteContactModal_contactInvite$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "InviteContactModal_contactInvite",
  "type": "ContactInvite",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "ethNetwork",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fromAddress",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "inviteTX",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stakeState",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stakeAmount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "reclaimedStakeTX",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5db7c623460f704166e3043cdb4b94d9';
module.exports = node;
