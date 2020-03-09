import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { spacing, color } from "../../theme";
import { Icon } from "react-native-elements";
import { scale } from "../../utils/scale";

export interface ProfileListItemProps {
  /**
   * title text
   */
  title: string

  /**
   * sub title text
   */
  subtitle: string

  /**
   * show top divider (default - false)
   */
  topDivider?: boolean

  /**
   * show bottom divider (default - true)
   */
  bottomDivider?: boolean

  /**
   * show / hide the icon . Default is hidden
   */
  showIcon?: boolean
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function ProfileListItem(props: ProfileListItemProps) {
  // grab the props
  const { title, subtitle, topDivider = false, bottomDivider = true, showIcon = false, ...rest } = props

  const DEFAULT_STYLE: ViewStyle = {
    borderTopWidth: topDivider ? 1 : 0,
    borderBottomWidth: bottomDivider ? 1 : 0,
    backgroundColor: color.transparent,
    padding: spacing.medium
  };

  return (
    <View style={DEFAULT_STYLE} {...rest}>
      <View style={{ flexDirection: "row-reverse", alignItems: 'center' }}>
        {showIcon && <Icon name="edit" type="feather" size={scale(24)} color={color.primary} />}
        <View style={{ flex: 1 }}>
          <Text text={title} preset="fieldLabel" />
          <Text text={subtitle} preset="question" />
        </View>
      </View>
    </View>
  )
}
