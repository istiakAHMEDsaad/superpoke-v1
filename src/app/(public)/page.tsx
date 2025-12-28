import HeroSlider from '@/components/HeroSlider/HeroSlider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Pokémon & Superheroes in One Place',
  description:
    'Discover stats, abilities, power levels — bookmark your favorites after login.',
};

const page = () => {
  return (
    <div>
      <HeroSlider />
    </div>
  );
};

export default page;
