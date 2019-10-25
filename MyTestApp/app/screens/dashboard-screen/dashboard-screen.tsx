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
<<<<<<< HEAD
import { Loading } from "../../components/loading"
=======
import { navigate } from "../../navigation"
>>>>>>> 464aaf820f31457c1bd96f2de56367d192629720


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
<<<<<<< HEAD
          text="Logout"
          textStyle={{ color: color.palette.pink1 }}
          onPress={logout}
=======
          tx="resetPasswordScreen.login"
          textStyle={{ color: color.palette.pink1 }}
          onPress={() => navigate("Login")}
>>>>>>> 464aaf820f31457c1bd96f2de56367d192629720
        />
      </Screen>

      {showLoading() && <Loading />}
    </View>
  )
})
