import * as React from "react"
import { observer } from "mobx-react"
import { View, Image } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store
import styleSheet from "../../theme/styleSheet"
import { color, spacing } from "../../theme"
import { Button as ReactButton } from "react-native-elements"
import { FormRow } from "../../components/form-row"
import { Button } from "../../components/button"
import { TextField } from "../../components/text-field"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"

interface Props extends NavigationStackScreenProps {
}

export const SignupScreen: NavigationStackScreenComponent<Props> = observer((props) => {
  // const { someStore } = useStores()
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1 }} >
          <Text preset="header" tx="signupScreen.header" />

          <View style={{ height: 20 }} />

          <TextField
            placeholder="First Name" label="First Name"
            value={firstName} onChangeText={setFirstName}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="Last Name" label="Last Name"
            value={lastName} onChangeText={setLastName}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="Email" label="Email"
            value={email} onChangeText={setEmail}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="Password" label="Password"
            value={password} onChangeText={setPassword}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="Re-enter Password" label="Re-enter Password"
            value={confirmPassword} onChangeText={setConfirmPassword}
            inputStyle={styleSheet.text_input_container} />

          <TextField
            placeholder="10-digit mobie number" label="Phone"
            value={phone} onChangeText={setPhone}
            inputStyle={styleSheet.text_input_container} />

          <View style={{ flexDirection: "row", marginTop: spacing.large }}>
            <Button
              preset="raised"
              tx="common.submit"
              onPress={() => { }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="signupScreen.signin" />

            <Button
              preset="link"
              tx="signupScreen.login"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => props.navigation.navigate("Login")}
            />
          </View>
        </FormRow>
      </Screen>
    </View>
  )
})

SignupScreen.navigationOptions = {
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