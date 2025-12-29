'use client';
import { usePokemonList } from '@/hooks/usePokemonList';
import { getPokemonIdFromUrl } from '@/utils/getPokemonId';
import Image from 'next/image';

const PublicPoke = () => {
  const { data, isLoading, error } = usePokemonList(6);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="my-10">
      <h3 className="my-5 text-3xl italic text-center">Top Grossing Now...</h3>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data?.results.map((pokemon) => {
          const pokemonId = getPokemonIdFromUrl(pokemon.url);

          return (
            <div
              key={pokemon.name}
              className="rounded-lg shadow-sm border p-4 text-center"
            >
              <div className="relative w-full h-60">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                  alt={pokemon.name}
                  fill
                  className="object-contain rounded"
                />
              </div>

              <h3 className="capitalize mt-2">{pokemon.name}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PublicPoke;
