import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG, INSTA_API_CONFIG, INSTA_GRAPH_API_CONFIG } from "./api-config"
import { IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URL } from "react-native-dotenv"
import * as Types from "./api.types"
import { InstagramPost } from "../../models/instagram-post"

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
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
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
    const response: ApiResponse<any> = await this.instaapisauce.post(`/access_token`, data)

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
      return { kind: "ok", token: resultToken }
    } catch {
      return { kind: "bad-data" }
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
      return { kind: "ok", user: result }
    } catch {
      return { kind: "bad-data" }
    }
  }


  /**
 * Gets insta post for userId
 */
  async getPosts(token: string): Promise<Types.GetIGPostsResult> {
    // create form data
    const params = {
      fields: 'id,caption,media_type,media_url',
      access_token: token
    }

    // make the api call
    const response: ApiResponse<any> = await this.instagraphapisauce.get(`/me/media`, params)

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
        media_url: raw.media_url
      } as InstagramPost
    }

    // transform the data into the format we are expecting
    try {
      const rawPosts = response.data
      const resultPosts: InstagramPost[] = rawPosts.map(convertPost)
      return { kind: "ok", posts: resultPosts }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
