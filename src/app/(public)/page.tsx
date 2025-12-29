import HeroSlider from '@/components/HeroSlider/HeroSlider';
import HeroMarquee from '@/components/HomeConents/HeroMarquee';
import LatestNews from '@/components/HomeConents/LatestNews';
import PublicPoke from '@/components/PublicViewData/PublicPoke';
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
      <PublicPoke />
      <HeroMarquee/>
      <LatestNews />
    </div>
  );
};

export default page;
