import 'dotenv/config';
import axios from 'axios';
import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';

const BASE_URL = 'https://api.thecatapi.com/v1';

const refs = {
  selectEl: document.querySelector('select.breed-select'),
  loaderEl: document.querySelector('p.loader'),
  errorEl: document.querySelector('p.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

getData(`${BASE_URL}/breeds`);

function getData(url) {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
}

// .then(catList => {
//   new SlimSelect({
//     select: 'select.breed-select',
//     data: catList,
//   });
// })
