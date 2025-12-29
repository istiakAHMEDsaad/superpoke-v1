'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import dcImgOne from '@/assets/superheros/dc-1.jpg';
import dcImgTwo from '@/assets/superheros/dc-2.jpg';
import mcImgOne from '@/assets/superheros/marvel-1.jpg';
import mcImgTwo from '@/assets/superheros/marvel-2.jpg';
import pkImgOne from '@/assets/pokemon/poke-1.webp';
import pkImgTwo from '@/assets/pokemon/poke-2.webp';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Hero {
  id: number;
  name: string;
  image: StaticImageData | string;
}

const heros: Hero[] = [
  {
    id: 1,
    name: 'DC Superheros',
    image: dcImgOne,
  },
  {
    id: 2,
    name: 'Classic Superheros',
    image: dcImgTwo,
  },
  {
    id: 3,
    name: 'Marvel Superheros',
    image: mcImgOne,
  },
  {
    id: 4,
    name: 'Classic Superheros',
    image: mcImgTwo,
  },
  {
    id: 5,
    name: 'Pokemon',
    image: pkImgOne,
  },
  {
    id: 6,
    name: 'Pokemon',
    image: pkImgTwo,
  },
];

export default function HeroSlider() {
  return (
    <div className="mx-auto my-2">
      <Swiper
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className=""
      >
        {heros.map((item) => (
          <SwiperSlide key={item.id} className="flex mx-auto">
            <div className="relative w-7xl h-120 max-sm:w-full max-sm:h-80 overflow-hidden border mx-auto rounded-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-2xl font-bold">{item.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
