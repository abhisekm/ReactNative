import { Instance, SnapshotOut, types, flow, applySnapshot, getSnapshot } from "mobx-state-tree"
import type from "ramda/es/type"
import { CampaignBidModel } from "../campaign-bid"
import { withEnvironment } from "../extensions"
import { ICampaignDetails } from "../../services/api"
import { CampaignBidHistoryModel, CampaignBidHistory } from "../campaign-bid-history"

/**
 * Model description here for TypeScript hints.
 */
export const CampaignModel = types
  .model("Campaign")
  .props({
    id: types.maybeNull(types.string),
    brandId: types.maybeNull(types.string),
    createdOn: types.maybeNull(types.string),
    deadline: types.maybeNull(types.string),
    physicalPresenceRequired: types.optional(types.boolean, false),
    openForBids: types.optional(types.boolean, false),
    campaignImage: types.maybeNull(types.string),
    campaignName: types.maybeNull(types.string),
    campaignBidApproval: types.maybeNull(types.string),
    showOnInfluencerDashboard: types.optional(types.boolean, false),
    platform: types.optional(types.array(types.string), []),
    location: types.optional(types.array(types.string), []),
    campaignState: types.maybeNull(types.string),
    campaignFixedPrice: types.maybeNull(types.number),
    followerCount: types.maybeNull(types.string),
    campaignDescription: types.maybeNull(types.string),
    campaignCategory: types.optional(types.array(types.string), []),
    deliverableDescription: types.maybeNull(types.string),
    contentType: types.optional(types.array(types.string), []),
    language: types.optional(types.array(types.string), []),
    campaignScope: types.maybeNull(types.string),
    campaignExchangeable: types.maybeNull(types.string),
    campaignBidType: types.maybeNull(types.string),
    campaignBudget: types.maybeNull(types.string),
    unauthorizedAccess: types.optional(types.boolean, false),
    campaignInfluencerSourcing: types.maybeNull(types.string),
    campaignGoal: types.optional(types.array(types.string), []),
    bid: types.maybeNull(CampaignBidModel),
  })
  .volatile(self => ({
    alertText: null as string,
    loading: false,
    errorMessage: null as string,
  }))
  .extend(withEnvironment)
  .views(self => ({
    get isLoading() {
      return self.loading;
    },

    get bidHistory(): CampaignBidHistory[] {
      if (self.bid == null || self.bid.history == null)
        return [];
      else
        return self.bid.history.slice();
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setCampaignId(_id: string) {
      self.id = _id;
    },

    clearAlert() {
      self.alertText = null;
    },

    clearError() {
      self.errorMessage = null;
    },

    updateCampaignDetails: flow(function* () {
      try {
        self.loading = true;

        const result: { kind: string, temporary: boolean, response: ICampaignDetails }
          = yield self.environment.api.updateCampaignDetails(self.id);

        const { kind, response } = result;

        if (kind !== "ok") {
          self.loading = false;
          self.errorMessage = response && response.msg ? response.msg : "Unknown Error. Try again later";
          return;
        }

        const { campaign } = response;
        applySnapshot(self, getSnapshot(campaign));

        self.loading = false;
      } catch (error) {
        console.log('updateCampaignDetails - ', error)
      }
    }),
  }))
  .actions(self => ({
    createBid: flow(function* (price: number, comment: string) {
      self.loading = true;

      const result: { kind: string, temporary: boolean, errorMessage: string }
        = yield self.environment.api.createBid(price, comment, self.id);

      const { kind, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      self.updateCampaignDetails();

      self.alertText = "Bid created";

      self.loading = false;
    }),

    acceptBid: flow(function* (price: number, comment: string) {
      self.loading = true;

      const result: { kind: string, temporary: boolean, errorMessage: string }
        = yield self.environment.api.bidResponse(price, comment, self.bid.bidId, self.bid.state, true);

      const { kind, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      self.updateCampaignDetails();

      self.alertText = "Bid Accepted";

      self.loading = false;
    }),

    rejectBid: flow(function* (price: number, comment: string) {
      self.loading = true;

      const result: { kind: string, temporary: boolean, errorMessage: string }
        = yield self.environment.api.bidResponse(price, comment, self.bid.bidId, self.bid.state, false);

      const { kind, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      self.updateCampaignDetails();

      self.alertText = "Bid Rejected";

      self.loading = false;
    }),

    askNewBid: flow(function* (price: number, askPrice: number, comment: string) {
      self.loading = true;

      const result: { kind: string, temporary: boolean, errorMessage: string }
        = yield self.environment.api.askNewBid(price, askPrice, comment, self.bid.bidId, self.bid.state);

      const { kind, errorMessage } = result;

      if (kind !== "ok") {
        console.log(kind, errorMessage);
        self.loading = false;
        self.errorMessage = errorMessage ? errorMessage : "Unknown Error. Try again later";
        return;
      }

      self.updateCampaignDetails();

      self.alertText = "New bid proposal submitted";

      self.loading = false;
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignType = Instance<typeof CampaignModel>
export interface Campaign extends CampaignType { }
type CampaignSnapshotType = SnapshotOut<typeof CampaignModel>
export interface CampaignSnapshot extends CampaignSnapshotType { }
