"use server";

import getValidAccessToken from "@/lib/tokenManager";

/**
 * Fetches data from the specified API endpoint using an access token for authorization.
 * This function performs the following steps:
 * 1. Retrieves a valid access token using `getValidAccessToken`.
 * 2. Constructs the full URL for the API request.
 * 3. Makes the API request with the access token in the Authorization header.
 * 4. Checks the response status and handles errors.
 * 5. Returns the response data in JSON format or null if the request failed.
 *
 * @param {string} endpoint - The API endpoint to fetch data from. This should be a path relative to the base URL.
 * @returns {Promise<any | null>} - A promise that resolves to the response data in JSON format, or null if the request failed or an error occurred.
 */
export default async function fetchFromAPI(
  endpoint: string,
): Promise<any | null> {
  try {
    // Get a valid access token
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("Failed to retrieve a valid access token");
      return null;
    }

    // Construct the full URL for the API request
    const url = `${process.env.BASE_URL}${endpoint}`;

    // Make the API request with the access token
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response status is not OK
    if (!response.ok) {
      console.error(`[${response.status}] Failed to fetch ${endpoint}`);
      return null;
    }

    // Parse and return the response JSON
    return await response.json();
  } catch (error) {
    // Log any errors that occurred during the fetch operation
    console.error(`An error occurred while fetching ${endpoint} |`, error);
    return null;
  }
}
