import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { spacing } from "../../theme"

export interface SpacerProps {

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Spacer(props: SpacerProps) {
  // grab the props
  const { style, ...rest } = props

  return (
    <View style={[{ marginVertical: spacing.small }, style]} {...rest} />
  )
}
