import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/services/pokemon.service';
import type { PokemonListResponse } from '@/types/pokemon';

export const usePokemonHome = () => {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-home'],
    queryFn: () => fetchPokemonList(6),
    staleTime: 1000 * 60 * 60,
  });
};
