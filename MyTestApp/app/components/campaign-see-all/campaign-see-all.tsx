import * as React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Text } from "../text"
import TouchableScale from 'react-native-touchable-scale';
import styles from "../campaign-slider/campaign-slider-styles"
import { color } from "../../theme";
import { Icon } from "react-native-elements";
import { scale } from "../../utils/scale";
import { useObserver } from "mobx-react";
import { useStores } from "../../models/root-store";

export interface CampaignSeeAllProps {
  /**
   * Mode for all campaign.
   * values = live / influencer
   * live : show all live campaigns
   * influencer: show all applied campaigns
   * signup: open signup
   */
  mode?: string
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const CampaignSeeAll: React.FC<CampaignSeeAllProps> = (props) => {
  const { mode = "live" } = props;
  const { navigationStore: { navigateTo } } = useStores();

  const _onPress = React.useCallback(() => {
    if (mode == 'signup') {
      navigateTo("loginFlow");
    } else {
      navigateTo("AllCampaign", { mode: mode })
    }
  }, [mode]);

  return useObserver(() => (
    <TouchableScale
      style={[styles.slideInnerContainer, {}]}
      activeScale={0.95}
      friction={10}
      onPress={_onPress} >
      <View style={[styles.shadow, { backgroundColor: color.palette.pink1 }]} >

        <Image
          source={require('../../res/images/light.png')}
          style={[StyleSheet.absoluteFill, { top: scale(-90), height: scale(200), width: '100%' }]}

        />
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
          <Text preset="header" text="See All" style={{ color: color.palette.white, textTransform: 'uppercase' }} />
          <Icon name="chevron-right" type="material" color={color.palette.white} />
        </View>
      </View>
    </TouchableScale>
  ))
}
