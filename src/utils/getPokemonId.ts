export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/');
  return Number(parts[parts.length - 2])
}