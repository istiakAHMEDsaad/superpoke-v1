'use client';

import Image from 'next/image';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Hero {
  id: number;
  name: string;
  image: string;
}

const heros: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    image:
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg',
  },
  {
    id: 2,
    name: 'Spider-Man',
    image:
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg',
  },
  {
    id: 3,
    name: 'Superman',
    image:
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/644-superman.jpg',
  },
  // Add more mock data or map from your API
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
                className="object-fill"
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
