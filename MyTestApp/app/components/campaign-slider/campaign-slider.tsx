import * as React from "react"
import { View, ViewStyle, StyleSheet, } from "react-native"
import { Text } from "../text"
import styles from "./campaign-slider-styles"
import FastImage from "react-native-fast-image"
import { ParallaxImage } from 'react-native-snap-carousel'
import { Campaign } from "../../models/campaign"
import TouchableScale from 'react-native-touchable-scale'
import { useStores } from "../../models/root-store"
import { useObserver } from "mobx-react"
import LinearGradient from "react-native-linear-gradient"
import { color, spacing } from "../../theme"
import { SvgUri } from 'react-native-svg'


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
    data,
    parallax,
    parallaxProps
  } = props

  const { campaignName, campaignImage, campaignDescription, campaignCategory, location } = data;

  const { navigationStore: { navigateTo } } = useStores();

  // const uppercaseTitle = React.useMemo(() => title ? (
  //   <Text
  //     style={[styles.title, even ? styles.titleEven : {}]}
  //     numberOfLines={2}
  //   >
  //     {title.toUpperCase()}
  //   </Text>
  // ) : false, [title]);

  // const uppercaseBrand = React.useMemo(() => brandName ? (
  //   <Text
  //     style={[styles.brand, even ? styles.brandEven : {}]}
  //   >
  //     {brandName.toUpperCase()}
  //   </Text>
  // ) : false, [brandName]);

  const uppercaseHeader = React.useMemo(() => campaignName ? (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Icon type="material-community" name="bookmark" color={even ? 'white' : 'black'} size={scale(20)} /> */}
        <Text
          style={[styles.brand, even ? styles.brandEven : {}]}
        >
          {campaignName.toUpperCase()}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Icon type="material-community" name="map-marker" color={even ? 'white' : 'black'} size={scale(20)} /> */}
        <Text
          style={[styles.subtitle, even ? styles.subtitleEven : {}]}
        >
          {location.join(",")}
        </Text>
      </View>

    </View>
  ) : false, [campaignName]);

  const category = React.useMemo(() => campaignCategory ? (
    <View
      style={{ flexDirection: 'row', marginTop: spacing.small }}
    >
      {
        campaignCategory.map((category: string, index: number) => {
          return (
            <Text key={`tag${index}`} preset="default" text={category.trim()}
              style={[styles.categoryContainer, even ? styles.categoryContainerEven : {}]} />
          );
        })
      }
    </View>
  ) : false, [campaignCategory]);


  const image = React.useMemo(() => {
    if (campaignImage.includes('.svg')) {
      return (
        <View style={styles.svgImageContainer}>
          <SvgUri
            width="100%"
            height="100%"
            uri={campaignImage}
          />
        </View>
      )
    }

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

  // const route = link === "listing" ? "LiveCampaign" : 'CampaignDetails';

  return useObserver(() => (
    <TouchableScale
      style={[styles.slideInnerContainer, style]}
      activeScale={0.95}
      friction={10}
      onPress={() => navigateTo("CampaignDetails", { "campaignId": data.id })} >
      <View style={[styles.shadow, even ? styles.shadowEven : {}]} >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          {image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <LinearGradient
          colors={
            even ?
              [color.transparent, color.transparentBlack, color.palette.black]
              :
              [color.transparent, color.transparentWhite, color.palette.white]
          }
          style={[styles.textContainer, { top: 10 }]} />
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {/* <FastImage
            source={{ uri: campaignImage }}
            style={[styles.imageLogo, even ? styles.imageLogoEven : {}]}
          /> */}
          <View style={{ flexDirection: 'row' }} >
            {uppercaseHeader}
          </View>
          <Text
            style={[styles.description, even ? styles.descriptionEven : {}]}
          >
            {campaignDescription.trim()}
          </Text>
          {category}
        </View>
      </View>
    </TouchableScale >
  ))
}
