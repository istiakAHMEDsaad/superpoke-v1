'use client';

import Marquee from 'react-fast-marquee';
import { useSuperHeroes } from '@/hooks/useSuperHeroes';
import Image from 'next/image';

const HeroMarquee = () => {
  const { data, isLoading, error } = useSuperHeroes(6);

  if (isLoading) return <p>Loading heroes...</p>;
  if (error) return <p>Failed to load heroes</p>;

  return (
    <section className="my-20">
      <h3 className="text-3xl italic text-center mb-6">Our Legendary Heroes</h3>

      <Marquee speed={40} autoFill={true} gradient={false}>
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
