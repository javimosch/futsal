import axios from 'axios';
const localStorage = window.localStorage;

const BASE_URL = 'https://futsal-javoche.c9users.io:8080';

export {getPublicStartupBattles, getPrivateStartupBattles};

function getPublicStartupBattles() {
  const url = `${BASE_URL}/api/battles/public`;
  return axios.get(url).then(response => response.data);
}

function getPrivateStartupBattles() {
  const url = `${BASE_URL}/api/battles/private`;
  //return axios.get(url).then(response => response.data);
  
  return axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}).then(response => response.data);
}