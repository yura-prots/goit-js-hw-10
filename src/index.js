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
      templateCreator(
        response[0].url,
        value[0].text,
        response[0].breeds[0].description,
        response[0].breeds[0].temperament
      );
    })
    .catch(error => {
      onFetchError(error);
    });
}

function templateCreator(imageUrl, imageAlt, breedDes, breedTemp) {
  const template = `<div>
                      <img src="${imageUrl}" alt="${imageAlt}" width="400"/>
                    </div>
                    <div>
                      <h1>${imageAlt}</h1>
                      <p>${breedDes}</p>
                      <p><b>Temperament:</b> ${breedTemp}</p>
                    </div>
                  `;

  refs.catInfoEl.insertAdjacentHTML('afterbegin', template);
}

function onFetchError(error) {
  console.log(error);

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
