import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View, FlatList, Image, RefreshControl, ActivityIndicator } from "react-native"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { CampaignSlider } from "../../components/campaign-slider"
import { Button, Icon } from "react-native-elements"
import { normalisedFontSize } from "../../theme/fontSize"
import TouchableScale from "react-native-touchable-scale"
import { NavigationParams } from "react-navigation"

export interface AllCampaignListingNavigationParams extends NavigationParams {
  mode: string
}

export interface AllCampaignListingScreenProps extends NavigationStackScreenProps<{}> {
}


const _renderItem = ({ item, index }) => {
  return (
    <CampaignSlider
      data={item}
      even={(index + 1) % 2 === 0}
      parallax={false}
      style={{ width: '100%', marginBottom: spacing.medium }}
    />
  );
}

export const AllCampaignListingScreen: NavigationStackScreenComponent<AllCampaignListingNavigationParams, AllCampaignListingScreenProps> = observer((props) => {
  const {
    campaignStore: {
      loading, loadingMore,
      fetchLiveCampaigns, fetchMoreLiveCampaigns, liveCampaigns,
      fetchInfluencerCampaigns, fetchMoreInfluencerCampaigns, influencerCampaigns
    }
  } = useStores();

  const mode = props.navigation.getParam("mode", "live");

  const showLive = mode == "live";

  const _footerLoading = () => {
    return (
      loadingMore ? <ActivityIndicator /> : null
    )
  }


  React.useEffect(() => {
    showLive ? fetchLiveCampaigns() : fetchInfluencerCampaigns();
  }, []);

  return (
    <View style={styleSheet.view_full}>
      <Screen style={{ ...styleSheet.view_container, paddingTop: spacing.small }} preset="fixed" unsafe statusBar="light-content" backgroundColor={color.palette.grey9} hideWallpaper>

        <FlatList
          data={showLive ? liveCampaigns.slice() : influencerCampaigns.slice()}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          onEndReached={() => {
            showLive ? fetchMoreLiveCampaigns() : fetchMoreInfluencerCampaigns();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={_footerLoading}
          removeClippedSubviews
          initialNumToRender={3}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                showLive ? fetchLiveCampaigns() : fetchInfluencerCampaigns();
              }}
              colors={[color.primary, color.secondary]}
            />
          }
        />
      </Screen>
    </View>
  )
})

AllCampaignListingScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
        <Image
          source={require('../../res/images/light.png')}
          style={{ height: 25, width: 100 }}
          resizeMode='contain'
        />
      </View>
    )
  },
  headerTitleContainerStyle: {
    flex: 1,
  },
  headerRight: () => {
    return (
      <Button
        TouchableComponent={TouchableScale}
        title="FILTER"
        titleStyle={{ color: color.primary, fontSize: normalisedFontSize.small }}
        icon={<Icon name="filter" type="feather" color={color.primary} />}
        iconRight
        type="clear"
        onPress={() => alert("show filter")}
      />
    )
  }
}