import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/services/pokemon.service';
import type { PokemonListResponse } from '@/types/pokemon';

export const usePokemonExplore = () => {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-explore'],
    queryFn: () => fetchPokemonList(1025),
    staleTime: 1000 * 60 * 60,
  });
};
