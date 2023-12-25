import 'dotenv/config';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

axios
  .get(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${process.env.API_KEY}`
  )
  .then(res => console.log(res))
  .catch(err => console.log(err));
