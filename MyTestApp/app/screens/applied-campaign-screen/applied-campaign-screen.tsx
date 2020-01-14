import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import { NavigationParams, SafeAreaView, NavigationEvents } from "react-navigation"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { Loading } from "../../components/loading"
import Toast from "react-native-easy-toast"
import FastImage from "react-native-fast-image"
import { Avatar, Icon } from "react-native-elements"

import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { ParallaxHeader } from "../../components/parallax-header"
import { AppliedCampaignContent } from "../../components/applied-campaign-content"

export interface AppliedCampaignScreenProps extends NavigationStackScreenProps<{}> {
}

export interface AppliedCampaignNavigationParams extends NavigationParams {
  campaignId: string,
  brandImage: string,
  campaignImage: string,
  title: string
}

const isIos = Platform.OS === "ios";

const window = Dimensions.get('window');

export const AppliedCampaignScreen: NavigationStackScreenComponent<AppliedCampaignNavigationParams, AppliedCampaignScreenProps> = observer((props) => {
  const { campaignStore: { getCampaignDetail, isLoading, fetchCampaignDetails, clearCampaignDetails } } = useStores();
  const toastRef = React.useRef(null);

  const { navigation } = props;
  const campaignId = navigation.getParam("campaignId", "");
  const brandImage = navigation.getParam("brandImage", "");
  const campaignImage = navigation.getParam("campaignImage", "");
  const title = navigation.getParam("title", "");

  const backArrowIcon = (onPress: () => {}) => isIos ? <Icon color='white' name='md-arrow-back' type='ionicons' onPress={onPress} /> : <Icon color='white' name='arrow-back' type='material' onPress={onPress} />;

  React.useEffect(() => {
    if (campaignId)
      fetchCampaignDetails(campaignId)
    else {
      toastRef.current.show("Campaign id is missing")
    }
  }, [campaignId]);


  return (
    <View style={styleSheet.view_full}>
      <NavigationEvents
        onWillBlur={payload => clearCampaignDetails()}
      />
      <Wallpaper />
      <Screen
        preset="fixed"
        unsafe
        statusBar="light-content"
        style={{ flex: 1, backgroundColor: getCampaignDetail() != null ? 'rgba(51,51,51,1)' : color.transparent }} >
        {
          !isLoading && getCampaignDetail() != null
          &&
          <ParallaxScroll
            renderHeader={({ animatedValue }) =>
              <ParallaxHeader
                headerHeight={60 - 0}
                parallaxHeight={250}
                text={title || getCampaignDetail().title}
                avatarSource={brandImage || getCampaignDetail().brandImage}
                animatedValue={animatedValue}
                onBackPress={() => navigation.goBack()}
              />
            }
            headerHeight={60}
            isHeaderFixed={true}
            parallaxHeight={250}
            useNativeDriver={true}
            isBackgroundScalable={true}
            headerBackgroundColor={'rgba(51, 51, 51, 0)'}
            headerFixedTransformY={0}
            renderParallaxBackground={() =>
              <FastImage source={{ uri: campaignImage || getCampaignDetail().campaignImage }} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.7 }} />
            }
            onChangeHeaderVisibility={console.log('onChangeHeaderVisibility')}
            renderParallaxForeground={() => { }}
            fadeOutParallaxBackground={true}
            fadeOutParallaxForeground={false}
            headerFixedBackgroundColor={'rgba(51, 51, 51, 1)'}
            parallaxBackgroundScrollSpeed={5}
            parallaxForegroundScrollSpeed={2.5}
          >
            <View style={{ marginHorizontal: spacing.small, marginTop: -spacing.large, marginBottom: spacing.medium }}>
              <AppliedCampaignContent data={getCampaignDetail()} />
            </View>
          </ParallaxScroll>
        }
        {isLoading && <Loading />}
        <Toast ref={toastRef} />
      </Screen>
    </View >
  )
})

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  contentWrapperStyle: {
    position: 'relative',
    width: window.width,
    height: 50,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: color.transparent
  },
  innerContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: color.transparent
  },
  contentContainer: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: color.transparent
  },
  navContainer: {
    height: 64,
    marginHorizontal: 10,
  },
  statusBar: {
    height: 0,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

AppliedCampaignScreen.navigationOptions = {
  header: null,
}
