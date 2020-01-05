import { ImmersifyStoreModel } from "../../models/immersify-store"
import { InstagramStoreModel } from "../../models/instagram-store"
import { AuthStoreModel } from "../../models/auth-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CacheHeightModel } from "../cache-height"
import { UserDetailsModel } from "../user-details"
import { CampaignListModel } from "../campaign-list"

/**
 * A RootStore model.
 */
export const RootStoreModel =
  types
    .model("RootStore")
    .props({
      authStore: types.optional(AuthStoreModel, {}),
      igStore: types.optional(InstagramStoreModel, {}),
      immersifyStore: types.optional(ImmersifyStoreModel, {}),
      heightCache: types.optional(CacheHeightModel, {}),
      userInfoStore: types.optional(UserDetailsModel, {}),
      campaignStore: types.optional(CampaignListModel, {}),
    })

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
