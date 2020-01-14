import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image } from "react-native"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import { Wallpaper } from "../../components/wallpaper"
import Carousel from "react-native-snap-carousel"
import styleSheet from "../../theme/styleSheet"
import { CampaignSlider } from "../../components/campaign-slider"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { ENTRIES1 } from "../dashboard-screen/entries-dummy"
import { Text } from "../../components/text"
import FastImage from "react-native-fast-image"
import { spacing } from "../../theme"

export interface LiveCampaignListingScreenProps extends NavigationTabScreenProps<{}> {
}

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


export const LiveCampaignListingScreen: NavigationBottomTabScreenComponent<LiveCampaignListingScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const [sliderIndex, setSliderIndex] = React.useState(0)

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen preset="fixed" unsafe statusBar="light-content" style={{ flex: 1 }} >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
          <Image
            source={require('../../components/header/logo.png')}
            style={{ height: 100, width: 200 }}
            resizeMode='contain'
          />
        </View>

        <Text
          preset="header"
          style={{ margin: spacing.medium, fontSize: 20 }}
          text="Spread your story with media and storytellers that are just right for you. "
        />

        <Text
          style={{ margin: spacing.medium }}
          text="Immersify is a private marketplace for media business that enables media owners and partners to easily and effortlessly find the right match. We help you spread your story using the medium and storytellers who are just right for you."
        />

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
      </Screen>
    </View>
  )
})


LiveCampaignListingScreen.navigationOptions = {
  title: 'Campaign',
  tabBarIcon: ({ tintColor }) => <Icon name="hash" type="feather" color={tintColor} />,
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
