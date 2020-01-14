import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet, Image } from "react-native"
import { useStores } from "../../models/root-store"
import { Wallpaper } from "../../components/wallpaper"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import Carousel from 'react-native-snap-carousel';
import { CampaignSlider } from "../../components/campaign-slider"
import styleSheet from "../../theme/styleSheet"
import { itemWidth, sliderWidth } from "../../components/campaign-slider/campaign-slider-styles"
import { ENTRIES1 } from "./entries-dummy"
import { Loading } from "../../components/loading"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { spacing } from "../../theme"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}


export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer(() => {
  const {
    userInfoStore: { name },
    campaignStore: { getCampaigns, isLoading, fetchCampaigns }
  } = useStores();
  const [sliderIndex, setSliderIndex] = React.useState(0)

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
          style={{ margin: spacing.medium }}
          text={`Welcome back \n${name}`}
        />

        <Text
          preset="question"
          style={{ margin: spacing.medium }}
          text="This is your Dashboard, all your ongoing campaigns will show up here. Lorem Ipsum is simply dummy text of the printing and typesett an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centur was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />

        <Carousel
          // ref={c => this._slider1Ref = c}
          data={getCampaigns()}
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
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
});