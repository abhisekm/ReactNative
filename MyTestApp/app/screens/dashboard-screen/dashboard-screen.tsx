import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet } from "react-native"
import { useStores } from "../../models/root-store"
import { Wallpaper } from "../../components/wallpaper"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import Carousel from 'react-native-snap-carousel';
import { CampaignSlider } from "../../components/campaign-slider"
import styleSheet from "../../theme/styleSheet"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { ENTRIES1 } from "./entries-dummy"
import SafeAreaView from "react-native-safe-area-view"
import Toast, { DURATION } from "react-native-easy-toast"
import { Button } from "../../components/button"
import { Loading } from "../../components/loading"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}


export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer(() => {
  const { campaignStore: { getCampaigns, isLoading, fetchCampaigns } } = useStores();
  const [sliderIndex, setSliderIndex] = React.useState(0)
  const [sliderIndex2, setSliderIndex2] = React.useState(0)

  React.useEffect(() => {
    fetchCampaigns()
  }, []);


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

  const _renderItemWithParallax2 = ({ item, index }, parallaxProps) => {
    return (
      <CampaignSlider
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        ongoing={true}
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
          renderItem={_renderItemWithParallax2}
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

        <Carousel
          // ref={c => this._slider1Ref = c}
          data={getCampaigns()}
          firstItem={sliderIndex2}
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
          onSnapToItem={(index) => setSliderIndex2(index)}
        />

        {isLoading && <Loading />}
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