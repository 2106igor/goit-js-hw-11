import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/**
 * Renders a gallery markup.
 * @param {Array} images - The list of image objects.
 * @returns {string} - The generated HTML markup.
 */
export const renderGallery = (images) => {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a href="${largeImageURL}" class="gallery__item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>`
    )
    .join('');
};

/**
 * Initializes the lightbox for the gallery.
 * @returns {SimpleLightbox} The initialized SimpleLightbox instance.
 */
export const initializeLightbox = () => {
  return new SimpleLightbox('.gallery__item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

/**
 * Scrolls the page smoothly by the height of two gallery cards.
 */
export const smoothScroll = () => {
  const cardHeight = document.querySelector('.photo-card')?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
