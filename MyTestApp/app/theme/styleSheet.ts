import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { color, spacing } from ".";
import { normalisedFontSize } from "./fontSize";
import { scale } from "../utils/scale";

const text: TextStyle = {
  color: color.palette.white,
  fontFamily: 'Montserrat',
  fontSize: normalisedFontSize.normal,
}

const bold: TextStyle = {
  fontWeight: 'bold'
}

type Styles = {
  view_full: ViewStyle,
  view_container: ViewStyle,
  view_header: ViewStyle,
  text_header_title: TextStyle,
  text_title_wrapper: TextStyle,
  text_title: TextStyle,
  text_italic: TextStyle,
  text_content: TextStyle,
  view_continue: ViewStyle,
  text_continue: TextStyle,
  text_input_container: TextStyle,
  text_hashtag: TextStyle,
  shadow_4: ViewStyle,
  shadow_8: ViewStyle,
  shadow_16: ViewStyle,
  card: ViewStyle
}

export default StyleSheet.create<Styles>({
  view_full: {
    flex: 1
  },

  view_container: {
    backgroundColor: color.transparent,
    paddingHorizontal: 0,
  },

  view_header: {
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium + spacing.tiny,
    paddingHorizontal: 0,
  },

  text_header_title: {
    ...text,
    ...bold,
    fontSize: normalisedFontSize.small,
    lineHeight: scale(15),
    textAlign: 'center',
    letterSpacing: 1.5,
  },

  text_title_wrapper: {
    ...text,
    textAlign: 'center',
  },

  text_title: {
    ...text,
    ...bold,
    fontSize: normalisedFontSize.extraLarge,
    lineHeight: scale(38),
    textAlign: 'center',
  },

  text_italic: {
    ...text,
    fontSize: normalisedFontSize.small,
    fontStyle: 'italic',
  },

  text_content: {
    ...text,
    color: '#BAB6C8',
    fontSize: normalisedFontSize.normal,
    lineHeight: scale(22),
    marginBottom: spacing.medium,
  },

  view_continue: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: "#5D2555",
  },

  text_continue: {
    ...text,
    ...bold,
    fontSize: normalisedFontSize.small,
    letterSpacing: 2,
  },

  text_input_container: {
    borderRadius: 4,
    padding: 0,
    paddingHorizontal: spacing.tiny,
    marginVertical: spacing.small,
    borderWidth: 2,
    backgroundColor: color.inputBackground,
    borderColor: color.borderColor,
    fontSize: normalisedFontSize.normal,
  },

  text_hashtag: {
    ...text,
    fontSize: normalisedFontSize.small,
    color: color.link,
  },

  shadow_4: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  shadow_8: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },

  shadow_16: {
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: spacing.small,
    marginBottom: spacing.medium,
    borderRadius: 4
  },
})
