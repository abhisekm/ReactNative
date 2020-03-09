import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity, KeyboardAvoidingView } from "react-native"
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
import { scale, verticalScale } from "../../utils/scale"
import LinearGradient from "react-native-linear-gradient"
import { Campaign, CampaignModel } from "../../models/campaign"
import { getEnv } from "mobx-state-tree"
import { SvgUri } from "react-native-svg"
import { observable } from "mobx"

export interface AppliedCampaignScreenProps extends NavigationStackScreenProps<{}> {
}

export interface AppliedCampaignNavigationParams extends NavigationParams {
  campaignId: string,
}

const isIos = Platform.OS === "ios";

const window = Dimensions.get('window');

export const AppliedCampaignScreen: NavigationStackScreenComponent<AppliedCampaignNavigationParams, AppliedCampaignScreenProps> = observer((props) => {
  const {
    authStore: { isSignedIn },
    navigationStore: { navigateTo },
    campaignDetail
  } = useStores();
  const toastRef = React.useRef(null);

  const { navigation } = props;
  const id = navigation.getParam("campaignId", null);

  const data = campaignDetail;
  data.setCampaignId(id);

  const { isLoading, updateCampaignDetails, campaignName } = data;

  React.useEffect(() => {
    if (id == null) {
      alert("Campaign not found")
      return;
    }
    updateCampaignDetails()
  }, [id]);

  if (data == null) {
    return (
      <View style={styleSheet.view_full}>
        <Screen
          preset="fixed"
          statusBar="light-content"
          style={{ backgroundColor: 'rgba(51,51,51,1)' }} />
      </View>
    )
  }

  if (campaignName == null) {
    return (
      <View style={styleSheet.view_full}>
        <Wallpaper />
        <Screen
          preset="fixed"
          statusBar="light-content"
          style={{ backgroundColor: 'rgba(51,51,51,1)' }} />
        <Loading />
      </View>
    )
  }

  console.log(navigation.state)

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen
        preset="fixed"
        statusBar="light-content"
        style={{ backgroundColor: 'rgba(51,51,51,1)' }} >
        {
          !isLoading
          &&
          <ParallaxScroll
            renderHeader={({ animatedValue }) =>
              <ParallaxHeader
                headerHeight={(60)}
                parallaxHeight={(250)}
                text={data.campaignName}
                location={data.location.join(", ")}
                description={data.campaignDescription}
                animatedValue={animatedValue}
                onBackPress={() => navigateTo(isSignedIn() ? "dashboardFlow" : "SampleCampaign")}
                onRefresh={isSignedIn() ? () => updateCampaignDetails() : null}
              />
            }
            headerHeight={(60)}
            isHeaderFixed={true}
            parallaxHeight={(100)}
            useNativeDriver={true}
            isBackgroundScalable={true}
            headerBackgroundColor={'rgba(51, 51, 51, 0)'}
            headerFixedTransformY={0}
            renderParallaxBackground={() =>
              <View>
                {data.campaignImage.includes('.svg') ?

                  <View style={styles.backgroundSVGImageContainer}>
                    <SvgUri
                      width="100%"
                      height="70%"
                      uri={data.campaignImage}
                    />
                  </View>
                  :
                  <FastImage
                    source={{ uri: data.campaignImage }}
                    style={styles.backgroundImageContainer} />
                }
                <LinearGradient colors={[color.transparent, color.palette.grey10, color.palette.grey10]} style={styles.backgroundImageContainer} />
              </View>
            }
            renderParallaxForeground={() => { }}
            fadeOutParallaxBackground={true}
            fadeOutParallaxForeground={false}
            headerFixedBackgroundColor={'rgba(51, 51, 51, 1)'}
            parallaxBackgroundScrollSpeed={100}
            parallaxForegroundScrollSpeed={2.5}
            keyboardShouldPersistTaps="always"
            style={{ flexGrow: 1, flexShrink: 1 }}
          >

            <View style={{ paddingHorizontal: spacing.small, marginTop: verticalScale(150), marginBottom: spacing.medium, }} >
              <AppliedCampaignContent data={data} />
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
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
    width: window.width,
    height: window.width
  },
  backgroundSVGImageContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
    padding: spacing.medium,
    backgroundColor: 'white',
    width: window.width,
    height: window.width
  },
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
