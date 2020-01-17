import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image } from "react-native"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import { Wallpaper } from "../../components/wallpaper"
import Carousel, { Pagination } from "react-native-snap-carousel"
import styleSheet from "../../theme/styleSheet"
import { CampaignSlider } from "../../components/campaign-slider"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { ENTRIES1 } from "../dashboard-screen/entries-dummy"
import { Text } from "../../components/text"
import FastImage from "react-native-fast-image"
import { spacing, color } from "../../theme"

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
  const sliderRef = React.useRef(null);

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
          style={{ margin: spacing.medium, flex: 1 }}
          text="Immersify is a private marketplace for media business that enables media owners and partners to easily and effortlessly find the right match. We help you spread your story using the medium and storytellers who are just right for you."
        />


        <Carousel
          ref={sliderRef}
          data={ENTRIES1}
          firstItem={sliderIndex}
          renderItem={_renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.8}
          // inactiveSlideShift={10}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          onSnapToItem={(index) => setSliderIndex(index)}
        />

        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={sliderIndex}
          containerStyle={styles.paginationContainer}
          dotColor={color.primary}
          dotStyle={styles.paginationDot}
          inactiveDotColor={color.primary}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={sliderRef.current}
          tappableDots={!!sliderRef.current}
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
    flexGrow: 0,
    marginTop: 15,
  },
  sliderContentContainer: {
  },
  paginationContainer: {
    paddingVertical: spacing.medium,
    marginBottom: spacing.tiny
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  }
});
