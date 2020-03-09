import * as React from "react"
import { View, ViewStyle, Image } from "react-native"
import { Text } from "../text"
import { verticalScale, scale } from "../../utils/scale"
export interface HeaderProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

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
export function Header(props: HeaderProps) {
  // grab the props
  const { tx, text, style, ...rest } = props
  const textStyle = {}

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
      <Image
        source={require('../../res/images/light.png')}
        style={{ height: verticalScale(25), width: scale(200) }}
        resizeMode='contain'
      />
    </View>
  )
}
