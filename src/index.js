import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

import 'slim-select/dist/slimselect.css';

const refs = {
  selectEl: document.querySelector('select.breed-select'),
  loaderEl: document.querySelector('p.loader'),
  errorEl: document.querySelector('p.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    const breedsNames = [];

    data.forEach(breed => {
      breedsNames.push({ text: breed.name, value: breed.id });
    });

    new SlimSelect({
      select: 'select.breed-select',
      data: breedsNames,
    });
  })
  .catch(error => {
    console.log(error);

    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });
