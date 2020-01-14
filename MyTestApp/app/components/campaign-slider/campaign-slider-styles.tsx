import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, spacing } from '../../theme';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    flex: 10,
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: color.palette.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
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
    height: 50,
    width: 50,
    top: -30,
    start: 10,
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
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: color.palette.black
  },
  title: {
    color: color.text,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  brand: {
    color: color.text,
    fontSize: 14,
    paddingStart: 50,
    marginTop: -15,
    marginBottom: spacing.medium,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  brandEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    color: color.palette.grey8,
    fontSize: 12,
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