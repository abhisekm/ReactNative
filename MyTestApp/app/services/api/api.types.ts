import { GeneralApiProblem } from "./api-problem"
import { InstagramPost } from "../../models/instagram-post"
import { FeaturePost } from "../../models/feature-post"

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