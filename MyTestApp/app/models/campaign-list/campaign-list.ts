import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions";
import { CampaignModel, Campaign } from "../campaign/campaign";
import FastImage, { FastImageSource } from "react-native-fast-image";
import { CampaignDetailModel, CampaignDetail } from "../campaign-detail";
import omit from "ramda/es/omit";

/**
 * Model description here for TypeScript hints.
 */
export const CampaignListModel = types
  .model("CampaignList")
  .props({
    campaigns: types.array(CampaignModel),
    campaignDetail: types.maybeNull(CampaignDetailModel),
    errorMessage: types.maybeNull(types.string),
    loading: false,
  })
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    clear() {
      self.campaigns && self.campaigns.clear();
      self.loading = false;
      self.errorMessage = null;
    },

    clearCampaignDetails() {
      self.campaignDetail = null;
      self.loading = false;
      self.errorMessage = null;
    },

    getCampaigns() {
      return self.campaigns.slice();
    },

    getCampaignDetail() {
      return self.campaignDetail;
    }
  }))
  .actions(self => ({
    fetchCampaigns: flow(function* () {
      self.clear();
      self.loading = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string }
        = yield self.environment.api.getCampaignListing();

      const { kind, campaigns, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      let _id = 1;

      if (campaigns) {
        campaigns.forEach((_campaign, index) => {
          _campaign.id = _campaign.id + (1 + index);
          self.campaigns.push(_campaign);

          _campaign.id = _campaign.id + (1 + index) * 10;
          self.campaigns.push(_campaign);

          _campaign.id = _campaign.id + (1 + index) * 10;
          self.campaigns.push(_campaign);

          _campaign.id = _campaign.id + (1 + index) * 10;
          self.campaigns.push(_campaign);

          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });

          if (_campaign.brandImage)
            images.push({ uri: _campaign.brandImage });
        })

        FastImage.preload(images);
      }

      self.loading = false;
    }),

    fetchCampaignDetails: flow(function* (campaignId: string) {
      self.clear();
      self.loading = true;

      const result: { kind: string, campaignDetail: CampaignDetail, temporary: boolean, errorMessage: string }
        = yield self.environment.api.getCampaignDetails(campaignId);

      const { kind, campaignDetail, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (campaignDetail) {
        images.push({ uri: campaignDetail.brandImage });
        images.push({ uri: campaignDetail.campaignImage });

        FastImage.preload(images);

        self.campaignDetail = campaignDetail;
      }

      self.loading = false;
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omit(["campaignDetail", "errorMessage", "loading"]))

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignListType = Instance<typeof CampaignListModel>
export interface CampaignList extends CampaignListType { }
type CampaignListSnapshotType = SnapshotOut<typeof CampaignListModel>
export interface CampaignListSnapshot extends CampaignListSnapshotType { }
