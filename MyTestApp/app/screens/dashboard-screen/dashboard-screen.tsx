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
import SafeAreaView from "react-native-safe-area-view"

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
      <SafeAreaView style={{ flex: 1 }} >
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
      </SafeAreaView>
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