import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, onFetchError } from './utils/cat-api';
import { templateCreator } from './utils/template';

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
      const template = templateCreator(
        response[0].url,
        value[0].text,
        response[0].breeds[0].description,
        response[0].breeds[0].temperament
      );

      refs.catInfoEl.insertAdjacentHTML('afterbegin', template);
    })
    .catch(error => {
      onFetchError(error);
    });
}
