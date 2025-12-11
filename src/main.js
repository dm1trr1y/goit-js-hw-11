'use strict';


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import * as galleryMethods from './js/render-functions';
import getImagesByQuery from './js/pixabay-api';


const form = document.querySelector('.form');
form.addEventListener('submit', startSearch);

function startSearch(event) {
  event.preventDefault();
  const searchWords = event.target.elements.word.value.trim();
  if (searchWords != '') {

    galleryMethods.showLoader(); 
    getImagesByQuery(searchWords)
      .then(value => {

        galleryMethods.hideLoader(); 

        if (value.length === 0) {
          galleryMethods.clearGallery();
          iziToast.warning({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageColor: '#fff',
            backgroundColor: 'red',
            theme: 'dark',
            position: 'center',
          });
        } else {
          galleryMethods.clearGallery();
          galleryMethods.createGallery(value);
        }
      })
      .catch(error => {

        console.log(error);
        galleryMethods.hideLoader(); 
      });
    form.reset();
  } else {

    iziToast.warning({
      message: 'Enter word for search...',
      messageColor: '#fff',
      backgroundColor: 'red',
      theme: 'dark',
      position: 'topRight',
    });
  }
}
