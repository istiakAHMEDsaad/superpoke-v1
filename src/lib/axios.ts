import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKE_BASE_URL,
});

export const superheroApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPER_BASE_URL,
});
