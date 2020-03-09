import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { CampaignBidHistory } from "../../models/campaign-bid-history"
import styleSheet from "../../theme/styleSheet"
import { spacing, color } from "../../theme"
import { Divider, Button } from "react-native-elements"
import { bidStatus } from "../../utils/bid-status"
import { normalisedFontSize } from "../../theme/fontSize"
import moment from "moment"
import { useObserver } from "mobx-react"
import { useStores } from "../../models/root-store"
import { Campaign } from "../../models/campaign"

export interface BidHistoryViewProps {
  /**
   * Bid data
   */
  bidData: Campaign
}

const ROW_STYLE: ViewStyle = { paddingHorizontal: spacing.small, paddingTop: spacing.tiny, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' };

const createdTS = (ts: string) => {
  return moment(ts, moment.HTML5_FMT.DATETIME_LOCAL_MS).fromNow();
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function BidHistoryView(props: BidHistoryViewProps) {
  // grab the props
  const { bidData } = props

  const { navigationStore: { navigateTo } } = useStores();

  const _renderItem = (item: CampaignBidHistory, index: number) => {
    return (
      <View key={`bid-${index}`} style={[styleSheet.card, styleSheet.shadow_4, { marginHorizontal: spacing.small, marginTop: spacing.tiny, marginBottom: spacing.tiny }]}>
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

  return useObserver(() => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text preset="fieldLabel" text="Bid History" />
        {
          bidData && bidData.bidHistory && bidData.bidHistory.length == 2 &&
          <Button
            type="clear"
            title="See All"
            iconRight
            icon={{ name: 'chevron-double-right', type: 'material-community', color: color.primary }}
            onPress={() => navigateTo("BidHistory", { "bidId": bidData.bid.bidId })}
          />
        }
      </View>
      <View
        style={{
          borderRadius: spacing.small,
          backgroundColor: color.palette.grey5,
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.tiny,
          marginVertical: spacing.medium,
        }}>
        {bidData && bidData.bidHistory && bidData.bidHistory.map((value, index) => {
          return (
            _renderItem(value, index)
          )
        })}
      </View>

    </View>
  ))
}
