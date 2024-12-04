
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, initializeLightbox } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox;
let currentPage = 1;
let currentQuery = '';

const showLoader = () => (loader.style.display = 'block');
const hideLoader = () => (loader.style.display = 'none');

const handleSearch = async (event) => {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  gallery.innerHTML = '';
  currentQuery = query;
  currentPage = 1;

  showLoader();
  try {
    const data = await fetchImages(query, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No results', message: 'No images found!' });
    } else {
      gallery.innerHTML = renderGallery(data.hits);
      lightbox = initializeLightbox();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
};

searchForm.addEventListener('submit', handleSearch);