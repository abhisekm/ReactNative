import * as React from "react"
import { View, ViewStyle, Alert, Image } from "react-native"
import { Text } from "../text"
import { ListItem, Icon, Button as RNEButton } from "react-native-elements";
import { AddSocialMediaAccountModal } from "../add-social-media-account-modal";
import { color, spacing } from "../../theme";
import { Button } from "../button";
import { useObserver } from "mobx-react";
import { useStores } from "../../models/root-store";

const tiktok = require('./tik-tok.png');


export interface AddSocialMediaAccountProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  onUpdate?: (mediaAccounts: Map<string, string>) => void
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AddSocialMediaAccount(props: AddSocialMediaAccountProps) {
  // grab the props
  const { style, onUpdate } = props

  const { userInfoStore: { socialAccountsMap } } = useStores();

  const socialMediaList = [
    'youtube',
    'facebook',
    'twitter',
    'instagram',
    'tiktok'
  ];

  const [visible, setVisible] = React.useState(false)
  const [accounts, setAccounts] = React.useState(new Map<string, string>());

  const confirmDelete = (mediaType: string) => {
    Alert.alert(
      "Confirm Delete",
      `Do you want to delete the ${mediaType} account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteMedia(mediaType) },
      ]
    )
  }

  const toggleModal = () => {
    setVisible(!visible);
  }

  const addMedia = (mediaType: string, value: string) => {
    if (!mediaType || !value) {
      toggleModal();
      return;
    }

    const _accounts = new Map(accounts);
    _accounts.set(mediaType, value);
    setAccounts(_accounts);
    onUpdate(_accounts);
    toggleModal();
  }

  const deleteMedia = (mediaType: string) => {
    if (!mediaType)
      return;

    const _accounts = new Map(accounts);
    _accounts.delete(mediaType);
    setAccounts(_accounts);
    onUpdate(_accounts);
  }

  const getRemainingMedia = React.useCallback((): string[] => {
    const result = socialMediaList.filter((mediaType) => !accounts.has(mediaType))
    return result;
  }, [accounts]);

  React.useEffect(() => {
    setAccounts(socialAccountsMap());
  }, []);

  return useObserver(() => (
    <View style={style}>
      <View style={{ flexDirection: 'row' }} >
        <Text preset="fieldLabel" text="Social Media Accounts" style={{ flex: 1 }} />
      </View>
      {
        [...accounts]
          .sort((a, b) => {
            if (a[0] < b[0]) { return -1; }
            if (a[0] > b[0]) { return 1; }
            return 0;
          })
          .map(([key, value]) => {
            if (!value)
              return null;

            const isTikTok = key === 'tiktok';
            const leftElement = isTikTok
              ? <Image source={tiktok} style={{ width: 20, height: 20, }} />
              : <Icon name={key} type="font-awesome" size={20} color={color.socialMedia[key]} containerStyle={{ minWidth: 20 }} />;

            return (
              <ListItem
                key={key}
                leftElement={leftElement}
                title={value}
                containerStyle={{ backgroundColor: 'transparent' }}
                rightIcon={{ name: 'delete', type: 'material', onPress: () => confirmDelete(key) }}
              />
            );
          })
      }

      {
        getRemainingMedia().length > 0
          ?
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: spacing.medium, marginHorizontal: spacing.large }}>
            <RNEButton
              icon={
                <Icon
                  name="add"
                  size={15}
                  containerStyle={{ marginEnd: spacing.tiny }}
                  color={color.primary}
                />
              }
              type="outline"
              title="Add Account"
              titleStyle={{ fontSize: 14 }}
              buttonStyle={{ borderWidth: 2, borderRadius: 10 }}
              onPress={toggleModal} />
          </View>
          :
          null
      }

      {
        visible
        &&
        <AddSocialMediaAccountModal
          remainingMedia={getRemainingMedia()}
          visible={visible}
          onSubmit={addMedia}
        />
      }
    </View >
  ))
}
