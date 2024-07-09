export default async function fetchFromExplorerAPI(where: string) {
  try {
    const explorerURL = `https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1`;

    const response = await fetch(explorerURL);

    if (!response.ok) {
      console.error(`Failed to fetch ${explorerURL}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`An error occurred while fetching explorer API`, error);
    return null;
  }
}
