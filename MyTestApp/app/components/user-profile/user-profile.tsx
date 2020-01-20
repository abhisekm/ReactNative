import * as React from "react";
import { View, ViewStyle, AlertButton, Alert, TouchableOpacity } from "react-native";
import { Text } from "../text";
import { useStores } from "../../models/root-store";
import styleSheet from "../../theme/styleSheet";
import { color, spacing } from "../../theme";
import { Avatar, Button as RNEButton } from "react-native-elements";
import { Gender } from "../../models/user-details";
import { TextField } from "../text-field";
import { Button } from "../button";
import { InstagramLogin } from "../instagram-login";
import { AddSocialMediaAccount } from "../add-social-media-account";
import { Loading } from "../loading";
import { useObserver } from "mobx-react";
import { scale } from "../../utils/scale";
import { normalisedFontSize } from "../../theme/fontSize";

export interface UserProfileProps {
  showName?: boolean
}

const boyImage = require("./boy.png")
const girlImage = require("./girl.png")
const interestData = ['Art', 'Design', 'Fashion', 'Food', 'Fitness', 'Health', 'Inspiration', 'Nature', 'Party', 'Photography', 'Travel', 'Lorem', 'Ipsum'];

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

const DEFAULT_MARGIN = { margin: spacing.small, } as ViewStyle;

export function UserProfile(props: UserProfileProps) {
  const { showName = true } = props;

  const {
    igStore: { setCode, getUserName, clear, isLoading },
    userInfoStore: { name, gender, selectedInterests, addInterest,
      setName, setGender, isValidName, isValidInterest, isValidType, updateSocialAccounts }
  } = useStores();

  const nameRef = React.useRef(null);

  const unlink = () => {
    const buttons: AlertButton[] = [];
    const cancelButton: AlertButton = { text: "Cancel", style: "cancel" };
    const okButton: AlertButton = { text: "Yes", onPress: clear };
    buttons.push(cancelButton, okButton);
    Alert.alert("Remove Instagram Login", "Are you sure you want to remove your instagram login?", buttons);
  }

  return useObserver(() => (
    <View >
      <Text preset="fieldLabel" text="Select your gender" style={DEFAULT_MARGIN} />

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
        <UserType boy onPress={() => {
          setGender(Gender.MALE)
        }} isSelected={gender === Gender.MALE} />
        <UserType onPress={() => {
          setGender(Gender.FEMALE)
        }} isSelected={gender === Gender.FEMALE} />
      </View>

      {
        !isValidType()
          ? <Text preset="error" text="Please select gender" style={DEFAULT_MARGIN} />
          : null
      }

      {
        showName ?
          <TextField
            placeholder="Name" label="Name"
            forwardedRef={nameRef}
            value={name} onChangeText={setName}
            style={DEFAULT_MARGIN}
            leftIcon={{ type: "ocicons", name: "person", color: color.palette.grey10 }}
            inputStyle={styleSheet.text_input_container}
            errorMessage={!isValidName() ? "Name cannot be blank" : null}
            errorStyle={{}}
          />
          : null
      }

      <Text preset="fieldLabel" text="Instagram" style={DEFAULT_MARGIN} />
      {
        getUserName() ?
          <View style={[DEFAULT_MARGIN, { paddingHorizontal: spacing.large, marginHorizontal: spacing.medium, flexDirection: "row" }]}>
            <Text text={`@${getUserName()}`} style={{ flex: 1 }} />
            <Button text="Unlink" preset="link" textStyle={{ color: color.palette.pink1 }} onPress={unlink} />
          </View>
          :
          <View style={{ paddingHorizontal: spacing.large, }} >
            <InstagramLogin
              appId='761781137582854'
              redirectUrl='https://immersify-test.com/auth/'
              onLoginSuccess={setCode}
              onLoginFailure={(data) => console.log(data)}
            />
          </View>
      }

      <AddSocialMediaAccount
        style={DEFAULT_MARGIN}
        onUpdate={updateSocialAccounts} />

      <Text
        preset="fieldLabel"
        text="Interests"
        style={DEFAULT_MARGIN} />

      <View style={[DEFAULT_MARGIN, { paddingHorizontal: spacing.small, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
        {
          interestData.map((item) => {
            return (
              <InterestButton key={item} id={item} text={item} selected={selectedInterests.indexOf(item) > -1} onSelect={addInterest} />
            );
          })
        }
      </View>

      {
        !isValidInterest()
          ? <Text preset="error" text="Please select atleast one interest" style={DEFAULT_MARGIN} />
          : null
      }

      {isLoading && <Loading />}

    </View>


  ))
}
