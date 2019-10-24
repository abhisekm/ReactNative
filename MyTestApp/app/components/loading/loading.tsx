import * as React from "react"
import { View, ViewStyle, ActivityIndicator } from "react-native"
import { LoadingProps } from "./loading.props"
import { color } from "../../theme"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */

const loadingContainer: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.5,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center'
}

export function Loading(props: LoadingProps) {
  // grab the props
  const { style, ...rest } = props

  return (
    <View style={[loadingContainer, style]} {...rest}>
      <ActivityIndicator size="large" color={color.primary} />
    </View>
  )
}
