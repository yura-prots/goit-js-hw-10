import 'dotenv/config';
import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return getData(`${BASE_URL}/breeds`);
}

export function fetchCatByBreed(breedId) {
  return getData(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export function onFetchError(error) {
  console.log(error);

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function getData(url) {
  axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

  return axios.get(url).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  });
}
