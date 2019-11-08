import * as React from "react"
import { View, ViewStyle, ActivityIndicator, Dimensions } from "react-native"
import { Text } from "../text"
import { Image, ListItem, Icon } from "react-native-elements"
import { InstagramPost } from "../../models/instagram-post"
import { spacing } from "../../theme"
import { IgCollapsibleCaption } from "../ig-collapsible-caption"
import FastImage from 'react-native-fast-image'

export interface PostCardProps {
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

export interface PostCardState {
  /**
   * Height of the image view
   */
  height: number
}

/**
 * Pure component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class PostCard extends React.Component<PostCardProps, PostCardState> {

  constructor(props) {
    super(props);
    this.state = {
      height: 0
    }
  }

  // grab the props


  likeElement = (likeCount: number) => {
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.height !== nextState.height
  }

  render() {
    const { tx, text, style, data, ...rest } = this.props
    const { width } = Dimensions.get('window')
    const { height } = this.state;

    const calculateHeightForScaledImage = (event) => {
      const { width } = Dimensions.get('window')
      let scale = (event.nativeEvent.width / event.nativeEvent.height);
      let _height = (width / scale);
      this.setState({ height: _height });
    }

    const avatarImage = () => {
      return (
        <FastImage
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{ uri: 'https://instagram.fblr2-1.fna.fbcdn.net/vp/d3733da254360ef06f1180f638a772f5/5E5CDCD6/t51.2885-19/10608009_554065601386941_410568460_a.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net' }} />
      )
    }

    return (
      <View>
        <ListItem
          leftAvatar={avatarImage()}
          title={data.username}
          subtitle={`Likes: ${data.likes}`}
          containerStyle={{ height: 60 }}
          contentContainerStyle={{ marginVertical: 0, paddingVertical: 0, justifyContent: 'space-between' }}
          rightElement={this.likeElement(data.likes)}
        />
        {/* <FastImage style={{ width: '100%', height: undefined, flexGrow: 1 }} source={{ uri: data.media_url }} resizeMode={FastImage.resizeMode.contain} /> */}
        <FastImage
          style={{ width: "100%", height: height ? height : width }}
          onLoad={calculateHeightForScaledImage}
          source={{ uri: data.media_url }} />

        <IgCollapsibleCaption text={data.caption} style={{ padding: spacing.small }} />
      </View>
    )
  }
}
