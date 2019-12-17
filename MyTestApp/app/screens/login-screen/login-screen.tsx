import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { View, Image, Platform, TouchableOpacity } from "react-native"
import { color, spacing } from "../../theme"
import { Button } from "../../components/button"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { Icon } from "react-native-elements"


interface Props extends NavigationStackScreenProps {
}

const showPasswordIcon = Platform.select({
  ios: <Icon name="ios-eye" type="ionicon" />,
  android: <Icon name="eye" type="material-community" />
})

const hidePasswordIcon = Platform.select({
  ios: <Icon name="ios-eye-off" type="ionicon" />,
  android: <Icon name="eye-off" type="material-community" />
})

export const LoginScreen: NavigationStackScreenComponent<Props> = observer(() => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);

  const { authStore: { signInEmail, goToForgotPassword, goToEmailSignup, errorMessage } } = useStores();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1 }} >
          <Text preset="header" tx="loginScreen.header" />

          <View style={{ height: 50 }} />

          <TextField
            placeholder="Email" label="Email"
            value={email} onChangeText={setEmail}
            inputStyle={styleSheet.text_input_container}
            autoCapitalize="none" />

          <TextField
            placeholder="Password" label="Password"
            value={password} onChangeText={setPassword}
            inputStyle={styleSheet.text_input_container}
            autoCapitalize="none" autoCorrect={false} autoCompleteType="off"
            secureTextEntry={!passwordVisibility}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {passwordVisibility ? hidePasswordIcon : showPasswordIcon}
              </TouchableOpacity>
            }
          />

          {
            errorMessage ? <Text preset="error" text={errorMessage} /> : null
          }

          <View style={{ flexDirection: "row", marginTop: spacing.large }}>
            <Button
              preset="raised"
              title="Submit"
              onPress={() => { signInEmail(email, password) }}
              disabled={email.length < 1 || password.length < 1}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="loginScreen.signup" />

            <Button
              preset="link"
              tx="loginScreen.newAccount"
              textStyle={{ color: color.palette.pink1 }}
              onPress={goToEmailSignup}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Button
              preset="link"
              tx="loginScreen.forgotPassword"
              textStyle={{ color: color.palette.pink1 }}
              onPress={goToForgotPassword}
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
  },
  headerTitleContainerStyle: {
    flex: 1
  }
}