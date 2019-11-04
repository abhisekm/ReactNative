import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk"
import { firebase } from "@react-native-firebase/auth";
import { navigate } from "../../navigation";
import omit from "ramda/es/omit";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';


/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "done"),
    provider: types.maybeNull(types.enumeration("Provider", ["facebook", "google", "email"])),
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({
    showLoading(): boolean {
      return self.state === "pending"
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setState(newState) {
      self.state = newState;
    },

    clearError() {
      self.errorMessage = '';
    },
  }))
  .actions(self => ({
    /**
     * Try Silent sign in
     */
    silentSignIn: flow(function* () {
      self.state = "pending";

      const user = firebase.auth().currentUser;
      user && console.log(user);
      user && console.log(user.providerData)
      if (user) {
        navigate("dashboardFlow")
      } else {
        navigate("loginFlow")
      }

      self.state = "done";
    }),

    /**
     * Sign in with firebase with facebook credential
     */
    signInFacebook: flow(function* () {
      try {
        self.clearError();
        self.state = "pending";
        const result: LoginResult = yield LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (!result) {
          throw new Error("Unable to log in");
        }

        if (result.isCancelled) {
          return self.state = "done";
        }

        const data: AccessToken | null = yield AccessToken.getCurrentAccessToken();
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        yield firebase.auth().signInWithCredential(credential);

        self.state = "done";
        self.provider = "facebook";
        return navigate("mainFlow");
      } catch (error) {
        self.state = "error";
        self.errorMessage = error.message;
      }
    }),

    /**
     * Sign in into firebase with google credential
     */
    signInGoogle: flow(function* () {
      try {
        self.clearError();
        self.state = "pending";
        GoogleSignin.configure();

        yield GoogleSignin.hasPlayServices();
        const userInfo = yield GoogleSignin.signIn();
        console.log("google - " + userInfo);
        const result: { idToken: string, accessToken: string } = yield GoogleSignin.getTokens();
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        yield firebase.auth().signInWithCredential(credential);


        self.state = "done";
        self.provider = "google"
        navigate("mainFlow")
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          self.errorMessage = error.message;
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          self.errorMessage = error.message;
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          self.errorMessage = error.message;
        } else {
          // some other error happened
          self.errorMessage = error.message;
        }

        self.state = "error";
      }
    }),

    /**
     * Logout from firebase
     */
    logout: flow(function* () {
      self.state = "pending";

      const user = firebase.auth().currentUser;
      if (!user) {
        self.state = "error";
        self.errorMessage = "User not logged in."
        return;
      }

      yield firebase.auth().signOut();

      switch (self.provider) {
        case "facebook":
          LoginManager.logOut();
          break;
        case "google":
          GoogleSignin.configure();
          yield GoogleSignin.signOut();
          break;
      }

      self.provider = null;
      self.state = "done";
      navigate("loginFlow")
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omit(["state", "errorMessage"]))

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
