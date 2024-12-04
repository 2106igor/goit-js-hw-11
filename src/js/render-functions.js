import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/**
 * Renders gallery markup
 * @param {Array} images 
 * @returns {string} 
 */
export const renderGallery = (images) => {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a class="card" href="${largeImageURL}" >
        <img class="card-imege" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `
    )
    .join('');
};

export const initializeLightbox = () => new SimpleLightbox('.gallery a');
