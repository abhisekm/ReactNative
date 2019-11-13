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
import { IgPostCard } from "../../components/ig-post-card"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}

export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer((props) => {
  const { authStore: { showLoading, logout }, igStore: { setCode, userName, clear, isLoading } } = useStores();

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>
        {
          userName ?
            <View>
              <Text preset="header" text={`Welcome ${userName}`} />

              <Button
                preset="outline"
                text="Reset Insta Login"
                onPress={clear}
              />

              <InstagramLogin
                appId='761781137582854'
                redirectUrl='https://immersify-test.com/auth/'
                onLoginSuccess={(code) => {
                  setCode(code)
                }}
                onLoginFailure={(data) => console.log(data)}
                silentSignIn
              />
            </View>
            :
            <View>
              <Text preset="header" tx="dashboardScreen.header" />

              <InstagramLogin
                appId='761781137582854'
                redirectUrl='https://immersify-test.com/auth/'
                onLoginSuccess={(code) => {
                  setCode(code)
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

        <IgPostCard
          data={{
            id: '1231',
            caption: '#Lorem #ipsum @bhsdkfj asdfj @s;sfd;k    \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n asjaskldjfslfh safdhaslkdfjh',
            media_type: 'IMAGE',
            media_url: 'https://instagram.fblr2-1.fna.fbcdn.net/vp/5fabd4d3ea35daca19345d470773f20b/5E64BBAC/t51.2885-15/sh0.08/e35/s640x640/75272076_984726895209127_8070932285211073312_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=107',
            likes: 100,
            username: 'Hello There!',
            avatar: ''
          }} />
      </Screen>

      {(showLoading() || isLoading) && <Loading />}
    </View>
  )
})

DashboardScreen.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: <Icon name='home' />
}