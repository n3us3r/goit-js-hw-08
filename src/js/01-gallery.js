// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const galleryListEl = document.querySelector(".gallery");

const newGalleryTemplate = ({preview, original, description}) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
</a>`;

const newGalleryMarkup = galleryItems.map(newGalleryTemplate).join("");

galleryListEl.insertAdjacentHTML("afterbegin", newGalleryMarkup);

const galleryImageEl = document.querySelector(".gallery__image");

const lightbox = new SimpleLightbox('.gallery a');


const onGalleryItemClick = (e) => {
	e.preventDefault();

		if(e.target.nodeName !== "IMG") {
			return;
		}		

		lightbox.open({
			captionsData: galleryImageEl.alt,
			captionDelay: 250,
			scrollZoom: false,
			preloading: false,
		});
	
}

galleryListEl.addEventListener('click', onGalleryItemClick);

// console.log(galleryItems);