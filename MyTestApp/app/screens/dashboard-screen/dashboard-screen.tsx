import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet, Image } from "react-native"
import { useStores } from "../../models/root-store"
import { Wallpaper } from "../../components/wallpaper"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { CampaignSlider } from "../../components/campaign-slider"
import styleSheet from "../../theme/styleSheet"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { Loading } from "../../components/loading"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { spacing, color } from "../../theme"
import { scale } from "../../utils/scale"
import { normalisedFontSize } from "../../theme/fontSize"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}


export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer(() => {
  const {
    userInfoStore: { name },
    campaignStore: { getCampaigns, isLoading, fetchCampaigns }
  } = useStores();
  const [sliderIndex, setSliderIndex] = React.useState(0)

  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    fetchCampaigns()
  }, []);


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
      <Screen preset="scroll" unsafe statusBar="light-content" style={{ flex: 1 }} >

        <Text
          preset="header"
          style={{ marginTop: spacing.medium, marginHorizontal: spacing.medium }}
          text={`Welcome back`}
        />
        <Text
          preset="header"
          style={{ marginHorizontal: spacing.medium }}
          text={`${name}`}
        />

        <Text
          preset="question"
          style={{
            flex: 1,
            marginVertical: spacing.small,
            marginHorizontal: spacing.medium,
            fontSize: normalisedFontSize.small
          }}
          text="This is your Dashboard, all your ongoing campaigns will show up here. Lorem Ipsum is simply dummy text of the printing and typesett an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centur was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />

        <Carousel
          ref={sliderRef}
          data={getCampaigns()}
          firstItem={sliderIndex}
          renderItem={_renderItemWithParallax2}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.8}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          onSnapToItem={(index) => setSliderIndex(index)}
        />

        <Pagination
          dotsLength={getCampaigns().length}
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

        {isLoading && <Loading />}
      </Screen>
    </View>
  )
})

DashboardScreen.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: ({ tintColor }) => <Icon name='home' color={tintColor} />
}

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