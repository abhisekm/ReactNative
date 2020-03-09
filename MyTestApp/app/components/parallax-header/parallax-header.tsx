import * as React from "react"
import { View, ViewStyle, Animated, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native"
import { spacing, color } from "../../theme";
import { Icon, Divider } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { scale as s, verticalScale as vs } from "../../utils/scale"
import { normalisedFontSize } from "../../theme/fontSize";
import LinearGradient from 'react-native-linear-gradient';
import { Text } from "../text";


export interface ParallaxHeaderProps {
  /**
   * The text to display
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  location?: string

  description?: string

  height?: number

  headerHeight?: number

  parallaxHeight?: number

  onBackPress?: () => void

  onRefresh?: () => void

  animatedValue?: Animated.Value
}


const isIos = Platform.OS === "ios";

const backArrowIcon = (onPress: () => void) =>
  isIos
    ?
    <Icon color='white' name='md-arrow-back' type='ionicons' onPress={onPress} Component={TouchableOpacity} />
    :
    <Icon color='white' name='arrow-back' type='material' onPress={onPress} Component={TouchableOpacity} />;


const refreshIcon = (onPress: () => void) =>
  isIos
    ?
    <Icon color='white' name='ios-refresh' type='ionicons' onPress={onPress} Component={TouchableOpacity} />
    :
    <Icon color='white' name='refresh' type='material' onPress={onPress} Component={TouchableOpacity} />;

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function ParallaxHeader(props: ParallaxHeaderProps) {
  // grab the props
  const {
    text,
    style,
    location,
    description,
    height = 250,
    headerHeight = 60,
    parallaxHeight = 250,
    animatedValue = new Animated.Value(0),
    onBackPress,
    onRefresh,
    ...rest } = props

  const window = Dimensions.get('window');

  const textStyle = {}

  const avatarScale = animatedValue.interpolate({
    inputRange: [0, parallaxHeight / 2, parallaxHeight - headerHeight],
    outputRange: [0.8, 0.6, 0.5],
    extrapolateRight: 'clamp'
  });

  const avatarTranslateX = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
    outputRange: [0, window.width],
    extrapolate: 'clamp'
  });

  const avatarTranslateY = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
    outputRange: [0, headerHeight],
    extrapolateRight: 'clamp'
  });

  const textScale = animatedValue.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1.0, 0.8],
    extrapolateRight: 'clamp'
  });

  const textTranslateX = animatedValue.interpolate({
    inputRange: [0, headerHeight / 4],
    outputRange: [0, 0],
    extrapolateRight: 'clamp'
  });

  const textTranslateY = animatedValue.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [-10, headerHeight / 2 * 0.8],
    extrapolateRight: 'clamp'
  });

  const textTranslateYScrollOut = animatedValue.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [-10, -100],
    extrapolateRight: 'clamp'
  });


  const opacity = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight - 50, parallaxHeight - headerHeight],
    outputRange: [0, 0.9, 1],
    extrapolate: 'clamp'
  });

  const fadeOut = animatedValue.interpolate({
    inputRange: [0, headerHeight / 2],
    outputRange: [1, 0.3],
    extrapolate: 'extend'
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
    outputRange: [1, 1],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, (parallaxHeight - headerHeight) / 4],
    outputRange: [headerHeight, 0],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  let wrapperStyle = {
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Animated.View style={[styles.wrapper, wrapperStyle]} pointerEvents="box-none">
      <Animated.View style={[styles.background, { opacity }]} pointerEvents="box-none" />

      <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* {
            avatarSource &&
            <Animated.View style={[styles.avatarContainer, {
              transform: [
                { scale: avatarScale },
                { translateX: avatarTranslateX },
                { translateY: avatarTranslateY }
              ]
            }]}>
              <FastImage
                style={styles.avatar}
                resizeMode='contain'
                source={{ uri: avatarSource }}
              />
            </Animated.View>
          } */}
          <Animated.Text
            style={[
              styles.name,
              {
                transform: [
                  { scale: textScale },
                  { translateX: textTranslateX },
                  { translateY: textTranslateY }
                ]
              }
            ]}
          >
            {text.toUpperCase()}
          </Animated.Text>
          <Animated.View
            style={[
              styles.locationContainer,
              { opacity: fadeOut, flex: 1 },
              {
                transform: [
                  { scale: textScale },
                  { translateX: textTranslateX },
                  { translateY: textTranslateY }
                ]
              }
            ]}
            pointerEvents="box-none"
          >
            <Divider style={{ backgroundColor: 'white', marginVertical: spacing.medium }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon name="location" type="entypo" size={18} containerStyle={{ marginEnd: spacing.small }} color={color.palette.white} />
              <Text text={location} preset="default" style={{ color: 'white' }} />
            </View>
            <Text text={description.trim()} preset="default" style={styles.description} />
          </Animated.View>
        </View>
      </Animated.View>

      {
        onBackPress &&
        <View key="fixed-header-left" style={{ position: 'absolute', left: 10, height: 70, justifyContent: 'center' }}>
          {backArrowIcon(onBackPress)}
        </View>
      }

      {
        onRefresh &&
        <View key="fixed-header-right" style={{ position: 'absolute', right: 10, height: 70, justifyContent: 'center' }}>
          {refreshIcon(onRefresh)}
        </View>
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(51,51,51,1)'
  },
  header: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  name: {
    color: '#fff',
    fontSize: normalisedFontSize.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: spacing.small,
    backgroundColor: 'transparent',
    textAlignVertical: 'center'
  },
  locationContainer: {
    marginHorizontal: spacing.medium,
  },
  location: {
    color: '#fff',
    fontSize: normalisedFontSize.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: spacing.small,
    backgroundColor: 'transparent',
    textAlignVertical: 'center'
  },
  descriptionContainer: {
    flex: 1,
    borderWidth: 1,
    marginHorizontal: spacing.medium,
  },
  description: {
    color: '#fff',
    fontSize: normalisedFontSize.normal,
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: spacing.small,
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    marginTop: spacing.large,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderColor: color.palette.white,
    borderWidth: 4,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: color.palette.white,
    borderColor: color.palette.white,
    borderWidth: 4,
    borderRadius: 8,
  }
})
