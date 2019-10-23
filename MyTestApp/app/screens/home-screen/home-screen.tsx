import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { View, SafeAreaView, Alert } from "react-native"
import { Button } from "../../components/button"
import { navigate } from "../../navigation"
import { SocialIcon } from "react-native-elements"
import { LoginButton } from "react-native-fbsdk"
import { useStores } from "../../models/root-store"

interface Props extends NavigationStackScreenProps {
}

const alert = (msg) => Alert.alert("Alert", msg);

export const HomeScreen: NavigationStackScreenComponent<Props> = observer((props) => {
  const { authStore: { errorMessage, signInFacebook } } = useStores();

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
        <Text preset="header" tx="homeScreen.header" />

        <View style={{ height: 50 }} />

        <SafeAreaView>
          <View style={{ padding: spacing.medium }}>

            <SocialIcon
              title="Continue With Facebook"
              button
              type="facebook"
              onPress={signInFacebook}
            />

            <SocialIcon
              title="Continue With Google"
              light
              button
              type="google"
              onPress={() => { alert("google login") }}
            />

            <Button
              preset="link"
              tx="homeScreen.emailSignIn"
              textStyle={{ color: color.palette.pink1 }}
              onPress={() => navigate("Login")}
            />

            {errorMessage ? <Text text={errorMessage} /> : null}
          </View>
        </SafeAreaView>
      </Screen>
    </View>
  )
})

HomeScreen.navigationOptions = {
  header: null,
}