import getAccessToken from "@/lib/tokenManager";

/**
 * Fetches data from the specified API endpoint using an access token and SLOID,
 * then sorts the data by creation date in descending order and returns the most recent item.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} sloid - The specific SLOID to append to the endpoint.
 * @returns {Promise<any | null>} The most recent data item or null if the request failed.
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
    const url = `${process.env.BASE_URL}${endpoint}/${sloid}`;

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
