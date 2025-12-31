import { pokeApi } from '@/lib/axios';
import { PokemonListResponse } from '@/types/pokemon';

export const fetchPokemonList = async (
  limit: number,
  offset = 0
): Promise<PokemonListResponse> => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
};

export const fetchPokemonDetails = async (
  id: number
): Promise<PokemonDetails> => {
  const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${id}`);
  return data;
};
