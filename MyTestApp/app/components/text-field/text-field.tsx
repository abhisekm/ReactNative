import * as React from "react"
import { View, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text"
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"
import { Input } from "react-native-elements"
import { scale } from "../../utils/scale"
import { normalisedFontSize } from "../../theme/fontSize"

// the base styling for the container
const CONTAINER: ViewStyle = {
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontSize: normalisedFontSize.normal,
  backgroundColor: color.palette.white,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

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
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const labelElement = <Text preset="fieldLabel" tx={labelTx} text={label} />

  return (
    <View style={containerStyle}>

      <Input
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.grey8}
        underlineColorAndroid={color.transparent}
        label={labelElement}
        style={inputStyle}
        ref={forwardedRef}
        {...rest}
      />
    </View>
  )
}
