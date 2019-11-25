import * as React from "react"
import { observer, inject, useLocalStore } from "mobx-react"
import { Image, View, Text as RNText, FlatList, TouchableOpacity, Alert, AlertButton, ViewStyle, ListRenderItem } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Avatar, Button as RNEButton } from "react-native-elements"
import { useStores } from "../../models/root-store"
import { InstagramLogin } from "../../components/instagram-login"
import { Loading } from "../../components/loading"
import { UserDetailsModel, Gender, UserDetails } from "../../models/user-details"
import { AddSocialMediaAccount } from "../../components/add-social-media-account"

export interface UserDetailsScreenProps extends NavigationStackScreenProps<{}> {
}

export interface IInterestData {
  value: string,
  isSelected: boolean
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
      key={id}
      TouchableComponent={TouchableOpacity}
      type={selected ? "solid" : "outline"}
      title={text}
      containerStyle={{
        borderRadius: 20,
        marginVertical: spacing.small,
        marginHorizontal: spacing.tiny
      }}
      buttonStyle={{
        minWidth: 80,
        paddingHorizontal: spacing.medium,
        borderRadius: 20,
        backgroundColor: selected ? color.secondary : 'transparent',
        borderColor: color.secondary,
        borderWidth: 2
      }}
      titleStyle={{ color: selected ? 'white' : color.secondary }}
      onPress={() => onSelect(id)} />
  )
}

const _renderItem = (item: IInterestData[], addInterest) => (
  <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: spacing.tiny }}>
    {item.map((_item) => {
      return (
        <View style={{ marginVertical: spacing.tiny }}>
          <InterestButton id={_item} text={_item.value} selected={_item.isSelected} onSelect={addInterest} />
        </View>
      )
    })}
  </View>
)

const DEFAULT_MARGIN = { margin: spacing.medium, } as ViewStyle;

export const UserDetailsScreen: NavigationStackScreenComponent<UserDetailsScreenProps> = observer((props) => {
  const {
    authStore: { displayName },
    igStore: { setCode, userName, clear, isLoading },
    userInfoStore: { name, gender, allInterest, selectedInterests, igUsername, mediaAccounts, addInterest,
      setName, setGender, isValidName, isValidInterest, isValidType, isValid, setIgUsername, updateCalculated,
      updateSocialAccounts }
  } = useStores();

  const modData = React.useMemo(() => {
    console.log("calculate moddata");

    const result: IInterestData[] = interestData.map((value) => { return { value: value, isSelected: false } as IInterestData });
    return result;
  }, [interestData]);


  const nameRef = React.useRef(null);

  const unlink = () => {
    const buttons: AlertButton[] = [];
    const cancelButton: AlertButton = { text: "Cancel", style: "cancel" };
    const okButton: AlertButton = { text: "Yes", onPress: clear };
    buttons.push(cancelButton, okButton);
    Alert.alert("Remove Instagram Login", "Are you sure you want to remove your instagram login?", buttons);
  }

  const validateAndProceed = React.useCallback(() => {
    updateCalculated();

    console.log("isvalid - ", isValid())

    if (!isValid()) {
      return;
    }

    console.log("media account - ", mediaAccounts);


    alert(`All valid\n\nGender - ${gender}\n\nName - ${name}\n\nIG nick - ${igUsername}\n\nInterest - ${selectedInterests}\n\nSocial Accounts\n${mediaAccounts()}`);

  }, [name, gender, selectedInterests]);

  if (userName)
    setIgUsername(userName);


  return (
    <View style={styleSheet.view_full}>
      <Screen
        style={{ ...styleSheet.view_container, justifyContent: "center", }}
        preset="scroll"
        backgroundColor={color.transparent}
        unsafe
      >

        <Text preset="header" text="Almost done ..." style={[DEFAULT_MARGIN, { color: color.primary, }]} />

        <View style={{ height: 20 }} />

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

        <Text preset="fieldLabel" text="Instagram" style={DEFAULT_MARGIN} />
        {
          userName ?
            <View style={[DEFAULT_MARGIN, { paddingHorizontal: spacing.large, marginHorizontal: spacing.medium, flexDirection: "row" }]}>
              <Text text={`@${userName}`} style={{ flex: 1 }} />
              <Button text="Unlink" preset="link" textStyle={{ color: color.palette.pink1 }} onPress={unlink} />
            </View>
            :
            <View style={{ paddingHorizontal: spacing.large, }} >
              <InstagramLogin
                appId='761781137582854'
                redirectUrl='https://immersify-test.com/auth/'
                onLoginSuccess={(code) => {
                  setCode(code)
                }}
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
                <InterestButton id={item} text={item} selected={selectedInterests.indexOf(item) > -1} onSelect={addInterest} />
              );
            })
          }
        </View>

        {
          !isValidInterest()
            ? <Text preset="error" text="Please select atleast one interest" style={DEFAULT_MARGIN} />
            : null
        }
        <Button
          preset="raised"
          text="Continue"
          onPress={validateAndProceed}
        />
      </Screen>

      {isLoading && <Loading />}
    </View>
  )
})

UserDetailsScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
        <Image
          source={require('../../components/header/light.png')}
          style={{ height: 25, width: 110 }}
          resizeMode='contain'
        />
      </View>
    )
  }
}