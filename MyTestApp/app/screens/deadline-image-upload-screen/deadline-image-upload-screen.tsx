import * as React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image, TouchableOpacity, PixelRatio, PermissionsAndroid, Platform, Dimensions, Alert } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
// import { useStores } from "../../models/root-store"
import { spacing, color } from "../../theme"
import { NavigationStackScreenProps, NavigationStackScreenComponent } from "react-navigation-stack"
import ImagePicker, { ImagePickerResponse, ImagePickerOptions } from 'react-native-image-picker';
import { scale, verticalScale } from "../../utils/scale"
import { getGeneralApiProblem, GeneralApiProblem } from "../../services/api/api-problem"
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { firebase } from "@react-native-firebase/auth"
import { Button } from "../../components/button"
import { navigate, goBack } from "../../navigation"
import { TextField } from "../../components/text-field"
import { Input } from "react-native-elements"
import { normalisedFontSize } from "../../theme/fontSize"

export interface DeadlineImageUploadScreenProps extends NavigationStackScreenProps<{}> {
}

// create form data
const createFormData = (photo: ImagePickerResponse, body) => {
  const data = new FormData();

  data.append("photo", JSON.parse(JSON.stringify({
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  })));

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const uploadImage = async (photo: ImagePickerResponse): Promise<{ kind: string } | GeneralApiProblem> => {
  const data = {
    userId: await firebase.auth().currentUser.getIdToken(),
  }

  const instance: ApisauceInstance = create({
    baseURL: 'http://a39e88d6.ngrok.io/api/',
    timeout: 10000,
  });
  // make the api call
  const response: ApiResponse<any> = await instance.post('upload', createFormData(photo, data))

  // the typical ways to die when calling an api
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem;
  }

  // transform the data into the format we are expecting
  try {
    return { kind: "ok" };
  } catch (error) {
    return { kind: "bad-data" };
  }
}

const width = Dimensions.get('window').width;

export const DeadlineImageUploadScreen: NavigationStackScreenComponent<DeadlineImageUploadScreenProps>
  = observer(() => {
    // const { someStore } = useStores()
    const [avatarSource, setAvatarSource] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [commentError, setCommentError] = React.useState('');
    const commentInput = React.useRef(null);

    const selectPhotoTapped = () => {
      const options: ImagePickerOptions = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
        },
      };

      checkAllPermissions();

      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Error', 'Cannot select an image due to ' + response.error);
        } else {
          let source = { uri: response.uri };

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          setAvatarSource(source);
          setPhoto(response);
        }
      });
    }

    const checkAllPermissions = async () => {
      try {
        await PermissionsAndroid.requestMultiple
          ([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
        if ((await PermissionsAndroid.check('android.permission.CAMERA')) &&
          (await PermissionsAndroid.check('android.permission.CAMERA')) &&
          (await PermissionsAndroid.check('android.permission.CAMERA'))) {
          console.log('You can use the camera');
          return true;
        } else {
          console.log('all permissions denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

    const handleUpload = async () => {
      if (loading)
        return;

      if (photo == null) {
        alert('Select a photo');
        return;
      }

      if (comment || comment.length == 0) {
        commentInput.current.shake();
        setCommentError('Please add a comment');
        return;
      } else {
        setCommentError('');
      }


      setLoading(true);
      const result: { kind: string } = await uploadImage(photo);
      setLoading(false);

      if (result.kind == 'ok') {
        alert('Upload success!');
        setPhoto(null);
        setAvatarSource(null);
        goBack();
      } else {
        alert('Upload Failed - ' + result.kind);
      }
    }

    return (
      <View style={styles.container}>
        <Screen preset="scroll">
          <Text preset="header" text="Upload Photo" style={styles.header} />

          <View style={styles.photoContainer}>
            <Text preset="fieldLabel" text="Step 1: Select an Image" style={styles.label} />

            <TouchableOpacity onPress={selectPhotoTapped}>
              <View
                style={[styles.avatar, styles.avatarContainer, { marginBottom: verticalScale(20) }]}>
                {avatarSource === null ? (
                  <Text>Click here to select a Photo</Text>
                ) : (
                    <Image style={styles.avatar} source={avatarSource} />
                  )}
              </View>
            </TouchableOpacity>
          </View>
          <Text preset="fieldLabel" text="Step 2: Add a comment" style={styles.label} />
          <TextField
            preset="rounded"
            placeholder="Enter a comment"
            multiline
            numberOfLines={3}
            value={comment}
            onChangeText={setComment}
            forwardedRef={commentInput}
            errorMessage={commentError}
          />

          <Text preset="fieldLabel" text="Step 3: Upload the Image" style={styles.label} />
          <Button
            preset="raised"
            title="Upload Image"
            onPress={handleUpload}
            containerStyle={styles.button}
            loading={loading} />
        </Screen>
      </View>
    )
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.medium,
  },
  label: {
    marginTop: spacing.medium,
    paddingHorizontal: spacing.medium,
    width: '100%'
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    marginTop: spacing.small,
    borderColor: '#9B9B9B',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  avatar: {
    borderRadius: scale(10),
    width: 0.75 * width,
    height: 0.75 * width,
  },
  button: {
    marginHorizontal: spacing.large,
    marginVertical: spacing.medium
  }
});

DeadlineImageUploadScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
        <Image
          source={require('../../components/header/light.png')}
          style={{ height: 25, width: 100 }}
          resizeMode='contain'
        />
      </View>
    )
  },
  headerTitleContainerStyle: {
    flex: 1,
  },
  headerRight: () => {
    return <View />
  }
}