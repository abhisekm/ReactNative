import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Button as ReactButton } from "react-native-elements"
import { View, Image } from "react-native"
import { color, spacing } from "../../theme"
import { Button } from "../../components/button"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { navigate } from "../../navigation/navigationRef"


interface Props extends NavigationStackScreenProps {
}

export const LoginScreen: NavigationStackScreenComponent<Props> = observer((props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1 }} >
          <Text preset="header" tx="loginScreen.header" />

          <View style={{ height: 50 }} />

          <TextField
            placeholder="Email" label="Email"
            value={email} onChangeText={setEmail}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="Password" label="Password"
            value={password} onChangeText={setPassword}
            inputStyle={styleSheet.text_input_container} />

          <View style={{ flexDirection: "row", marginTop: spacing.large }}>
            <ReactButton
              raised
              buttonStyle={{ backgroundColor: color.palette.pink1 }}
              titleStyle={{ paddingHorizontal: spacing.medium }}
              title="Submit"
              onPress={() => { }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="loginScreen.signup" />

            <Button
              preset="link"
              tx="loginScreen.newAccount"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => navigate("Signup")}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Button
              preset="link"
              tx="loginScreen.forgotPassword"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => navigate("ResetPassword")}
            />
          </View>
        </FormRow>
      </Screen>
    </View>
  )
})

LoginScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
        <Image
          source={require('../../components/header/light.png')}
          style={{ height: 25, width: 110 }}
          resizeMode='contain'
        />
      </View>
    )
  }
}