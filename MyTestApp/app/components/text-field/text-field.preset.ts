import { TextStyle, ViewStyle } from "react-native"
import { color, typography, spacing } from "../../theme"
import { normalisedFontSize } from "../../theme/fontSize"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: normalisedFontSize.normal,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default input styles.
   */
  default: {
    containerStyle: {

    } as ViewStyle,
    inputContainerStyle: {

    } as ViewStyle,
    inputStyle: {
      fontSize: normalisedFontSize.normal,
      backgroundColor: color.palette.white,
      textAlignVertical: 'bottom'
    } as TextStyle
  },

  rounded: {
    containerStyle: {
    } as ViewStyle,
    inputContainerStyle: {
      backgroundColor: color.palette.white,
      borderRadius: 8,
      borderColor: 'transparent',
      paddingHorizontal: spacing.small
    } as ViewStyle,
    inputStyle: {
      fontSize: normalisedFontSize.normal,
      textAlignVertical: 'bottom',
    } as TextStyle
  },
}

/**
 * A list of preset names.
 */
export type TextFieldPresets = keyof typeof presets
