import * as React from "react"
import { TouchableOpacity, TextStyle, ViewStyle, View } from "react-native"
import { Text } from "../text"
import { color, spacing } from "../../theme"
import { CheckboxProps } from "./checkbox.props"
import { mergeAll, flatten } from "ramda"
import { Icon, colors } from "react-native-elements"
import { scale } from "../../utils/scale"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing.small,
  alignSelf: "flex-start",
}

const DIMENSIONS = { width: spacing.medium, height: spacing.medium }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: color.primaryDarker,
  borderRadius: 1,
}



const FILL: ViewStyle = {
  width: DIMENSIONS.width - spacing.tiny,
  height: DIMENSIONS.height - spacing.tiny,
  backgroundColor: color.primary,
}

const LABEL: TextStyle = { paddingLeft: spacing[2] }

export function Checkbox(props: CheckboxProps) {
  const { size = 24, iconColor = color.primary } = props;

  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = mergeAll(flatten([ROOT, props.style]))
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))
  const fillStyle = mergeAll(flatten([FILL, props.fillStyle]))

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      {
        props.value
          ? <Icon type="material-community" name="checkbox-marked-outline" size={scale(size)} color={iconColor} />
          : <Icon type="material-community" name="checkbox-blank-outline" size={scale(size)} color={iconColor} />
      }
      <Text text={props.text} tx={props.tx} numberOfLines={numberOfLines} style={LABEL} />
    </TouchableOpacity>
  )
}
