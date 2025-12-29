import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKE_BASE_URL,
  // baseURL: 'https://pokeapi.co/api/v2',
});

/*
{
    "count": 1350,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=6&limit=6",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon/5/"
        },
        {
            "name": "charizard",
            "url": "https://pokeapi.co/api/v2/pokemon/6/"
        }
    ]
}
*/