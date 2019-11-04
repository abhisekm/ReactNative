import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View } from "react-native"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import { Wallpaper } from "../../components/wallpaper"
import styleSheet from "../../theme/styleSheet"

export interface AccountScreenProps extends NavigationTabScreenProps<{}> {
}


export const AccountScreen: NavigationBottomTabScreenComponent<AccountScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
      </Screen>
    </View>
  )
})


AccountScreen.navigationOptions = {
  title: 'Profile',
  tabBarIcon: <Icon name='settings' />
}
