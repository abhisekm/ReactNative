import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignInfoModel = types
  .model("CampaignInfo")
  .props({
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignInfoType = Instance<typeof CampaignInfoModel>
export interface CampaignInfo extends CampaignInfoType { }
type CampaignInfoSnapshotType = SnapshotOut<typeof CampaignInfoModel>
export interface CampaignInfoSnapshot extends CampaignInfoSnapshotType { }
