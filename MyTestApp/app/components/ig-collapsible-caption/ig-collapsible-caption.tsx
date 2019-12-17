import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import ViewMoreText from 'react-native-view-more-text';
import { color } from "../../theme";
import { Button } from "../button";

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
export function IgCollapsibleCaption(props: IgCollapsibleCaptionProps) {
  const { id, text, style, ...rest } = props

  return React.useMemo(() => {
    const tokenizeText = () => {
      if (!text) {
        return null;
      }

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

      //highlight hashtags and mentions
      _parts = _parts.map((text, index) => {
        if (/^#/.test(text)) {
          return <Text key={index} style={{ color: color.igTag }}>{text}</Text>;
        } else if (/^@/.test(text)) {
          return <Text key={index} style={{ color: color.igTag }}>{text}</Text>;
        } else {
          return text;
        }
      });

      return (
        <Text>
          {_parts}
        </Text>
      )
    }

    const _renderViewMore = (handlePress) => {
      return (
        <Button
          preset="link"
          onPress={handlePress}
          text="Read more"
          style={{ paddingVertical: 5 }}
          textStyle={{ color: color.palette.pink2 }}
        />
      );
    }

    const _renderViewLess = (handlePress) => {
      return (
        null
        // <Text style={{ color: color.palette.pink2, paddingVertical: 5 }} onPress={handlePress} text='Show less' />
      );
    }

    if (!text) {
      return null;
    }

    return (
      <View style={[style, { backgroundColor: color.palette.white }]} {...rest} >
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={_renderViewMore}
          renderViewLess={_renderViewLess}>
          {tokenizeText()}
        </ViewMoreText>
      </View>
    )
  }, [text]);
}
