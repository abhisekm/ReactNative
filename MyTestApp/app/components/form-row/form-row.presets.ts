import { ViewStyle } from "react-native"
import { color, spacing } from "../../theme"
import { scale } from "../../utils/scale"

/**
 * The size of the border radius.
 */
const RADIUS = scale(8)

/**
 * The default style of the container.
 */
const ROOT: ViewStyle = {
  borderWidth: 1,
  borderColor: color.line,
  padding: spacing.medium,
}

/**
 * What each of the presets look like.
 */
export const PRESETS = {
  /**
   * Rounded borders on the the top only.
   */
  top: {
    ...ROOT,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomWidth: 0,
  },
  /**
   * No rounded borders.
   */
  middle: {
    ...ROOT,
    borderBottomWidth: 0,
  },
  /**
   * Rounded borders on the bottom.
   */
  bottom: {
    ...ROOT,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  /**
   * Rounded borders everywhere.
   */
  soloRound: {
    ...ROOT,
    borderRadius: RADIUS,
  },
  /**
   * Straight borders everywhere.
   */
  soloStraight: {
    ...ROOT,
  },
  /**
   * Transparent borders useful to keep things lined up.
   */
  clear: {
    ...ROOT,
    borderColor: color.transparent,
  },
  /**
  * Round border conatiner for input
  */
  inputContainer: {
    ...ROOT,
    borderRadius: scale(4),
    padding: 0,
    paddingHorizontal: spacing.small,
    marginTop: spacing.small,
    borderWidth: 2,
    backgroundColor: color.inputBackground,
    borderColor: color.borderColor
  },
}

/**
 * The names of the presets supported by FormRow.
 */
export type FormRowPresets = keyof typeof PRESETS
