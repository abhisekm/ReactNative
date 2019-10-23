import * as React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { navigate } from "../../navigation"

export interface VerifyPhoneScreenProps extends NavigationStackScreenProps<{}> {
}

export const VerifyPhoneScreen: NavigationStackScreenComponent<VerifyPhoneScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const [otp, setOtp] = React.useState('');

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1 }} >
          <Text preset="header" tx="verifyPhone.header" />

          <View style={{ height: 50 }} />

          <Text tx="verifyPhone.context" />

          <TextField
            placeholderTx="verifyPhone.otpHint" labelTx="verifyPhone.otp"
            value={otp} onChangeText={setOtp}
            inputStyle={styleSheet.text_input_container} />

          <View style={{ flexDirection: "row", marginTop: spacing.large }}>
            <Button
              preset="raised"
              tx="verifyPhone.verify"
              onPress={() => navigate("Dashboard")}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="verifyPhone.resendOtp" />

            <Button
              preset="link"
              tx="verifyPhone.resend"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => { }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="verifyPhone.changePhoneNumber" />

            <Button
              preset="link"
              tx="verifyPhone.goBack"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </FormRow>
      </Screen>
    </View>
  )
})
