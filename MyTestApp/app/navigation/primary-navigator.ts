import { createStackNavigator } from "react-navigation-stack"
import { ResolveAuthScreen } from "../screens/resolve-auth-screen"
import { LoginScreen } from "../screens/login-screen"
import { SignupScreen } from "../screens/signup-screen"
import { DashboardScreen } from "../screens/dashboard-screen"
import { createSwitchNavigator } from "react-navigation"

export const PrimaryNavigator = createSwitchNavigator(
  {
    ResolveAuth: { screen: ResolveAuthScreen },
    LoginFlow: createStackNavigator({
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen }
    }, {
      headerMode: "none",
    }),
    Dashboard: { screen: DashboardScreen }
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
export const exitRoutes: string[] = ["Login", "Signup", "Dashboard"]
