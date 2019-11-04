import * as React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { color } from "../../theme"
import { Button } from "../../components/button"
import { Loading } from "../../components/loading"
import { navigate } from "../../navigation"
import { InstagramLogin } from "../../components/instagram-login"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}

export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer((props) => {
  const { authStore: { showLoading, logout }, igStore: { setCode, getToken, userName, clear } } = useStores();

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
        {userName ?
          <View>
            <Text preset="header" text={`Welcome ${userName}`} />
            <Button
              preset="outline"
              text="Reset Insta Login"
              onPress={clear}
            />
          </View>
          :
          <View>
            <Text preset="header" tx="dashboardScreen.header" />

            <InstagramLogin
              appId='761781137582854'
              redirectUrl='https://immersify-test.com/auth/'
              onLoginSuccess={(code) => {
                console.log("code", code)
                setCode(code)
                getToken()
              }}
              onLoginFailure={(data) => console.log(data)}
            />
          </View>
        }
        <Button
          preset="outline"
          text="Questionnaire"
          onPress={() => navigate("Questionnaire")}
        />

        <Button
          preset="raised"
          text="Logout"
          onPress={logout}
        />
      </Screen>

      {showLoading() && <Loading />}
    </View>
  )
})

DashboardScreen.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: <Icon name='home' />
}