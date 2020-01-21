import * as React from "react"
import { observer } from "mobx-react"
import { View, Image, Dimensions } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { color, spacing } from "../../theme"
import { FormRow } from "../../components/form-row"
import { Button } from "../../components/button"
import { TextField } from "../../components/text-field"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter"
import { Icon } from "react-native-elements"
import { scale } from "../../utils/scale"
import { Header } from "../../components/header"

interface Props extends NavigationStackScreenProps {
}

const { width } = Dimensions.get('window');
const METER_WIDTH = width - 2 * spacing.large;
const MIN_LENGTH = 6;

const Spacer = () => <View style={{ height: scale(20) }} />

const LEVELS = [
  {
    label: 'Very Weak',
    labelColor: '#ff0000',
    activeBarColor: '#ff0000',
  },
  {
    label: 'Weak',
    labelColor: '#ff5400',
    activeBarColor: '#ff5400',
  },
  {
    label: 'Good',
    labelColor: '#ff7317',
    activeBarColor: '#ff7317',
  },
  {
    label: 'Better',
    labelColor: '#ffb300',
    activeBarColor: '#ffb300',
  },
  {
    label: 'Excellent',
    labelColor: '#52c12b',
    activeBarColor: '#52c12b',
  },
  {
    label: 'Outstanding',
    labelColor: '#33cc33',
    activeBarColor: '#33cc33',
  },
]

export const SignupScreen: NavigationStackScreenComponent<Props> = observer((props) => {
  const { authStore: { signUpEmail, goToEmailLogin, errorMessage } } = useStores()
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const disableSubmitButton = () => {
    return password.length < MIN_LENGTH ||
      confirmPassword.length < MIN_LENGTH ||
      password !== confirmPassword
  }

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" unsafe statusBar="light-content"  >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1, padding: 0 }} >
          <Text preset="header" tx="signupScreen.header" style={{ padding: spacing.small }} />

          <Spacer />

          <TextField
            placeholder="John Doe" label="Name"
            value={name} onChangeText={setName}
            inputStyle={styleSheet.text_input_container}
            autoCapitalize="words"
          />

          <Spacer />

          <TextField
            placeholder="johndoe@gmail.com" label="Email"
            value={email} onChangeText={setEmail}
            inputStyle={styleSheet.text_input_container}
            autoCapitalize="none"
          />

          <Spacer />

          <TextField
            placeholder="Password" label="Password"
            value={password} onChangeText={setPassword}
            inputStyle={styleSheet.text_input_container}
            secureTextEntry
            autoCapitalize="none" autoCorrect={false} autoCompleteType="password"
          />

          <BarPasswordStrengthDisplay
            minLength={8}
            password={password}
            width={METER_WIDTH}
            barColor={color.palette.grey2}
            levels={LEVELS}
          />

          <Spacer />

          <TextField
            placeholder="Confirm Password" label="Confirm Password"
            value={confirmPassword} onChangeText={setConfirmPassword}
            inputStyle={styleSheet.text_input_container}
            secureTextEntry
            rightIcon={password.length > MIN_LENGTH && confirmPassword === password && <Icon name="check" type="material" color={color.palette.green} />}
            autoCapitalize="none" autoCorrect={false} autoCompleteType="password"
          />

          <BarPasswordStrengthDisplay
            minLength={8}
            password={confirmPassword}
            width={METER_WIDTH}
            barColor={color.palette.grey2}
            levels={LEVELS}
          />

          {
            errorMessage ? <Text style={{ marginTop: spacing.medium }} preset="error" text={errorMessage} /> : null
          }

          <View style={{ flexDirection: "row-reverse", marginVertical: spacing.tiny }}>
            <Button
              preset="raised"
              disabled={disableSubmitButton()}
              tx="common.submit"
              onPress={() => signUpEmail(name, email, password, confirmPassword)}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium, paddingHorizontal: spacing.small }}>
            <Text tx="signupScreen.signin" />

            <Button
              preset="link"
              tx="signupScreen.login"
              textStyle={{ color: color.palette.pink1 }}
              onPress={goToEmailLogin}
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
          style={{ height: 25, width: 100 }}
          resizeMode='contain'
        />
      </View>
    )
  },
  headerTitleContainerStyle: {
    flex: 1,
  },
  headerRight: () => {
    return <View />
  }
}