import { ViewStyle, TextStyle } from "react-native"
import { ButtonPresetNames } from "./button.presets"
import { ButtonProps as RNEButtonProps } from "react-native-elements"

export interface ButtonProps extends RNEButtonProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
  * Optional options to pass to i18n. Useful for interpolation
  * as well as explicitly setting locale or translation fallbacks.
  */
  txOptions?: object

  /**
  * Style it like social button
  */
  social?: boolean

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
