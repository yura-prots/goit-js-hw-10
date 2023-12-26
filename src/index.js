import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';

const refs = {
  selectEl: document.querySelector('select.breed-select'),
  loaderEl: document.querySelector('p.loader'),
  errorEl: document.querySelector('p.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

fetchBreeds().then(data => {
  console.log(data);
});

// .then(catList => {
//   new SlimSelect({
//     select: 'select.breed-select',
//     data: catList,
//   });
// })
