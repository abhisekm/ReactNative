import { createAppContainer } from "react-navigation"
import { PrimaryNavigator } from "./primary-navigator"
import { createStackNavigator } from "react-navigation-stack"

// export const RootNavigator = createAppContainer(PrimaryNavigator)

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: PrimaryNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)

