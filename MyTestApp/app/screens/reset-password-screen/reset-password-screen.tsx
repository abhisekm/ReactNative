import * as React from "react"
import { observer } from "mobx-react"
import { View, Image } from "react-native"
import { Button as ReactButton } from "react-native-elements"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, spacing } from "../../theme"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { goBack } from "../../navigation/navigationRef"

export interface ResetPasswordScreenProps extends NavigationStackScreenProps<{}> {
}

export const ResetPasswordScreen: NavigationStackScreenComponent<ResetPasswordScreenProps> = observer((props) => {
  const [email, setEmail] = React.useState('');

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, flex: 1 }} >
          <Text preset="header" tx="resetPasswordScreen.header" />

          <View style={{ height: 50 }} />

          <Text tx="resetPasswordScreen.context" />

          <TextField
            placeholder="Email" label="Email"
            value={email} onChangeText={setEmail}
            inputStyle={styleSheet.text_input_container} />

          <View style={{ flexDirection: "row", marginTop: spacing.large }}>
            <Button
              preset="raised"
              tx="resetPasswordScreen.reset"
              onPress={() => { }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: spacing.medium }}>
            <Text tx="resetPasswordScreen.goBack" />

            <Button
              preset="link"
              tx="resetPasswordScreen.login"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => goBack()}
            />
          </View>
        </FormRow>
      </Screen>
    </View>
  )
})

ResetPasswordScreen.navigationOptions = {
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