import { pokeApi } from '@/lib/axios';
import { PokemonListResponse } from '@/types/pokemon';
import { PokemonData } from '@/types/pokemondata';

export const fetchPokemonList = async (
  limit: number,
  offset = 0
): Promise<PokemonListResponse> => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};

// export type PokemonDetails = {
//   id: number;
//   name: string;
//   sprites: {
//     other: {
//       'official-artwork': {
//         front_default: string | null;
//       };
//     };
//   };
// };

export const fetchPokemonDetails = async (
  id: number
): Promise<PokemonData> => {
  const { data } = await pokeApi.get<PokemonData>(`/pokemon/${id}`);
  return data;
};
