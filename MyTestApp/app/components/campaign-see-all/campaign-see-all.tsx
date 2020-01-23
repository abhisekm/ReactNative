import * as React from "react"
import { View, ViewStyle, Image, StyleSheet } from "react-native"
import { Text } from "../text"
import TouchableScale from 'react-native-touchable-scale';
import { navigate } from "../../navigation";
import styles from "../campaign-slider/campaign-slider-styles"
import { color, spacing } from "../../theme";
import { Icon } from "react-native-elements";
import { scale, verticalScale } from "../../utils/scale";

export interface CampaignSeeAllProps {

}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CampaignSeeAll(props: CampaignSeeAllProps) {

  return (
    <TouchableScale
      style={[styles.slideInnerContainer, {}]}
      activeScale={0.95}
      friction={10}
      onPress={() => navigate("AllCampaign")} >
      <View style={[styles.shadow, { backgroundColor: color.palette.pink1 }]} >

        <Image
          source={require('../../components/header/light.png')}
          style={[StyleSheet.absoluteFill, { top: scale(-90), height: scale(200), width: '100%' }]}

        />
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
          <Text preset="header" text="See All" style={{ color: color.palette.white, textTransform: 'uppercase' }} />
          <Icon name="chevron-right" type="material" color={color.palette.white} />
        </View>
      </View>
    </TouchableScale>
  )
}
