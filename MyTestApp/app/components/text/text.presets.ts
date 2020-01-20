import { TextStyle } from "react-native"
import { color, typography } from "../../theme"
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
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: normalisedFontSize.large, fontWeight: "bold" } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: normalisedFontSize.normal, color: color.text, fontWeight: "bold" } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: normalisedFontSize.tiny, color: color.dim } as TextStyle,

  /**
   * Survey Questions
   */
  question: { ...BASE, fontSize: normalisedFontSize.large, fontStyle: 'italic' } as TextStyle,

  /**
  * Error
  */
  error: { ...BASE, fontSize: normalisedFontSize.small, fontStyle: 'italic', color: 'red' } as TextStyle,

}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
