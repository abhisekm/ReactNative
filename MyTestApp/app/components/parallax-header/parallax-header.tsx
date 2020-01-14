import * as React from "react"
import { View, ViewStyle, Animated, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native"
import { spacing, color } from "../../theme";
import { Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";

export interface ParallaxHeaderProps {
  /**
   * The text to display
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  avatarSource: string

  height?: number

  headerHeight?: number

  parallaxHeight?: number

  onBackPress?: () => {}

  animatedValue?: Animated.Value
}


const isIos = Platform.OS === "ios";

const backArrowIcon = (onPress: () => {}) =>
  isIos
    ?
    <Icon color='white' name='md-arrow-back' type='ionicons' onPress={onPress} Component={TouchableOpacity} />
    :
    <Icon color='white' name='arrow-back' type='material' onPress={onPress} Component={TouchableOpacity} />;

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
    avatarSource,
    height = 250,
    headerHeight = 60,
    parallaxHeight = 250,
    animatedValue = new Animated.Value(0),
    onBackPress,
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
    outputRange: [0, -10],
    extrapolateRight: 'clamp'
  });

  const textTranslateY = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
    outputRange: [-10, -headerHeight * 1.5],
    extrapolateRight: 'clamp'
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight - 50, parallaxHeight - headerHeight],
    outputRange: [0, 0.9, 1],
    extrapolate: 'clamp'
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
    outputRange: [1, 0.8],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, parallaxHeight - headerHeight],
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
            {/* <Text
              preset="header"
              text={"who lets the dogs out lorem ipsum".toUpperCase()}
              numberOfLines={1}
              style={{
                color: 'white',
                flex: 1,
                textAlign: 'center',
                marginHorizontal: spacing.small,
                borderWidth: 1,
                borderColor: 'black',
                flexWrap: "nowrap"
              }} /> */}
            {text.toUpperCase()}
          </Animated.Text>
        </View>
      </Animated.View>
      {
        onBackPress &&
        <View key="fixed-header" style={{ position: 'absolute', left: 10, height: 70, justifyContent: 'center' }}>
          {backArrowIcon(onBackPress)}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: spacing.small,
    backgroundColor: 'transparent',
    maxHeight: 80,
    minHeight: 80,
    textAlignVertical: 'center'
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
