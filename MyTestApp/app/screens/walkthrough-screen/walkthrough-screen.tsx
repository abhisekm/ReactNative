import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet, StatusBar, Image } from "react-native"
import { spacing } from "../../theme"
import { Text } from "../../components/text"
import AppIntro from "rn-falcon-app-intro";
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import { useStores } from "../../models/root-store"
import { Loading } from "../../components/loading"
import { scale } from "../../utils/scale"
import { normalisedFontSize } from "../../theme/fontSize"

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
        customStyles={customStyles}
      >
        <View style={[styles.slide, { backgroundColor: '#FFB45B', }]}>
          <View style={{}}>
            <Image source={require('../../res/images/light.png')} style={{ width: scale(300), height: scale(150), }} resizeMode="contain" />
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#A69EFA' }]}>
          <View style={{}}>
            <Image source={require('./img1.png')} style={{ width: scale(100), height: scale(100), marginBottom: spacing.tiny, }} />
          </View>
          <View style={{ flexDirection: 'row', }} >
            <Image source={require('./img2.png')} style={{ width: scale(100), height: scale(100), marginEnd: spacing.tiny, }} />
            <Image source={require('./img3.png')} style={{ width: scale(150), height: scale(150), }} />
          </View>
          <View level={10} style={{ marginTop: spacing.large }}><Text style={styles.text} preset="bold" text="Intro 1" /></View>
          <View level={15}><Text style={styles.description} preset="question" text="Some description" /></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#6FCF97' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }} >
            <Image source={require('./img4.png')} style={{ width: scale(150), height: scale(150), marginEnd: spacing.tiny, marginBottom: spacing.tiny }} />
            <Image source={require('./img5.png')} style={{ width: scale(100), height: scale(100), marginBottom: spacing.tiny }} />
          </View>
          <View>
            <Image source={require('./img6.png')} style={{ width: scale(200), height: scale(200), }} />
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

const customStyles = {
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pic: {
    width: scale(150),
    height: scale(150)
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: spacing.large,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: spacing.medium,
  },
  title: {
    color: '#fff',
    fontSize: normalisedFontSize.huge,
    paddingBottom: spacing.large,
  },
  description: {
    color: '#fff',
    fontSize: normalisedFontSize.extraLarge,
  },
  controllText: {
    color: '#fff',
    fontSize: normalisedFontSize.large,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: spacing.medium,
    height: spacing.medium,
    borderRadius: spacing.small,
    marginLeft: spacing.small,
    marginRight: spacing.small,
    marginTop: spacing.small,
    marginBottom: spacing.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSkip: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDots: {
    flexDirection: 'row',
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDoneButton: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeDotStyle: {
    backgroundColor: '#fff',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: spacing.large,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  dotContainer: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50)
  },
  btnSkipContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50)
  },
  nextButtonText: {
    fontSize: normalisedFontSize.extraLarge,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  full: {
    height: scale(80),
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: spacing.medium,
  },
  text: {
    color: '#fff',
    fontSize: normalisedFontSize.huge,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: normalisedFontSize.large,
  },
})