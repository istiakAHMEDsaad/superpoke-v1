'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '@/services/pokemon.service';

type Props = {
  id: number;
  name: string;
};

// get image
export const PokemonCard = ({ id, name }: Props) => {
  const { data } = useQuery({
    queryKey: ['pokemon-details', id],
    queryFn: () => fetchPokemonDetails(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const image = data?.sprites.other['official-artwork'].front_default;

  return (
    <Link href={`/explore/${id}`}>
      <div className="rounded-lg border p-4 text-center hover:shadow-md transition cursor-pointer">
        <div className="relative h-32 mb-2">
          {image ? (
            <Image src={image} alt={name} fill className="object-contain" />
          ) : (
            <div className="h-full w-full bg-muted animate-pulse rounded" />
          )}
        </div>

        <p className="capitalize font-medium">{name}</p>
      </div>
    </Link>
  );
};
