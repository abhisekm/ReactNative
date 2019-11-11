import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { InstagramPostModel, InstagramPost } from "../instagram-post";
import { withEnvironment } from "../extensions";

/**
 * Model description here for TypeScript hints.
 */
export const ImmersifyStoreModel = types
  .model("ImmersifyStore")
  .props({
    posts: types.array(InstagramPostModel),
    hasMore: types.maybeNull(types.boolean),
    cursor: types.maybeNull(types.number),
    loading: false,
    loadingMore: false,
  })
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    },

    get isLoadingMore() {
      return self.loadingMore;
    },

    get loadPosts() {
      return self.posts.filter(post => post.media_type === "IMAGE");
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    clear() {
      self.posts.clear();
      self.cursor = null;
      self.hasMore = false;
      self.loading = false;
      self.loadingMore = false;
    },
  }))
  .actions(self => ({
    fetchFeaturedPosts: flow(function* () {
      self.loading = true;

      if (self.posts && self.posts.length > 1) {
        self.posts.clear();
      }

      const result: { kind: string, posts: InstagramPost[], temporary: boolean, hasMore: boolean, nextCursor: number }
        = yield self.environment.api.getFeaturedPosts();

      const { posts, hasMore, nextCursor } = result;

      self.hasMore = hasMore;
      self.cursor = nextCursor;

      if (posts) {
        posts.forEach(post => {
          self.posts.push(post);
        })
      }

      self.loading = false;
    }),

    fetchMoreFeaturedPosts: flow(function* () {
      if (!self.hasMore || self.isLoadingMore) {
        return;
      }

      self.loadingMore = true;

      const result: { kind: string, posts: InstagramPost[], temporary: boolean, hasMore: boolean, nextCursor: number }
        = yield self.environment.api.getFeaturedPosts(self.cursor);

      const { posts, hasMore, nextCursor } = result;

      self.hasMore = hasMore;
      self.cursor = nextCursor;

      if (posts) {
        posts.forEach(post => {
          self.posts.push(post);
        })
      }

      self.loadingMore = false;
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars


/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ImmersifyStoreType = Instance<typeof ImmersifyStoreModel>
export interface ImmersifyStore extends ImmersifyStoreType { }
type ImmersifyStoreSnapshotType = SnapshotOut<typeof ImmersifyStoreModel>
export interface ImmersifyStoreSnapshot extends ImmersifyStoreSnapshotType { }
