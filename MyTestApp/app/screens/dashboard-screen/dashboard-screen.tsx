import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { Wallpaper } from "../../components/wallpaper"
import { color, spacing } from "../../theme"
import { Button } from "../../components/button"
import { Loading } from "../../components/loading"
import { navigate } from "../../navigation"
import { InstagramLogin } from "../../components/instagram-login"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon, Image } from "react-native-elements"
import { IgPostCard } from "../../components/ig-post-card"

import Carousel from 'react-native-snap-carousel';
import { CampaignSlider } from "../../components/campaign-slider"
import styleSheet from "../../theme/styleSheet"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { ENTRIES1, LONG_TEXT } from "./entries-dummy"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}


export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer((props) => {
  const { authStore: { showLoading, logout, resetWalkthrough } } = useStores();
  const [sliderIndex, setSliderIndex] = React.useState(0)

  const _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <CampaignSlider
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      {/* <Screen style={{ ...styleSheet.view_container }} preset="scroll" backgroundColor={color.transparent}>

        <Button
          preset="outline"
          text="Reset Walkthorugh"
          onPress={resetWalkthrough}
        />

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
            location: '',
            avatar: ''
          }} />
      </Screen>
      */}

      <View style={{ flex: 1, justifyContent: "center", }}>
        <Image
          containerStyle={{ alignSelf: "center", margin: spacing.extraLarge }}
          source={require("../../components/header/logo.png")}
          style={{ width: 200, height: 50, }}
          resizeMode="contain" />
        <Text preset="header" text="Campaign" style={{ textAlign: "center" }} />
        <Text preset="default" text={LONG_TEXT} style={{ margin: spacing.medium }} />
      </View>
      <View>
        <Carousel
          // ref={c => this._slider1Ref = c}
          data={ENTRIES1}
          firstItem={sliderIndex}
          renderItem={_renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          onSnapToItem={(index) => setSliderIndex(index)}
        />
      </View>
    </View>
  )
})

DashboardScreen.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: <Icon name='home' />
}

const styles = StyleSheet.create({
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
});