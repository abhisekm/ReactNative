import React from "react";
import { useStores } from "../../models/root-store";
import { View, ViewStyle, Image } from "react-native";
import { Screen } from "../../components/screen";
import styleSheet from "../../theme/styleSheet";
import { color, spacing } from "../../theme";

const logo = require('../../components/header/logo.png');

export const ResolveAuthScreen = (props) => {
  const { authStore: { silentSignIn } } = useStores()

  React.useEffect(() => { silentSignIn() }, []);


  const imageContainer: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: spacing.extraLarge,
    backgroundColor: color.transparent,
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <View style={styleSheet.view_full}>
      <Screen style={styleSheet.view_container} preset="scroll" backgroundColor={color.transparent} unsafe >
      </Screen>
      <View style={imageContainer} >
        <Image
          source={logo}
          style={{ height: 200, width: "100%" }}
          resizeMode='contain'
        />
      </View>
    </View>
  );
}
