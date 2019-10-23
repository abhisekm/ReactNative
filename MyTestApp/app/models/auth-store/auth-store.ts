import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk"
import { firebase } from "@react-native-firebase/auth";
import { navigate } from "../../navigation";

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setState(newState) {
      self.state = newState;
    }
  }))
  .actions(self => ({
    signInFacebook: flow(function* () {
      try {
        const result: LoginResult = yield LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (!result) {
          throw new Error("Unable to log in")
        }

        if (result.isCancelled) {
          return self.state = "done"

        }
        const data: AccessToken | null = yield AccessToken.getCurrentAccessToken();
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        yield firebase.auth().signInWithCredential(credential);

        self.state = "done"
        navigate("Dashboard")
      } catch (error) {
        self.state = "error";
        self.errorMessage = error.message;
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
