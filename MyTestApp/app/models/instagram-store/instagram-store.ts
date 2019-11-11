import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { AccessToken, IGUser } from "../../services/api";
import { InstagramPostModel, InstagramPost } from "../instagram-post";
import CookieManager from "react-native-cookies";
import omit from "ramda/es/omit";

/**
 * Model description here for TypeScript hints.
 */
export const InstagramStoreModel = types
  .model("InstagramStore")
  .props({
    code: types.maybeNull(types.string),
    accessToken: types.maybeNull(types.string),
    userId: types.maybeNull(types.number),
    userName: types.maybeNull(types.string),
    posts: types.array(InstagramPostModel),
    hasMore: types.maybeNull(types.boolean),
    cursor: types.maybeNull(types.string),
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
      self.code = null
      self.accessToken = null
      self.userId = null
      self.userName = null
      self.posts.clear();
      CookieManager.clearAll(true);
    },
  }))
  .actions(self => {
    const updateUserName = flow(function* () {
      const result: { kind: string, user: IGUser, temporary: boolean } = yield self.environment.api.getUserName(self.accessToken);
      const { user } = result;
      if (user) {
        const { id, username } = user;
        self.userId = Number(id);
        self.userName = username;
      }

      self.loading = false;
    })

    const getToken = flow(function* () {
      const result: { kind: string, token: AccessToken, temporary: boolean } = yield self.environment.api.getToken(self.code);
      const { token } = result;
      if (token) {
        const { access_token } = token;
        self.accessToken = access_token;
        updateUserName();
      } else {
        self.loading = false;
      }
    })

    function setCode(authCode) {
      self.code = authCode;
      self.loading = true;
      getToken();
    }

    return { setCode }
  })
  .actions(self => ({
    fetchPosts: flow(function* () {
      self.loading = true;

      if (self.posts && self.posts.length > 1) {
        self.posts.clear();
      }

      const result: { kind: string, posts: InstagramPost[], temporary: boolean, hasMore: boolean, nextCursor: string }
        = yield self.environment.api.getPosts(self.accessToken);

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

    fetchMorePosts: flow(function* () {
      if (!self.hasMore || self.isLoadingMore) {
        return;
      }

      self.loadingMore = true;

      const result: { kind: string, posts: InstagramPost[], temporary: boolean, hasMore: boolean, nextCursor: string }
        = yield self.environment.api.getMorePosts(self.accessToken, self.cursor);

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
  .postProcessSnapshot(
    omit(["loading", "posts", "hasMore", "cursor"])
  )

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type InstagramStoreType = Instance<typeof InstagramStoreModel>
export interface InstagramStore extends InstagramStoreType { }
type InstagramStoreSnapshotType = SnapshotOut<typeof InstagramStoreModel>
export interface InstagramStoreSnapshot extends InstagramStoreSnapshotType { }
