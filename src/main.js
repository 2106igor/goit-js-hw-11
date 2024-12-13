import { fetchImages } from './js/pixabay-api';
import { renderGallery, initializeLightbox, smoothScroll } from './js/render-functions';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox;

let searchQuery = '';
let currentPage = 1;

// Скрыть кнопку "Load more" изначально
loadMoreBtn.style.display = 'none';

/**
 * Обработка события отправки формы
 * @param {Event} event
 */
const onSearchSubmit = async (event) => {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    alert('Please enter a search query.');
    return;
  }

  // Очистка галереи и сброс страницы
  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';

  try {
    const data = await fetchImages(searchQuery, currentPage);
    renderImages(data.hits);
    handleLoadMoreVisibility(data.totalHits);
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Загрузка дополнительных изображений
 */
const onLoadMore = async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(searchQuery, currentPage);
    renderImages(data.hits);
    handleLoadMoreVisibility(data.totalHits);
    smoothScroll();
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Отображение изображений в галерее
 * @param {Array} images
 */
const renderImages = (images) => {
  const markup = renderGallery(images);
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = initializeLightbox();
  } else {
    lightbox.refresh();
  }
};

/**
 * Управляет видимостью кнопки Load More
 * @param {number} totalHits
 */
const handleLoadMoreVisibility = (totalHits) => {
  const totalLoaded = currentPage * 15; // 15 - количество на страницу
  if (totalLoaded >= totalHits) {
    loadMoreBtn.style.display = 'none';
    alert("We're sorry, but you've reached the end of search results.");
  } else {
    loadMoreBtn.style.display = 'block';
  }
};

// Обработчики событий
searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
