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
import { normalisedFontSize } from "../../theme/fontSize"
import { navigate } from "../../navigation"
import { scale, verticalScale } from "../../utils/scale"

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
  const { deliverable, campaignDetails, status, info, quote } = data;

  const [deliverableLink, setDeliverableLink] = useState((deliverable && deliverable.deliverableLink) || "");
  const [showQuoteInput, setShowQuoteInput] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState(quote && quote.amount && quote.amount.toString() || "");
  const [editQuote, setEditQuote] = useState(quoteAmount);
  const [quoteComment, setQuoteComment] = useState(quote && quote.comment || "");

  const [commentError, setCommentError] = useState('');
  const [amountError, setAmountError] = useState('');

  const quoteAmountRef = React.useRef(null);
  const quoteCommentRef = React.useRef(null);

  const deadlineDateMillis = 1579850830000;
  const deadlineDate = '24/01/2020';
  const dateFormat = 'DD/MM/YYYY';
  const dayDiff = moment(deadlineDateMillis).diff(moment(), 'days');
  const hourDiff = moment(deadlineDateMillis).diff(moment(), 'hours');


  if (campaignDetails == null)
    return null;

  return (
    <View style={{ paddingBottom: spacing.large }}>
      <View key="description" style={[card, styleSheet.shadow_4]} {...rest}>
        <Text preset="default" text={campaignDetails.description} style={{ padding: spacing.small }} />
      </View>

      {status &&
        <View key="status-card" style={[card, styleSheet.shadow_4]} {...rest}>
          <View style={{ padding: spacing.small, flexDirection: 'row', justifyContent: 'center' }} >
            <Text preset="bold" text="Campaign Status" style={{ flex: 1, fontSize: normalisedFontSize.large }} />
            <Text preset="bold" text={campaignStatusText[status.campaignStatus]} style={{ color: campaignStatusTextColor[status.campaignStatus] }} />
            {/* <Text preset="bold" text={campaignStatusText[data.campaignStatus]} style={{ color: "green" }} /> */}
          </View>
          <Divider />
          <Text
            preset="question"
            text={status.campaignStatusText}
            style={{
              padding: spacing.small,
              fontSize: normalisedFontSize.normal,
              color: status.campaignStatus == 2 ? 'red' : 'black'
            }} />
        </View>
      }

      {deliverable &&
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
                  navigate(
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
      }

      {quote &&
        <View key="quote-card" style={[card, styleSheet.shadow_4]} {...rest}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text preset="bold" text="Quote" style={{ padding: spacing.small, fontSize: normalisedFontSize.large }} />
            {!showQuoteInput ?
              (
                !quote.editable ? null :
                  <Button
                    preset="outline"
                    buttonStyle={{ paddingVertical: spacing.small, paddingHorizontal: spacing.medium, borderRadius: 25, height: scale(30) }}
                    text={quoteAmount ? "Edit" : "Add"}
                    textStyle={{ color: color.primary, fontSize: normalisedFontSize.small }}
                    onPress={() => setShowQuoteInput(true)}
                  />)
              : (
                <Button
                  preset="outline"
                  buttonStyle={{ paddingVertical: spacing.small, paddingHorizontal: spacing.medium, borderRadius: 25, maxHeight: scale(30) }}
                  text="Save"
                  textStyle={{ color: color.primary, fontSize: normalisedFontSize.small }}
                  onPress={() => {
                    if (editQuote.length == 0) {
                      quoteAmountRef.current.shake();
                      setAmountError("Enter a valid quote");
                      return;
                    } else {
                      setAmountError("");
                    }

                    if (quoteComment.length == 0) {
                      quoteCommentRef.current.shake();
                      setCommentError("Enter a valid comment");
                      return;
                    } else {
                      setCommentError("");
                    }

                    setQuoteAmount(editQuote);
                    setShowQuoteInput(false)
                  }}
                />
              )
            }
          </View>
          <Divider />
          <View style={{ padding: spacing.small, marginTop: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Icon name="rupee" type="font-awesome" size={16} containerStyle={{ marginEnd: spacing.small }} />
            <Text preset="default" text="Your Quote" />
            {!showQuoteInput ?
              <Text preset="bold" text={quoteAmount || " - "} style={{ flex: 1, textAlign: 'right', marginRight: spacing.medium }} />
              :
              <TextField
                forwardedRef={quoteAmountRef}
                value={editQuote}
                onChangeText={(text) => setEditQuote(text.replace(/[^0-9]/g, ''))}
                keyboardType='numeric'
                placeholder="Enter quote in INR"
                numberOfLines={1}
                containerStyle={{ flex: 1 }}
                errorMessage={amountError}
                inputStyle={{ textAlignVertical: 'center' }}
              />
            }
          </View>
          <View style={{ padding: spacing.tiny, marginTop: spacing.small, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Icon name="comment-outline" type="material-community" size={16} containerStyle={{ marginEnd: spacing.small }} />

            {!showQuoteInput ?
              <Text preset="default" text={quoteComment || "Add a comment"} style={{ flex: 1 }} />
              :
              <TextField
                forwardedRef={quoteCommentRef}
                value={quoteComment}
                placeholder="Add a comment"
                onChangeText={setQuoteComment}
                inputStyle={{ textAlignVertical: 'top' }}
                multiline
                errorMessage={commentError}
                containerStyle={{ flex: 1 }} />
            }
          </View>
        </View>
      }

      {
        info != null && info.slice().length > 0 &&
        <Text preset="header" text="Campaign Details" style={{ color: color.primary, marginVertical: spacing.large }} />
      }

      {info != null && info.slice().length > 0 &&
        info.slice().map((eachInfo, index) => {
          return (
            <View key={`info-card-${index}`} style={[card, styleSheet.shadow_4]} {...rest}>
              <Text preset="bold" text={eachInfo.title} style={{ flex: 1, fontSize: normalisedFontSize.normal }} />
              <Text
                preset="question"
                text={eachInfo.description}
                style={{
                  paddingVertical: spacing.small,
                  fontSize: normalisedFontSize.normal,
                }} />
            </View>
          )
        })
      }
    </View>
  )
}
