import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignDetailModel = types
  .model("CampaignDetail")
  .props({
    id: types.string,
    campaignImage: types.maybeNull(types.string),
    brandName: types.maybeNull(types.string),
    brandImage: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    link: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    campaignStatusText: types.maybeNull(types.string),
    campaignStatus: types.number,
    deliverableLink: types.maybeNull(types.string),
    deliverableStatus: types.maybeNull(types.number),
    deliverableDeadline: types.number,
    quote: types.maybeNull(types.number)
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