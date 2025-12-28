import gridOneImg from '@/assets/pokemon/image-news-1.png';
import gridTwoImg from '@/assets/pokemon/image-news-2.png';
import gridThreeImg from '@/assets/pokemon/image-news-3.png';
import gridFourImg from '@/assets/pokemon/image-news-4.png';
import Image from 'next/image';
import Link from 'next/link';

const LatestNews = () => {
  return (
    <div className="mt-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-5 my-10">
        <h3 className="text-5xl font-bold tracking-wide text-center dark:text-gray-200 text-gray-800">
          Latest News
        </h3>
        <p className="text-sm dark:text-gray-300 text-gray-600 text-center">
          Objectively enable intuitive resources before value-added experiences.
          Intrinsicly restore backward-compatible e-markets for functionalized
          models. Globally reconceptualize intermandated growth strategies and
          world-class benefits. Dramatically evolve collaborative &quot;outside
          the box&quot; thinking whereas highly efficient infomediaries.
          Holisticly utilize clicks-and-mortar growth strategies vis-a-vis
          technically.
        </p>
      </div>

      {/* grid */}
      <div>
        <div className="grid grid-cols-5 grid-rows-5 gap-0 h-auto w-full">
          {/* grid 1 */}
          <Link
            href="https://www.pokemon.com/us/pokemon-news/pokemon-horizons-season-3-rising-hope-coming-to-netflix-january-6-2026"
            target="_blank"
            className="row-start-1 col-start-1 row-end-4 col-end-4 md:hover:scale-[101%] transition-transform"
          >
            <div className="relative w-full h-120">
              <Image
                src={gridOneImg}
                alt="image 1"
                fill
                className="object-cover rounded"
              />
              <div className="absolute left-3 bottom-3">
                <p className="text-2xl text-white bg-gray-50/20 px-2 rounded">
                  Pokémon Horizons: Season 3
                </p>
              </div>
            </div>
          </Link>

          {/* grid 2 */}
          <Link
            href="https://www.pokemon.com/us/strategy/pokemon-tcg-mega-evolution-phantasmal-flames-triple-play"
            target="_blank"
            className="row-start-1 col-start-4 row-end-3 col-end-6 md:hover:scale-[101%] transition-transform"
          >
            <div className="relative w-full h-80">
              <Image
                src={gridTwoImg}
                alt="image 1"
                fill
                className="object-cover rounded"
              />
              <div className="absolute left-3 bottom-3">
                <p className="text-2xl text-zinc-700 bg-gray-50/70 px-2 rounded">
                  Pokémon TCG
                </p>
              </div>
            </div>
          </Link>

          {/* grid 3 */}
          <Link
            href="https://www.pokemon.com/us/pokemon-news/champion-chat-debuts-on-twitch-and-youtube-on-december-17"
            target="_blank"
            className="row-start-3 col-start-4 row-end-6 col-end-6 md:hover:scale-[101%] transition-transform"
          >
            <div className="relative w-full h-120">
              <Image
                src={gridFourImg}
                alt="image 1"
                fill
                className="object-cover rounded"
              />
              <div className="absolute left-3 bottom-3">
                <p className="text-2xl text-white bg-gray-50/20 px-2 rounded">
                  Champion Chat Debuts
                </p>
              </div>
            </div>
          </Link>

          {/* grid 4 */}
          <Link
            href="https://www.pokemon.com/us/pokemon-news/mega-charizard-y-ex-leads-the-charge-in-new-pokemon-tcg-pocket-expansion-crimson-blaze"
            target="_blank"
            className="row-start-4 col-start-1 row-end-6 col-end-4 md:hover:scale-[101%] transition-transform"
          >
            <div className="relative w-full h-80">
              <Image
                src={gridThreeImg}
                alt="image 1"
                fill
                className="object-cover rounded"
              />
              <div className="absolute left-3 bottom-3">
                <p className="text-2xl text-zinc-700 bg-gray-50/70 px-2 rounded">
                  Mega Charizard Y
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
