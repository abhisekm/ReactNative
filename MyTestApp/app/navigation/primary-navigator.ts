import { createStackNavigator } from "react-navigation-stack"
import { ResolveAuthScreen } from "../screens/resolve-auth-screen"
import { LoginScreen } from "../screens/login-screen"
import { SignupScreen } from "../screens/signup-screen"
import { DashboardScreen } from "../screens/dashboard-screen"
import { createSwitchNavigator } from "react-navigation"
import { color } from "../theme"
import { ResetPasswordScreen } from "../screens/reset-password-screen"
import { VerifyPhoneScreen } from "../screens/verify-phone-screen"
import { QuestionnaireScreen } from "../screens/questionnaire-screen"
import { HomeScreen } from "../screens/home-screen"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { AccountScreen } from "../screens/account-screen"
import { FeaturePostsScreen } from "../screens/feature-posts-screen"
import { UserDetailsScreen } from "../screens/user-details-screen"

export const PrimaryNavigator = createSwitchNavigator(
  {
    ResolveAuth: { screen: ResolveAuthScreen },
    loginFlow: createStackNavigator({
      Home: { screen: HomeScreen },
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      ResetPassword: { screen: ResetPasswordScreen },
      VerifyPhone: { screen: VerifyPhoneScreen }
    }, {
      headerMode: 'screen',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: color.palette.grey9,
        },
        headerTintColor: color.palette.white,
        headerTitleContainerStyle: {
          left: 0
        }
      }
    }),
    mainFlow: createStackNavigator({
      dashboardFlow: createBottomTabNavigator({
        Dashboard: { screen: DashboardScreen },
        Feature: { screen: FeaturePostsScreen },
        Account: { screen: UserDetailsScreen },
      }),
      Questionnaire: { screen: QuestionnaireScreen },
    }, {
      headerMode: 'none'
    }),
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
