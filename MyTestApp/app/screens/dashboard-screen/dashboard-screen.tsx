import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet, RefreshControl, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { useStores } from "../../models/root-store"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import { CampaignSlider } from "../../components/campaign-slider"
import styleSheet from "../../theme/styleSheet"
import { Loading } from "../../components/loading"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { spacing, color } from "../../theme"
import { scale } from "../../utils/scale"
import { Campaign } from "../../models/campaign"

export interface DashboardScreenProps extends NavigationTabScreenProps<{}> {
}


export const DashboardScreen: NavigationBottomTabScreenComponent<DashboardScreenProps> = observer(() => {
  const {
    campaignStore: {
      loading, loadingMore,
      fetchInfluencerCampaigns, fetchMoreInfluencerCampaigns, influencerCampaigns
    },
    navigationStore: { navigateTo }
  } = useStores();


  React.useEffect(() => {
    fetchInfluencerCampaigns()
  }, []);


  const _renderItem = ({ item, index }) => {
    return (
      <CampaignSlider
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        style={{ width: '100%', marginBottom: spacing.medium, marginTop: index == 0 ? spacing.medium : 0 }}
      />
    );
  }

  const _footerLoading = () => {
    return (
      loadingMore ? <ActivityIndicator /> : null
    )
  }


  return (
    <View style={styleSheet.view_full}>
      <Screen preset="fixed" statusBar="light-content" style={{ flex: 1 }} >
        {
          influencerCampaigns.length == 0 ?
            <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styleSheet.card, styleSheet.shadow_8, { width: '75%', height: '75%' }]}
                onPress={() => navigateTo("LiveCampaign")}
                activeOpacity={0.8}
              >
                <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', padding: spacing.medium }}>
                  <Text
                    preset="question"
                    text="No Campaigns assigned to you yet, got to "
                  />
                  <Text
                    preset="question"
                    text="Campaign"
                    style={{ color: color.primary, }}
                  />
                  <Text
                    preset="question"
                    text=" tab to bid/apply for campaigns"
                  />
                </Text>
              </TouchableOpacity>
            </View>
            :
            <FlatList<Campaign>
              data={influencerCampaigns.slice()}
              renderItem={_renderItem}
              keyExtractor={item => item.id}
              onEndReached={fetchMoreInfluencerCampaigns}
              onEndReachedThreshold={0.5}
              ListFooterComponent={_footerLoading}
              removeClippedSubviews
              initialNumToRender={3}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={fetchInfluencerCampaigns}
                  colors={[color.primary, color.secondary]}
                />
              }
            />
        }

        {loading && <Loading />}
      </Screen>
    </View>
  )
})

DashboardScreen.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: ({ tintColor }) => <Icon name='home' color={tintColor} size={scale(24)} />
}
