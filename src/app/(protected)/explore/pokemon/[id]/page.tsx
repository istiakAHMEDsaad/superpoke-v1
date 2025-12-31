import { fetchPokemonDetails } from '@/services/pokemon.service';
import { PokemonData } from '@/types/pokemondata';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import BackButton from '@/components/Button/BackButton';

const typeColors: Record<string, string> = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  fairy: 'bg-pink-300',
  normal: 'bg-slate-400',
  fighting: 'bg-red-700',
  flying: 'bg-sky-400',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  rock: 'bg-stone-500',
  bug: 'bg-lime-500',
  ghost: 'bg-violet-700',
  steel: 'bg-slate-500',
};

const PokemonDetails = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data: PokemonData = await fetchPokemonDetails(
    Number(params.id)
  );

  const mainType = data.types[0]?.type.name ?? 'normal';
  const themeColor = typeColors[mainType] ?? 'bg-slate-500';
  const image =
    data.sprites.other['official-artwork'].front_default;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <BackButton />

      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 text-white ${themeColor} shadow-xl`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-mono opacity-70">
              #{data.id.toString().padStart(3, '0')}
            </span>

            <h1 className="text-5xl font-bold capitalize tracking-tight">
              {data.name}
            </h1>

            <div className="flex gap-2 flex-wrap">
              {data.types.map((t) => (
                <Badge
                  key={t.type.name}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-none px-4 py-1 text-sm capitalize"
                >
                  {t.type.name}
                </Badge>
              ))}
            </div>
          </div>

          {image && (
            <div className="relative w-64 h-64 drop-shadow-2xl">
              <Image
                src={image}
                alt={data.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Decorative background */}
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Physical Info */}
        <Card className="md:col-span-1 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">
              Physical Info
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Height
              </span>
              <span className="font-semibold">
                {data.height / 10} m
              </span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Weight
              </span>
              <span className="font-semibold">
                {data.weight / 10} kg
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <span className="text-muted-foreground text-sm block">
                Abilities
              </span>
              <div className="flex flex-wrap gap-2">
                {data.abilities.map((a) => (
                  <Badge
                    key={a.ability.name}
                    variant="outline"
                    className="capitalize"
                  >
                    {a.ability.name.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="md:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">
              Base Stats
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {data.stats.map((s) => (
              <div key={s.stat.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="uppercase font-medium text-muted-foreground">
                    {s.stat.name.replace(
                      'special-',
                      'Sp. '
                    )}
                  </span>
                  <span className="font-bold">
                    {s.base_stat}
                  </span>
                </div>

                <Progress
                  value={(s.base_stat / 255) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PokemonDetails;
