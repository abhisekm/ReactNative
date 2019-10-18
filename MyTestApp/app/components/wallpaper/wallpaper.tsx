import React from "react"
import { Image, KeyboardAvoidingView, View } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"
import { spacing } from "../../theme"

const defaultImage = require("./bg.png")
const logo = require("./logo.png")

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
  const logoContainer = { width: 150, height: 50, margin: spacing.medium };
  const logoStyle = { ...style, ...logoContainer };
  // figure out which image to use
  const source = backgroundImage || defaultImage

  return (
    <View style={style}>
      <Image source={source} />
      <Image source={logo} style={logoStyle} />
    </View>
  )
}
