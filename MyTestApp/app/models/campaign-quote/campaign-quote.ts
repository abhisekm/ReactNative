import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignQuoteModel = types
  .model("CampaignQuote")
  .props({
    amount: types.optional(types.number, 0),
    comment: types.string,
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

type CampaignQuoteType = Instance<typeof CampaignQuoteModel>
export interface CampaignQuote extends CampaignQuoteType { }
type CampaignQuoteSnapshotType = SnapshotOut<typeof CampaignQuoteModel>
export interface CampaignQuoteSnapshot extends CampaignQuoteSnapshotType { }
