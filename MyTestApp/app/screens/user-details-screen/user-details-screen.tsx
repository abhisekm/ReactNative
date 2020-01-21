import * as React from "react"
import { observer } from "mobx-react"
import { Image, View, ViewStyle, Alert } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, spacing } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { Button } from "../../components/button"
import { useStores } from "../../models/root-store"
import { UserProfile } from "../../components/user-profile"
import { NavigationSwitchScreenComponent, NavigationSwitchScreenProps } from "react-navigation"
import { Loading } from "../../components/loading"
import { scale } from "../../utils/scale"

export interface UserDetailsScreenProps extends NavigationSwitchScreenProps<{}> {
}

const DEFAULT_MARGIN = { margin: spacing.small, } as ViewStyle;

export const UserDetailsScreen: NavigationSwitchScreenComponent<UserDetailsScreenProps> = observer(() => {
  const {
    userInfoStore: { name, gender, selectedInterests, igUsername, mediaAccounts, isValid, updateCalculated },
    authStore: { showLoading, userDetailesEntered }
  } = useStores();

  const validateAndProceed = React.useCallback(() => {
    updateCalculated();
    if (!isValid()) {
      return;
    }

    Alert.alert(
      "Validate",
      `All valid\n\nGender - ${gender}\n\nName - ${name}\n\nIG nick - ${igUsername}\n\nInterest - ${selectedInterests}\n\nSocial Accounts\n${mediaAccounts()}`,
      [
        {
          text: "Ok",
          onPress: userDetailesEntered
        }
      ]
    );

  }, [name, gender, selectedInterests]);

  return (
    <View style={styleSheet.view_full}>
      <Screen
        style={{ ...styleSheet.view_container, justifyContent: "center", }}
        preset="scroll"

      >

        <Text preset="header" text="Almost done ..." style={[DEFAULT_MARGIN, { color: color.primary, }]} />

        <UserProfile />

        <Button
          preset="raised"
          text="Continue"
          containerStyle={{ marginHorizontal: spacing.large }}
          onPress={validateAndProceed}
        />
      </Screen>

      {showLoading() && <Loading />}
    </View>
  );
})

// UserDetailsScreen.navigationOptions = {
//   headerTitle: () => {
//     return (
//       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
//         <Image
//           source={require('../../components/header/light.png')}
//           style={{ height: 25, width: 110 }}
//           resizeMode='contain'
//         />
//       </View>
//     )
//   }
// }