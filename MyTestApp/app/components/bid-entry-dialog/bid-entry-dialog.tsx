import * as React from "react"
import { View, ViewStyle, StyleSheet } from "react-native"
import { Text } from "../text"
import { Overlay, Divider } from "react-native-elements"
import { Button } from "../button"
import { spacing, color } from "../../theme"
import { TextField } from "../text-field"
import { verticalScale } from "../../utils/scale"
import { useState, useRef } from "react"

export interface BidEntryDialogProps {
  /**
   * show/hide dialog
   */
  visibility: boolean

  /**
   * Default bid value to prefill bid
   */
  defaultBidValue?: string

  /**
   * Callback for hiding overlay
   */
  onClose: () => void;

  /**
   * Callback for bidding
   */
  onSave: (bidAmount: number, comment: string) => void
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function BidEntryDialog(props: BidEntryDialogProps) {
  // grab the props
  const { visibility, defaultBidValue = "", onClose, onSave } = props

  const [bid, setBid] = useState("");
  const [bidError, setBidError] = useState(defaultBidValue);
  const [comment, setComment] = useState("");

  const bidRef = useRef(null);

  const updateBid = (text) => {
    setBid(text.replace(/[^0-9]/g, ''));
  }

  const clearAndClose = () => {
    setBid(defaultBidValue);
    setComment("");
    setBidError("");
    onClose();
  }

  const validateAndSave = () => {
    if (bid.length == 0) {
      setBidError("Bid cannot be empty");
      bidRef.current.shake();
      return;
    } else {
      setBidError("");
    }

    let price: number;

    try {
      price = Number.parseInt(bid);
      if (onSave)
        onSave(price, comment);
    } catch (e) {
      setBidError("Invalid number");
      bidRef.current.shake();
    }
  }

  return (
    <Overlay
      isVisible={visibility}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="rgba(255, 255, 255,1)"
      width="80%"
      height="auto"
      overlayStyle={{ padding: 0, opacity: 0.9, elevation: 16, zIndex: 1000 }}
    >
      <View >
        <Text preset="header" text="Campaign Bidding" style={[styles.margin, { textAlign: 'center', color: color.primary }]} />
        <Divider style={{ marginBottom: spacing.medium }} />
        <View style={{ paddingHorizontal: spacing.small }}>
          <TextField
            preset="clear"
            label="Bid"
            forwardedRef={bidRef}
            placeholderTextColor={color.palette.grey9}
            inputStyle={{ maxHeight: verticalScale(40) }}
            labelStyle={{ color: color.primary }}
            placeholder="Enter your bid"
            value={bid}
            onChangeText={updateBid}
            keyboardType="numeric"
            errorMessage={bidError}
          />
          <TextField
            preset="clear"
            label="Comment"
            placeholderTextColor={color.palette.grey9}
            inputStyle={{ maxHeight: verticalScale(40) }}
            labelStyle={{ color: color.primary }}
            containerStyle={{ marginTop: spacing.small }}
            placeholder="Enter comment"
            value={comment}
            onChangeText={setComment}
          />
        </View>
        <Divider style={{ marginTop: spacing.large }} />
        <View style={styles.buttonContainer}>
          <Button
            preset="outline"
            text="Cancel"
            onPress={clearAndClose}
          />
          <Button
            preset="raised"
            text="Bid"
            onPress={validateAndSave}
          />
        </View>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  margin: {
    padding: spacing.medium
  },
  rowContainer: {
    flexDirection: 'row',
    padding: spacing.medium
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.small
  }
});
