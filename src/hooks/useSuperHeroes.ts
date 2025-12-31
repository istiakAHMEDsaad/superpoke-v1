import { useQuery } from '@tanstack/react-query';
import { fetchSuperHeros } from '@/services/superhero.service';
import type { Superhero } from '@/types/superhero';

export const useSuperHeroes = () => {
  return useQuery<Superhero[]>({
    queryKey: ['superheroes'],
    queryFn: fetchSuperHeros,
    staleTime: 1000 * 60 * 60,
  });
};
