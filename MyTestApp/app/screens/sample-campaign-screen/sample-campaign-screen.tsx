import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { verticalScale, scale } from "../../utils/scale"
import { normalisedFontSize } from "../../theme/fontSize"
import Carousel from "react-native-snap-carousel"
import { sliderWidth, itemWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { Loading } from "../../components/loading"
import { Campaign } from "../../models/campaign"
import { CampaignSlider } from "../../components/campaign-slider"
import { Spacer } from "../../components/Spacer"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"

export interface SampleCampaignScreenProps extends NavigationStackScreenProps<{}> {
}


const _renderItemWithParallax = ({ item, index }: { item: Campaign, index: number }, parallaxProps) => {
  return (
    <CampaignSlider
      data={item}
      even={(index + 1) % 2 === 0}
      parallax={true}
      parallaxProps={parallaxProps}
    />
  )
}

export const SampleCampaignScreen: NavigationStackScreenComponent<SampleCampaignScreenProps> = observer((props) => {
  const {
    campaignStore: { sampleCampaigns, fetchSampleCampaigns, loading }
  } = useStores()

  const [sliderIndex, setSliderIndex] = React.useState(0)
  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    fetchSampleCampaigns()
  }, [])

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen preset="fixed" unsafe statusBar="light-content" style={{ flex: 1 }} >
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
          <Image
            source={require('../../res/images/logo.png')}
            style={{ height: verticalScale(80), width: scale(200) }}
            resizeMode='contain'
          />
        </View>

        <Text
          preset="header"
          style={{ paddingTop: spacing.small, fontSize: normalisedFontSize.large, paddingHorizontal: spacing.medium }}
          text="Spread your story with media and storytellers that are just right for you. "
        />

        <Text
          style={{ paddingVertical: spacing.small, flex: 1, paddingHorizontal: spacing.medium }}
          text="Immersify is a private marketplace for media business that enables media owners and partners to easily and effortlessly find the right match. We help you spread your story using the medium and storytellers who are just right for you."
        />


        <Carousel
          ref={sliderRef}
          data={sampleCampaigns.slice()}
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

        <Spacer />

        {loading && <Loading />}

      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  slider: {
    flexGrow: 0,
    marginTop: spacing.small,
  },
  sliderContentContainer: {
  },
  paginationContainer: {
    paddingVertical: spacing.tiny,
    marginBottom: spacing.tiny,
  },
  paginationDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginHorizontal: 0
  }
});


SampleCampaignScreen.navigationOptions = {
  header: null,
}