import * as React from "react"
import { observer } from "mobx-react"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { View } from "react-native"
import { SignInView } from "../../components/sign-in-view"

interface Props extends NavigationStackScreenProps {
}


export const HomeScreen: NavigationStackScreenComponent<Props> = observer(() => {
  return (
    <View style={styleSheet.view_full}>
      <SignInView />
    </View>
  )
})


HomeScreen.navigationOptions = {
  // headerTitle: () => {
  //   return (
  //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
  //       <Image
  //         source={require('../../res/images/light.png')}
  //         style={{ height: 25, width: 100 }}
  //         resizeMode='contain'
  //       />
  //     </View>
  //   )
  // },
  // headerTitleContainerStyle: {
  //   flex: 1,
  // },
  // headerRight: () => {
  //   return <View />
  // }
  header: null,
}