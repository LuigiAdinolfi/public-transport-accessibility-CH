"use server";

import getAccessToken from "@/lib/tokenManager";

/**
 * Fetches data from the specified API endpoint using an access token and appends the given parentServicePointSloid to the endpoint.
 * This function performs the following steps:
 * 1. Retrieves an access token using `getAccessToken`.
 * 2. Constructs the full URL for the API request by appending the `parentServicePointSloid` to the endpoint.
 * 3. Makes the API request with the access token in the Authorization header.
 * 4. Checks the response status and handles errors.
 * 5. Returns the response data in JSON format or null if the request failed.
 *
 * @param {string} endpoint - The API endpoint to fetch data from. This should be a path relative to the base URL.
 * @param {string} parentServicePointSloid - The specific parentServicePointSloid to append to the endpoint, forming part of the final URL.
 * @returns {Promise<any | null>} - A promise that resolves to the response data in JSON format, or null if the request failed or an error occurred.
 */
export default async function fetchFromAPIByParentSloid(
  endpoint: string,
  parentServicePointSloid: string,
): Promise<any | null> {
  // Retrieve an access token
  const accessToken = await getAccessToken();

  // Check if access token retrieval was successful
  if (!accessToken) {
    console.error("Failed to retrieve access token");
    return null;
  }

  try {
    // Construct the full URL for the API request
    const url = `${process.env.BASE_URL}${endpoint}/overview/${parentServicePointSloid}`;

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
