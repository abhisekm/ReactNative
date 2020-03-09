import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View, Picker, TouchableOpacity } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { TextField } from "../../components/text-field"
import { normalisedFontSize } from "../../theme/fontSize"
import { AddSocialMediaAccount } from "../../components/add-social-media-account"
import { Gender } from "../../models/user-details"
import { Avatar, Icon } from "react-native-elements"
import { scale } from "../../utils/scale"
import { Button } from "../../components/button"
import { Spacer } from "../../components/Spacer"
import { InstagramLogin } from "../../components/instagram-login"
import { Loading } from "../../components/loading"

export interface UserOnboardingSocialMediaScreenProps extends NavigationStackScreenProps<{}> {
}

const boyImage = require("../../components/user-profile/boy.png")
const girlImage = require("../../components/user-profile/girl.png")

const UserType = (props) => {
  const { boy, isSelected, onPress } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar source={boy ? boyImage : girlImage} rounded size={isSelected ? scale(50) : scale(30)}
        containerStyle={{ margin: spacing.small }}
        overlayContainerStyle={[{ opacity: 0.7 }, isSelected && { backgroundColor: color.palette.purple1, opacity: 1 }]}
        activeOpacity={0.3}
        onPress={onPress} />
      <Text text={boy ? "Male" : "Female"} style={isSelected && { color: color.palette.purple1 }} />
    </View>
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

export const UserOnboardingSocialMediaScreen: NavigationStackScreenComponent<UserOnboardingSocialMediaScreenProps> = observer((props) => {
  const {
    igStore: { setCode, getUserName, isLoading },
    navigationStore: { navigateTo },
    userInfoStore: {
      gender, setGender,
      profession, setProfession,
      languages, addLanguage, removeLanguage,
      updateSocialAccounts, mediaAccounts }
  } = useStores()

  return (
    <Screen style={{ ...styleSheet.view_container, paddingVertical: spacing.medium, paddingHorizontal: spacing.medium }} preset="scroll">
      <Text preset="fieldLabel" text="Select your gender" />

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
        <UserType boy onPress={() => {
          setGender(Gender.MALE)
        }} isSelected={gender === Gender.MALE} />
        <UserType onPress={() => {
          setGender(Gender.FEMALE)
        }} isSelected={gender === Gender.FEMALE} />
      </View>

      <Spacer />

      <Text preset="fieldLabel" text="Verify Instagram" />

      {
        getUserName() ?
          <View style={{ flexDirection: "row" }}>
            <Text text={`@${getUserName()}`} style={{ flex: 1, borderWidth: 1, fontStyle: 'italic' }} />
            <Icon type="material" name="verified-user" color="green" size={scale(24)} />
          </View>
          :
          <View style={{ paddingHorizontal: spacing.large, }} >
            <InstagramLogin
              appId='761781137582854'
              redirectUrl='https://immersify-test.com/auth/'
              onLoginSuccess={setCode}
              onLoginFailure={(data) => {
                console.log(data);
                alert('Login failed!');
              }}
            />
          </View>
      }

      <Text
        style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
        text="By signin, you will verify your instagram handle automatically without sending us a DM"
      />

      <Spacer />

      <AddSocialMediaAccount
        onUpdate={updateSocialAccounts} />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Profession" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={profession} onChangeText={setProfession}
        placeholder="Enter profession here"
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Languages" />

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
      <Spacer />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          preset="outline"
          text="Ask Me Later"
          onPress={() => { navigateTo("dashboardFlow") }}
        />
        <Button
          preset="raised"
          text="Next"
          buttonStyle={{ flex: 1 }}
          onPress={() => {
            console.log(mediaAccounts());
            navigateTo("Extra")
          }}
        />
      </View>

      {isLoading && <Loading />}
    </Screen>
  )
})


UserOnboardingSocialMediaScreen.navigationOptions = {
  headerTitle: (props) => <Text text="Sign Up (Continue ...)" preset="header" style={{ color: 'white', flex: 1, paddingHorizontal: spacing.medium }} />,
  headerLeft: null
}
