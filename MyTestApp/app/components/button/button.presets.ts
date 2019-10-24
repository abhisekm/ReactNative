import { ViewStyle, TextStyle, Platform } from "react-native"
import { color, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing.large,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.pink1, flexWrap: "wrap" } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,

  raised: {
    buttonStyle: {
      flex: 1,
      borderRadius: 30,
      paddingHorizontal: spacing.medium,
      paddingTop: 14,
      paddingBottom: 14,
    } as ViewStyle,
    titleStyle: {
      color: color.palette.pink1,
    } as TextStyle,
    containerStyle: {
      margin: 7,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
  },

  social: {
    buttonStyle: {
      flex: 1,
      borderRadius: 30,
      paddingTop: 14,
      paddingBottom: 14,
    } as ViewStyle,
    titleStyle: {
      color: 'white',
      marginLeft: 15,
      ...Platform.select({
        android: {
          fontFamily: 'sans-serif',
        },
        default: {

        },
      }),
      fontWeight: 'bold',
      fontSize: 14,
    } as TextStyle,
    containerStyle: {
      margin: 7,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
  },
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 9, color: color.palette.white } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
