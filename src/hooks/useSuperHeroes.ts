import { useQuery } from '@tanstack/react-query';
import { fetchSuperHeros } from '@/services/superhero.service';

export const useSuperHeroes = (limit = 6) => {
  return useQuery({
    queryKey: ['superheroes'],
    queryFn: fetchSuperHeros,
    select: (data) => data.slice(0, limit),
    staleTime: 1000 * 60 * 30,
  });
};