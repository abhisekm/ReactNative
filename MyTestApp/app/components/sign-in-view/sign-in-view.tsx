import * as React from "react"
import { View, Image, ViewStyle, Dimensions, StyleSheet } from "react-native"
import { Text } from "../text"
import { scale, verticalScale } from "../../utils/scale";
import styleSheet from "../../theme/styleSheet";
import { spacing, color } from "../../theme";
import { normalisedFontSize } from "../../theme/fontSize";
import { Loading } from "../loading";
import { Screen } from "../../components/screen";
import { Button } from "../../components/button"
import { SocialIcon, Icon, Button as RNEButton } from "react-native-elements"
import { TranslateXView } from "../translate-x-view";
import { observer } from "mobx-react";
import { useStores } from "../../models/root-store";


export interface SignInViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}


/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const SignInView: React.FC<SignInViewProps> = observer((props) => {
  // grab the props
  const { style } = props

  const { width, height } = Dimensions.get("screen");
  const imageHeight = scale(0.3 * height);
  const imageWidth = 3.5 * imageHeight;

  const imageTop = require("../../res/images/top.png");
  const imageBottom = require("../../res/images/bottom.png");

  const {
    authStore: { errorMessage, signInFacebook, signInGoogle, showLoading },
    navigationStore: { navigateTo }
  } = useStores();

  return (
    <View style={[styleSheet.view_full, style]}>
      <Screen style={{ ...styleSheet.view_container }} preset="fixed" >

        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center' }} >
          <TranslateXView style={{ width: '100%' }} width={imageWidth} screenWidth={width} >
            <Image source={imageTop} style={{ width: imageWidth, height: imageHeight, resizeMode: 'stretch' }} />
          </TranslateXView>
          <TranslateXView width={imageWidth} screenWidth={width} reverse >
            <Image source={imageBottom} style={{ width: imageWidth, height: imageHeight, resizeMode: 'stretch' }} />
          </TranslateXView>
        </View>

        <Image
          source={require('../../res/images/logo.png')}
          style={{ height: verticalScale(50), width: '100%', marginVertical: spacing.medium }}
          resizeMode='contain'
        />

        <View style={{ padding: spacing.medium, flex: 1, justifyContent: 'flex-end' }}>

          <SocialIcon
            title="Continue With Facebook"
            button
            type="facebook"
            onPress={signInFacebook}
            style={styles.button}
            iconSize={scale(20)}
            fontStyle={{ fontSize: normalisedFontSize.normal }}
          />

          <SocialIcon
            title="Continue With Google"
            light
            button
            type="google"
            onPress={signInGoogle} style={styles.button}
            iconSize={scale(20)}
            fontStyle={{ fontSize: normalisedFontSize.normal }}
          />

          <Button
            preset="social"
            tx="homeScreen.emailSignIn"
            onPress={() => navigateTo("Login")}
            icon={<Icon type="feather" name="mail" color={color.palette.white} size={scale(20)} />}
            buttonStyle={styles.button}
            containerStyle={[styles.button, { flex: 0 }]}
            titleStyle={{ textAlignVertical: 'center' }}
          />

          {errorMessage ? <Text text={errorMessage} /> : null}

          <RNEButton
            title="Back to Campaigns"
            icon={<Icon name="ios-arrow-back" type="ionicon" color={color.primary} size={scale(16)} />}
            type="clear"
            titleStyle={{ color: color.primary, fontSize: normalisedFontSize.normal, paddingHorizontal: spacing.small, textAlignVertical: 'center' }}
            onPress={() => navigateTo("SampleCampaign")}
          />
        </View>
      </Screen>
      {showLoading() && <Loading />}
    </View>

  )
})


const styles = StyleSheet.create({
  slider: {
    flexGrow: 0,
    marginTop: spacing.small,
  },
  sliderContentContainer: {
  },
  button: {
    height: verticalScale(50)
  }
});

