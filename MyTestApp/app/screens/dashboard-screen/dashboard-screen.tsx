import * as React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { color, spacing } from "../../theme"
import { TextField } from "../../components/text-field"
import { FormRow } from "../../components/form-row"
import { Button } from "../../components/button"
import { Button as ReactButton } from "react-native-elements"



const FORM_OVERRIDE = { borderColor: color.palette.white, backgroundColor: color.palette.white, flex: 1 };
const MyForm = _props => <FormRow style={FORM_OVERRIDE} {..._props} />

export const DashboardScreen = observer((props) => {
  // const { someStore } = useStores()

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" tx="dashboardScreen.header" />
      </Screen>
    </View>
  )
})
