import { Instance, SnapshotOut, types } from "mobx-state-tree"
import moment from "moment";

/**
 * Model description here for TypeScript hints.
 */
export const CampaignBidHistoryModel = types
  .model("CampaignBidHistory")
  .props({
    comment: types.maybeNull(types.string),
    campaign: types.maybeNull(types.string),
    price: types.number,
    state: types.string,
    bidId: types.string,
    createdOn: types.string,
    influencer: types.maybeNull(types.string),
  })
  .views(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignBidHistoryType = Instance<typeof CampaignBidHistoryModel>
export interface CampaignBidHistory extends CampaignBidHistoryType { }
type CampaignBidHistorySnapshotType = SnapshotOut<typeof CampaignBidHistoryModel>
export interface CampaignBidHistorySnapshot extends CampaignBidHistorySnapshotType { }
