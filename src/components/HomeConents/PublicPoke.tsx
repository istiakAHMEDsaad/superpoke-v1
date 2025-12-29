'use client';

import { usePokemonList } from '@/hooks/usePokemonList';
import { getPokemonIdFromUrl } from '@/utils/getPokemonId';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Reveal from '../animations/Reveal';
import SpinnerL from '../LoadingSpinner/SpinnerL';

const PublicPoke = () => {
  const { data, isLoading, error } = usePokemonList(6);

  if (isLoading)
    return (
      <div className="flex items-center justify-center my-60">
        <SpinnerL />
      </div>
    );
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="my-10 overflow-hidden">
      <motion.h3
        className="my-5 text-3xl text-center"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <span className="italic">Top Grossing Now </span>🔥
      </motion.h3>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data?.results.map((pokemon) => {
          const pokemonId = getPokemonIdFromUrl(pokemon.url);

          return (
            <Reveal key={pokemon.name}>
              <div className="rounded-lg shadow-sm border p-4 text-center bg-background">
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
            </Reveal>
          );
        })}
      </section>
    </div>
  );
};

export default PublicPoke;
