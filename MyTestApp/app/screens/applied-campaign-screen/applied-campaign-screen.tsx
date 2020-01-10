import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import { NavigationParams, SafeAreaView } from "react-navigation"
import styleSheet from "../../theme/styleSheet"
import { Wallpaper } from "../../components/wallpaper"
import { Loading } from "../../components/loading"
import Toast from "react-native-easy-toast"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import FastImage from "react-native-fast-image"
import { Avatar, Icon } from "react-native-elements"

import ReactNativeParallaxHeader from 'react-native-parallax-header';

export interface AppliedCampaignScreenProps extends NavigationStackScreenProps<{}> {
}

export interface AppliedCampaignNavigationParams extends NavigationParams {
  campaignId: string,
}

const isIos = Platform.OS === "ios";

export const AppliedCampaignScreen: NavigationStackScreenComponent<AppliedCampaignNavigationParams, AppliedCampaignScreenProps> = observer((props) => {
  const { campaignStore: { getCampaignDetail, isLoading, fetchCampaignDetails } } = useStores();
  const toastRef = React.useRef(null);

  const { navigation } = props;
  const campaignId = navigation.getParam("campaignId", "");

  const window = Dimensions.get('window');

  const backArrowIcon = isIos ? <Icon color='white' name='md-arrow-back' type='ionicons' /> : <Icon color='white' name='arrow-back' type='material' />;

  React.useEffect(() => {
    if (campaignId)
      fetchCampaignDetails(campaignId)
    else {
      toastRef.current.show("Campaign id is missing")
    }
  }, [campaignId]);

  const renderNavBar = () => {
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="add" type="material" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="search" type="material" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  }

  const renderContent = () => {
    <View style={{ height: 800, borderWidth: 1, }}>
      <Text>Scroll me</Text>
      {/* <Text text={getCampaignDetail().description} /> */}
    </View>
  }


  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <SafeAreaView style={{ flex: 1 }} >
        {
          getCampaignDetail() != null
          &&
          // <ParallaxScrollView
          //   backgroundColor={color.primary}
          //   contentBackgroundColor={color.secondary}
          //   parallaxHeaderHeight={300}
          //   stickyHeaderHeight={70}
          //   renderBackground={() => (
          //     <FastImage key="background" source={{ uri: getCampaignDetail().campaignImage }} style={{ width: window.width, height: 300 }} />
          //   )}
          //   renderForeground={() => (
          //     <View key="parallax-header" style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          //       <Avatar source={{ uri: getCampaignDetail().brandImage }} rounded size="large" containerStyle={{ margin: 10 }} />
          //       <Text text={getCampaignDetail().title} style={{ color: 'white', fontSize: 24 }} />
          //     </View>
          //   )}
          //   renderStickyHeader={() => (
          //     <View key="sticky-header" style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 70, paddingStart: 50, borderWidth: 1 }}>
          //       <Text text={getCampaignDetail().title} style={{ color: 'white', fontSize: 20, height: 70, textAlignVertical: 'center' }} />
          //       <Avatar source={{ uri: getCampaignDetail().brandImage }} rounded size="medium" containerStyle={{ margin: 10 }} />
          //     </View>
          //   )}
          //   renderFixedHeader={() => (
          //     <View key="fixed-header" style={{ position: 'absolute', left: 10, height: 70, justifyContent: 'center' }}>
          //       {backArrowIcon}
          //     </View>
          //   )}
          // >
          //   <View style={{ height: 1800 }}>
          //     <Text>Scroll me</Text>
          //     <Text text={getCampaignDetail().description} />
          //   </View>
          // </ParallaxScrollView>
          <ReactNativeParallaxHeader
            headerMinHeight={64}
            headerMaxHeight={350}
            extraScrollHeight={20}
            alwaysShowNavBar={true}
            navbarColor={color.primary}
            title={getCampaignDetail().title}
            titleStyle={styles.titleStyle}
            backgroundImage={{ uri: getCampaignDetail().campaignImage }}
            backgroundImageScale={1.2}
            renderNavBar={renderNavBar}
            renderContent={renderContent}
            containerStyle={styles.container}
            contentContainerStyle={styles.contentContainer}
            innerContainerStyle={styles.innerContainer}
            scrollViewProps={{
              onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
              onScrollEndDrag: () => console.log('onScrollEndDrag'),
            }}
          />
        }
        {isLoading && <Loading />}
        <Toast ref={toastRef} />
      </SafeAreaView>
    </View >
  )
})

const styles = StyleSheet.create({
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
