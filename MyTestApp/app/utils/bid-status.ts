import { ICampaignStatus, campaignStatus } from "./campaign-status";

export interface IBidStatus {
  campaignStatus: ICampaignStatus,
  bidStatusText: string,
  bidShortName: string
}

export const bidStatus: Map<string, IBidStatus> = new Map();
bidStatus.set("created", {
  campaignStatus: campaignStatus.get("campaign-applied"),
  bidStatusText: "Bid is pending approval",
  bidShortName: "Created"
});
bidStatus.set("rejected", {
  campaignStatus: campaignStatus.get("campaign-rejected"),
  bidStatusText: "Bid is rejected",
  bidShortName: "Rejected"
});
bidStatus.set("accepted", {
  campaignStatus: campaignStatus.get("campaign-approved"),
  bidStatusText: "Bid is approved!",
  bidShortName: "Accepted"
});
bidStatus.set("admin_asking_for_a_new_price", {
  campaignStatus: campaignStatus.get("campaign-attention"),
  bidStatusText: "Bid negotiation initiated",
  bidShortName: "Brand Asking New Bid"
});
bidStatus.set("influencer_accepted_asked_price", {
  campaignStatus: campaignStatus.get("campaign-approved"),
  bidStatusText: "You accepted the proposal",
  bidShortName: "Accepted Proposal"
});
bidStatus.set("influencer_rejected_asked_price", {
  campaignStatus: campaignStatus.get("campaign-rejected"),
  bidStatusText: "You rejected the proposal",
  bidShortName: "Rejected Proposal"
});
bidStatus.set("influencer_asking_for_a_new_price", {
  campaignStatus: campaignStatus.get("campaign-applied"),
  bidStatusText: "Bid is pending approval",
  bidShortName: "Asked New Bid"
});
