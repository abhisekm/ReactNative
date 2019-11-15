import * as React from "react"
import { observer } from "mobx-react"
import { Image, View, Text as RNText, FlatList, TouchableOpacity, Alert, AlertButton, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { FormRow } from "../../components/form-row"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { navigate } from "../../navigation"
import { Avatar, Button as RNEButton, Icon } from "react-native-elements"
import { useStores } from "../../models/root-store"
import { InstagramLogin } from "../../components/instagram-login"
import { Loading } from "../../components/loading"
import { UserDetailsModel, Gender } from "../../models/user-details"

export interface UserDetailsScreenProps extends NavigationStackScreenProps<{}> {
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
        borderRadius: 20,
      }}
      buttonStyle={{
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


export const UserDetailsScreen: NavigationStackScreenComponent<UserDetailsScreenProps> = observer((props) => {
  const { authStore: { displayName }, igStore: { setCode, userName, clear, isLoading } } = useStores();

  const userDetails = UserDetailsModel.create({ name: displayName });
  const {
    name, gender, interests, selectedInterests, addInterest,
    isValidName, isValidInterest, isValidType, isValid, setIgUsername,
    setIsValidInterest, setIsValidName, setIsValidType, setName, setGender
  } = userDetails;

  const nameRef = React.useRef(null);

  const modData = React.useMemo(() => {
    const rowCount = 3;
    const columns = interestData.length / rowCount;
    const result = [];

    for (var i = 0; i < columns; i++) {
      const start = i * rowCount;
      const end = Math.min(start + rowCount, interestData.length + 1);
      result.push(interestData.slice(start, end))
    }

    return result;
  }, [interestData]);


  const unlink = () => {
    const buttons: AlertButton[] = [];
    const cancelButton: AlertButton = { text: "Cancel", style: "cancel" };
    const okButton: AlertButton = { text: "Yes", onPress: clear };
    buttons.push(cancelButton, okButton);
    Alert.alert("Remove Instagram Login", "Are you sure you want to remove your instagram login?", buttons);
  }

  console.log(selectedInterests);

  const validateAndProceed = React.useCallback(() => {
    const validName = name && name.length > 0;
    setIsValidName(validName);
    if (!validName) {
      return;
    }

    const validGender = gender != null;
    setIsValidName(validGender);
    if (!validGender) {
      return;
    }

    const validInterest = selectedInterests && selectedInterests.length > 0;
    setIsValidName(validInterest);
    if (!isValidInterest) {
      return;
    }

    alert("All valid");

  }, [name, gender, selectedInterests]);

  if (userName)
    setIgUsername(userName);

  return (
    <View style={styleSheet.view_full}>
      <Screen
        style={{ ...styleSheet.view_container, justifyContent: "center", }}
        preset="scroll"
        backgroundColor={color.transparent}
        unsafe >
        <FormRow preset="top" style={{ borderColor: color.transparent, backgroundColor: color.transparent, paddingHorizontal: spacing.medium, }} >
          <Text preset="header" text="Almost done ..." style={{ color: color.primary }} />

          <View style={{ height: 20 }} />

          <Text preset="fieldLabel" text="Select your gender" style={{ margin: spacing.medium }} />

          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
            <UserType boy onPress={() => {
              setGender(Gender.MALE)
            }} isSelected={gender === Gender.MALE} />
            <UserType onPress={() => {
              setGender(Gender.FEMALE)
            }} isSelected={gender === Gender.FEMALE} />
          </View>

          {
            !isValidType
              ? <Text preset="error" text="Please select gender" style={{ margin: spacing.medium }} />
              : null
          }
        </FormRow>
        <FormRow preset="middle" style={{ borderColor: color.transparent, backgroundColor: color.transparent, paddingHorizontal: 0 }} >

          <TextField
            placeholder="Name" label="Name"
            forwardedRef={nameRef}
            value={name} onChangeText={setName}
            style={{ paddingHorizontal: spacing.medium, }}
            leftIcon={{ type: "ocicons", name: "person", color: color.palette.grey10 }}
            inputStyle={styleSheet.text_input_container}
            errorMessage={!isValidName ? "Name cannot be blank" : null}
            errorStyle={{}}
          />

          <Text preset="fieldLabel" text="Instagram" style={{ margin: spacing.medium, paddingHorizontal: spacing.medium, }} />
          {
            userName ?
              <View style={{ paddingHorizontal: spacing.large, marginHorizontal: spacing.medium, flexDirection: "row" }}>
                <Text text={`@${userName}`} style={{ flex: 1 }} />
                <Button text="Unlink" preset="link" textStyle={{ color: color.palette.pink1 }} onPress={unlink} />
              </View>
              :
              <View style={{ paddingHorizontal: spacing.medium, }} >
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

          <Text
            preset="fieldLabel"
            text="Interests"
            style={{ marginVertical: spacing.large, marginHorizontal: spacing.medium, paddingHorizontal: spacing.medium, }} />

          <FlatList<string[]>
            data={modData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: spacing.tiny }}>
                {item.map((_item) => {
                  return (
                    <View style={{ marginVertical: spacing.tiny }}>
                      <InterestButton id={_item} text={_item} selected={interests.get(_item)} onSelect={addInterest} />
                    </View>
                  )
                })}
              </View>
            )}
            //Setting the number of column
            horizontal
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedInterests}
          />

          {
            !isValidInterest
              ? <Text preset="error" text="Please select atleast one interest" style={{ margin: spacing.medium, paddingHorizontal: spacing.medium, }} />
              : null
          }
        </FormRow>
        <FormRow preset="bottom" style={{ borderColor: color.transparent, backgroundColor: color.transparent, paddingHorizontal: spacing.medium, }} >
          <Button
            preset="raised"
            text="Continue"
            onPress={validateAndProceed}
          />
        </FormRow>
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