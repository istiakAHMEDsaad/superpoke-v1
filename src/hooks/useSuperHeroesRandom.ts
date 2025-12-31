import { useQuery } from '@tanstack/react-query';
import { fetchSuperHeros } from '@/services/superhero.service';

export const useSuperHeroesRandom = (limit = 6) => {
  return useQuery({
    queryKey: ['superheroes'],
    queryFn: fetchSuperHeros,
    // first 6 data:
    // select: (data) => data.slice(0, limit),
    // random 6 data:
    select: (data) => [...data].sort(() => 0.5 - Math.random()).slice(0, limit),
    staleTime: 1000 * 60 * 60,
  });
};
