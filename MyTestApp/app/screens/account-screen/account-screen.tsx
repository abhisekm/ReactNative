import * as React from "react"
import { observer } from "mobx-react"
import { View, ViewStyle, Platform } from "react-native"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon } from "react-native-elements"
import styleSheet from "../../theme/styleSheet"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { UserProfile } from "../../components/user-profile"
import { scale } from "../../utils/scale"
import { UserProfileCompactDisplay } from "../../components/user-profile-compact-display"

export interface AccountScreenProps extends NavigationTabScreenProps<{}> {
}


export const AccountScreen: NavigationBottomTabScreenComponent<AccountScreenProps> = observer((props) => {
  const {
    userInfoStore: { isEditing },
    authStore: { isSignedIn },
    navigationStore: { navigateTo }
  } = useStores();

  // const validateAndProceed = React.useCallback(() => {
  //   updateCalculated();

  //   const json = {
  //     gender: gender,
  //     name: name,
  //     ig_name: igUsername,
  //     interest: selectedInterests,
  //     accounts: mediaAccounts()
  //   }

  //   alert(`All valid\n\nGender - ${gender}\n\nName - ${name}\n\nIG nick - ${igUsername}\n\nInterest - ${selectedInterests}\n\nSocial Accounts\n${mediaAccounts()}`);
  // }, [name, gender, selectedInterests]);

  const DEFAULT_MARGIN = {
    margin: spacing.medium,
    marginTop: Platform.select({
      ios: spacing.extraLarge,
    })
  } as ViewStyle;

  if (isSignedIn()) {
    return (
      <View style={styleSheet.view_full}>
        {isEditing ?
          <UserProfile /> :
          <UserProfileCompactDisplay />
        }
      </View>
    );
  } else {
    return (
      <View style={styleSheet.view_full}>
        <Screen
          style={{ ...styleSheet.view_container, justifyContent: "center", }}
          preset="fixed"
          unsafe
        >

          <Button
            preset="raised"
            text="Log In"
            onPress={() => navigateTo("loginFlow")}
          // onPress={() => navigateTo("onboardingFlow")}
          />
        </Screen>
      </View>
    );
  }
})


AccountScreen.navigationOptions = {
  title: 'Profile',
  tabBarIcon: ({ tintColor }) => <Icon name='settings' color={tintColor} size={scale(24)} />
}
