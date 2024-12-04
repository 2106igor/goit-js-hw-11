// pixabay-api.js
const API_KEY = '47406672-32912a9d4734ffdd3d590f70b';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Fetches images from Pixabay API
 * @param {string} query 
 * @param {number} page 
 * @param {number} perPage 
 * @returns {Promise} 
 */
export const fetchImages = async (query, page = 1, perPage = 40) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  return response.json();
};
