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
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: color.palette.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
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
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: color.palette.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: color.palette.black
  },
  title: {
    color: color.text,
    fontSize: normalisedFontSize.small,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  brand: {
    color: color.text,
    fontSize: normalisedFontSize.small,
    paddingStart: scale(50),
    marginTop: scale(-15),
    marginBottom: spacing.tiny,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  brandEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: spacing.tiny,
    color: color.palette.grey8,
    fontSize: normalisedFontSize.small,
    fontStyle: 'italic'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
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
  }
});