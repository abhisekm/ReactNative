import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk"
import { firebase } from "@react-native-firebase/auth";
import { navigate } from "../../navigation";
import omit from "ramda/es/omit";
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';
import { withRootStore } from "../extensions";
import { RootStore } from "../root-store";
import { InstagramStore } from "../instagram-store";


/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "done"),
    provider: types.maybeNull(types.enumeration("Provider", ["facebook", "google", "email"])),
    errorMessage: types.maybe(types.string),
    displayName: types.maybe(types.string),
    showWalkthrough: true,
    showUserDetails: true,
    showQuestionnaire: true,
  })
  .extend(withRootStore)
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

      if (self.showWalkthrough) {
        self.state = "done";
        navigate("WalkThrough");
        return;
      }

      const user = firebase.auth().currentUser;
      if (user) {
        if (self.showUserDetails)
          navigate("UserDetails")
        else if (self.showQuestionnaire)
          navigate("Questionnaire")
        else
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
        self.displayName = firebase.auth().currentUser.displayName;
        return navigate("UserDetails");
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
        const userInfo: User = yield GoogleSignin.signIn();
        const result: { idToken: string, accessToken: string } = yield GoogleSignin.getTokens();
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        yield firebase.auth().signInWithCredential(credential);


        self.state = "done";
        self.provider = "google"
        self.displayName = firebase.auth().currentUser.displayName;
        navigate("UserDetails")
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

      ((self.rootStore as RootStore).igStore as InstagramStore).clear()
      self.provider = null;
      self.state = "done";
      navigate("loginFlow")
    }),

    resetWalkthrough() {
      self.showWalkthrough = true;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    walkthroughComplete() {
      self.showWalkthrough = false;
      self.silentSignIn();
    },

    userDetailesEntered() {
      self.showUserDetails = false;
      self.silentSignIn();
    },

    questionnaireCompleted(answersAsObj) {
      console.log(answersAsObj);
      self.showQuestionnaire = false;
      self.silentSignIn();
    }
  }))
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
