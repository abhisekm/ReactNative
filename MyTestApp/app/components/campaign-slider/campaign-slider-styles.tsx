import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, spacing } from '../../theme';
import { scale } from '../../utils/scale';
import { normalisedFontSize } from '../../theme/fontSize';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const slideHeight = viewportHeight * 0.36;
export const slideWidth = wp(75);
export const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 0, // needed for shadow
  },
  shadow: {
    elevation: 5,
    backgroundColor: color.palette.white,
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: itemHorizontalMargin,
    shadowColor: color.palette.angry,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  shadowEven: {
    backgroundColor: color.palette.black,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: itemHorizontalMargin,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: color.palette.black
  },
  svgImageContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.medium,
    bottom: itemHorizontalMargin,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  imageLogo: {
    position: 'absolute',
    height: scale(50),
    width: scale(50),
    top: scale(-30),
    start: scale(10),
    backgroundColor: color.palette.white,
    resizeMode: 'contain',
    borderColor: color.palette.white,
    borderWidth: 4,
    borderRadius: entryBorderRadius
  },
  imageLogoEven: {
    borderColor: color.palette.black
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: color.palette.black
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
  },
  title: {
    color: 'black',
    fontSize: normalisedFontSize.small,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  brand: {
    color: 'black',
    fontSize: normalisedFontSize.small,
    paddingStart: 0,
    textAlignVertical: 'bottom',
    marginBottom: spacing.tiny,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  brandEven: {
    color: 'white'
  },
  subtitle: {
    fontStyle: 'italic',
    marginBottom: spacing.tiny,
    color: color.palette.grey10,
    fontSize: normalisedFontSize.small,
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 1.0)'
  },
  description: {
    marginTop: spacing.tiny,
    marginBottom: spacing.tiny,
    color: color.palette.grey10,
    fontSize: normalisedFontSize.small,
  },
  descriptionEven: {
    color: 'rgba(255, 255, 255, 1.0)'
  },
  buttonMask: {
    paddingHorizontal: spacing.large,
    borderRadius: spacing.large,
    borderWidth: 2,
    borderColor: color.primary
  },
  buttonMaskEven: {
    borderColor: color.palette.white
  },
  buttonText: {
    color: color.primary
  },
  buttonTextEven: {
    color: color.palette.white
  },
  categoryContainer: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: color.primary,
    borderWidth: 2,
    color: 'black',
    fontSize: normalisedFontSize.small,
    borderRadius: spacing.medium,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
  },
  categoryContainerEven: {
    color: 'white',
  }
});