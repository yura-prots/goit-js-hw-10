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

        // return false; // this will stop the change from happening
      },
    },
  });
}

function onFetchError(error) {
  console.log(error);

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function onSelectChange(value) {
  fetchCatByBreed(value[0].value).then(response => {
    // const catImg = document.createElement();
    refs.catInfoEl.innerHTML = `<img src="${response[0].url}" alt="${value[0].text}">`;
  });
}
