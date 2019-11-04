import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { AccessToken, IGUser, IGPost } from "../../services/api";
import { InstagramPostModel } from "../instagram-post";

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
    posts: types.map(InstagramPostModel),
    loading: true,
  })
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setCode(authCode) {
      self.code = authCode;
      console.log("setCode", self)
    },
    clear() {
      self.code = null
      self.accessToken = null
      self.userId = null
      self.userName = null
      self.posts.clear();
    },
  }))
  .actions(self => ({
    updateUserName: flow(function* () {
      const result: { kind: string, user: IGUser, temporary: boolean } = yield self.environment.api.getUserName(self.accessToken);
      const { user } = result;
      if (user) {
        const { id, username } = user;
        self.userId = Number(id);
        self.userName = username;
        console.log("update user name", self)
      }
    }),
  }))
  .actions(self => ({
    getToken: flow(function* () {
      const result: { kind: string, token: AccessToken, temporary: boolean } = yield self.environment.api.getToken(self.code);
      const { token } = result;
      if (token) {
        const { access_token } = token;
        self.accessToken = access_token;
        yield self.updateUserName();
      }
    }),
    loadPosts: flow(function* () {
      const result: { kind: string, posts: IGPost[], temporary: boolean } = yield self.environment.api.getPosts(self.accessToken);
      const { posts } = result;
      if (posts) {
        posts.forEach(post => {
          self.posts.put(post);
        })

        self.loading = false;
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

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
