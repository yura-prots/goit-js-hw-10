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

refs.selectEl.classList.add('is-hidden');
refs.errorEl.classList.add('is-hidden');
refs.loaderEl.textContent = '';

const breedsNames = [];

fetchBreeds()
  .then(data => {
    refs.loaderEl.classList.add('is-hidden');

    data.map(breed => {
      breedsNames.push({ text: breed.name, value: breed.id });
    });

    return breedsNames;
  })
  .then(breedsNames => {
    refs.selectEl.classList.remove('is-hidden');
    const selectName = `.${refs.selectEl.className}`;

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
        refs.catInfoEl.innerHTML = '';

        onSelectChange(newVal);
      },
    },
  });
}

function onSelectChange(selectValue) {
  refs.loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(selectValue[0].value)
    .then(response => {
      refs.loaderEl.classList.add('is-hidden');

      const template = templateCreator(
        response[0].url,
        selectValue[0].text,
        response[0].breeds[0].description,
        response[0].breeds[0].temperament
      );

      refs.catInfoEl.insertAdjacentHTML('afterbegin', template);
    })
    .catch(error => {
      onFetchError(error);
    });
}
