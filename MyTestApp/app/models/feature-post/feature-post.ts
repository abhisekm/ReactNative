import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { InstagramPost } from "../instagram-post";

/**
 * Model description here for TypeScript hints.
 */
export const MediaModel = types
  .model("Media")
  .props({
    media_type: types.string,
    media_id: types.number,
    media_url: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars


/**
 * Model description here for TypeScript hints.
 */
export const FeaturePostModel = types
  .model("FeaturePost")
  .props({
    post_text: types.maybeNull(types.string),
    post_ts: types.number,
    post_id: types.number,
    media: types.array(MediaModel),
    profile_insta_id: types.number,
    insta_username: types.string,
    profile_picture: types.string,
    loc_name: types.maybeNull(types.string),
    shortcode: types.string,
    likes_count: types.number
  })
  .views(self => ({
    get post(): InstagramPost {
      return {
        id: self.post_id.toString(),
        media_type: self.media[0].media_type === "photo" ? "IMAGE" : "VIDEO",
        media_url: self.media[0].media_url,
        caption: self.post_text,
        avatar: self.profile_picture,
        username: self.insta_username,
        likes: self.likes_count
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type FeaturePostType = Instance<typeof FeaturePostModel>
export interface FeaturePost extends FeaturePostType { }
type FeaturePostSnapshotType = SnapshotOut<typeof FeaturePostModel>
export interface FeaturePostSnapshot extends FeaturePostSnapshotType { }
