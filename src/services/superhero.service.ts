import { superheroApi } from '@/lib/axios';
import { Superhero } from '@/types/superhero';

export const fetchSuperHeros = async (): Promise<Superhero[]> => {
  const { data } = await superheroApi.get<Superhero[]>('/all.json');
  return data;
};
