import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { observer } from "mobx-react"
import { spacing, color } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { Avatar } from "react-native-elements"
import { normalisedFontSize } from "../../theme/fontSize"
import { Button } from "../button"
import { useStores } from "../../models/root-store"
import { ProfileListItem } from "../profile-list-item"
import { Gender } from "../../models/user-details"
import { firebase } from "@react-native-firebase/auth"
import { Screen } from "../../components/screen"
import { clone, applySnapshot, getSnapshot } from "mobx-state-tree"
import { CampaignTypeSelector } from "../campaign-type-selector"

export interface UserProfileCompactDisplayProps {

}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const UserProfileCompactDisplay: React.FC<UserProfileCompactDisplayProps> = observer((props) => {
  const DEFAULT_MARGIN = { marginTop: spacing.tiny, marginHorizontal: spacing.small, marginBottom: 0 } as ViewStyle;
  const CARD_WITHOUT_MARGIN = [styleSheet.card, styleSheet.shadow_4] as ViewStyle;

  const {
    userInfoStore,
    authStore: { logout, }
  } = useStores();

  const [userStore, setUserStore] = React.useState(clone(userInfoStore));

  const {
    name, gender, igUsername, igFollowerCount, location, selectedInterests, phoneNumber, smsPermission, interestedCampaignAsString,
    profession, languages, renumerationPerGig, renumerationPerPhysicalShot, socialAccountsMap, age, getInfluencerProfile, workedOnCampaignBefore,
    interestedCampaignType, toggleCampaignType,
  } = userStore;

  const {
    setEditing
  } = userInfoStore;

  const checkEmpty = (value: string) => {
    return value && value !== "0" ? value : " - ";
  }

  const arrayToString = (value: string[]) => {
    return checkEmpty(value.join(", "));
  }

  const mapToString = (value: Map<string, string>) => {
    return value ? arrayToString(Object.keys(value)) : " - ";
  }

  React.useEffect(() => {
    getInfluencerProfile(() => {
      applySnapshot(userInfoStore, getSnapshot(userStore));
    });
  }, []);


  return (
    <Screen
      style={{ ...styleSheet.view_container, justifyContent: "center" }}
      preset="scroll"
    >
      <View>
        <View style={[CARD_WITHOUT_MARGIN, { backgroundColor: color.palette.grey10, borderRadius: 0, marginBottom: 0 }]} >
          <View style={[DEFAULT_MARGIN, { flexDirection: "row", alignItems: "center" }]} >
            {firebase.auth().currentUser.photoURL ?
              <Avatar
                rounded
                size="large"
                source={{ uri: firebase.auth().currentUser.photoURL }}
                overlayContainerStyle={{ backgroundColor: color.secondary }}
              />
              :
              <Avatar
                rounded
                size="large"
                overlayContainerStyle={{ backgroundColor: color.secondary }}
                icon={{ name: "immersify", type: "immersify_icons", color: color.primary }}
              />
            }
            <View style={{ flex: 1, margin: spacing.medium }}>
              <Text preset="header" text={name} style={{ color: color.primary, marginEnd: spacing.small, fontSize: normalisedFontSize.extraLarge }} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button preset="outline" text="Edit" onPress={setEditing} />
            <Button preset="raised" text="Logout" onPress={logout} />
          </View>
        </View>
        {/* <CampaignTypeSelector selectedCampaign={interestedCampaignType} toggleCampaignType={toggleCampaignType} /> */}
        <ProfileListItem title="Gender" subtitle={gender == Gender.MALE ? "Male" : "Female"} />
        <ProfileListItem title="Age" subtitle={checkEmpty(age.toString())} />
        <ProfileListItem title="Instagram Account" subtitle={checkEmpty(igUsername)} />
        <ProfileListItem title="Number of Followers" subtitle={checkEmpty(igFollowerCount)} />
        <ProfileListItem title="Location" subtitle={checkEmpty(location)} />
        <ProfileListItem title="Interests" subtitle={arrayToString(selectedInterests)} />
        <ProfileListItem title="Phone Number" subtitle={checkEmpty(phoneNumber)} />
        <ProfileListItem title="Can we send you an SMS when we have a campaign for you?" subtitle={smsPermission ? "Yes" : "No"} />
        <ProfileListItem title="Social Media" subtitle={mapToString(socialAccountsMap())} />
        <ProfileListItem title="Profession" subtitle={checkEmpty(profession)} />
        <ProfileListItem title="Languages" subtitle={arrayToString(languages)} />
        <ProfileListItem title="Expected remuneration per gig" subtitle={checkEmpty(renumerationPerGig.toString())} />
        <ProfileListItem title="Expected remuneration per physical presence for a shoot" subtitle={checkEmpty(renumerationPerPhysicalShot.toString())} />
        <ProfileListItem title="Worked on campaign before" subtitle={workedOnCampaignBefore ? "Yes" : "No"} />
        <ProfileListItem title="Campaign Interested In" subtitle={checkEmpty(interestedCampaignAsString())} />
      </View>
    </Screen>
  )
})
