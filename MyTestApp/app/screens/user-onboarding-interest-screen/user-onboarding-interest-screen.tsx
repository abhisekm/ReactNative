import * as React from "react"
import { observer } from "mobx-react"
import { View, TouchableOpacity, Alert } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import styleSheet from "../../theme/styleSheet"
import { TextField } from "../../components/text-field"
import { normalisedFontSize } from "../../theme/fontSize"
import { Button } from "../../components/button"
import { Button as RNEButton } from "react-native-elements"
import { scale } from "../../utils/scale"
import { Checkbox } from "../../components/checkbox"
import { Spacer } from "../../components/Spacer"
import { HASHTAG_SHOW_ALL, HASHTAG_SHOW_TOP, HASHTAG_SHOW_MORE } from "../../utils/instagramHastagData"
import { Loading } from "../../components/loading"
import Toast from "react-native-easy-toast"

export interface UserOnboardingInterestScreenProps extends NavigationStackScreenProps<{}> {
}

const InterestButton = (props) => {
  const { id, text, selected, onSelect } = props;

  return (
    <RNEButton
      TouchableComponent={TouchableOpacity}
      type="outline"
      title={text}
      containerStyle={{
        borderRadius: scale(40),
        height: scale(40),
        marginVertical: spacing.tiny,
        marginHorizontal: spacing.tiny
      }}
      buttonStyle={{
        minWidth: scale(70),
        height: scale(40),
        paddingHorizontal: spacing.medium,
        margin: 0,
        borderRadius: scale(30),
        backgroundColor: selected ? color.secondary : 'transparent',
        borderColor: color.secondary,
        borderWidth: scale(2)
      }}
      titleStyle={{ color: selected ? 'white' : color.secondary, fontSize: normalisedFontSize.normal }}
      onPress={() => onSelect(id)} />
  )
}



const interestData = (showMore: boolean) => {
  return (showMore ? HASHTAG_SHOW_ALL : HASHTAG_SHOW_TOP)
};

export const UserOnboardingInterestScreen: NavigationStackScreenComponent<UserOnboardingInterestScreenProps> = observer(() => {
  const {
    navigationStore: { navigateTo },
    userInfoStore: {
      phoneNumber, smsPermission, selectedInterests, addInterest,
      setPhoneNumber, setSmsPermission, isValidInterest, updateCalculated,
      isLoading, toast, alert, influencerSignup
    }
  } = useStores()

  const [contact, setContact] = React.useState(phoneNumber);
  const [showMore, setShowMore] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState('');

  const phoneRef = React.useRef(null);
  const toastRef = React.useRef(null);

  const validateAndProceed = () => {
    updateCalculated();
    if (!isValidInterest()) {
      return;
    }

    if (contact.length < 10) {
      phoneRef.current.shake();
      setPhoneError('Invalid phone number');
      return;
    } else if (contact.length > 10) {
      phoneRef.current.shake();
      setPhoneError('Invalid number. More than 10 digits');
      return;
    } else {
      setPhoneError('');
    }

    setPhoneNumber(contact);

    influencerSignup();
  }

  console.log('alert - ', alert);
  console.log('toast - ', toast);


  return (
    <View style={{ flex: 1 }}>
      <Screen style={{ ...styleSheet.view_container, margin: spacing.medium }} preset="scroll">
        <Text
          preset="fieldLabel"
          text="Interest" />

        <View style={{ marginTop: 0, paddingHorizontal: spacing.small, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
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

        <Text
          style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
          text="This will help us match you with the best brands"
        />

        {
          !isValidInterest() && <Text preset="error" text="Please select atleast one interest" />
        }


        <Spacer />

        <Text
          preset="fieldLabel"
          text="Phone Number" />

        <TextField
          forwardedRef={phoneRef}
          preset="clear"
          inputStyle={{ fontSize: normalisedFontSize.normal, margin: 0, padding: 0, textAlignVertical: "center" }}
          containerStyle={{ paddingHorizontal: 0 }}
          value={contact} onChangeText={(text) => setContact(text.replace(/[^0-9]/g, ''))}
          errorMessage={phoneError}
          placeholder="9800098000"
        />

        <Text
          style={{ fontStyle: "italic", fontSize: normalisedFontSize.small, marginTop: spacing.small }}
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
        <Spacer />

        <View style={{ flexDirection: "row-reverse" }}>
          <Button
            preset="raised"
            text="Sign Up"
            onPress={validateAndProceed}
          />
        </View>

        {alert.length > 0 && Alert.alert('Error', alert)}
        {toast.length > 0 && toastRef.current.show(toast)}
      </Screen>

      <Toast ref={toastRef} />
      {isLoading && <Loading />}
    </View>
  )
})

UserOnboardingInterestScreen.navigationOptions = {
  headerTitle: () => <Text text="Sign Up (Continue ...)" preset="header" style={{ color: 'white', flex: 1, paddingHorizontal: spacing.medium }} />,
  headerLeft: null
}
