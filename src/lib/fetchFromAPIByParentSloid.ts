"use server";

import getAccessToken from "@/lib/tokenManager";

/**
 * Fetches data from the specified API endpoint using an access token and parentServicePointSloid.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} parentServicePointSloid - The specific parentServicePointSloid to append to the endpoint.
 * @returns {Promise<any | null>} The response data or null if the request failed.
 */
export default async function fetchFromAPIByParentSloid(
  endpoint: string,
  parentServicePointSloid: string,
): Promise<any | null> {
  const accessToken = await getAccessToken();

  // Check if access token retrieval was successful
  if (!accessToken) {
    console.error("Failed to retrieve access token");
    return null;
  }

  try {
    // Construct the full URL for the API request
    const url = `https://atlas.api.sbb.ch:443${endpoint}/overview/${parentServicePointSloid}`;

    // Make the API request with the access token
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response status is not OK
    if (!response.ok) {
      console.error(
        `Failed to fetch ${endpoint}/overview/${parentServicePointSloid}: ${response.status}`,
      );
      return null;
    }

    // Parse and return the response JSON
    return await response.json();
  } catch (error) {
    // Log any errors that occurred during the fetch operation
    console.error(
      `An error occurred while fetching ${endpoint}/overview/${parentServicePointSloid}:`,
      error,
    );
    return null;
  }
}
