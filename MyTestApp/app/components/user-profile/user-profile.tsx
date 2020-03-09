import * as React from "react";
import { View, ViewStyle, AlertButton, Alert, TouchableOpacity, Picker } from "react-native";
import { Text } from "../text";
import { useStores } from "../../models/root-store";
import styleSheet from "../../theme/styleSheet";
import { color, spacing } from "../../theme";
import { Avatar, Button as RNEButton, Icon, ButtonGroup } from "react-native-elements";
import { Gender, UserDetails } from "../../models/user-details";
import { TextField } from "../text-field";
import { Button } from "../button";
import { InstagramLogin } from "../instagram-login";
import { AddSocialMediaAccount } from "../add-social-media-account";
import { Loading } from "../loading";
import { useObserver, observer } from "mobx-react";
import { scale } from "../../utils/scale";
import { normalisedFontSize } from "../../theme/fontSize";
import { firebase } from "@react-native-firebase/auth";
import { HASHTAG_SHOW_ALL, HASHTAG_SHOW_MORE, HASHTAG_SHOW_TOP } from "../../utils/instagramHastagData";
import { useRef, useState } from "react";
import { Spacer } from "../Spacer";
import { Checkbox } from "../checkbox";
import { Screen } from "../../components/screen"
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";
import { CampaignTypeSelector } from "../campaign-type-selector";

export interface UserProfileProps {

}

const boyImage = require("./boy.png")
const girlImage = require("./girl.png")

const UserType = (props) => {
  const { boy, isSelected, onPress } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar source={boy ? boyImage : girlImage} rounded size={isSelected ? "large" : "medium"}
        containerStyle={{ margin: spacing.small }}
        overlayContainerStyle={[{ opacity: 0.7 }, isSelected && { backgroundColor: color.palette.purple1, opacity: 1 }]}
        activeOpacity={0.3}
        onPress={onPress} />
      <Text text={boy ? "Male" : "Female"} style={isSelected && { color: color.palette.purple1 }} />
    </View>
  )
}

const InterestButton = (props) => {
  const { id, text, selected, onSelect } = props;

  return (
    <RNEButton
      TouchableComponent={TouchableOpacity}
      type={selected ? "solid" : "outline"}
      title={text}
      containerStyle={{
        borderRadius: scale(20),
        marginVertical: spacing.small,
        marginHorizontal: spacing.tiny
      }}
      buttonStyle={{
        minWidth: scale(80),
        paddingHorizontal: spacing.medium,
        borderRadius: scale(20),
        backgroundColor: selected ? color.secondary : 'transparent',
        borderColor: color.secondary,
        borderWidth: 2
      }}
      titleStyle={{ color: selected ? 'white' : color.secondary, fontSize: normalisedFontSize.normal }}
      onPress={() => onSelect(id)} />
  )
}

const LanguageTag = (props) => {
  const { text, onDelete } = props;

  return (
    <TouchableOpacity
      onPress={() => onDelete(text)}
      style={{ marginRight: spacing.small }} >
      <View style={[styleSheet.card, styleSheet.shadow_4, { flexDirection: 'row', borderColor: color.secondary, borderWidth: 2, marginBottom: spacing.small }]}>
        <Text text={text} style={{ color: 'black', marginHorizontal: spacing.small }} />
        <Icon name="delete" type="feather" size={scale(24)} color={color.secondary} />
      </View>
    </TouchableOpacity>
  )
}


const DEFAULT_MARGIN = { marginTop: spacing.tiny, marginHorizontal: spacing.small, marginBottom: spacing.small } as ViewStyle;
const CARD_MARGIN = [styleSheet.card, styleSheet.shadow_4, DEFAULT_MARGIN] as ViewStyle;
const CARD_WITHOUT_MARGIN = [styleSheet.card, styleSheet.shadow_4] as ViewStyle;

