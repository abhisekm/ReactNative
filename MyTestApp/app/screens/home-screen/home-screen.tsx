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
<<<<<<< HEAD
import { SocialIcon, Icon } from "react-native-elements"
import { useStores } from "../../models/root-store"
import { Loading } from "../../components/loading"
=======
import { SocialIcon } from "react-native-elements"
import { LoginButton } from "react-native-fbsdk"
import { useStores } from "../../models/root-store"
>>>>>>> 464aaf820f31457c1bd96f2de56367d192629720

interface Props extends NavigationStackScreenProps {
}

const alert = (msg) => Alert.alert("Alert", msg);

export const HomeScreen: NavigationStackScreenComponent<Props> = observer((props) => {
  const { authStore: { errorMessage, signInFacebook, signInGoogle, showLoading } } = useStores();

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
              onPress={signInGoogle}
            />

            <Button
              preset="social"
              tx="homeScreen.emailSignIn"
              onPress={() => navigate("Login")}
              containerStyle={{ backgroundColor: color.palette.orangeDarker }}
              icon={<Icon type="feather" name="mail" color={color.palette.white} />}
            />

            {errorMessage ? <Text text={errorMessage} /> : null}
          </View>
        </SafeAreaView>
      </Screen>
      {showLoading() && <Loading />}
    </View>
  )
})

HomeScreen.navigationOptions = {
  header: null,
}