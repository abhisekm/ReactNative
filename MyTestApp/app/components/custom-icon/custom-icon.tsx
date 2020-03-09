import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
import { scale } from "../../utils/scale";
import { color as ThemeColor } from "../../theme/color"

export const Icon = createIconSetFromFontello(fontelloConfig);

export interface CustomIconProps {
  size?: number,
  color?: string
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CustomIcon(props: CustomIconProps) {
  // grab the props
  const { size = scale(16), color = ThemeColor.primary, ...rest } = props

  return (
    <Icon name="immersify" size={size} color={color} />
  )
}
