import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { CampaignDetail } from "../../models/campaign-detail"
import styleSheet from "../../theme/styleSheet"
import { spacing, color } from "../../theme"
import { Divider, Icon, Overlay, Input } from "react-native-elements"
import { useState } from "react"
import moment from 'moment';
import { Button } from "../button"
import { TextField } from "../text-field"

export interface AppliedCampaignContentProps {
  /**
   * Text which is looked up via i18n.
   */
  data: CampaignDetail
}

const card: ViewStyle = {
  backgroundColor: 'white',
  padding: spacing.small,
  marginBottom: spacing.medium,
  borderRadius: 4
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

const campaignStatusText = [
  "Applied",
  "Approved",
  "Needs Attention",
  "Delivered",
  "Payment Pending",
  "Paid"
]

const campaignStatusTextColor = [
  color.palette.orangeDarker,
  "green",
  color.error,
  "green",
  color.palette.orangeDarker,
  "green"
]

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AppliedCampaignContent(props: AppliedCampaignContentProps) {
  // grab the props
  const { data, ...rest } = props

  const [deliverableLink, setDeliverableLink] = useState(data.deliverableLink);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showQuoteInput, setShowQuoteInput] = useState(false);
  const [link, setLink] = useState(data.deliverableLink);
  const [quote, setQuote] = useState(data.quote && data.quote.toString() || "");
  const [editQuote, setEditQuote] = useState(quote);

  const deadlineDateMillis = 1579850830000;
  const deadlineDate = '24/01/2020';
  const dateFormat = 'DD/MM/YYYY';
  const dayDiff = moment(deadlineDateMillis).diff(moment(), 'days');
  const hourDiff = moment(deadlineDateMillis).diff(moment(), 'hours');

  const updateLink = () => {
    setDeliverableLink(link);
    setShowOverlay(false);
  }

  return (
    <View>
      <View key="description" style={[card, styleSheet.shadow_4]} {...rest}>
        <Text preset="question" text={data.description} style={{ padding: spacing.small }} />
      </View>


      <View key="status-card" style={[card, styleSheet.shadow_4]} {...rest}>
        <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center' }} >
          <Text preset="bold" text="Campaign Status" style={{ flex: 1, fontSize: 18 }} />
          <Text preset="bold" text={campaignStatusText[data.campaignStatus]} style={{ color: campaignStatusTextColor[data.campaignStatus] }} />
          {/* <Text preset="bold" text={campaignStatusText[data.campaignStatus]} style={{ color: "green" }} /> */}
        </View>
        <Divider />
        <Text preset="question" text={data.campaignStatusText} style={{ padding: spacing.small, color: data.campaignStatus == 2 ? 'red' : 'black' }} />
      </View>



      <View key="quote-card" style={[card, styleSheet.shadow_4]} {...rest}>
        <Text preset="bold" text="Quote" style={{ padding: spacing.small, fontSize: 18 }} />
        <Divider />
        <View style={{ padding: spacing.small, marginTop: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Icon name="rupee" type="font-awesome" size={16} containerStyle={{ marginEnd: spacing.small }} />
          <Text preset="default" text="Your Quote" />
          {!showQuoteInput ?
            <>
              <Text preset="bold" text={quote} style={{ flex: 1, textAlign: 'right', marginRight: spacing.medium }} />
              <Button
                preset="outline"
                buttonStyle={{ paddingVertical: spacing.small, paddingHorizontal: spacing.medium, borderRadius: 25, height: 40 }}
                text={quote ? "Edit" : "Add"}
                textStyle={{ color: color.primary }}
                onPress={() => setShowQuoteInput(true)}
              />
            </>
            :
            <>
              <Input
                value={editQuote}
                onChangeText={(text) => setEditQuote(text.replace(/[^0-9]/g, ''))}
                keyboardType='numeric'
                containerStyle={{ flex: 1, marginLeft: spacing.medium, marginRight: spacing.medium }} />
              <Button
                preset="outline"
                buttonStyle={{ paddingVertical: spacing.small, paddingHorizontal: spacing.medium, borderRadius: 25, maxHeight: 40 }}
                text="Save"
                textStyle={{ color: color.primary }}
                onPress={() => {
                  setQuote(editQuote);
                  setShowQuoteInput(false)
                }}
              />
            </>
          }
        </View>
      </View>

      <View key="deliverable-card" style={[card, styleSheet.shadow_4]} {...rest}>
        <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center' }} >
          <Text preset="bold" text="Deliverable Info" style={{ flex: 1, fontSize: 18 }} />
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
          <Text text={deliverableLink || "Submit your deliverable link"} style={{ flex: 1, color: color.link, fontSize: 14, fontStyle: deliverableLink ? 'normal' : 'italic' }} />
          {
            data.deliverableStatus < 2
            &&
            <Icon
              name="edit" type="font-awesome"
              size={16} containerStyle={{ marginStart: spacing.small, }}
              raised reverse color={color.primary}
              onPress={() => setShowOverlay(true)}
            />
          }
        </View>
        <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Icon name="progress-check" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} />
          <Text preset="default" text="Submision Status" style={{ flex: 1 }} />
          <Text preset="default" text={deliverableStatusText[data.deliverableStatus]} style={{ color: deliverableStatusTextColor[data.deliverableStatus] }} />
        </View>
      </View>

      <Overlay
        isVisible={showOverlay}
        height="auto"
        onBackdropPress={() => setShowOverlay(false)}
      >
        <View style={{ padding: spacing.medium }}>
          <Text text="Submit your deliverable link" preset="bold" style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: 18 }} />
          <Divider style={{ marginVertical: spacing.medium }} />
          <TextField
            label="Link"
            placeholder="enter your link here"
            leftIcon={<Icon name="link" type="entypo" size={14} />}
            value={link}
            onChangeText={setLink}
            autoCapitalize='none'
            autoCompleteType='off' />
          <Button text="Save" preset="raised" onPress={updateLink} />
        </View>
      </Overlay>
    </View>
  )
}
