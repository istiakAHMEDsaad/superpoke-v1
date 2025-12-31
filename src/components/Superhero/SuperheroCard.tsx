'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Superhero } from '@/types/superhero';

type Props = {
  hero: Superhero;
};

const SuperheroCard = ({ hero }: Props) => {
  return (
    <Link href={`/explore/superhero/${hero.id}`}>
      <div className="rounded-lg border p-4 text-center hover:shadow-md transition cursor-pointer">
        <div className="relative h-40 mb-3">
          <Image
            src={hero.images.md}
            alt={hero.name}
            fill
            className="object-cover rounded"
          />
        </div>

        <p className="font-medium">{hero.name}</p>
        <p className="text-sm text-muted-foreground">
          Power: {hero.powerstats.power}
        </p>
      </div>
    </Link>
  );
};

export default SuperheroCard;
