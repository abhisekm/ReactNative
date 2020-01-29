import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions";
import { CampaignModel, Campaign } from "../campaign/campaign";
import FastImage, { FastImageSource } from "react-native-fast-image";
import { CampaignDetailModel, CampaignDetail } from "../campaign-detail";
import omit from "ramda/es/omit";
import { ENTRIES1 } from "../../screens/dashboard-screen/entries-dummy"
import { delay } from "../../utils/delay";

/**
 * Model description here for TypeScript hints.
 */
export const CampaignListModel = types
  .model("CampaignList")
  .props({
    campaigns: types.array(CampaignModel),
    allCampaigns: types.array(CampaignModel),
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

    clearAll() {
      self.allCampaigns && self.allCampaigns.clear();
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

    getAllCampaigns() {
      return self.allCampaigns;
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

      const moreCampaign: Campaign = {
        id: "404",
        campaignImage: "http://prod-upp-image-read.ft.com/39648f42-2110-11ea-b8a1-584213ee7b2b",
        brandName: "Immersify",
        brandImage: "https://st3.depositphotos.com/3969727/12985/v/950/depositphotos_129854204-stock-illustration-hashtag-sign-of-splash-paint.jpg",
        title: "Are you an Influencer?",
        link: "listing",
        description: "Spread your story with media and storytellers that are just right for you."
      }

      campaigns.push(moreCampaign);

      if (campaigns) {
        campaigns.forEach((_campaign) => {
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

    fetchAllCampaigns: flow(function* () {
      self.clearAll();
      self.loading = true;

      // const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string }
      //   = yield self.environment.api.getCampaignListing();

      // const { kind, campaigns, errorMessage } = result;

      // if (kind !== "ok") {
      //   console.log(kind, errorMessage);
      //   self.loading = false;
      //   self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
      //   return;
      // }

      // const images: FastImageSource[] = []

      // const moreCampaign: Campaign = {
      //   id: "404",
      //   campaignImage: "http://prod-upp-image-read.ft.com/39648f42-2110-11ea-b8a1-584213ee7b2b",
      //   brandName: "Immersify",
      //   brandImage: "https://st3.depositphotos.com/3969727/12985/v/950/depositphotos_129854204-stock-illustration-hashtag-sign-of-splash-paint.jpg",
      //   title: "Are you an Influencer?",
      //   link: "listing",
      //   description: "Spread your story with media and storytellers that are just right for you."
      // }

      // campaigns.push(moreCampaign);

      // if (campaigns) {
      //   campaigns.forEach((_campaign) => {
      //     self.campaigns.push(_campaign);
      //     if (_campaign.campaignImage)
      //       images.push({ uri: _campaign.campaignImage });

      //     if (_campaign.brandImage)
      //       images.push({ uri: _campaign.brandImage });
      //   })

      //   FastImage.preload(images);
      // }


      const images: FastImageSource[] = []

      ENTRIES1.forEach((entry: Campaign) => {
        self.allCampaigns.push(entry);
        if (entry.campaignImage)
          images.push({ uri: entry.campaignImage });

        if (entry.brandImage)
          images.push({ uri: entry.brandImage });
      })

      FastImage.preload(images);

      self.loading = false;
    }),


    fetchCampaignDetails: flow(function* (campaignId: string) {
      self.clearCampaignDetails();
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

      if (campaignDetail != null && campaignDetail.campaignDetails != null) {
        images.push({ uri: campaignDetail.campaignDetails.brandImage });
        images.push({ uri: campaignDetail.campaignDetails.campaignImage });

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
