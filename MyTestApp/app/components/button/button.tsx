import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
import { translate } from "../../i18n"
import { Button as ReactButton } from "react-native-elements"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    txOptions,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    buttonStyle: buttonStyleOverride,
    titleStyle: titleStyleOverride,
    containerStyle: containerStyleOverride,
    children,
    social,
    ...rest
  } = props

  if (preset === "raised" || preset === "social") {
    const i18nText = tx && translate(tx, txOptions)
    const localisedText = i18nText || text

    const buttonStyle = viewPresets[preset].buttonStyle;
    const titleStyle = viewPresets[preset].titleStyle;
    const containerStyle = viewPresets[preset].containerStyle;

    return (
      <ReactButton
        raised
        buttonStyle={mergeAll(flatten([buttonStyle, buttonStyleOverride]))}
        titleStyle={mergeAll(flatten([titleStyle, titleStyleOverride]))}
        containerStyle={mergeAll(flatten([containerStyle, containerStyleOverride]))}
        title={localisedText}
        {...rest}
      />
    )

  }

  if (preset === "outline") {
    const i18nText = tx && translate(tx, txOptions)
    const localisedText = i18nText || text

    const buttonStyle = viewPresets[preset].buttonStyle;
    const titleStyle = viewPresets[preset].titleStyle;
    const containerStyle = viewPresets[preset].containerStyle;

    return (
      <ReactButton
        raised
        type="outline"
        buttonStyle={mergeAll(flatten([buttonStyle, buttonStyleOverride]))}
        titleStyle={mergeAll(flatten([titleStyle, titleStyleOverride]))}
        containerStyle={mergeAll(flatten([containerStyle, containerStyleOverride]))}
        title={localisedText}
        {...rest}
      />
    )

  }

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
