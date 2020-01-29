import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CampaignModel } from "../campaign/campaign"
import { CampaignDeliverableModel } from "../campaign-deliverable"
import { CampaignStatusModel } from "../campaign-status"
import { CampaignQuoteModel } from "../campaign-quote"
import { CampaignInfoModel } from "../campaign-info"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignDetailModel = types
  .model("CampaignDetail")
  .props({
    campaignDetails: types.maybeNull(CampaignModel),
    deliverable: types.maybeNull(CampaignDeliverableModel),
    status: types.maybeNull(CampaignStatusModel),
    quote: types.maybeNull(CampaignQuoteModel),
    info: types.maybeNull(types.array(CampaignInfoModel))
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignDetailType = Instance<typeof CampaignDetailModel>
export interface CampaignDetail extends CampaignDetailType { }
type CampaignDetailSnapshotType = SnapshotOut<typeof CampaignDetailModel>
export interface CampaignDetailSnapshot extends CampaignDetailSnapshotType { }
