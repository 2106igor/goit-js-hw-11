import axios from 'axios';

const API_KEY = '47406672-32912a9d4734ffdd3d590f70b';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

/**
 * Fetches images from Pixabay API.
 * @param {string} query - The search query.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<object>} The response data from the API.
 */
export const fetchImages = async (query, page = 1) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  try {
    const { data } = await axios.get(BASE_URL, { params });
    if (data.totalHits === 0) {
      throw new Error('No images found for your query.');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images.');
  }
};
