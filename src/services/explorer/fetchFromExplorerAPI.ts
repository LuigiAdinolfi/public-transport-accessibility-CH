/**
 * Fetches data from the Explorer API using a specified query parameter.
 *
 * This function constructs a request URL for the Explorer API based on the provided `where` parameter,
 * makes a fetch request to this URL, and returns the JSON response. It is designed to handle errors
 * and log any issues encountered during the fetch operation.
 *
 * @param {string} where - The query parameter to include in the API request URL, typically used to filter data.
 * @returns {Promise<any | null>} A promise that resolves to the JSON response from the API or `null` if the request failed.
 */
export default async function fetchFromExplorerAPI(
  where: string,
): Promise<any | null> {
  try {
    // Construct the URL for the API request using the provided 'where' parameter
    const explorerURL = `https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1`;

    // Make the fetch request to the constructed URL
    const response = await fetch(explorerURL);

    // Check if the response status is not OK
    if (!response.ok) {
      console.error(`Failed to fetch ${explorerURL}: ${response.status}`);
      return null;
    }

    // Parse and return the response JSON
    return await response.json();
  } catch (error) {
    // Log any errors that occurred during the fetch operation
    console.error(
      `An error occurred while fetching from the Explorer API`,
      error,
    );
    return null;
  }
}
