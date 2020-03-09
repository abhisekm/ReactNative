import * as React from "react"
import { View, ViewStyle, Animated } from "react-native"

export interface TranslateXViewProps {
  /**
   * Screen width
   */
  screenWidth: number

  /**
   * Width of the image
   */
  width: number

  /**
   * reverse x-axis translation
   */
  reverse?: boolean

  /**
  * An optional style override useful for padding & margin.
  */
  style?: ViewStyle

  children: React.ReactNode
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function TranslateXView(props: TranslateXViewProps) {
  // grab the props
  const { screenWidth, width, reverse, style } = props

  const [animatedValue] = React.useState(new Animated.Value(0))  // Initial value for opacity: 0
  const diffX = screenWidth - width;

  const range = reverse ? [diffX, 0] : [0, diffX]

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          animatedValue,
          {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          animatedValue,
          {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true
          }
        ),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [])


  return (
    <Animated.View                 // Special animatable View
      style={[{
        ...style
      }, {
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: range
            })
          },
        ]
      }]}
    >
      {props.children}
    </Animated.View>
  );
}
