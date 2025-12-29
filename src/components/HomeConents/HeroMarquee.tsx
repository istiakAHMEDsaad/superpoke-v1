'use client';

import Marquee from 'react-fast-marquee';
import { useSuperHeroes } from '@/hooks/useSuperHeroes';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SpinnerL from '../LoadingSpinner/SpinnerL';

const HeroMarquee = () => {
  const { data, isLoading, error } = useSuperHeroes(6);

  if (isLoading)
    return (
      <div className="flex items-center justify-center my-60">
        <SpinnerL />
      </div>
    );
  if (error) return <p>Failed to load heroes</p>;

  return (
    <section className="my-20">
      <motion.h3
        className="text-3xl text-center mb-6"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <span className="italic">Our Legendary Heroes </span>🦹
      </motion.h3>

      <Marquee speed={40} autoFill={true} gradientWidth={50}>
        {data?.map((hero) => (
          <div key={hero.id} className="mx-6 flex flex-col items-center">
            <div className="relative h-80 w-80">
              <Image
                src={hero.images.sm}
                alt={hero.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{hero.name}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default HeroMarquee;
