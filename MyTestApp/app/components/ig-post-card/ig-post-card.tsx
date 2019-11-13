import * as React from "react"
import { View, ViewStyle, Dimensions } from "react-native"
import { Text } from "../text"
import { InstagramPost } from "../../models/instagram-post"
import { Icon, ListItem } from "react-native-elements"
import { useStores } from "../../models/root-store"
import FastImage from "react-native-fast-image"
import { IgCollapsibleCaption } from "../ig-collapsible-caption"
import { spacing } from "../../theme"

export interface IgPostCardProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * Instagram post details
   */
  data: InstagramPost
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function IgPostCard(props: IgPostCardProps) {
  // grab the props
  const { tx, text, style, data, ...rest } = props
  const { heightCache: { addHeight, hasHeight, getHeight } } = useStores();
  const { width } = Dimensions.get('window')
  const [height, setHeight] = React.useState(hasHeight(data.media_url) ? getHeight(data.media_url) : 0);

  const likeElement = (likeCount: number) => {
    return (
      <View>
        {
          likeCount && likeCount < 40 ?
            <Icon name='heart-o' type='font-awesome' color='red' />
            :
            <Icon name='heart' type='font-awesome' color='red' />
        }
        <Text text={`${likeCount}`} style={{ textAlign: 'center' }} />
      </View>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.height !== nextState.height
  // }


  const calculateHeightForScaledImage = (event) => {
    if (height > 0) return;
    let scale = (event.nativeEvent.width / event.nativeEvent.height);
    let _height = (width / scale);
    setHeight(_height);
    addHeight(data.media_url, _height);
  }

  const avatarImage = () => {
    return (
      <FastImage
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{ uri: data.avatar }} />
    )
  }

  return (
    <View>
      <ListItem
        leftAvatar={avatarImage()}
        title={data.username}
        subtitle={data.location}
        containerStyle={{ height: 60 }}
        contentContainerStyle={{ marginVertical: 0, paddingVertical: 0, justifyContent: 'space-between' }}
        rightElement={likeElement(data.likes)}
      />
      <FastImage
        style={{ width: "100%", height: height ? height : width }}
        onLoad={calculateHeightForScaledImage}
        source={{ uri: data.media_url }} />

      <IgCollapsibleCaption text={data.caption} style={{ padding: spacing.small }} />
    </View>
  )
}
