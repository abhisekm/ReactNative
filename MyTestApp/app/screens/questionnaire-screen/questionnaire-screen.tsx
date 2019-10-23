import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationSwitchScreenProps, NavigationSwitchScreenComponent } from "react-navigation"
export interface QuestionnareScreenProps extends NavigationSwitchScreenProps<{}> {
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const QuestionnaireScreen: NavigationSwitchScreenComponent<QuestionnareScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="questionnaireScreen.header" />
    </Screen>
  )
})
