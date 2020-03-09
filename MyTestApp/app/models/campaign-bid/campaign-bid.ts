import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { CampaignBidHistoryModel, CampaignBidHistory } from "../campaign-bid-history"
import { withEnvironment } from "../extensions"
import { IBidHistory } from "../../services/api";

/**
 * Model description here for TypeScript hints.
 */
export const CampaignBidModel = types
  .model("CampaignBid")
  .props({
    comment: types.maybeNull(types.string),
    price: types.maybeNull(types.number),
    state: types.maybeNull(types.string),
    bidId: types.maybeNull(types.string),
    history: types.optional(types.array(CampaignBidHistoryModel), []),
  })
  .extend(withEnvironment)
  .volatile(self => ({
    loading: false,
    loadingMore: false,
    hasMore: false,
    cursor: '',
    errorMessage: ''
  }))
  .views(self => ({
    get bidHistory(): CampaignBidHistory[] {
      return self.history.slice();
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setBidId(_id: string) {
      self.bidId = _id;
    }
  }))
  .actions(self => ({
    getBidHistory: flow(function* () {
      try {
        self.loading = true;

        const response: { kind: string, temporary: boolean, result: IBidHistory, nextCursor: string, hasMore: boolean }
          = yield self.environment.api.getBidHistory(self.bidId);

        const { kind, result, nextCursor, hasMore } = response;

        if (kind !== "ok") {
          console.log(kind, response);
          self.loading = false;
          self.errorMessage = result && result.msg ? result.msg : "Unknown Error. Try again later";
          return;
        }

        const { isSuccess, msg, history } = result;

        if (!isSuccess) {
          self.loading = false;
          self.errorMessage = msg ? msg : "Unknown Error. Try again later";
          return;
        }

        self.history.clear();
        self.history.push(...history);
        self.hasMore = hasMore;
        self.cursor = nextCursor;

        self.loading = false;
      } catch (error) {
        console.log('getBidHistory - ', error)
      }
    }),

    getMoreBidHistory: flow(function* () {
      try {
        if (!self.hasMore)
          return;

        self.loadingMore = true;

        const response: { kind: string, temporary: boolean, result: IBidHistory, nextCursor: string, hasMore: boolean }
          = yield self.environment.api.getBidHistory(self.bidId, self.cursor);

        const { kind, result, nextCursor, hasMore } = response;

        if (kind !== "ok") {
          console.log(kind, response);
          self.loadingMore = false;
          self.errorMessage = result && result.msg ? result.msg : "Unknown Error. Try again later";
          return;
        }

        const { isSuccess, msg, history } = result;

        if (!isSuccess) {
          self.loadingMore = false;
          self.errorMessage = msg ? msg : "Unknown Error. Try again later";
          return;
        }

        self.history.push(...history);
        self.hasMore = hasMore;
        self.cursor = nextCursor;

        self.loadingMore = false;
      } catch (error) {
        console.log('getMoreBidHistory - ', error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CampaignBidType = Instance<typeof CampaignBidModel>
export interface CampaignBid extends CampaignBidType { }
type CampaignBidSnapshotType = SnapshotOut<typeof CampaignBidModel>
export interface CampaignBidSnapshot extends CampaignBidSnapshotType { }
