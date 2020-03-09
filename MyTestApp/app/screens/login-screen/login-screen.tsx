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
import { Icon, Input } from "react-native-elements"
import { verticalScale } from "../../utils/scale"


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
      <Screen style={styleSheet.view_container} preset="scroll" unsafe statusBar="light-content"  >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1, padding: 0 }} >

          <View style={{ height: verticalScale(50) }} />

          <TextField
            preset="clear"
            placeholder="Email" label="Email"
            value={email} onChangeText={setEmail}
            autoCapitalize="none" />

          <View style={{ height: verticalScale(20) }} />

          <TextField
            preset="clear"
            placeholder="Password" label="Password"
            value={password} onChangeText={setPassword}
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

          <View style={{ flexDirection: "row-reverse", marginVertical: spacing.small }}>
            <Button
              preset="raised"
              title="Submit"
              onPress={() => { signInEmail(email, password) }}
              disabled={email.length < 1 || password.length < 1}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium, paddingHorizontal: spacing.small }}>
            <Text tx="loginScreen.signup" />

            <Button
              preset="link"
              tx="loginScreen.newAccount"
              textStyle={{ color: color.palette.pink1 }}
              onPress={goToEmailSignup}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium, paddingHorizontal: spacing.small }}>
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
  headerTitle: "Sign In",
  headerTitleContainerStyle: {
    flex: 1,
  }
}