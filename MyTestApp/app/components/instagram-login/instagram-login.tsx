import * as React from "react";
import { View, Alert, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { InstagramLoginProps } from "./instagram-login.props";
import qs from 'qs';
import { WebView } from "react-native-webview";
import { Icon, SocialIcon } from 'react-native-elements';
import { color } from "../../theme";
import { Api } from "../../services/api";

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const InstagramLogin: React.FunctionComponent<InstagramLoginProps> = (props: InstagramLoginProps) => {
  // grab the props
  const {
    appId,
    redirectUrl,
    scopes,
    onLoginFailure,
    onLoginSuccess,
    renderClose,
    onClose,
    containerStyle,
    wrapperStyle,
    webviewStyle,
    closeStyle,
    visibility,
    ...rest
  } = props

  //initial useReducer hooks
  const initialState = { modalVisibility: false, key: 1 }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'show':
        return { ...state, modalVisibility: true };
      case 'hide':
        return { ...state, modalVisibility: false };
      case 'incrementKey':
        return { ...state, key: state.key + 1 };
      default:
        throw new Error('Unexpected State');
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);


  const _onNavigationStateChange = async (webViewState) => {
    const { url } = webViewState
    if (webViewState.title === 'Instagram' && webViewState.url === 'https://www.instagram.com/') {
      dispatch({ type: 'incrementKey' });
    }
    if (url && url.startsWith(redirectUrl)) {

      const match = url.match(/(#|\?)(.*)(#_)/);
      const results = qs.parse(match[2]);
      dispatch({ type: 'hide' });
      if (results.code) {
        onLoginSuccess(results.code);
      } else {
        onLoginFailure(results);
      }
    }
  }

  const patchPostMessageJsCode = `(${String(function () {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function (message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function () {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
  })})();`

  const _onMessage = (reactMessage) => {
    try {
      const json = JSON.parse(reactMessage.nativeEvent.data)
      if (json && json.error_type) {
        dispatch({ type: 'show' });
        onLoginFailure(json);
      }
    } catch (err) { }
  }

  const _renderClose = () => {
    if (renderClose)
      return renderClose;

    return (
      <Icon name='close' color={color.palette.white} />
    )
  }

  const _onClose = () => {
    if (onClose) onClose()
    dispatch({ type: 'hide' });
  }

  const renderWebview = () => {
    return (
      <WebView
        key={state.key}
        style={[styles.webView, webviewStyle]}
        source={{ uri: `https://api.instagram.com/oauth/authorize/?app_id=${appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=${scopes.join(',')}` }}
        // scalesPageToFit
        startInLoadingState
        onNavigationStateChange={_onNavigationStateChange}
        onError={_onNavigationStateChange}
        // onLoadEnd={this._onLoadEnd.bind(this)}
        onMessage={_onMessage}
        injectedJavaScript={patchPostMessageJsCode}
        sharedCookiesEnabled={false}
        thirdPartyCookiesEnabled={false}
        domStorageEnabled={false}
      />
    )
  }

  console.log(state)

  return (
    <View>
      <Modal
        animationType={'slide'}
        visible={state.modalVisibility}
        onRequestClose={() => dispatch({ type: 'hide' })}
        transparent
      >
        <View style={[styles.container, containerStyle]}>
          <View style={[styles.wrapper, wrapperStyle]}>{renderWebview()}</View>
          <TouchableOpacity
            onPress={_onClose}
            style={[styles.close, closeStyle]}
            accessibilityComponentType={'button'}
            accessibilityTraits={['button']}
          >
            {_renderClose()}
          </TouchableOpacity>
        </View>
      </Modal >

      <SocialIcon
        title="Sign In with Instagram"
        light
        button
        type="instagram"
        onPress={() => dispatch({ type: 'show' })} />
    </View>
  )
}

const defaultProps = {
  redirectUrl: 'https://google.com',
  scopes: ['user_profile', 'user_media'],
  onLoginSuccess: (token) => {
    Alert.alert(
      'Alert Title',
      'Token: ' + token,
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    )
  },
  onLoginFailure: (failureJson) => {
    console.debug(failureJson)
  },
  visubility: true,
}

InstagramLogin.defaultProps = defaultProps

const styles = StyleSheet.create({
  webView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 0, 0.6)',
  },
  close: {
    position: 'absolute',
    top: 35,
    right: 5,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  imgClose: {
    width: 30,
    height: 30,
  }
})
