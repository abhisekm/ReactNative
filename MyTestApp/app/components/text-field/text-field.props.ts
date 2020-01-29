import { TextStyle, ViewStyle } from "react-native"
import { InputProps } from "react-native-elements";
import { TextFieldPresets } from "./text-field.preset";

export interface TextFieldProps extends InputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  containerStyle?: ViewStyle | ViewStyle[]

  /**
  * Optional input container style overrides useful for margins & padding.
  */
  inputContainerStyle?: ViewStyle | ViewStyle[]

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[]

  /**
   * Various look & feels.
   */
  preset?: TextFieldPresets

  forwardedRef?: any
}
