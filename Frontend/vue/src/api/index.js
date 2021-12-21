import axios from 'axios';

// const host = process.env.VUE_APP_API_HOST
const port = process.env.VUE_APP_API_PORT

console.log('Base url is ', `http://localhost:${port}/api/v1/reqres/`)
const api = axios.create({
  'baseURL': `http://localhost:${port}/api/v1/reqres/`,
});

export default api;