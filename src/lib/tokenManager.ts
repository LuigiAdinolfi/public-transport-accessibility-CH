import qs from "qs";

let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

/**
 * Fetches a new access token from the token endpoint using client credentials.
 *
 * This function performs the following steps:
 * 1. Checks if the required environment variables are defined.
 * 2. Makes a POST request to the token endpoint with the client credentials.
 * 3. Parses the response to retrieve the access token and its expiry time.
 * 4. Stores the access token and its expiry time for future use.
 *
 * @returns {Promise<string | null>} The access token if successful, or null if the request failed.
 */
async function fetchAccessToken(): Promise<string | null> {
  try {
    // Define the token endpoint and client credentials
    const tokenEndpoint = process.env.TOKEN_ENDPOINT;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const scope = process.env.SCOPE;

    // Check if environment variables are properly defined
    if (!tokenEndpoint || !clientId || !clientSecret || !scope) {
      console.error("Environment variables are not properly defined");
      return null;
    }

    // Make the token request
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        grant_type: "client_credentials",
        scope: scope,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    // Check if the response status is not OK
    if (!response.ok) {
      console.error(
        "Failed to fetch access token:",
        response.status,
        response.statusText,
      );
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return null;
    }

    const data = await response.json();

    // Validate the token response
    if (typeof data.expires_in !== "number" || !data.access_token) {
      console.error(
        "The token response does not contain a valid expires_in value or access_token",
      );
      return null;
    }

    // Store the access token and its expiry time
    accessToken = data.access_token;
    tokenExpiryTime = Date.now() + data.expires_in * 1000;

    console.log("Access token fetched successfully");

    return accessToken;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    return null;
  }
}

/**
 * Retrieves a valid access token. If the current token is expired or not present, fetches a new one.
 *
 * This function performs the following steps:
 * 1. Checks if the current access token is valid (i.e., not expired).
 * 2. If the token is valid, returns it.
 * 3. If the token is expired or not present, fetches a new token using `fetchAccessToken`.
 *
 * @returns {Promise<string | null>} The valid access token if successful, or null if the request failed.
 */
export default async function getValidAccessToken(): Promise<string | null> {
  // Check if the current access token is valid
  if (accessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return accessToken;
  }

  // Fetch a new access token if the current one is expired or not present
  return await fetchAccessToken();
}
