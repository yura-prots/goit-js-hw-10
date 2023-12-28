import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, onFetchError } from './utils/cat-api';
import { templateCreator } from './utils/template';
import refs from './utils/refs';

import 'slim-select/dist/slimselect.css';

const { selectEl, loaderEl, errorEl, catInfoEl } = refs;
const selectName = `.${selectEl.className}`;
const breedsNames = [];

loaderEl.textContent = '';
errorEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    loaderEl.classList.add('is-hidden');

    data.map(breed => {
      breedsNames.push({ text: breed.name, value: breed.id });
    });

    return breedsNames;
  })
  .then(breedsNames => {
    setSlimSelect(selectName, breedsNames);
  })
  .catch(onFetchError);

function setSlimSelect(selectId, selectData) {
  new SlimSelect({
    select: selectId,
    data: selectData,
    events: {
      afterChange: newVal => {
        loaderEl.classList.remove('is-hidden');
        catInfoEl.innerHTML = '';

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

      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(error => {
      onFetchError(error);
    });
}
