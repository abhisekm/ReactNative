import { GeneralApiProblem } from "./api-problem"
import { InstagramPost } from "../../models/instagram-post"
import { Campaign } from "../../models/campaign"
import { CampaignBidHistory } from "../../models/campaign-bid-history"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export interface AccessToken {
  user_id: number
  access_token: string
}

export type GetAccessTokenResult = { kind: "ok"; token: AccessToken } | GeneralApiProblem

export interface IGUser {
  id: string
  username: string
}

export type GetIGUserResult = { kind: "ok"; user: IGUser } | GeneralApiProblem

export type GetIGPostsResult =
  { kind: "ok"; posts: InstagramPost[]; hasMore: boolean; nextCursor: string | number } | GeneralApiProblem

export type GetCampaignListingResult =
  { kind: "ok"; campaigns: Campaign[]; errorMessage?: string; hasMore?: boolean; cursor?: string } | GeneralApiProblem

export interface ICampaignDetails extends BaseResponse {
  campaign: Campaign;
}

export type GetCampaignDetailsResult =
  { kind: "ok"; response: ICampaignDetails } | GeneralApiProblem


export interface BaseResponse {
  isSuccess: boolean,
  msg: string
}

export type BaseResponseResult = { kind: "ok"; response: BaseResponse } | GeneralApiProblem

export interface IBidHistory extends BaseResponse {
  history: CampaignBidHistory[];
}

export type GetBidHistory =
  { kind: "ok"; result: IBidHistory; hasMore: boolean; nextCursor: string } | GeneralApiProblem


export interface CheckInfluencer extends BaseResponse {
  userRegistered: boolean,
  askOptional: boolean,
}

export type CheckInfluencerResult = { kind: "ok"; response: CheckInfluencer } | GeneralApiProblem

export interface InfluencerData {
  name: string,
  insta_account: string,
  number_of_followers: string,
  location: string,
  interests: string[],
  phone: string,
  allowed_to_send_sms: boolean
}

export interface InfluencerProfile extends InfluencerData {
  social_media: string[],
  profession: string,
  languages: string[],
  age: number,
  gender: string,
  not_recomended_brands_and_products: string[],
  expected_renumeration_per_gig: number,
  expected_renumeration_per_pp_shoot: number,
  youtube_account: string,
  facebook_account: string,
  tiktok_account: string,
  twitter_account: string,
}

export type InfluencerProfileResult = { kind: "ok"; response: BaseResponse; data: InfluencerProfile } | GeneralApiProblem
