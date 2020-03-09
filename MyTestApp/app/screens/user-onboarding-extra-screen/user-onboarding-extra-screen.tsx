import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { Spacer } from "../../components/Spacer"
import { normalisedFontSize } from "../../theme/fontSize"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { CampaignTypeSelector } from "../../components/campaign-type-selector"
import { ButtonGroup } from "react-native-elements"

export interface UserOnboardingExtraScreenProps extends NavigationStackScreenProps<{}> {
}

export const UserOnboardingExtraScreen: NavigationStackScreenComponent<UserOnboardingExtraScreenProps> = observer(() => {
  const {
    navigationStore: { navigateTo },
    userInfoStore: {
      age, setAge,
      renumerationPerGig, setRenumerationGig,
      renumerationPerPhysicalShot, setRenumerationShoot,
      workedOnCampaignBefore, setWorkedOnCampaignBefore,
      interestedCampaignType, toggleCampaignType,
      saveInfluencerProfile,
    },
  } = useStores()

  const [selectedIndex, setSelectedIndex] = React.useState(workedOnCampaignBefore ? 1 : 0);

  const buttons = ['Yes', 'No'];

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setWorkedOnCampaignBefore(selectedIndex == 1);
  }

  console.log(`age - ${age}, gig - ${renumerationPerGig}, shot - ${renumerationPerPhysicalShot}`)

  return (
    <Screen style={{ ...styleSheet.view_container, paddingVertical: spacing.medium, paddingHorizontal: spacing.medium }} preset="scroll">
      <Text
        preset="fieldLabel"
        text="Age" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        keyboardType="numeric"
        value={age == NaN ? '' : age.toString()} onChangeText={(text) => setAge(Number.parseInt(text.replace(/[^0-9]/g, '')))}
        placeholder="24"
      />

      <Spacer />

      {/* <Text
        preset="fieldLabel"
        text="Brands products you will NOT recommend" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={igFollower} onChangeText={setIgFollower}
        placeholder="Enter brand name or category"
      />

      <Spacer /> */}

      <Text
        preset="fieldLabel"
        text="Expected remuneration per gig" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        keyboardType="numeric"
        value={renumerationPerGig == NaN ? '' : renumerationPerGig.toString()} onChangeText={(text) => setRenumerationGig(Number.parseInt(text.replace(/[^0-9]/g, '')))}
        placeholder="Enter amount here"
      />

      <Text
        style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
        text="A couple of posts + story"
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Expected remuneration per physical presence for a shoot" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        keyboardType="numeric"
        value={renumerationPerPhysicalShot == NaN ? '' : renumerationPerPhysicalShot.toString()} onChangeText={(text) => setRenumerationShoot(Number.parseInt(text.replace(/[^0-9]/g, '')))}
        placeholder="Enter amount here"
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Worked in a campaign before" />

      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Campaigns you are interested to work in" />

      <CampaignTypeSelector selectedCampaign={interestedCampaignType} toggleCampaignType={toggleCampaignType} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          preset="outline"
          text="Ask Me Later"
          onPress={() => { navigateTo("dashboardFlow") }}
        />
        <Button
          preset="raised"
          text="Finish"
          onPress={() => { navigateTo("dashboardFlow") }}
        />
      </View>

    </Screen>
  )
})


UserOnboardingExtraScreen.navigationOptions = {
  headerTitle: () => <Text text="Almost There" preset="header" style={{ color: 'white', flex: 1, paddingHorizontal: spacing.medium }} />,
  headerLeft: null
}