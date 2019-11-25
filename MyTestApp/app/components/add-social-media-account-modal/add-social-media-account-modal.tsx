import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import { Text } from "../text"
import Modal from "react-native-modal"
import { Icon, Image } from "react-native-elements";
import { spacing, color } from "../../theme";
import { TextField } from "../text-field";
import styleSheet from "../../theme/styleSheet";
import { Button } from "../button";

const tiktok = require('../add-social-media-account/tik-tok.png');
const tiktokSelected = require('../add-social-media-account/tik-tok-selected.png');

export interface AddSocialMediaAccountModalProps {
  remainingMedia?: string[]
  visible: boolean
  onSubmit: (mediaType?: string, value?: string) => void
}

interface ValidationState {
  validType: boolean
  validName: boolean
  name: string
  media: string
}


const defaultState: ValidationState = { validName: true, validType: true, name: '', media: '' }


const MediaType = (props) => {
  const { media, isSelected, onMediaSelected } = props;

  if (media === 'tiktok')
    return (
      <TouchableOpacity
        style={[
          { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', padding: 10 },
          isSelected && { backgroundColor: color.socialMedia[media], width: 50, height: 50, borderRadius: 25, padding: 10 }
        ]}
        onPress={() => onMediaSelected(media)}
        activeOpacity={0.7}
      >
        <Image
          fadeDuration={0}
          source={isSelected ? tiktokSelected : tiktok}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    )

  return (
    <TouchableOpacity
      style={[
        { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', padding: 5, justifyContent: 'center' },
        isSelected && { backgroundColor: color.socialMedia[media], width: 50, height: 50, borderRadius: 25, padding: 10 }
      ]}
      onPress={() => onMediaSelected(media)}
      activeOpacity={0.7}
    >
      <Icon
        name={media}
        type='font-awesome'
        color={isSelected ? 'white' : color.socialMedia[media]}
      />
    </TouchableOpacity>
  )
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AddSocialMediaAccountModal(props: AddSocialMediaAccountModalProps) {
  // grab the props
  const { remainingMedia = [], onSubmit, visible, ...rest } = props
  const [state, setState] = React.useState(defaultState);
  const { validType, validName, media, name } = state;

  const setSelectedMedia = (value: string) => {
    setState({ ...state, media: value });
  }

  const setName = (value: string) => {
    setState({ ...state, name: value });
  }

  const setValidType = (value: boolean) => {
    setState({ ...state, validType: value });
  }

  const setValidName = (value: boolean) => {
    setState({ ...state, validName: value });
  }

  const validateAndProceed = React.useCallback(() => {
    if (!media) {
      setValidType(false);
      return;
    }

    const isValidName = name && name.length > 0;
    setValidName(isValidName);

    if (!isValidName)
      return;

    onSubmit(media, name.trim());
    setState(defaultState);
  }, [media, name]);

  return (
    <Modal
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
      isVisible={visible}
      hasBackdrop
      backdropColor='black'
      backdropOpacity={0.7}
      coverScreen
      onBackButtonPress={onSubmit}
      onBackdropPress={onSubmit}
      {...rest}
    >
      <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
        <Text
          preset="fieldLabel" text="Select social media type"
          style={{ marginHorizontal: spacing.large, marginVertical: spacing.medium, color: color.text, fontSize: 20, textTransform: 'capitalize' }} />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: spacing.small }} >
          {remainingMedia.map((value) => {
            return (
              <MediaType
                key={value}
                media={value}
                isSelected={media === value}
                onMediaSelected={(mediaValue) => {
                  setSelectedMedia(mediaValue);
                }}
              />
            )
          })}
        </View>

        {
          !validType
            ? <Text preset="error" text="Please select a media" style={{ margin: spacing.medium }} />
            : null
        }

        {
          media ?
            <TextField
              placeholder={`Enter your ${media} id`} label={`${media.toUpperCase()} ID`}
              value={name} onChangeText={setName}
              style={{ paddingHorizontal: spacing.medium, marginTop: spacing.large }}
              inputStyle={styleSheet.text_input_container}
              errorMessage={!validName ? "Name cannot be blank" : null}
              errorStyle={{}}
            />

            : null
        }
        <View style={{ flexDirection: 'row-reverse', marginTop: spacing.large, marginBottom: spacing.medium, marginHorizontal: spacing.medium, height: 60 }}>
          <Button
            preset="raised"
            text="Add"
            onPress={validateAndProceed}
          />
        </View>
      </View>
    </Modal>
  )
}
