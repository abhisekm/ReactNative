import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const InstagramPostModel = types
  .model("InstagramPost")
  .props({
    id: types.string,
    caption: types.maybeNull(types.string),
    media_type: types.maybeNull(types.enumeration("MediaType", ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"])),
    media_url: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type InstagramPostType = Instance<typeof InstagramPostModel>
export interface InstagramPost extends InstagramPostType { }
type InstagramPostSnapshotType = SnapshotOut<typeof InstagramPostModel>
export interface InstagramPostSnapshot extends InstagramPostSnapshotType { }
