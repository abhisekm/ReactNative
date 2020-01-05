import * as React from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Text } from "../text"
import styles from "./campaign-slider-styles"
import FastImage from "react-native-fast-image"
import { ParallaxImage } from 'react-native-snap-carousel'
import { Campaign } from "../../models/campaign"

export interface CampaignSliderProps {
  /**
   * The text to for title / header.
   */
  title?: string

  /**
   * The text to display for description
   */
  subtitle?: string

  even?: boolean
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  data: Campaign

  parallax?: boolean

  parallaxProps?: Object
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CampaignSlider(props: CampaignSliderProps) {
  // grab the props
  const {
    even,
    style,
    data: { id, title, brandImage, brandName, campaignImage, link, description },
    parallax,
    parallaxProps
  } = props

  const uppercaseTitle = React.useMemo(() => title ? (
    <Text
      style={[styles.title, even ? styles.titleEven : {}]}
      numberOfLines={2}
    >
      {title.toUpperCase()}
    </Text>
  ) : false, [title]);

  const uppercaseBrand = React.useMemo(() => (brandName + title) ? (
    <Text
      style={[styles.brand, even ? styles.brandEven : {}]}
    >
      {brandName.toUpperCase()} - {title.toUpperCase()}
    </Text>
  ) : false, [brandName, title]);

  const uppercaseHeader = React.useMemo(() => title ? (
    <Text
      style={[styles.brand, even ? styles.brandEven : {}]}
    >
      {title.toUpperCase()}
    </Text>
  ) : false, [title]);


  const image = React.useMemo(() => {
    return parallax ? (
      <ParallaxImage
        source={{ uri: campaignImage }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
        <FastImage
          source={{ uri: campaignImage }}
          style={styles.image}
        />
      );
  }, [campaignImage, parallaxProps, even, parallax]);

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => { alert(`You've clicked '${title}' redirected to '${link}'`); }} >
      <View style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          {image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          <FastImage
            source={{ uri: brandImage }}
            style={[styles.imageLogo, even ? styles.imageLogoEven : {}]}
          />
          {uppercaseHeader}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
