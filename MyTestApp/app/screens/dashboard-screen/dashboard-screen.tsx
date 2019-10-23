import * as React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { color } from "../../theme"
import { Button } from "../../components/button"
import { navigate } from "../../navigation"


export const DashboardScreen = observer((props) => {
  // const { someStore } = useStores()

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" tx="dashboardScreen.header" />
        <Button
          preset="raised"
          tx="resetPasswordScreen.login"
          textStyle={{ color: color.palette.pink1 }}
          onPress={() => navigate("Login")}
        />
      </Screen>
    </View>
  )
})
