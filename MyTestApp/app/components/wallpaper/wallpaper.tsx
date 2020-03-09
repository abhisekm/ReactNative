import React from "react"
import { Image, View, StyleSheet } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"
import { Text } from "../text"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"

const defaultImage = require("./bg.png")

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride, backgroundImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const style = { ...presetToUse, ...styleOverride }
  // figure out which image to use
  const source = backgroundImage || defaultImage

  // return (
  //   <View style={style}>
  //     <Image source={source} />
  //   </View>
  // )

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, opacity: 0.8 }} >
      <LinearGradient
        useAngle
        angle={45}
        colors={[color.secondary, color.primary]}
        style={{ width: '100%', height: '100%' }} />
    </View>
  )
}
