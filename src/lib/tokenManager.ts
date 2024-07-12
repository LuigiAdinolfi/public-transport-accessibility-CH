import qs from "qs";

let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

/**
 * Fetches a new access token from the token endpoint using client credentials.
 *
 * @returns {Promise<string | null>} The access token, or null if the request failed.
 */
async function fetchAccessToken(): Promise<string | null> {
  try {
    // Check that environment variables are defined
    const tokenEndpoint =
      "https://login.microsoftonline.com/2cda5d11-f0ac-46b3-967d-af1b2e1bd01a/oauth2/v2.0/token";
    const clientId = "5fe0faa8-64d3-46ab-b4e7-a65a309155af";
    const clientSecret = "cR18Q~33Aha~V4kIj5VwQF.Gay9ZAx8V6WklZa8n";
    const scope = "api://f3cdcb3e-1e95-4591-b664-4526d00f5d66/.default";

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
 * Retrieves a valid access token. Fetches a new token if the current one is expired or not present.
 *
 * @returns {Promise<string | null>} The valid access token, or null if the request failed.
 */
export default async function getValidAccessToken(): Promise<string | null> {
  if (accessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return accessToken;
  }
  return await fetchAccessToken();
}
