import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG, INSTA_API_CONFIG, INSTA_GRAPH_API_CONFIG, IMMERSIFY_API_CONFIG, IMMERSIFY_TEST_API_CONFIG } from "./api-config"
import { IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URL } from "react-native-dotenv"
import * as Types from "./api.types"
import { InstagramPost } from "../../models/instagram-post"
import { Campaign, CampaignModel } from "../../models/campaign"
import { ImagePickerResponse } from "react-native-image-picker"
import { Platform } from "react-native"
import { firebase } from "@react-native-firebase/auth"
import { isTest } from "../../app"
import { types, cast } from "mobx-state-tree"
import { CampaignBid } from "../../models/campaign-bid"
import { CampaignBidHistory } from "../../models/campaign-bid-history"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * The instagram apisauce instance which performs the requests.
   */
  instaapisauce: ApisauceInstance

  /**
   * The instagram apisauce instance which performs the requests.
   */
  instagraphapisauce: ApisauceInstance

  /**
  * The Immersify apisauce instance which performs the requests.
  */
  immersifyapisauce: ApisauceInstance

  /**
   * Test api for upload
   */
  immersifytestapisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.instaapisauce = create({
      baseURL: INSTA_API_CONFIG.url,
      timeout: INSTA_API_CONFIG.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.instagraphapisauce = create({
      baseURL: INSTA_GRAPH_API_CONFIG.url,
      timeout: INSTA_GRAPH_API_CONFIG.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.immersifyapisauce = create({
      baseURL: IMMERSIFY_API_CONFIG.url,
      timeout: IMMERSIFY_API_CONFIG.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.immersifytestapisauce = create({
      baseURL: IMMERSIFY_TEST_API_CONFIG.url,
      timeout: IMMERSIFY_TEST_API_CONFIG.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  setAuthToken = (userAuth) => {
    this.immersifyapisauce.setHeader('x-auth-token', userAuth);
    this.immersifytestapisauce.setHeader('x-auth-token', userAuth)
  }

  removeAuthToken = () => {
    this.immersifyapisauce.deleteHeader('x-auth-token');
    this.immersifytestapisauce.deleteHeader('x-auth-token');
  }

  /**
  * Gets insta access_token from code
  */
  async getToken(code: string): Promise<Types.GetAccessTokenResult> {
    // create form data
    const data = new FormData();
    data.append('app_id', IG_APP_ID);
    data.append('app_secret', IG_APP_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', IG_REDIRECT_URL);
    data.append('code', code);

    // make the api call
    const response: ApiResponse<any> = await this.instaapisauce.post(`access_token`, data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultToken: Types.AccessToken = {
        user_id: response.data.user_id,
        access_token: response.data.access_token,
      }
      return { kind: "ok", token: resultToken };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
  * Gets insta userName from access_token
  */
  async getUserName(token: string): Promise<Types.GetIGUserResult> {
    // create form data
    const params = {
      fields: 'id,username',
      access_token: token
    }

    // make the api call
    const response: ApiResponse<any> = await this.instagraphapisauce.get(`/me`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.IGUser = {
        id: response.data.id,
        username: response.data.username,
      }
      return { kind: "ok", user: result };
    } catch {
      return { kind: "bad-data" };
    }
  }


  /**
  * Gets insta post for userId
  */
  async getPosts(token: string): Promise<Types.GetIGPostsResult> {
    // create form data
    const params = {
      fields: 'id,caption,media_type,media_url,username',
      access_token: token
    }

    // make the api call
    const response: ApiResponse<any> = await this.instagraphapisauce.get('/me/media', params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertPost = raw => {
      return {
        id: raw.id,
        caption: raw.caption,
        media_type: raw.media_type,
        media_url: raw.media_url,
        username: raw.username,
        likes: Math.floor(Math.random() * 100) + 1,
      } as InstagramPost
    }

    // transform the data into the format we are expecting
    try {
      const rawPosts = response.data.data;
      const resultPosts: InstagramPost[] = rawPosts.map(convertPost);
      const hasMore: boolean = response.data.paging && response.data.paging.next && true;
      const cursor = hasMore ? response.data.paging.cursors.after : '';
      return { kind: "ok", posts: resultPosts, hasMore: hasMore, nextCursor: cursor };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
  * Gets insta post for userId
  */
  async getMorePosts(token: string, after: string): Promise<Types.GetIGPostsResult> {
    // create form data
    const params = {
      fields: 'id,caption,media_type,media_url,username',
      access_token: token,
      limit: 25,
      after: after
    }

    // make the api call
    const response: ApiResponse<any> = await this.instagraphapisauce.get('/me/media', params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem;
    }

    const convertPost = raw => {
      return {
        id: raw.id,
        caption: raw.caption,
        media_type: raw.media_type,
        media_url: raw.media_url,
        username: raw.username,
        likes: Math.floor(Math.random() * 100) + 1,
      } as InstagramPost
    }

    // transform the data into the format we are expecting
    try {
      const rawPosts = response.data.data;
      const resultPosts: InstagramPost[] = rawPosts.map(convertPost);
      const hasMore: boolean = response.data.paging && response.data.paging.next && true;
      const cursor = hasMore ? response.data.paging.cursors.after : '';
      return { kind: "ok", posts: resultPosts, hasMore: hasMore, nextCursor: cursor };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
  * Gets insta post for userId
  */
  async getFeaturedPosts(nextCursor: number = 0): Promise<Types.GetIGPostsResult> {
    // create form data
    const data = {
      cursor: nextCursor
    }

    // make the api call
    const response: ApiResponse<any> = await this.immersifyapisauce.post('/getlatestposts', data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertPost = (raw): InstagramPost => {
      return {
        id: raw.post_id.toString(),
        media_type: raw.media[0].media_type === "photo" ? "IMAGE" : "VIDEO",
        media_url: raw.media[0].media_url,
        caption: raw.post_text,
        avatar: raw.profile_picture,
        username: raw.insta_username,
        likes: raw.likes_count,
        location: raw.loc_name
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawPosts = response.data.result;
      const resultPosts: InstagramPost[] = rawPosts.map(convertPost);
      const hasMore: boolean = response.data.cursor && response.data.cursor > 0;
      const cursor: number = hasMore ? response.data.cursor : null;

      return { kind: "ok", posts: resultPosts, hasMore: hasMore, nextCursor: cursor };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }

  private convertBidHistory = (raw): CampaignBidHistory[] => {
    if (raw == null)
      return null;

    const history: CampaignBidHistory[] = []

    raw.forEach(bid => {
      const bidHistory: CampaignBidHistory = {
        comment: bid.comment as string,
        price: bid.price as number,
        state: bid.state as string,
        bidId: bid.bid_id ? bid.bid_id : bid.bid_history_id as string,
        campaign: bid.campaign as string,
        createdOn: bid.created_on as string,
        influencer: bid.influencer as string,
      }

      history.push(bidHistory);
    })

    return history;
  }

  private convertCampaignBid = (raw): CampaignBid => {
    if (raw == null)
      return null;

    return {
      comment: raw.comment as string,
      price: raw.price as number,
      state: raw.state as string,
      bidId: raw.bid_id as string,
      history: cast(this.convertBidHistory(raw.history))
    }
  }

  private convertCampaignPost = (raw): Campaign => {
    // const platformArray = types.array(types.string).create([]);
    // if (raw.platform) {
    //   raw.platform.forEach((item: string) => {
    //     platformArray.push(item);
    //   })
    // }

    // const locationArray = types.array(types.string).create([]);
    // if (raw.location) {
    //   raw.location.forEach((item: string) => {
    //     locationArray.push(item);
    //   })
    // }

    // const languageArray = types.array(types.string).create([]);
    // if (raw.language) {
    //   raw.language.forEach((item: string) => {
    //     languageArray.push(item);
    //   })
    // }

    // const campaignCategoryArray = types.array(types.string).create([]);
    // if (raw.campaignCategory) {
    //   raw.campaignCategory.forEach((item: string) => {
    //     campaignCategoryArray.push(item);
    //   })
    // }

    // const contentTypeArray = types.array(types.string).create([]);
    // if (raw.contentType) {
    //   raw.contentType.forEach((item: string) => {
    //     contentTypeArray.push(item);
    //   })
    // }

    // const campaignGoalArray = types.array(types.string).create([]);
    // if (raw.campaignGoal) {
    //   raw.campaignGoal.forEach((item: string) => {
    //     campaignGoalArray.push(item);
    //   })
    // }



    return CampaignModel.create({
      id: raw.campaign_id as string,
      brandId: raw.brand_id as string,
      createdOn: raw.created_on as string,
      deadline: raw.deadline as string,
      physicalPresenceRequired: raw.physical_presence_required as boolean,
      openForBids: raw.open_for_bids as boolean,
      campaignImage: raw.campaign_image_url as string,
      campaignName: raw.campaign_name as string,
      campaignBidApproval: raw.campaign_bid_approval as string,
      showOnInfluencerDashboard: raw.show_on_influencers_dash as boolean,
      platform: cast(raw.platform),
      location: cast(raw.location),
      campaignState: raw.state as string,
      campaignFixedPrice: raw.campaign_fixed_price as number,
      followerCount: raw.follower_count as string,
      campaignDescription: raw.campaign_description as string,
      campaignCategory: cast(raw.campaign_category),
      deliverableDescription: raw.deliverables_description as string,
      contentType: cast(raw.content_type),
      language: cast(raw.language),
      campaignScope: raw.campaign_scope as string,
      campaignExchangeable: raw.campaign_exchangeable as string,
      campaignBidType: raw.campaign_bid_type as string,
      campaignBudget: raw.budget as string,
      unauthorizedAccess: raw.allow_unauthorized_users_to_view ? raw.allow_unauthorized_users_to_view : false,
      campaignInfluencerSourcing: raw.campaign_influencer_sourcing as string,
      campaignGoal: cast(raw.campaign_goal),
      bid: this.convertCampaignBid(raw.bid)
    })
  }

  /**
  * Gets sample campaigns to show pre-signup
  */
  async getSampleCampaign(): Promise<Types.GetCampaignListingResult> {
    // create form data
    const data = {}

    // Test
    // const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;
    const api = this.immersifyapisauce;

    // make the api call
    const response: ApiResponse<any> = await api.post('/browse_platform_campaigns', data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const status: boolean = response.data.isSuccess;
      if (!status) {
        return { kind: "ok", campaigns: null, errorMessage: response.data.msg };
      }

      const rawCampaign = response.data.result;

      const resultCampaign: Campaign[] = rawCampaign.map(this.convertCampaignPost);

      return { kind: "ok", campaigns: resultCampaign };
    } catch (error) {
      console.log("error - ", error);

      return { kind: "bad-data" };
    }
  }

  /**
  * Gets live campaign listings
  */
  async getCampaignListing(cursor?: string): Promise<Types.GetCampaignListingResult> {
    // create form data
    const data = {
      cursor: cursor
    }

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    // make the api call
    const response: ApiResponse<any> = await api.post('/get_platform_campaigns', data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const status: boolean = response.data.isSuccess;
      if (!status) {
        return { kind: "ok", campaigns: null, errorMessage: response.data.msg };
      }

      const rawCampaign = response.data.result;
      const resultCampaign: Campaign[] = rawCampaign.map(this.convertCampaignPost);

      return { kind: "ok", campaigns: resultCampaign, hasMore: response.data.hasMore, cursor: response.data.cursor };
    } catch (error) {
      console.log("bad-data - ", error);
      return { kind: "bad-data" };
    }
  }

  /**
  * Gets live campaign listings
  */
  async getInfluencerCampaignListing(cursor: string): Promise<Types.GetCampaignListingResult> {
    // create form data
    const data = {
      cursor: cursor
    }

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    // make the api call
    const response: ApiResponse<any> = await api.post('/get_influencer_campaigns', data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const status: boolean = response.data.isSuccess;
      if (!status) {
        return { kind: "ok", campaigns: null, errorMessage: response.data.msg };
      }

      const rawCampaign = response.data.result;
      const resultCampaign: Campaign[] = rawCampaign.map(this.convertCampaignPost);

      return { kind: "ok", campaigns: resultCampaign, hasMore: response.data.hasMore, cursor: response.data.cursor };
    } catch (error) {
      console.log("bad-data - ", error);
      return { kind: "bad-data" };
    }
  }

  /**
   * Dummy test image upload
   */

  async uploadImage(photo: ImagePickerResponse): Promise<Types.GetCampaignListingResult> {
    // create form data
    const createFormData = (photo: ImagePickerResponse, body) => {
      const data = new FormData();

      data.append("photo", JSON.stringify({
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      }));

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      return data;
    };

    const data = {
      userId: await firebase.auth().currentUser.getIdToken(),
    }

    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('/getlivecampaigns', createFormData(photo, data))

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", campaigns: null };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }

  /**
   * Check if the influencer exists in data base. If yes skip user onboarding.
   */
  async checkInfluencerSignUp(): Promise<Types.CheckInfluencerResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    // Empty data
    const data = {};

    // make the api call
    const response: ApiResponse<any> = await api.post('/check_influencer_signup', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.CheckInfluencer = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
        userRegistered: response.data.userRegistered,
        askOptional: response.data.askOptional
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Registers the user after signup
   * 
   * @param userData - Influencer essential data
   */

  async influencerSignUp(userData: Types.InfluencerData): Promise<Types.BaseResponseResult> {
    // create form data
    // const data = new FormData();
    // data.append('name', userData.name);
    // data.append('app_secret', IG_APP_SECRET);
    // data.append('grant_type', 'authorization_code');
    // data.append('redirect_uri', IG_REDIRECT_URL);
    // data.append('code', code);

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    // make the api call
    const response: ApiResponse<any> = await api.post('/influencer_signup', userData)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getUserProfile(): Promise<Types.InfluencerProfileResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const body = {};

    // make the api call
    const response: ApiResponse<any> = await api.post('/get_profile', body);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }

      const data: Types.InfluencerProfile = {
        name: response.data.data.name,
        insta_account: response.data.data.insta_account,
        number_of_followers: response.data.data.number_of_followers,
        location: response.data.data.location,
        interests: response.data.data.interests,
        phone: response.data.data.phone,
        allowed_to_send_sms: response.data.data.allowed_to_send_sms,
        social_media: response.data.data.social_media,
        profession: response.data.data.profession,
        languages: response.data.data.languages,
        age: response.data.data.age,
        gender: response.data.data.gender,
        not_recomended_brands_and_products: response.data.data.not_recomended_brands_and_products,
        expected_renumeration_per_gig: response.data.data.expected_renumeration_per_gig,
        expected_renumeration_per_pp_shoot: response.data.data.expected_renumeration_per_pp_shoot,
        youtube_account: response.data.data.youtube_account,
        facebook_account: response.data.data.facebook_account,
        twitter_account: response.data.data.twitter_account,
        tiktok_account: response.data.data.tiktok_account,
      }

      return { kind: "ok", response: result, data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async saveUserProfile(data: Types.InfluencerProfile): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    // make the api call
    const response: ApiResponse<any> = await api.post('/save_influencer_profile', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async updateFcmToken(token: string): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      fcm: token
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/add_fcm_token', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async removeFcmToken(token: string): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      fcm: token
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/remove_fcm_token', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async updateCampaignDetails(campaignId: string): Promise<Types.GetCampaignDetailsResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      id: campaignId
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/get_platform_campaign_details', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.ICampaignDetails = {
        isSuccess: response.data.isSuccess,
        campaign: this.convertCampaignPost(response.data.result[0]),
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Used to create a bid for a campaign (make a bid with created state)
   * 
   * @param price bid price
   * @param comment comment
   * @param campaignId url safe campaign id
   */
  async createBid(price: number, comment: string, campaignId: string): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      price: price,
      comment: comment,
      campaign_id: campaignId
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/create_bid', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Used by influencer dashboard to accept or reject a bid negotiation offer from admin 
   * (change a bid to “influencer_accepted_asked_price” or “influencer_rejected_asked_price” state)
   * 
   * @param price bid price
   * @param comment bid comment
   * @param bidId url safe bid id
   * @param state bid state when responding to the bid
   * @param isAccepted bid accepter or rejected
   */
  async bidResponse(price: number, comment: string, bidId: string, state: string, isAccepted: boolean): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      price: price,
      comment: comment,
      bid_id: bidId,
      state: state
    }

    // endpoint
    const url = isAccepted ? '/accept_asked_price' : '/reject_asked_price'

    // make the api call
    const response: ApiResponse<any> = await api.post(url, data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Used by influencer dashboard to ask a new price for a bid under negotiation 
   * (changes bid to “influencer_asking_for_a_new_price” state)
   * 
   * @param price bid price of existing proposal
   * @param askPrice new bid price
   * @param comment bid comment
   * @param bidId url safe bid id
   * @param state state of the existing proposal
   */
  async askNewBid(price: number, askPrice: number, comment: string, bidId: string, state: string): Promise<Types.BaseResponseResult> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      price: price,
      comment: comment,
      bid_id: bidId,
      state: state,
      ask_price: askPrice
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/ask_new_price', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.BaseResponse = {
        isSuccess: response.data.isSuccess,
        msg: response.data.msg,
      }
      return { kind: "ok", response: result };
    } catch {
      return { kind: "bad-data" };
    }
  }


  async getBidHistory(bidId: string, cursor?: string): Promise<Types.GetBidHistory> {

    // Test
    const api = isTest ? this.immersifytestapisauce : this.immersifyapisauce;

    const data = {
      bid_id: bidId,
      cursor: cursor
    }

    // make the api call
    const response: ApiResponse<any> = await api.post('/get_influencer_bid_history', data);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Types.IBidHistory = {
        isSuccess: response.data.isSuccess,
        history: this.convertBidHistory(response.data.result),
        msg: response.data.msg,
      }
      return { kind: "ok", result: result, hasMore: response.data.hasMore, nextCursor: response.data.cursor };
    } catch {
      return { kind: "bad-data" };
    }
  }
}
