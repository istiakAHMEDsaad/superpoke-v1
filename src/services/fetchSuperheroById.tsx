import { Superhero } from '@/types/superhero';
export const fetchSuperheroById = async (id: number): Promise<Superhero> => {
  const res = await fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`);
  if (!res.ok) throw new Error('Failed to fetch hero');
  return res.json();
};