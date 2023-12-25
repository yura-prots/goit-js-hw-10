import 'dotenv/config';
import axios from 'axios';

const url = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

axios
  .get(url)
  .then(response => {
    console.log(response);
    return response;
  })
  .catch(err => console.log(err));
