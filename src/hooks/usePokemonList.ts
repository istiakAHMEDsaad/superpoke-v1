import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/services/pokemon.service';

export const usePokemonList = (limit = 6) => {
  return useQuery({
    queryKey: ['pokemon-list', limit],
    queryFn: () => fetchPokemonList(limit),
    staleTime: 1000 * 60 * 5,
  });
};
