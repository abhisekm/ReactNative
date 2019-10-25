import * as React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { color } from "../../theme"
import { Button } from "../../components/button"
import { Loading } from "../../components/loading"


export const DashboardScreen = observer((props) => {
  const { authStore: { showLoading, logout } } = useStores()

  console.log(showLoading())

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" tx="dashboardScreen.header" />
        <Button
          preset="raised"
          text="Logout"
          textStyle={{ color: color.palette.pink1 }}
          onPress={logout}
        />
      </Screen>

      {showLoading() && <Loading />}
    </View>
  )
})
