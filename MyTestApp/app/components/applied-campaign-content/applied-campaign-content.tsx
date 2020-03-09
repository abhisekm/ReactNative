import * as React from "react"
import { View, ViewStyle, Alert, TextStyle } from "react-native"
import { Text } from "../text"
import styleSheet from "../../theme/styleSheet"
import { spacing, color } from "../../theme"
import { Divider, Icon } from "react-native-elements"
import { useState } from "react"
import moment from 'moment';
import { Button } from "../button"
import { normalisedFontSize } from "../../theme/fontSize"
import { scale } from "../../utils/scale"
import { observer } from "mobx-react"
import { useStores } from "../../models/root-store"
import { Campaign } from "../../models/campaign"
import { BidHistoryView } from "../bid-history-view"
import { bidStatus } from "../../utils/bid-status"
import { BidEntryDialog } from "../bid-entry-dialog"
import { Loading } from "../loading"
import { Button as RNEButton } from "react-native-elements"
import ViewMoreText from "react-native-view-more-text"

export interface AppliedCampaignContentProps {
  /**
   * Text which is looked up via i18n.
   */
  data: Campaign
}

const card: ViewStyle = {
  backgroundColor: 'white',
  padding: spacing.small,
  marginBottom: spacing.small + spacing.tiny,
  borderRadius: scale(8)
}

const deliverableStatusText = [
  "Rejected",
  "Pending",
  "Approved"
]

const deliverableStatusTextColor = [
  color.error,
  color.palette.orangeDarker,
  "green"
]

const renderButton = (onPress, showMoreDescription, color) => {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <RNEButton
        type="clear"
        icon={{
          type: "material-community",
          name: showMoreDescription ? "chevron-double-down" : "chevron-double-up",
          color: color,
          size: scale(24)
        }}
        title={showMoreDescription ? "Show More" : "Show Less"}
        titleStyle={{ color: color, fontSize: normalisedFontSize.normal }}
        onPress={onPress}
      />
    </View>
  )
}

