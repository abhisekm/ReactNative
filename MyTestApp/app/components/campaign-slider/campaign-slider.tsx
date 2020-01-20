import * as React from "react"
import { View, ViewStyle, } from "react-native"
import { Text } from "../text"
import styles from "./campaign-slider-styles"
import FastImage from "react-native-fast-image"
import { ParallaxImage } from 'react-native-snap-carousel'
import { Campaign } from "../../models/campaign"
import { navigate } from "../../navigation"
import TouchableScale from 'react-native-touchable-scale';


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

  ongoing?: boolean
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
    parallaxProps,
    ongoing
  } = props

  const uppercaseTitle = React.useMemo(() => title ? (
    <Text
      style={[styles.title, even ? styles.titleEven : {}]}
      numberOfLines={2}
    >
      {title.toUpperCase()}
    </Text>
  ) : false, [title]);

  const uppercaseBrand = React.useMemo(() => brandName ? (
    <Text
      style={[styles.brand, even ? styles.brandEven : {}]}
    >
      {brandName.toUpperCase()}
    </Text>
  ) : false, [brandName]);

  const uppercaseHeader = React.useMemo(() => title ? (
    <Text
      style={[styles.brand, even ? styles.brandEven : {}]}
      numberOfLines={2}
    >
      {(brandName ? brandName.toUpperCase() + " - " : "") + title.toUpperCase()}
    </Text>
  ) : false, [title, brandName]);


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

  const route = link === "listing" ? "LiveCampaign" : (ongoing ? 'AppliedCampaign' : 'CampaignDetails');

  return (
    <TouchableScale
      style={styles.slideInnerContainer}
      activeScale={0.95}
      friction={10}
      onPress={() =>
        navigate(
          route,
          {
            campaignId: id,
            campaignLink: link,
            campaignImage: campaignImage,
            brandImage: brandImage,
            title: title
          })} >
      <View style={[styles.shadow, even ? styles.shadowEven : {}]} >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          {image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          <FastImage
            source={{ uri: brandImage }}
            style={[styles.imageLogo, even ? styles.imageLogoEven : {}]}
          />
          <View style={{ flexDirection: 'row' }} >
            {uppercaseHeader}
          </View>
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableScale >
  )
}
