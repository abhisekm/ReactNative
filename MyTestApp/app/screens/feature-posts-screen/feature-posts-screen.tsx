import * as React from "react"
import { observer } from "mobx-react"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { View } from "react-native"
import { Wallpaper } from "../../components/wallpaper"
import { Loading } from "../../components/loading"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"

export interface FeaturePostsScreenProps extends NavigationTabScreenProps<{}> {
}

export const FeaturePostsScreen: NavigationBottomTabScreenComponent<FeaturePostsScreenProps> = observer((props) => {
  const { igStore: { isLoading } } = useStores()

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>

        {isLoading && <Loading />}
      </Screen>
    </View>
  )
})

FeaturePostsScreen.navigationOptions = {
  title: 'Posts',
  tabBarIcon: <Icon name='heart' type='foundation' color='red' />
}
