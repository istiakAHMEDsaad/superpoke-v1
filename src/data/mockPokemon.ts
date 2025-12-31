export type PokemonItem = {
  id: number;
  name: string;
  power: number;
};

export const mockPokemon: PokemonItem[] = [
  { id: 1, name: 'bulbasaur', power: 45 },
  { id: 2, name: 'charmander', power: 60 },
  { id: 3, name: 'squirtle', power: 50 },
  { id: 4, name: 'pikachu', power: 70 },
  { id: 5, name: 'eevee', power: 55 },
];
