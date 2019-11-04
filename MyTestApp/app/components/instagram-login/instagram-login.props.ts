import { ViewStyle } from "react-native";

export interface InstagramLoginProps {
  /**
   * App id of instagram client.
   */
  appId: string

  /**
   * Redirect url after login success
   */
  redirectUrl: string

  /**
   * Login scopes
   */
  scopes?: string[]

  /**
  * hide/ show modal view
  */
  visibility?: boolean

  /**
  * On login success callback
  */
  onLoginSuccess?: (token: any) => void

  /**
  * On login success failure
  */
  onLoginFailure?: (data: any) => void

  /**
  * Close Image
  */
  renderClose?: React.Component

  /**
  * On click close
  */
  onClose?: () => void

  /**
  * An optional style override useful for padding & margin.
  */
  containerStyle?: ViewStyle | ViewStyle[]

  /**
  * An optional style override useful for padding & margin.
  */
  wrapperStyle?: ViewStyle | ViewStyle[]

  /**
  * An optional style override useful for padding & margin.
  */
  closeStyle?: ViewStyle | ViewStyle[]

  /**
  * An optional style override useful for padding & margin.
  */
  webviewStyle?: ViewStyle | ViewStyle[]
}