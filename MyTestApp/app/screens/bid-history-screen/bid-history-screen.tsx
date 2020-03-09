import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { NavigationParams, FlatList } from "react-navigation"
import { CampaignBid } from "../../models/campaign-bid"
import { CampaignBidHistory } from "../../models/campaign-bid-history"
import { RefreshControl, ViewStyle, View, ActivityIndicator } from "react-native"
import { color, spacing } from "../../theme"
import moment from "moment"
import { Divider } from "react-native-elements"
import { bidStatus } from "../../utils/bid-status"
import { normalisedFontSize } from "../../theme/fontSize"
import { useStores } from "../../models/root-store"

export interface BidHistoryScreenProps extends NavigationStackScreenProps {
}

export interface BidHistoryNavProps extends NavigationParams {
  bidId: string
}

const ROW_STYLE: ViewStyle = { paddingHorizontal: spacing.small, paddingTop: spacing.tiny, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' };

const createdTS = (ts: string) => {
  return moment(ts, moment.HTML5_FMT.DATETIME_LOCAL_MS).fromNow();
}

const _renderItem = ({ item, index }: { item: CampaignBidHistory, index: number }) => {
  return (
    <View style={[styleSheet.card, styleSheet.shadow_4, { marginHorizontal: spacing.small, marginBottom: spacing.small, marginTop: index == 0 ? spacing.small : 0 }]}>
      <View style={ROW_STYLE} >
        <Text preset="fieldLabel" text="Price : " style={{ color: color.primary }} />
        <Text preset="default" text={`Rs ${item.price}`} style={{ flex: 1, marginLeft: spacing.small }} />
      </View>
      <View style={ROW_STYLE} >
        <Text style={{ flexDirection: "row", flex: 1 }}>
          <Text preset="fieldLabel" text="Comment : " style={{ color: color.primary }} />
          <Text preset="default" text={item.comment || " - "} style={{ marginLeft: spacing.small }} />
        </Text>
      </View>
      <Divider style={{ marginVertical: spacing.small }} />
      <View style={[ROW_STYLE, { paddingLeft: 0, paddingTop: 0 }]} >
        <Text
          text={bidStatus.get(item.state).bidShortName}
          style={{
            color: 'white',
            backgroundColor: bidStatus.get(item.state).campaignStatus.color,
            borderRadius: spacing.tiny,
            padding: spacing.tiny,
            fontSize: normalisedFontSize.small
          }} />
        <Text preset="secondary"
          text={createdTS(item.createdOn)}
          style={{
            flex: 1,
            fontSize: normalisedFontSize.small,
            marginLeft: spacing.small,
            color: color.palette.grey8,
            textAlign: "right"
          }} />
      </View>
    </View>
  )
}

export const BidHistoryScreen: NavigationStackScreenComponent<BidHistoryNavProps, BidHistoryScreenProps> = observer((props) => {
  const { bidDetail: bid } = useStores();
  const bidId = props.navigation.getParam("bidId", null);
  bid.setBidId(bidId);

  const { loading, loadingMore, bidHistory, getBidHistory, getMoreBidHistory } = bid;

  React.useEffect(() => {
    if (bidId == null) {
      alert('Bid History not found. Try again later.')
    }

    getBidHistory();
  }, [bidId]);


  const _footerLoading = () => {
    return (
      loadingMore ? <ActivityIndicator /> : null
    )
  }

  return (
    <Screen style={styleSheet.view_full} preset="fixed">
      <FlatList
        data={bidHistory}
        renderItem={_renderItem}
        keyExtractor={item => item.bidId}
        onEndReached={getMoreBidHistory}
        onEndReachedThreshold={0.5}
        ListFooterComponent={_footerLoading}
        removeClippedSubviews
        initialNumToRender={3}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getBidHistory}
            colors={[color.primary, color.secondary]}
          />
        }
      />
    </Screen>
  )
})

BidHistoryScreen.navigationOptions = {
  headerTitle: "Bid History"
}
