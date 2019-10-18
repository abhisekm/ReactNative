import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { View } from "react-native"
import { color } from "../../theme"
import { Button } from "../../components/button"

export const LoginScreen = observer((props) => {
  // const { someStore } = useStores()
  return (
    <View style={styleSheet.view_full} >
      <Wallpaper />
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" tx="loginScreen.header" />
        <Button
          preset="primary"
          tx="loginScreen.signup"
          style={styleSheet.view_continue}
          textStyle={styleSheet.text_continue}
          onPress={() => props.navigation.navigate("Signup")}
        />
      </Screen>
    </View>
  )
})