const ROW_STYLE: ViewStyle = { paddingHorizontal: spacing.small, paddingTop: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' };

const TAG: TextStyle = {
  textAlign: 'center',
  textAlignVertical: 'center',
  borderColor: color.primary,
  borderWidth: 2,
  color: 'black',
  fontSize: normalisedFontSize.small,
  borderRadius: spacing.medium,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.tiny,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const AppliedCampaignContent: React.FC<AppliedCampaignContentProps> = observer((props) => {
  // grab the props

  const {
    authStore: { isSignedIn },
    navigationStore: { navigateTo },
  } = useStores();

  const { data, ...rest } = props
  const { createBid, acceptBid, rejectBid, askNewBid, alertText, clearAlert, loading, bidHistory } = data;

  const [showBidInput, setShowBidInput] = useState(false);

  const deadlineDateMillis = 1579850830000;
  const dayDiff = moment(deadlineDateMillis).diff(moment(), 'days');
  const hourDiff = moment(deadlineDateMillis).diff(moment(), 'hours');


  if (data == null)
    return null;

  const bidState = data.bid ? data.bid.state : "admin_asking_for_a_new_price";
  const bidStarted = data.bid != null;
  const loggedIn = isSignedIn();

  React.useEffect(() => {
    alertText && Alert.alert(data.campaignName, alertText, [
      {
        text: 'Ok',
        onPress: () => clearAlert()
      }
    ])
  }, [alertText]);

  const renderViewMore = (onPress) => {
    return renderButton(onPress, true, color.primary);
  }

  const renderViewLess = (onPress) => {
    return renderButton(onPress, false, color.primary);
  }

  const renderViewMoreInfo = (onPress) => {
    return renderButton(onPress, true, "white");
  }

  const renderViewLessInfo = (onPress) => {
    return renderButton(onPress, false, "white");
  }

  return (
    <View style={{ paddingBottom: spacing.large }}>
      <View key="description" style={[card, styleSheet.shadow_4]} {...rest}>
        <View
          style={{ flexDirection: 'row', margin: spacing.small }}
        >
          {
            data.campaignCategory.map((category: string, index: number) => {
              return (
                <Text key={`tag${index}`} preset="default" text={category.trim()}
                  style={TAG} />
              );
            })
          }
        </View>

        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{ padding: spacing.small, }}  >
          <Text preset="default" text={data.deliverableDescription && data.deliverableDescription.trim()} style={{ fontStyle: 'italic' }} />
        </ViewMoreText>
        <Divider />

        {
          data.platform && data.platform.join().length > 0 &&
          <View style={ROW_STYLE} >
            <Icon name="web" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} color={color.primary} />
            <Text preset="fieldLabel" text="Where:" style={{ color: color.primary }} />
            <Text preset="default" text={data.platform.join(", ")} style={{ flex: 1, marginLeft: spacing.small }} />
          </View>
        }
        {
          data.contentType && data.contentType.join().length > 0 &&
          <View style={ROW_STYLE} >
            <Icon name="file-multiple" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} color={color.primary} />
            <Text preset="fieldLabel" text="What:" style={{ color: color.primary }} />
            <Text preset="default" text={data.contentType.join(", ")} style={{ flex: 1, marginLeft: spacing.small }} />
          </View>
        }
        {
          data.campaignScope && data.campaignScope.length > 0 &&
          <View style={ROW_STYLE} >
            <Icon name="account-multiple" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} color={color.primary} />
            <Text preset="fieldLabel" text="Openings:" style={{ color: color.primary }} />
            <Text preset="default" text={data.campaignScope} style={{ flex: 1, marginLeft: spacing.small }} />
          </View>
        }
        {
          data.language && data.language.join().length > 0 &&
          <View style={[ROW_STYLE, { marginBottom: spacing.small }]} >
            <Icon name="font" type="font-awesome" size={16} containerStyle={{ marginEnd: spacing.small }} color={color.primary} />
            <Text preset="fieldLabel" text="Language:" style={{ color: color.primary }} />
            <Text preset="default" text={data.language.join(", ")} style={{ flex: 1, marginLeft: spacing.small }} />
          </View>
        }
      </View>

      <View key="bid-info" style={[card, styleSheet.shadow_4, { backgroundColor: color.secondary }]} {...rest}>
        <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Icon name="information-variant" type="material-community" size={scale(24)} containerStyle={{ marginEnd: spacing.small }} color="white" />
          <Text preset="bold" text="What is Campaign Bidding?" style={{ flex: 1, fontSize: normalisedFontSize.large, color: 'white' }} />
        </View>
        <Divider />
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMoreInfo}
          renderViewLess={renderViewLessInfo}
          textStyle={{ padding: spacing.small, }}
        >
          <Text preset="default" tx="campaignDetail.bidInfo" style={{ color: 'white' }} />
        </ViewMoreText>
      </View>

      <View key="bid" style={[card, styleSheet.shadow_4]} {...rest}>
        <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center' }} >
          <Text preset="bold" text="Campaign Bidding" style={{ flex: 1, fontSize: normalisedFontSize.large }} />
          {
            bidStarted &&
            <Text preset="bold" text={bidStatus.get(bidState).campaignStatus.statusText} style={{ color: bidStatus.get(bidState).campaignStatus.color }} />
          }
        </View>
        <Divider style={{ marginBottom: spacing.small }} />
        {
          !loggedIn &&
          <Button
            preset="raised"
            text="Sign up to bid"
            onPress={() => { navigateTo("loginFlow") }}
          />
        }

        {
          loggedIn && !bidStarted &&
          <Button
            preset="raised"
            text="Start Bidding"
            onPress={() => { setShowBidInput(true) }}
          />
        }

        {
          loggedIn && bidStarted &&
          <View style={[card, styleSheet.shadow_4, { flexDirection: 'row', backgroundColor: bidStatus.get(bidState).campaignStatus.color, }]}>
            <Icon type="material-community" name="information-outline" size={scale(16)} color="white" containerStyle={{ paddingTop: scale(2) }} />
            <Text text={bidStatus.get(bidState).bidStatusText} style={{ color: 'white', marginLeft: spacing.small, }} />
          </View>
        }

        {
          loggedIn && bidStarted && bidState == 'admin_asking_for_a_new_price' &&
          <View style={[card, styleSheet.shadow_4, { padding: spacing.small, borderColor: color.primary, borderWidth: 2 }]}>
            <View style={ROW_STYLE} >
              <Text preset="fieldLabel" text="New Price : " style={{ color: color.primary }} />
              <Text preset="default" text={`Rs ${data.bid.price}`} style={{ flex: 1, marginLeft: spacing.small }} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: spacing.small }} >
              <Button
                preset="outline"
                text="Reject"
                containerStyle={{ flex: 1 }}
                onPress={() => { rejectBid(data.bid.price, '') }} />
              <Button
                preset="raised"
                text="Accept"
                containerStyle={{ flex: 1 }}
                onPress={() => { acceptBid(data.bid.price, '') }} />
            </View>

            <Button
              preset="raised"
              text="Negotiate New Bid"
              onPress={() => { setShowBidInput(true) }} />
          </View>
        }

        {
          loggedIn && bidStarted &&
          <View style={{ padding: spacing.small }}>
            <BidHistoryView bidData={data} />
          </View>
        }

      </View>

      {/* {deliverable &&
        <View key="deliverable-card" style={[card, styleSheet.shadow_4]} {...rest}>
          <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center' }} >
            <Text preset="bold" text="Deliverable Info" style={{ flex: 1, fontSize: normalisedFontSize.large }} />
            {hourDiff >= 0 && <Text preset="bold" text={moment(deadlineDateMillis).fromNow()} style={{ color: dayDiff > 5 ? "green" : "red" }} />}
          </View>
          <Divider />
          <View style={{ padding: spacing.small, marginTop: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Icon name="calendar" type="entypo" size={16} containerStyle={{ marginEnd: spacing.small }} />
            <Text preset="default" text="Submision Deadline" style={{ flex: 1 }} />
            <Text preset="default" text={moment(deadlineDateMillis).format("DD MMM, YYYY")} />
          </View>
          <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Icon name="link" type="entypo" size={16} containerStyle={{ marginEnd: spacing.small }} />
            <Text text={deliverableLink || "Submit your deliverable link"} style={{ flex: 1, color: color.link, fontSize: normalisedFontSize.normal, fontStyle: deliverableLink ? 'normal' : 'italic' }} />
            {
              deliverable.editable
              &&
              <Icon
                name="edit" type="font-awesome"
                size={16} containerStyle={{ marginStart: spacing.small, }}
                raised reverse color={color.primary}
                onPress={() => {
                  navigateTo(
                    "ImageUpload",
                    {
                      campaignId: campaignDetails.id,
                    })
                }}
              />
            }
          </View>
          <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Icon name="progress-check" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} />
            <Text preset="default" text="Submision Status" style={{ flex: 1 }} />
            <Text preset="default" text={deliverableStatusText[deliverable.deliverableStatus]} style={{ color: deliverableStatusTextColor[deliverable.deliverableStatus] }} />
          </View>
        </View>
      } */}

      <BidEntryDialog
        visibility={showBidInput}
        onClose={() => setShowBidInput(false)}
        onSave={(price, comment) => {
          setShowBidInput(false);

          if (bidStarted)
            askNewBid(data.bid.price, price, comment);
          else
            createBid(price, comment);
        }}
      />

      {loading && <Loading />}
    </View>
  )
})
