import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { Button } from "../../components/button"

export interface UserOnboardingSuccessScreenProps extends NavigationStackScreenProps<{}> {
}


export const UserOnboardingSuccessScreen: NavigationStackScreenComponent<UserOnboardingSuccessScreenProps> = observer((props) => {
  const { navigationStore: { navigateTo } } = useStores();

  return (
    <Screen style={{ ...styleSheet.view_container, justifyContent: 'center' }} preset="fixed">
      <View style={[styleSheet.card, styleSheet.shadow_16, { margin: spacing.medium }]}>
        <View style={{ marginVertical: spacing.medium, marginHorizontal: spacing.tiny }}>
          <Text preset="header" text="Thanks for Signing Up!" style={{ textAlign: 'center' }} />
          <Text
            preset="default"
            style={{ marginTop: spacing.large, textAlign: 'center' }}
            text="Kindly answer few more qustions that’ll help us find more suitable Campigns for you." />
        </View>
        <View style={{ marginTop: spacing.medium, flexDirection: 'row-reverse' }} >
          <Button
            preset="raised"
            text="Continue"
            onPress={() => { navigateTo('SocialMedia') }}
          />
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: spacing.medium, left: 0, right: 0 }}>
        <Button
          preset="link"
          textStyle={{ color: color.primary }}
          style={{ alignItems: 'center' }}
          text="Continue to dashboard >"
          onPress={() => { navigateTo('dashboardFlow') }}
        />
      </View>
    </Screen>
  )
})

UserOnboardingSuccessScreen.navigationOptions = {
  header: null
}
