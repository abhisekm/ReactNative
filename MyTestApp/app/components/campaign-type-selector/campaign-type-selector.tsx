import * as React from "react"
import { View, ViewStyle, TouchableOpacity, ScrollView } from "react-native"
import { Text } from "../text"
import { observer } from "mobx-react"
import { UserDetails } from "../../models/user-details";
import { spacing, color } from "../../theme";
import { Icon } from "react-native-elements";
import styleSheet from "../../theme/styleSheet";
import { scale } from "../../utils/scale";
import { ICampaignType, getCampaignFromId, ALL_CAMPAING_TYPES } from "../../utils/campaignTypeData";
import { normalisedFontSize } from "../../theme/fontSize";

export interface CampaignTypeSelectorProps {
  /**
   * Selected campaigns
   */
  selectedCampaign: string[],

  /**
   * Toggle campaign type selection
   */
  toggleCampaignType: (id: string) => void,
}


interface CampaignCardProps {
  data: ICampaignType,
  onToggle: (id: string) => void,
  selected: boolean
}

const CampaignCard = (props: CampaignCardProps) => {
  const { data, onToggle, selected = false } = props;

  const cardStyle = {
    backgroundColor: selected ? color.primary : color.palette.white
  } as ViewStyle;

  return (
    <TouchableOpacity
      onPress={() => onToggle(data.id)}
      style={{ marginRight: spacing.small }} >
      <View style={[styleSheet.card, styleSheet.shadow_4, cardStyle, { marginHorizontal: spacing.medium, borderWidth: 2, borderColor: color.primary }]}>
        <Text text={data.title} preset="header" style={{ color: selected ? 'black' : color.primary, marginHorizontal: spacing.small, }} />
        <Text text={data.description} preset="question" style={{ color: 'black', marginHorizontal: spacing.small, fontSize: normalisedFontSize.small }} />
      </View>
    </TouchableOpacity>
  )
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const CampaignTypeSelector: React.FC<CampaignTypeSelectorProps> = observer((props) => {
  // grab the props
  const { selectedCampaign, toggleCampaignType } = props;

  return (
    <View style={{ marginVertical: spacing.small }}>
      <ScrollView style={{ width: '100%', height: scale(250) }} nestedScrollEnabled >
        <View style={{ flexGrow: 1 }}>
          {
            ALL_CAMPAING_TYPES.map((item) => {
              return (
                <CampaignCard key={item.id} data={item} selected={selectedCampaign.some(campaignId => campaignId.toLowerCase() == item.id.toLowerCase())}
                  onToggle={(id) => {
                    toggleCampaignType(id);
                  }}
                />
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  )
});
