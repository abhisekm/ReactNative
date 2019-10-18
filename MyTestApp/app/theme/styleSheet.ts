import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { color, spacing } from ".";

const text: TextStyle = {
  color: color.palette.white,
  fontFamily: 'Montserrat',
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
    fontSize: 12,
    lineHeight: 15,
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
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
  },

  text_italic: {
    ...text,
    fontSize: 12,
    fontStyle: 'italic',
  },

  text_content: {
    ...text,
    color: '#BAB6C8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing[5],
  },

  view_continue: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: "#5D2555",
  },

  text_continue: {
    ...text,
    ...bold,
    fontSize: 13,
    letterSpacing: 2,
  },

  text_input_container: {
    borderRadius: 4,
    padding: 0,
    paddingHorizontal: spacing.small,
    marginTop: spacing.small,
    borderWidth: 2,
    backgroundColor: color.inputBackground,
    borderColor: color.borderColor,
    fontSize: 14,
  }
})
