import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk"
import { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import omit from "ramda/es/omit";
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';
import { withRootStore, withEnvironment } from "../extensions";
import { RootStore } from "../root-store";
import { InstagramStore } from "../instagram-store";
import { validate } from "../../utils/validate";
import { UserDetails } from "../user-details";
import { NavigationStore } from "../../navigation/navigation-store";
import { CheckInfluencerResult } from "../../services/api";


/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "done"),
    provider: types.maybeNull(types.enumeration("Provider", ["facebook", "google", "email"])),
    errorMessage: types.maybe(types.string),
    successMessage: types.maybeNull(types.string),
    displayName: types.maybe(types.string),
    fcmToken: types.maybeNull(types.string),
    fcmUpdateNeeded: true,
    showWalkthrough: true,
    showUserDetails: true,
    showQuestionnaire: false,
    apiAuthUpdated: false,
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views(self => ({
    showLoading(): boolean {
      return self.state === "pending";
    },

    getToken(): string {
      return self.fcmToken;
    },

    authUpdated(): boolean {
      return self.apiAuthUpdated;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    navigate(routeName) {
      ((self.rootStore as RootStore).navigationStore as NavigationStore).navigateTo(routeName);
    }
  }))
  .actions(self => ({
    setState(newState) {
      self.state = newState;
    },

    clearError() {
      self.errorMessage = '';
    },

    clearSuccess() {
      self.successMessage = '';
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

        self.navigate("WalkThrough");
        return;
      }

      const user = firebase.auth().currentUser;
      if (user) {
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);

        const result: CheckInfluencerResult = yield self.environment.api.checkInfluencerSignUp();
        if (result.kind == "ok" && result.response.isSuccess) {
          self.showUserDetails = !result.response.userRegistered;
        }

        if (self.showUserDetails)
          self.navigate("onboardingFlow")
        else if (self.showQuestionnaire)
          self.navigate("Questionnaire")
        else
          self.navigate("dashboardFlow")
      } else {
        self.navigate("SampleCampaign")
      }

      self.state = "done";
    }),

    isSignedIn() {
      return firebase.auth().currentUser != null;
    },

    /**
     * Update the firebase token for authentication for api call
     */
    updateApiAuth: flow(function* () {
      if (firebase.auth().currentUser != null) {
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);
        self.apiAuthUpdated = true;
      } else {
        self.apiAuthUpdated = true;
      }
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
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);

        const influencerResult: CheckInfluencerResult = yield self.environment.api.checkInfluencerSignUp();
        if (influencerResult.kind == "ok" && influencerResult.response.isSuccess && influencerResult.response.userRegistered) {
          return self.navigate("dashboardFlow");
        }

        return self.navigate("onboardingFlow");
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
        self.provider = "google";
        self.displayName = firebase.auth().currentUser.displayName;
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);

        const influencerResult: CheckInfluencerResult = yield self.environment.api.checkInfluencerSignUp();
        if (influencerResult.kind == "ok" && influencerResult.response.isSuccess && influencerResult.response.userRegistered) {
          return self.navigate("dashboardFlow");
        }

        self.navigate("onboardingFlow");
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
    * Sign in into firebase with email credential
    */
    signInEmail: flow(function* (email: string, password: string) {
      self.clearError();
      if (!email) {
        self.state = "error";
        self.errorMessage = "Email cannot be empty";
        return;
      } else if (!password) {
        self.state = "error";
        self.errorMessage = "Password cannot be empty";
        return;
      }

      try {
        const userCredential: FirebaseAuthTypes.UserCredential =
          yield firebase.auth().signInWithEmailAndPassword(email, password);

        self.state = "done";
        self.provider = "email";
        self.displayName = firebase.auth().currentUser.displayName;
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);

        const influencerResult: CheckInfluencerResult = yield self.environment.api.checkInfluencerSignUp();
        if (influencerResult.kind == "ok" && influencerResult.response.isSuccess && influencerResult.response.userRegistered) {
          return self.navigate("dashboardFlow");
        }

        self.navigate("onboardingFlow");
      } catch (error) {
        self.state = "error";
        self.errorMessage = "Invalid email id or password";
        console.log(error);
      }
    }),

    /**
    * Sign up into firebase with email credential
    */
    signUpEmail: flow(function* (name: string, email: string, password: string, confirmPassword: string) {
      self.state = "pending";

      self.clearError();
      if (name.length < 3) {
        self.state = "error";
        self.errorMessage = "Please enter a valid Name";
        return;
      } else if (!email) {
        self.state = "error";
        self.errorMessage = "Email cannot be empty";
        return;
      } else if (!password) {
        self.state = "error";
        self.errorMessage = "Password cannot be empty";
        return;
      } else if (!confirmPassword) {
        self.state = "error";
        self.errorMessage = "Confirm Password cannot be empty";
        return;
      } else if (password != confirmPassword) {
        self.state = "error";
        self.errorMessage = "Password and Confirm Password doesnt match";
        return;
      }

      var constraint = {
        from: {
          email: {
            message: "Please enter a valid email"
          }
        }
      }

      const result = validate(constraint, { from: email });
      const { from } = result;
      if (from) {
        self.state = "error";
        self.errorMessage = "" + from;
        return;
      }

      try {
        const userCredential: FirebaseAuthTypes.UserCredential =
          yield firebase.auth().createUserWithEmailAndPassword(email, password);

        console.log("user signed in - ", userCredential)

        self.state = "done";
        self.provider = "email"
        self.displayName = name;
        firebase.auth().currentUser.updateProfile({
          displayName: name,
        })
        const firebaseToken = yield firebase.auth().currentUser.getIdToken();
        self.environment.api.setAuthToken(firebaseToken);

        const influencerResult: CheckInfluencerResult = yield self.environment.api.checkInfluencerSignUp();
        if (influencerResult.kind == "ok" && influencerResult.response.isSuccess && influencerResult.response.userRegistered) {
          return self.navigate("dashboardFlow");
        }

        self.navigate("onboardingFlow")
      } catch (error) {
        self.state = "error";
        self.errorMessage = error.message;
        return;
      }
    }),

    /**
    * Reset password in firebase with email credential
    */
    resetPassword: flow(function* (email: string) {
      self.state = "pending";

      self.clearSuccess();
      self.clearError();
      console.log(email);
      if (!email) {
        self.state = "error";
        self.errorMessage = "Email cannot be empty";
        return;
      }

      try {
        const userCredential: FirebaseAuthTypes.UserCredential =
          yield firebase.auth().sendPasswordResetEmail(email);

        self.state = "done";
        self.successMessage = "Email has been sent to your " + email + " with password reset link.";
      } catch (error) {
        self.state = "error";
        self.errorMessage = "Invalid email";
        console.log(error);
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

      self.environment.api.removeAuthToken();
      ((self.rootStore as RootStore).igStore as InstagramStore).clear();
      ((self.rootStore as RootStore).userInfoStore as UserDetails).clear();
      self.provider = null;

      self.state = "done";
      self.navigate("loginFlow")
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
    },

    setToken(token) {
      self.fcmToken = token;
    },

    setFcmUpdateNeeded(value: boolean) {
      self.fcmUpdateNeeded = value;
    },

    goToEmailLogin() {
      self.clearError();
      self.navigate("Login");
    },

    goToEmailSignup() {
      self.clearError();
      self.navigate("Signup");
    },

    goToForgotPassword() {
      self.clearError();
      self.navigate("ResetPassword");
    },
  }))
  .postProcessSnapshot(omit(["state", "errorMessage", "successMessage"]))

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
