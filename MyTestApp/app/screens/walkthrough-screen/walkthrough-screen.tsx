import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet, StatusBar, Image } from "react-native"
import { spacing } from "../../theme"
import { Text } from "../../components/text"
import AppIntro from "rn-falcon-app-intro";
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import { useStores } from "../../models/root-store"
import { Loading } from "../../components/loading"

export interface WalkthroughScreenProps extends NavigationStackScreenProps<{}> {
}


export const WalkthroughScreen: NavigationStackScreenComponent<WalkthroughScreenProps> = observer(() => {

  const { authStore: { showLoading, walkthroughComplete } } = useStores();

  const doneBtnHandle = () => {
    walkthroughComplete();
  }

  return (
    // <Screen style={ROOT} preset="fixed">
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
      <AppIntro
        onDoneBtnClick={doneBtnHandle}
        onSkipBtnClick={doneBtnHandle}
      >
        <View style={[styles.slide, { backgroundColor: '#FFB45B', }]}>
          <View style={{}}>
            <Image source={require('../../components/header/light.png')} style={{ width: 300, height: 150, }} resizeMode="contain" />
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#A69EFA' }]}>
          <View style={{}}>
            <Image source={require('./img1.png')} style={{ width: 200, height: 200, marginBottom: spacing.tiny, }} />
          </View>
          <View style={{ flexDirection: 'row', }} >
            <Image source={require('./img2.png')} style={{ width: 100, height: 100, marginEnd: spacing.tiny, }} />
            <Image source={require('./img3.png')} style={{ width: 150, height: 150, }} />
          </View>
          <View level={10} style={{ marginTop: spacing.large }}><Text style={styles.text} preset="bold" text="Intro 1" /></View>
          <View level={15}><Text style={styles.description} preset="question" text="Some description" /></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#6FCF97' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }} >
            <Image source={require('./img4.png')} style={{ width: 150, height: 150, marginEnd: spacing.tiny, marginBottom: spacing.tiny }} />
            <Image source={require('./img5.png')} style={{ width: 100, height: 100, marginBottom: spacing.tiny }} />
          </View>
          <View>
            <Image source={require('./img6.png')} style={{ width: 200, height: 200, }} />
          </View>
          <View level={10} style={{ marginTop: spacing.large }}><Text style={styles.text} preset="bold" text="Intro 2" /></View>
          <View level={15}><Text style={styles.description} preset="question" text="Some description" /></View>
        </View>
      </AppIntro>

      {showLoading() && <Loading />}
    </View>
    // </Screen>
  )
})

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 40
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
});
