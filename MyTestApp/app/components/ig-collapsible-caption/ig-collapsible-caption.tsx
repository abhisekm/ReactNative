import * as React from "react"
import { View, ViewStyle, TouchableHighlight } from "react-native"
import { Text } from "../text"
import ViewMoreText from 'react-native-view-more-text';
import { color } from "../../theme";

export interface IgCollapsibleCaptionProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * Post id to use as key
   */
  id?: string
}


/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class IgCollapsibleCaption extends React.Component<IgCollapsibleCaptionProps> {
  constructor(props) {
    super(props);
    this.state = { c: 0 }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.text !== nextProps.text
  }

  tokenizeText = (text): string[] => {

    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = text;
    let token, index, _parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      _parts.push(_text.substr(0, index));
      _parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    _parts.push(_text);

    //highlight hashtags
    _parts = _parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={{ color: '#4444EE' }}>{text}</Text>;
      } else {
        return text;
      }
    });

    return _parts;
  }

  _renderViewMore = (handlePress) => {
    return (
      <TouchableHighlight onPress={handlePress} >
        <Text style={{ color: color.palette.pink2, paddingVertical: 5 }} text='Read more' />
      </TouchableHighlight>
    );
  }

  _renderViewLess = (handlePress) => {
    return (
      null
      // <Text style={{ color: color.palette.pink2, paddingVertical: 5 }} onPress={handlePress} text='Show less' />
    );
  }

  render() {
    // grab the props
    const { id, text, style, ...rest } = this.props

    return (
      <View style={[style, { backgroundColor: color.palette.white }]} {...rest}>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={this._renderViewMore}
          renderViewLess={this._renderViewLess}>
          <Text>
            {this.tokenizeText(text)}
          </Text>
        </ViewMoreText>
      </View>
    )
  }
}
