// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import React, { useState, useEffect } from "react"
import { AppRegistry, YellowBox, View, Alert, PushNotificationIOS, Platform } from "react-native"
import { RootNavigator, setNavigator } from "./navigation"
import { StorybookUIRoot } from "../storybook"
import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"

import { AppTheme } from "./theme"
import { ThemeProvider } from "react-native-elements"
import { firebase, FirebaseMessagingTypes } from "@react-native-firebase/messaging"
import NotifService from "./utils/notifService"

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
])

/**
 * Storybook still wants to use ReactNative's AsyncStorage instead of the
 * react-native-community package; this causes a YellowBox warning. This hack
 * points RN's AsyncStorage at the community one, fixing the warning. Here's the
 * Storybook issue about this: https://github.com/storybookjs/storybook/issues/6078
 */
const ReactNative = require("react-native")
Object.defineProperty(ReactNative, "AsyncStorage", {
  get(): any {
    return require("@react-native-community/async-storage").default
  },
})


/**
 * This is the root component of our app.
 */
const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  let unsubscribePushMessage;

  const onRegister = (token) => {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
  }

  const onNotif = (notif) => {
    console.log(notif);

    if (notif.foregroound)
      Alert.alert(notif.title, notif.message);

    if (Platform.OS == "ios")
      notif.finish(PushNotificationIOS.FetchResult.NoData);
  }

  const checkPushNotificationPermission = async (_rootStore: RootStore) => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken(_rootStore);
    } else {
      requestPermission(_rootStore);
    }
  }

  const getToken = async (_rootStore: RootStore) => {
    let fcmToken = _rootStore.authStore.getToken();

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        _rootStore.authStore.setToken(fcmToken);
      }
    }
  }

  const requestPermission = async (_rootStore: RootStore) => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken(_rootStore);
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  const registerListeners = () => {
    unsubscribePushMessage = firebase.messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('FCM Message Data:', remoteMessage.data);
    })
  }

  const storeRootStore = async (store: RootStore) => {
    await setRootStore(store);

    return store;
  }

  useEffect(() => {
    setupRootStore()
      .then(storeRootStore).catch((reason) => console.log('setup error - ', reason))
      .then(checkPushNotificationPermission).catch((reason) => console.log('push error - ', reason))
      .then(registerListeners)
      .then(() => new NotifService(onRegister, onNotif));

    return () => {
      unsubscribePushMessage();
    }
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  // otherwise, we're ready to render the app
  // return (
  //   <View style={{ flex: 1 }} >
  //     <RootStoreProvider value={rootStore}>
  //       <BackButtonHandler canExit={canExit}>
  //         <StatefulNavigator />
  //       </BackButtonHandler>
  //     </RootStoreProvider>
  //   </View>
  // )

  return (
    <View style={{ flex: 1 }} >
      <RootStoreProvider value={rootStore}>
        <ThemeProvider theme={AppTheme}>
          <RootNavigator ref={(navigation) => setNavigator(navigation)} />
        </ThemeProvider>
      </RootStoreProvider>
    </View>
  )
}

export default App

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "MyTestApp"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // Update a users messages list using AsyncStorage
  console.log('background msg - ', remoteMessage);

});

