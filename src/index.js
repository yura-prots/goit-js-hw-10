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

const selectName = `.${refs.selectEl.className}`;
const breedsNames = [];

fetchBreeds()
  .then(data => {
    data.map(breed => {
      breedsNames.push({ text: breed.name, value: breed.id });
    });

    return breedsNames;
  })
  .then(breedsNames => {
    setSlimSelect(selectName, breedsNames);
  })
  .catch(error => {
    onFetchError(error);
  });

function setSlimSelect(selectId, selectData) {
  new SlimSelect({
    select: selectId,
    data: selectData,
    events: {
      afterChange: newVal => {
        onSelectChange(newVal);
      },
    },
  });
}

function onSelectChange(value) {
  fetchCatByBreed(value[0].value)
    .then(response => {
      imageCreator(response[0].url, value[0].text);
    })
    .catch(error => {
      onFetchError(error);
    });
}

function imageCreator(imageUrl, imageAlt) {
  const imgEl = `<img src="${imageUrl}" alt="${imageAlt}" />`;

  refs.catInfoEl.insertAdjacentHTML('afterbegin', imgEl);
}

function onFetchError(error) {
  console.log(error);

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
