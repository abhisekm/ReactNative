import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignDeliverableModel = types
  .model("CampaignDeliverable")
  .props({
    deliverableLink: types.maybeNull(types.string),
    deliverableStatus: types.maybeNull(types.number),
    deliverableDeadline: types.number,
    editable: types.optional(types.boolean, false)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignDeliverableType = Instance<typeof CampaignDeliverableModel>
export interface CampaignDeliverable extends CampaignDeliverableType { }
type CampaignDeliverableSnapshotType = SnapshotOut<typeof CampaignDeliverableModel>
export interface CampaignDeliverableSnapshot extends CampaignDeliverableSnapshotType { }
