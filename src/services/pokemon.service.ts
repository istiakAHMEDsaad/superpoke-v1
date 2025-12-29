import { pokeApi } from '@/lib/axios';
import { PokemonListResponse } from '@/types/pokemon';

export const fetchPokemonList = async (
  limit = 6,
  offset = 0
): Promise<PokemonListResponse> => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};
