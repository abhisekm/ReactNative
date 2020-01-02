import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions";
import { CampaignModel, Campaign } from "../campaign/campaign";
import FastImage, { FastImageSource } from "react-native-fast-image";

/**
 * Model description here for TypeScript hints.
 */
export const CampaignListModel = types
  .model("CampaignList")
  .props({
    campaigns: types.array(CampaignModel),
    errorMessage: types.maybeNull(types.string),
    loading: false,
  })
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    },

    get loadPosts() {
      return self.campaigns;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    clear() {
      self.campaigns && self.campaigns.clear();
      self.loading = false;
      self.errorMessage = null;
    },
  }))
  .actions(self => ({
    fetchFeaturedPosts: flow(function* () {
      self.clear();
      self.loading = true;

      const result: { kind: string, campaign: Campaign[], temporary: boolean, errorMessage: string }
        = yield self.environment.api.getCampaignListing();

      const { kind, campaign, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (campaign) {
        campaign.forEach(_campaign => {
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
  })) // eslint-disable-line @typescript-eslint/no-unused-vars


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
