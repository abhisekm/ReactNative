import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
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
import { scale } from "../utils/scale"
import { normalisedFontSize } from "../theme/fontSize"
import { UserOnboardingEssentialScreen } from "../screens/user-onboarding-essential-screen"
import { UserOnboardingSocialMediaScreen } from "../screens/user-onboarding-social-media-screen"
import { UserOnboardingInterestScreen } from "../screens/user-onboarding-interest-screen"
import { UserOnboardingSuccessScreen } from "../screens/user-onboarding-success-screen"
import { UserOnboardingExtraScreen } from "../screens/user-onboarding-extra-screen"
import { SampleCampaignScreen } from "../screens/sample-campaign-screen"
import { BidHistoryScreen } from "../screens/bid-history-screen"

const DashboardFlowStack = createBottomTabNavigator({
  LiveCampaign: { screen: LiveCampaignListingScreen },
  Dashboard: { screen: DashboardScreen },
  // Feature: { screen: FeaturePostsScreen },
  Account: { screen: AccountScreen },
}, {
  tabBarOptions: {
    keyboardHidesTabBar: true,
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
  headerTintColor: color.palette.white
}

export const PrimaryNavigator = createSwitchNavigator(
  {
    ResolveAuth: { screen: ResolveAuthScreen },
    WalkThrough: { screen: WalkthroughScreen },
    campaignFlow: createNativeStackNavigator({
      SampleCampaign: { screen: SampleCampaignScreen },
      dashboardFlow: DashboardFlowStack,
      CampaignDetails: { screen: AppliedCampaignScreen },
      BidHistory: { screen: BidHistoryScreen },
      AllCampaign: { screen: AllCampaignListingScreen },
      ImageUpload: { screen: DeadlineImageUploadScreen },
    }, {
      headerMode: 'screen',
      defaultNavigationOptions: DefaultNavOptions
    }),
    loginFlow: createNativeStackNavigator({
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
    onboardingFlow: createNativeStackNavigator({
      Essential: { screen: UserOnboardingEssentialScreen },
      Interest: { screen: UserOnboardingInterestScreen },
      OnboardingSuccess: { screen: UserOnboardingSuccessScreen },
      SocialMedia: { screen: UserOnboardingSocialMediaScreen },
      Extra: { screen: UserOnboardingExtraScreen }
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
export const exitRoutes: string[] = ["LiveCampaign", "WalkThrough", "SampleCampaign"]
