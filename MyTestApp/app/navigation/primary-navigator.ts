import { createStackNavigator } from "react-navigation-stack"
import { ResolveAuthScreen } from "../screens/resolve-auth-screen"
import { LoginScreen } from "../screens/login-screen"
import { SignupScreen } from "../screens/signup-screen"
import { DashboardScreen } from "../screens/dashboard-screen"
import { createSwitchNavigator } from "react-navigation"
import { color, spacing } from "../theme"
import { ResetPasswordScreen } from "../screens/reset-password-screen"
import { VerifyPhoneScreen } from "../screens/verify-phone-screen"
import { QuestionnaireScreen } from "../screens/questionnaire-screen"
import { HomeScreen } from "../screens/home-screen"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { AccountScreen } from "../screens/account-screen"
import { UserDetailsScreen } from "../screens/user-details-screen"
import { WalkthroughScreen } from "../screens/walkthrough-screen"
import { AppliedCampaignScreen } from "../screens/applied-campaign-screen"
import { LiveCampaignListingScreen } from "../screens/live-campaign-listing-screen"
import { AllCampaignListingScreen } from "../screens/all-campaign-listing-screen"
import { DeadlineImageUploadScreen } from "../screens/deadline-image-upload-screen"
import { verticalScale, scale } from "../utils/scale"
import { normalisedFontSize } from "../theme/fontSize"

const DashboardFlowStack = createBottomTabNavigator({
  LiveCampaign: { screen: LiveCampaignListingScreen },
  Dashboard: { screen: DashboardScreen },
  // Feature: { screen: FeaturePostsScreen },
  Account: { screen: AccountScreen },
}, {
  tabBarOptions: {
    activeTintColor: color.primary,
    inactiveTintColor: color.palette.white,
    style: {
      backgroundColor: color.palette.grey10,
      height: scale(60)
    },
    labelStyle: {
      fontSize: normalisedFontSize.small,
      paddingBottom: spacing.tiny,
    }
  }
});

DashboardFlowStack.navigationOptions = {
  header: null
}

const DefaultNavOptions = {
  headerStyle: {
    backgroundColor: color.palette.grey9,
  },
  headerTintColor: color.palette.white,
  headerTitleContainerStyle: {
    left: 0
  }
}

export const PrimaryNavigator = createSwitchNavigator(
  {
    ResolveAuth: { screen: ResolveAuthScreen },
    WalkThrough: { screen: WalkthroughScreen },
    loginFlow: createStackNavigator({
      Home: { screen: HomeScreen },
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      ResetPassword: { screen: ResetPasswordScreen },
      VerifyPhone: { screen: VerifyPhoneScreen }
    }, {
      headerMode: 'screen',
      defaultNavigationOptions: DefaultNavOptions
    }),
    UserDetails: { screen: UserDetailsScreen },
    campaignFlow: createStackNavigator({
      dashboardFlow: DashboardFlowStack,
      CampaignDetails: { screen: AppliedCampaignScreen },
      AllCampaign: { screen: AllCampaignListingScreen },
      ImageUpload: { screen: DeadlineImageUploadScreen },
    }, {
      headerMode: 'screen',
      defaultNavigationOptions: DefaultNavOptions
    }),
    Questionnaire: { screen: QuestionnaireScreen },
  },
  {
    initialRouteName: "ResolveAuth"
  }
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["Home", "dashboardFlow", "Dashboard"]
