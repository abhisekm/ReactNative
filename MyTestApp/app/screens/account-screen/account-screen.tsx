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

export interface AccountScreenProps extends NavigationTabScreenProps<{}> {
}


export const AccountScreen: NavigationBottomTabScreenComponent<AccountScreenProps> = observer((props) => {
  const {
    userInfoStore: { name, gender, selectedInterests, igUsername, mediaAccounts, isValid, updateCalculated },
    authStore: { logout }
  } = useStores();

  const validateAndProceed = React.useCallback(() => {
    updateCalculated();
    if (!isValid()) {
      return;
    }
    const json = {
      gender: gender,
      name: name,
      ig_name: igUsername,
      interest: selectedInterests,
      accounts: mediaAccounts()
    }

    alert(`All valid\n\nGender - ${gender}\n\nName - ${name}\n\nIG nick - ${igUsername}\n\nInterest - ${selectedInterests}\n\nSocial Accounts\n${mediaAccounts()}`);
  }, [name, gender, selectedInterests]);

  const DEFAULT_MARGIN = {
    margin: spacing.medium,
    marginTop: Platform.select({
      ios: spacing.extraLarge,
    })
  } as ViewStyle;

  return (
    <View style={styleSheet.view_full}>
      <Screen
        style={{ ...styleSheet.view_container, justifyContent: "center", }}
        preset="scroll"
        unsafe
      >

        <View style={[DEFAULT_MARGIN, { flexDirection: "row", alignItems: "center" }]} >
          <Text preset="header" text={`Hi ${name}`} style={{ color: color.primary, flex: 1, marginEnd: spacing.small }} />
          <Button preset="raised" text="Logout" onPress={logout} />
        </View>
        <View style={{ height: 20 }} />


        <UserProfile showName={false} />

        <Button
          preset="raised"
          text="Save"
          onPress={validateAndProceed}
        />
      </Screen>
    </View>
  );
})


AccountScreen.navigationOptions = {
  title: 'Profile',
  tabBarIcon: <Icon name='settings' />
}
