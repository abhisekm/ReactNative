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
    sampleCampaigns: types.array(CampaignModel),
    liveCampaigns: types.array(CampaignModel),
    influencerCampaigns: types.array(CampaignModel),
  })
  .volatile(self => ({
    errorMessage: null as string,
    loading: false,
    loadingMore: false,
    liveCampaignCursor: '',
    influencerCampaignCursor: '',
    liveCampaignHasMore: false,
    influencerCampaignHasMore: false,
  }))
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    },
    get isLoadingMore() {
      return self.loadingMore;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    function resetState() {
      self.loading = false;
      self.loadingMore = false;
      self.errorMessage = null;
    }

    function clear() {
      self.liveCampaigns && self.liveCampaigns.clear();
      resetState();
    }

    function clearSample() {
      self.sampleCampaigns && self.sampleCampaigns.clear();
      resetState();
    }

    function clearInfluencer() {
      self.influencerCampaigns && self.influencerCampaigns.clear();
      resetState();
    }

    return {
      clear, clearSample, clearInfluencer,
    }
  })
  .actions(self => ({
    getSampleCampaigns() {
      return self.sampleCampaigns.slice();
    },

    getInfluencerCampaigns() {
      return self.influencerCampaigns.slice();
    },

    getLiveCampaigns() {
      return self.liveCampaigns.slice();
    },
  }))
  .actions(self => ({
    fetchSampleCampaigns: flow(function* () {
      self.clearSample();
      self.loading = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string }
        = yield self.environment.api.getSampleCampaign();

      const { kind, campaigns, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (campaigns) {
        campaigns.forEach((_campaign) => {
          self.sampleCampaigns.push(_campaign);
          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });
        })

        FastImage.preload(images);
      }

      self.loading = false;
    }),

    fetchLiveCampaigns: flow(function* (showTop?: boolean) {
      self.clear();
      self.loading = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string, hasMore: boolean, cursor: string }
        = yield self.environment.api.getCampaignListing("");

      const { kind, campaigns, errorMessage, hasMore, cursor } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (showTop && hasMore) {
        const moreCampaign = CampaignModel.create({});
        moreCampaign.id = "seeMore";
        campaigns.push(moreCampaign);
      }

      if (campaigns) {
        campaigns.forEach((_campaign) => {
          self.liveCampaigns.push(_campaign);
          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });
        })

        FastImage.preload(images);
      }

      self.liveCampaignCursor = cursor;
      self.liveCampaignHasMore = hasMore;

      self.loading = false;
    }),

    fetchMoreLiveCampaigns: flow(function* () {
      if (!self.liveCampaignHasMore)
        return;

      self.loadingMore = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string, hasMore: boolean, cursor: string }
        = yield self.environment.api.getCampaignListing(self.liveCampaignCursor);

      const { kind, campaigns, errorMessage, hasMore, cursor } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (campaigns) {
        campaigns.forEach((_campaign) => {
          self.liveCampaigns.push(_campaign);
          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });
        })

        FastImage.preload(images);
      }

      self.liveCampaignCursor = cursor;
      self.liveCampaignHasMore = hasMore;

      self.loadingMore = false;
    }),

    fetchInfluencerCampaigns: flow(function* (showTop?: boolean) {
      self.clearInfluencer();
      self.loading = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string, hasMore: boolean, cursor: string }
        = yield self.environment.api.getInfluencerCampaignListing("");

      const { kind, campaigns, errorMessage, hasMore, cursor } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (showTop && hasMore) {
        const moreCampaign = CampaignModel.create({});
        moreCampaign.id = "seeMore";
        campaigns.push(moreCampaign);
      }

      if (campaigns) {
        campaigns.forEach((_campaign) => {
          self.influencerCampaigns.push(_campaign);
          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });
        })

        FastImage.preload(images);
      }

      self.liveCampaignCursor = cursor;
      self.liveCampaignHasMore = hasMore;

      self.loading = false;
    }),

    fetchMoreInfluencerCampaigns: flow(function* () {
      if (!self.influencerCampaignHasMore)
        return;

      self.loadingMore = true;

      const result: { kind: string, campaigns: Campaign[], temporary: boolean, errorMessage: string, hasMore: boolean, cursor: string }
        = yield self.environment.api.getInfluencerCampaignListing(self.influencerCampaignCursor);

      const { kind, campaigns, errorMessage, hasMore, cursor } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      const images: FastImageSource[] = []

      if (campaigns) {
        campaigns.forEach((_campaign) => {
          self.influencerCampaigns.push(_campaign);
          if (_campaign.campaignImage)
            images.push({ uri: _campaign.campaignImage });
        })

        FastImage.preload(images);
      }

      self.influencerCampaignCursor = cursor;
      self.influencerCampaignHasMore = hasMore;

      self.loadingMore = false;
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
// .postProcessSnapshot(omit(["campaignDetail", "errorMessage", "loading"]))

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