export const UserProfile: React.FC<UserProfileProps> = observer((props) => {
  const {
    igStore: { setCode, getUserName, clear, isLoading },
    userInfoStore,
  } = useStores();

  const [userEditStore, setUserEditStore] = React.useState<UserDetails>(clone(userInfoStore));

  const { resetEditing } = userInfoStore;

  const {
    gender, setGender,
    age, setAge,
    location, setLocation,
    phoneNumber, setPhoneNumber,
    smsPermission, setSmsPermission,
    profession, setProfession,
    languages, addLanguage, removeLanguage,
    selectedInterests, addInterest, isValidInterest,
    igUsername, igUsernameValidated, setIgUsername, setIgUsernameValidated,
    igFollowerCount, setFollowerCount,
    socialAccountsMap, updateSocialAccounts,
    brandsWillNotRecommend, addBrands, removeBrands,
    renumerationPerGig, setRenumerationGig,
    renumerationPerPhysicalShot, setRenumerationShoot,
    workedOnCampaignBefore, setWorkedOnCampaignBefore,
    interestedCampaignType, toggleCampaignType,
    saveInfluencerProfile,
  } = userEditStore;

  const [showMore, setShowMore] = useState(false);
  //error messages
  const [nameError, setNameError] = useState('');
  const [igHandleError, setIgHandleError] = useState('');
  const [countError, setCountError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(workedOnCampaignBefore ? 1 : 0);

  const buttons = ['Yes', 'No'];

  //refs
  const nameRef = useRef(null);
  const igRef = useRef(null);
  const followerRef = useRef(null);
  const locationRef = useRef(null);

  const unlink = React.useCallback(() => {
    const buttons: AlertButton[] = [];
    const cancelButton: AlertButton = { text: "Cancel", style: "cancel" };
    const okButton: AlertButton = { text: "Yes", onPress: clear };
    buttons.push(cancelButton, okButton);
    Alert.alert("Remove Instagram Login", "Are you sure you want to remove your instagram login?", buttons);
  }, []);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setWorkedOnCampaignBefore(selectedIndex == 1);
  }

  const interestData = (showMore: boolean) => {
    const top_data = selectedInterests && selectedInterests.length > 0 ? [...selectedInterests, HASHTAG_SHOW_MORE] : HASHTAG_SHOW_TOP;

    return (showMore ? HASHTAG_SHOW_ALL : top_data)
  };

  const saveData = React.useCallback(() => {
    saveInfluencerProfile(() => {
      applySnapshot(userInfoStore, getSnapshot(userEditStore));
      resetEditing();
    }).catch((reason) => console.log("saveProfile error - ", reason));
  }, []);

  const cancelEditing = React.useCallback(() => {
    resetEditing();
  }, []);


  return (
    <View style={{ flex: 1, flexDirection: 'column-reverse', backgroundColor: color.transparent }}>
      <View style={{ flexDirection: 'row' }}>
        <Button
          preset="outline"
          title="Cancel"
          containerStyle={{ flex: 1 }}
          onPress={cancelEditing}
        />
        <Button
          preset="raised"
          title="Save"
          containerStyle={{ flex: 1 }}
          onPress={saveData}
        />
      </View>
      <Screen
        style={{ ...styleSheet.view_container, justifyContent: "center" }}
        preset="scroll"
        unsafe
      >
        <View >
          <View style={CARD_MARGIN} >
            <Text preset="fieldLabel" text="Select your gender" style={DEFAULT_MARGIN} />

            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
              <UserType boy onPress={() => {
                setGender(Gender.MALE)
              }} isSelected={gender === Gender.MALE} />
              <UserType onPress={() => {
                setGender(Gender.FEMALE)
              }} isSelected={gender === Gender.FEMALE} />
            </View>
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Age"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={age.toString() == 'NaN' ? '' : age.toString()} onChangeText={(text) => setAge(Number.parseInt(text.replace(/[^0-9]/g, '')))}
              keyboardType="numeric"
              placeholder="Enter your age"
            />
          </View>

          <View style={CARD_MARGIN} >
            <View style={[DEFAULT_MARGIN, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <Text
                preset="fieldLabel"
                text="Instagram Account" />
              {
                igUsernameValidated &&
                <Icon type="material" name="verified-user" color="green" size={scale(24)} />
              }
            </View>

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={igUsername} onChangeText={setIgUsername}
              placeholder="your_instagram_handle"
              errorMessage={igHandleError}
              forwardedRef={igRef}
            />
            <Text
              style={[DEFAULT_MARGIN, { fontStyle: "italic", fontSize: normalisedFontSize.small, marginVertical: spacing.small }]}
              text="Verify by sending a DM to @immersifyindia so we know it is yours"
            />
          </View>

          {
            !igUsernameValidated &&
            <View style={CARD_MARGIN} >
              <Text preset="fieldLabel" text="Verify Instagram" style={DEFAULT_MARGIN} />
              <View style={{ paddingHorizontal: spacing.large, }} >
                <InstagramLogin
                  appId='761781137582854'
                  redirectUrl='https://immersify-test.com/auth/'
                  onLoginSuccess={setCode}
                  onLoginFailure={(data) => console.log(data)}
                />
              </View>
            </View>
          }

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Number of Followers"
              style={DEFAULT_MARGIN} />

            {/* <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={igFollowerCount} onChangeText={updateFollowerCount}
              placeholder="100k"
              errorMessage={countError}
              forwardedRef={followerRef}
            /> */}
            <Picker
              selectedValue={igFollowerCount}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => {
                setFollowerCount(itemValue);
              }}
            >
              <Picker.Item label="Select your follower count" value="" />
              <Picker.Item label="Under 5000" value="Under 5000" />
              <Picker.Item label="5k to 25k" value="5k to 25k" />
              <Picker.Item label="25k to 100k" value="25k to 100k" />
              <Picker.Item label="100k to 250k" value="100k to 250k" />
              <Picker.Item label="250k to 500k" value="250k to 500k" />
              <Picker.Item label="500k to 1m" value="500k to 1m" />
              <Picker.Item label="Over 1m" value="Over 1m" />
            </Picker>
            <Text
              style={[DEFAULT_MARGIN, { fontStyle: "italic", fontSize: normalisedFontSize.small, marginVertical: spacing.small }]}
              text="Please remember, we can look it up easily"
            />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Location"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={location} onChangeText={setLocation}
              placeholder="Enter your location"
            />

            <Text
              style={[DEFAULT_MARGIN, { fontStyle: "italic", fontSize: normalisedFontSize.small, marginVertical: spacing.small }]}
              text="This will help us find you great local gigs"
            />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Interests"
              style={DEFAULT_MARGIN} />

            <View style={[DEFAULT_MARGIN, { marginTop: 0, paddingHorizontal: spacing.small, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
              {
                interestData(showMore).map((item) => {
                  return (
                    <InterestButton key={item} id={item} text={item} selected={selectedInterests.indexOf(item) > -1}
                      onSelect={(id) => {
                        if (id == HASHTAG_SHOW_MORE) {
                          setShowMore(true);
                          return;
                        }

                        addInterest(id);
                      }}
                    />
                  );
                })
              }
            </View>
            {
              !isValidInterest()
                ? <Text preset="error" text="Please select atleast one interest" style={DEFAULT_MARGIN} />
                : null
            }
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Phone Number"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              keyboardType="numeric"
              value={phoneNumber} onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
              placeholder="Your phone number"
            />

            <Text
              style={[DEFAULT_MARGIN, { fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }]}
              text="This is the quickest way for us to get in touch with you when we have a campaign that needs to go live soon"
            />

            <Spacer />
            <View style={{ flexDirection: 'row' }} >
              <View style={{ flex: 1 }}>
                <Text
                  preset="fieldLabel"
                  text="Can we send you an SMS when we have a campaign for you?" />

                <Text
                  style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
                  text="We will NOT spam you!"
                />
              </View>
              <Checkbox value={smsPermission} onToggle={setSmsPermission} />
            </View>
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Profession"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={profession} onChangeText={setProfession}
              placeholder="Enter profession here"
            />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Languages"
              style={DEFAULT_MARGIN} />

            <Picker
              selectedValue='all'
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => {
                addLanguage(itemValue);
              }}
            >
              <Picker.Item label="Select languages you know" value="all" />
              <Picker.Item label="Assamese" value="Assamese" />
              <Picker.Item label="Bengali" value="Bengali" />
              <Picker.Item label="Bodo" value="Bodo" />
              <Picker.Item label="Dogri" value="Dogri" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Gujarati" value="Gujarati" />
              <Picker.Item label="Hindi" value="Hindi" />
              <Picker.Item label="Kannada" value="Kannada" />
              <Picker.Item label="Kashmiri" value="Kashmiri" />
              <Picker.Item label="Konkani" value="Konkani" />
              <Picker.Item label="Maithili" value="Maithili" />
              <Picker.Item label="Malayalam" value="Malayalam" />
              <Picker.Item label="Manipuri" value="Manipuri" />
              <Picker.Item label="Marathi" value="Marathi" />
              <Picker.Item label="Nepali" value="Nepali" />
              <Picker.Item label="Odia" value="Odia" />
              <Picker.Item label="Punjabi" value="Punjabi" />
              <Picker.Item label="Sanskrit" value="Sanskrit" />
              <Picker.Item label="Santali" value="Santali" />
              <Picker.Item label="Sindhi" value="Sindhi" />
              <Picker.Item label="Tamil" value="Tamil" />
              <Picker.Item label="Telugu" value="Telugu" />
              <Picker.Item label="Urdu" value="Urdu" />
            </Picker>

            <View style={[DEFAULT_MARGIN, { marginTop: 0, paddingHorizontal: spacing.small, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
              {
                languages.map((item) => {
                  return (
                    <LanguageTag key={item} text={item}
                      onDelete={(id) => {
                        removeLanguage(id);
                      }}
                    />
                  );
                })
              }
            </View>

          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Expected remuneration per gig"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={renumerationPerGig.toString() == 'NaN' ? '' : renumerationPerGig.toString()} onChangeText={(text) => setRenumerationGig(Number.parseInt(text.replace(/[^0-9]/g, '')))}
              keyboardType="numeric"
              placeholder="Enter amount here"
            />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Expected remuneration per physical presence for a shoot"
              style={DEFAULT_MARGIN} />

            <TextField
              preset="clear"
              inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0 }}
              value={renumerationPerPhysicalShot.toString() == 'NaN' ? '' : renumerationPerPhysicalShot.toString()} onChangeText={(text) => setRenumerationShoot(Number.parseInt(text.replace(/[^0-9]/g, '')))}
              keyboardType="numeric"
              placeholder="Enter amount here"
            />
          </View>

          <View style={CARD_MARGIN} >
            <AddSocialMediaAccount
              style={DEFAULT_MARGIN}
              onUpdate={updateSocialAccounts} />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Worked in a campaign before"
              style={DEFAULT_MARGIN} />

            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
          </View>

          <View style={CARD_MARGIN} >
            <Text
              preset="fieldLabel"
              text="Campaigns you are interested to work in"
              style={DEFAULT_MARGIN} />

            <CampaignTypeSelector selectedCampaign={interestedCampaignType} toggleCampaignType={toggleCampaignType} />
          </View>


          {isLoading && <Loading />}

        </View>
      </Screen>
    </View>

  )
})
