import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View, Image } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import { NavigationParams } from "react-navigation"
import WebView from "react-native-webview"

export interface CampaignDetailsScreenProps extends NavigationStackScreenProps<{}> {
}

export interface CampaignDetailsNavigationParams extends NavigationParams {
  campaignId: string,
  campaignLink: string
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const CampaignDetailsScreen: NavigationStackScreenComponent<CampaignDetailsNavigationParams, CampaignDetailsScreenProps> = observer((props) => {

  const { navigation } = props;

  // const { someStore } = useStores()
  return (
    // <Screen style={ROOT} preset="scroll">
    //   <Text preset="header" text={navigation.getParam('campaignId', 'No Id')} />
    // </Screen>

    <View style={{ flex: 1 }}>
      <WebView
        startInLoadingState
        source={{ uri: navigation.getParam("campaignLink", "https://www.immersify.com") }}
      />
    </View>
  )
})

CampaignDetailsScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
        <Image
          source={require('../../components/header/light.png')}
          style={{ height: 25, width: 100 }}
          resizeMode='contain'
        />
      </View>
    )
  },
  headerTitleContainerStyle: {
    flex: 1,
  },
  headerRight: () => {
    return <View />
  }
}