import 'dotenv/config';
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

export function fetchBreeds() {
  getData(`${BASE_URL}/breeds`);
}

export function fetchCatByBreed(breedId) {
  getData(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

function getData(url) {
  axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
}
