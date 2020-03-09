import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { spacing } from "../../theme"
import { TextField } from "../../components/text-field"
import { normalisedFontSize } from "../../theme/fontSize"
import { View } from "react-native"
import { Button } from "../../components/button"
import { Spacer } from "../../components/Spacer"
import { useState, useRef } from "react"
import { isTest } from "../../app"

export interface UserOnboardingEssentialScreenProps extends NavigationStackScreenProps<{}> {
}

export const UserOnboardingEssentialScreen: NavigationStackScreenComponent<UserOnboardingEssentialScreenProps> = observer((props) => {
  const {
    navigationStore: { navigateTo },
    userInfoStore: { name, igUsername, igFollowerCount, location,
      setName, setIgUsername, setFollowerCount, setLocation }
  } = useStores()

  //error messages
  const [nameError, setNameError] = useState('');
  const [igHandleError, setIgHandleError] = useState('');
  const [countError, setCountError] = useState('');
  const [locationError, setLocationError] = useState('');

  //refs
  const nameRef = useRef(null);
  const igRef = useRef(null);
  const followerRef = useRef(null);
  const locationRef = useRef(null);

  const updateFollowerCount = (text) => {
    setFollowerCount(text.replace(/[^0-9.kKmM]/g, ''));
  }

  const validateAndProceed = () => {
    if (isTest) {
      navigateTo("Interest");
      return;
    }

    if (name.length == 0) {
      nameRef.current.shake();
      setNameError('Name cannot be empty');
      return;
    } else if (name.length < 3) {
      nameRef.current.shake();
      setNameError('Enter a valid name');
      return;
    } else {
      setNameError('');
    }

    if (igUsername.length == 0) {
      igRef.current.shake();
      setIgHandleError('Field cannot be empty');
      return;
    } else {
      setIgHandleError('');
    }

    if (igFollowerCount.length == 0) {
      followerRef.current.shake();
      setCountError('Enter a valid number');
      return;
    } else {
      setCountError('');
    }

    if (location.length == 0) {
      locationRef.current.shake();
      setLocationError('Enter a valid location');
      return;
    } else {
      setLocationError('');
    }

    navigateTo("Interest");
  }

  return (
    <Screen style={{ ...styleSheet.view_container, margin: spacing.medium }} preset="scroll">
      <Text
        preset="fieldLabel"
        text="Name" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={name} onChangeText={setName}
        placeholder="John Doe"
        forwardedRef={nameRef}
        errorMessage={nameError}
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Instagram Account" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={igUsername} onChangeText={setIgUsername}
        placeholder="your_instagram_handle"
        errorMessage={igHandleError}
        forwardedRef={igRef}
      />

      <Text
        style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
        text="Verify by sending a DM to @immersifyindia so we know it is yours"
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Number of Followers" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={igFollowerCount} onChangeText={updateFollowerCount}
        placeholder="100k"
        errorMessage={countError}
        forwardedRef={followerRef}
      />

      <Text
        style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
        text="Please remember, we can look it up easily"
      />

      <Spacer />

      <Text
        preset="fieldLabel"
        text="Location" />

      <TextField
        preset="clear"
        inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
        containerStyle={{ paddingHorizontal: 0 }}
        value={location} onChangeText={setLocation}
        placeholder="Bengaluru"
        errorMessage={locationError}
        forwardedRef={locationRef}
      />

      <Text
        style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
        text="This will help us find you great local gigs "
      />

      <Spacer />

      <View style={{ flexDirection: "row-reverse" }}>
        <Button
          preset="raised"
          text="Next"
          onPress={validateAndProceed}
        />
      </View>
    </Screen>
  )
})

UserOnboardingEssentialScreen.navigationOptions = {
  headerTitle: (props) => <Text text="Sign Up" preset="header" style={{ color: 'white', flex: 1, paddingHorizontal: spacing.medium }} />,
}
