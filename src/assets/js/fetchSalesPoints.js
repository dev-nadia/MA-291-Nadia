// TODO task003: implémenter une fonction similaire à fetchSnacks
export default async function fetchSalesPoint() {
  const response = await fetch('../../data/points-of-sale.json')
  if (!response.ok) {
    throw new Error(`Unable to load points of sale: ${response.status}`);
  }

  return response.json();
}
