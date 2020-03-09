import { color } from "../theme";

export interface ICampaignStatus {
  statusText: string,
  color: string
}

export const campaignStatus: Map<string, ICampaignStatus> = new Map();
campaignStatus.set("campaign-draft", { statusText: "New", color: color.secondary });
campaignStatus.set("campaign-applied", { statusText: "Applied", color: color.secondary });
campaignStatus.set("campaign-approved", { statusText: "Approved", color: "green" });
campaignStatus.set("campaign-attention", { statusText: "Needs Attention", color: color.palette.orangeDarker });
campaignStatus.set("campaign-rejected", { statusText: "Rejected", color: color.error });
campaignStatus.set("campaign-delivered", { statusText: "Delivered", color: "green" });
campaignStatus.set("campaign-payment-pending", { statusText: "Payment Pending", color: "green" });
campaignStatus.set("campaign-paid", { statusText: "Paid", color: "green" });
campaignStatus.set("campaign-complete", { statusText: "Archived", color: color.palette.grey8 });
