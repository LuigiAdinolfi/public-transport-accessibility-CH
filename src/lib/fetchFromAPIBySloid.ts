import getAccessToken from "@/lib/tokenManager";

/**
 * Fetches data from the specified API endpoint using an access token and SLOID,
 * then sorts the data by creation date in descending order and returns the most recent item.
 *
 * This function performs the following steps:
 * 1. Retrieves an access token using `getAccessToken`.
 * 2. Constructs the full URL for the API request by appending the `sloid` to the endpoint.
 * 3. Makes the API request with the access token in the Authorization header.
 * 4. Checks the response status and handles errors.
 * 5. Parses the response data and sorts it by creation date in descending order.
 * 6. Returns the most recent item based on the creation date.
 *
 * @param {string} endpoint - The API endpoint to fetch data from. This should be a path relative to the base URL.
 * @param {string} sloid - The specific SLOID to append to the endpoint, forming part of the final URL.
 * @returns {Promise<any | null>} - A promise that resolves to the most recent data item based on creation date, or null if the request failed or an error occurred.
 */
export default async function fetchFromAPIBySloid(
  endpoint: string,
  sloid: string,
): Promise<any | null> {
  // Retrieve the access token
  const accessToken = await getAccessToken();

  // Check if access token retrieval was successful
  if (!accessToken) {
    console.error("Failed to retrieve access token");
    return null;
  }

  try {
    // Construct the full URL for the API request
    const url = `https://atlas.api.sbb.ch:443${endpoint}/${sloid}`;

    // Make the API request with the access token
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response status is not OK
    if (!response.ok) {
      console.error(
        `[${response.status}] Failed to fetch ${endpoint}/${sloid}`,
      );
      return null;
    }

    // Parse the response JSON
    const data = await response.json();

    // Sort the data by creation date in descending order
    const sortedData = data.sort((a: any, b: any) => {
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    });

    // Return the most recent item
    return sortedData[0];
  } catch (error) {
    // Log any errors that occurred during the fetch operation
    console.error(
      `An error occurred while fetching ${endpoint}/${sloid} |`,
      error,
    );
    return null;
  }
}
