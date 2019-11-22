import * as React from "react"
import { View, ViewStyle, FlatList, ListRenderItem, TouchableOpacity } from "react-native"
import { Text } from "../text"
import { spacing, color } from "../../theme"
import { IInterestData } from "../../screens/user-details-screen"
import { Button as RNEButton } from 'react-native-elements'

export interface UserInterestProps {
  keys: string[]

  displayData: IInterestData[][]

  itemClicked: (string) => void

  style?: ViewStyle
}


const InterestButton = (props) => {
  const { item, text, selected, onSelect } = props;

  return (
    <RNEButton
      TouchableComponent={TouchableOpacity}
      type={selected ? "solid" : "outline"}
      title={text}
      containerStyle={{
        borderRadius: 20,
      }}
      buttonStyle={{
        paddingHorizontal: spacing.medium,
        borderRadius: 20,
        backgroundColor: selected ? color.secondary : 'transparent',
        borderColor: color.secondary,
        borderWidth: 2
      }}
      titleStyle={{ color: selected ? 'white' : color.secondary }}
      onPress={() => onSelect(item)} />
  )
}


const _renderItem = (item: IInterestData[], itemClicked: (string) => void) => (
  <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: spacing.tiny }}>
    {item.map((_item: IInterestData) => {
      return (
        <View style={{ marginVertical: spacing.tiny }}>
          <InterestButton item={_item} text={_item.value} selected={_item.isSelected} onSelect={itemClicked} />
        </View>
      )
    })}
  </View>
)

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function UserInterest(props: UserInterestProps) {
  // grab the props
  const { keys, displayData, itemClicked, style, ...rest } = props
  const [state, setState] = React.useState(data);

  const itemSelected = (item: string) => {

  }

  return (
    <View style={style} {...rest}>
      <Text
        preset="fieldLabel"
        text="Interests"
        style={{ marginVertical: spacing.large, marginHorizontal: spacing.medium, paddingHorizontal: spacing.medium, }} />

      <FlatList<IInterestData[]>
        data={displayData}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => _renderItem(item, itemClicked)}
        //Setting the number of column
        horizontal
        keyExtractor={(item, index) => item.toString() + index.toString()}
        extraData={selectedInterests}
      />
    </View>
  )
}
