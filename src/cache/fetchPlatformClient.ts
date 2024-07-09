/**
 * Fetches platform data from the server using the provided SLOID.
 * @param {string} sloid - The SLOID (Service Location IDentifier) to fetch platform data for.
 * @returns {Promise<any>} The platform data retrieved from the server.
 * @throws {Error} If the fetch request fails or the response is not OK.
 */
export async function fetchPlatformClient(sloid: string): Promise<any> {
  const response = await fetch("/api/platform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sloid }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch platform");
  }

  return response.json();
}
