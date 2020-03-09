import { API_URL } from "react-native-dotenv"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "http://localhost:3000/api",
  timeout: 10000,
}

export const INSTA_API_CONFIG: ApiConfig = {
  url: "https://api.instagram.com/oauth",
  timeout: 10000,
}

export const INSTA_GRAPH_API_CONFIG: ApiConfig = {
  url: "https://graph.instagram.com",
  timeout: 10000,
}

export const IMMERSIFY_API_CONFIG: ApiConfig = {
  url: "https://immersify.in",
  timeout: 10000,
}

export const IMMERSIFY_TEST_API_CONFIG: ApiConfig = {
  url: "https://immersifytest.appspot.com",
  timeout: 10000,
}
