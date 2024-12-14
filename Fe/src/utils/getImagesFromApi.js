const ApiUrl = import.meta.env.VITE_API_URL;

export function getImagesFromApi(path) {
  return `${ApiUrl}${path}`;
}