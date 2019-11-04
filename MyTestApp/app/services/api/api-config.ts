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
  url: API_URL || "https://jsonplaceholder.typicode.com",
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
