import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View, FlatList, Image, RefreshControl } from "react-native"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { Campaign } from "../../models/campaign"
import { CampaignSlider } from "../../components/campaign-slider"
import { Button, Icon } from "react-native-elements"
import { normalisedFontSize } from "../../theme/fontSize"
import TouchableScale from "react-native-touchable-scale"

export interface AllCampaignListingScreenProps extends NavigationStackScreenProps<{}> {
}


const _renderItem = ({ item, index }) => {
  return (
    item.id === 'more' ?
      null :
      <CampaignSlider
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        style={{ width: '100%', marginBottom: spacing.medium }}
      />
  );
}

export const AllCampaignListingScreen: NavigationStackScreenComponent<AllCampaignListingScreenProps> = observer(() => {
  const { campaignStore: { isLoading, fetchAllCampaigns, getAllCampaigns, allCampaigns } } = useStores();
  //  const _footerLoading = () => {
  //   return (
  //     isLoadingMore ? <ActivityIndicator /> : null
  //   )
  // }

  React.useEffect(() => {
    fetchAllCampaigns();
  }, []);

  // console.log(getAllCampaigns());

  return (
    <View style={styleSheet.view_full}>
      <Screen style={{ ...styleSheet.view_container, paddingTop: spacing.small }} preset="fixed" unsafe statusBar="light-content" backgroundColor={color.palette.grey9} hideWallpaper>

        <FlatList
          data={allCampaigns.slice()}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          // onEndReached={fetchMoreFeaturedPosts}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={_footerLoading}
          removeClippedSubviews
          initialNumToRender={3}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchAllCampaigns}
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
          source={require('../../components/header/light.png')}
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