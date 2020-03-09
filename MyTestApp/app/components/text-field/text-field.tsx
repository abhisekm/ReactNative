import * as React from "react"
import { View, TextStyle, ViewStyle } from "react-native"
import { color } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text"
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"
import { Input } from "react-native-elements"
import { presets } from "./text-field.preset"

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    labelStyle: labelStyleOverride,
    preset = "default",
    containerStyle: containerStyleOverride,
    inputContainerStyle: inputContainerStyleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  let containerStyle: ViewStyle = presets[preset].containerStyle
  containerStyle = enhance(containerStyle, containerStyleOverride)

  let inputContainerStyle: ViewStyle = presets[preset].inputContainerStyle
  inputContainerStyle = enhance(inputContainerStyle, inputContainerStyleOverride)

  let inputStyle: TextStyle = presets[preset].inputStyle;
  inputStyle = enhance(inputStyle, inputStyleOverride)

  let labelStyle: TextStyle = {};
  labelStyle = enhance(labelStyle, labelStyleOverride)

  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const labelElement = label ? <Text preset="fieldLabel" tx={labelTx} text={label} style={labelStyle} /> : null

  return (
    <Input
      placeholder={actualPlaceholder}
      placeholderTextColor={color.palette.grey8}
      underlineColorAndroid={color.transparent}
      label={labelElement}
      labelStyle={labelStyle}
      inputStyle={inputStyle}
      ref={forwardedRef}
      containerStyle={containerStyle}
      inputContainerStyle={inputContainerStyle}
      {...rest}
    />
  )
}
