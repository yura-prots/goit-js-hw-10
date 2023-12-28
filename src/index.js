import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, onFetchError } from './utils/cat-api';
import { templateCreator } from './utils/template';
import refs from './utils/refs';

import 'slim-select/dist/slimselect.css';

const { selectEl, loaderEl, errorEl, catInfoEl } = refs;

const breedsNames = [];

fetchBreeds()
  .then(data => {
    data.map(breed => {
      breedsNames.push({ text: breed.name, value: breed.id });
    });

    return breedsNames;
  })
  .then(breedsNames => {
    const selectName = `.${selectEl.className}`;

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

function onSelectChange(selectValue) {
  fetchCatByBreed(selectValue[0].value)
    .then(response => {
      const template = templateCreator(
        response[0].url,
        selectValue[0].text,
        response[0].breeds[0].description,
        response[0].breeds[0].temperament
      );

      catInfoEl.insertAdjacentHTML('afterbegin', template);
    })
    .catch(error => {
      onFetchError(error);
    });
}
