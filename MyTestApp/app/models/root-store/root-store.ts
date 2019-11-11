import { ImmersifyStoreModel } from "../../models/immersify-store"
import { InstagramStoreModel } from "../../models/instagram-store"
import { AuthStoreModel } from "../../models/auth-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
export const RootStoreModel =
  types
    .model("RootStore")
    .props({
      authStore: types.optional(AuthStoreModel, {}),
      igStore: types.optional(InstagramStoreModel, {}),
      immersifyStore: types.optional(ImmersifyStoreModel, {})
    })

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
