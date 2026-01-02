import { fetchSuperheroById } from '@/services/fetchSuperheroById';
import { Superhero } from '@/types/superhero';
import { ReactNode } from 'react';
import Image from 'next/image';
import BackButton from '@/components/Button/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Target, Brain, Dumbbell, Swords } from 'lucide-react';
import BookmarkButton from '@/components/Button/BookmarkButton';

type PowerStat =
  | 'intelligence'
  | 'strength'
  | 'speed'
  | 'durability'
  | 'power'
  | 'combat';

const statIcons: Record<PowerStat, ReactNode> = {
  intelligence: <Brain className="w-4 h-4 text-blue-400" />,
  strength: <Dumbbell className="w-4 h-4 text-red-400" />,
  speed: <Zap className="w-4 h-4 text-yellow-400" />,
  durability: <Shield className="w-4 h-4 text-green-400" />,
  power: <Target className="w-4 h-4 text-purple-400" />,
  combat: <Swords className="w-4 h-4 text-orange-400" />,
};

const SuperheroDetailsPage = async ({ params }: { params: { id: string } }) => {
  const hero = await fetchSuperheroById(Number(params.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <div className="absolute top-4 right-4 z-20">
        <BookmarkButton
          itemId={hero.id}
          itemType="superhero"
          name={hero.name}
          image={hero.images.lg}
        />
      </div>
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-purple-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto p-6 space-y-8">
        <BackButton />

        {/* Hero Header Card */}
        <div className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="relative shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute h-72 w-72 inset-0 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="relative w-80 h-80">
                <Image
                  src={hero?.images.lg}
                  alt={hero.name}
                  fill
                  className="object-cover rounded-2xl border border-slate-700 shadow-2xl relative z-10"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 flex-1 text-center md:text-left">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 bg-blue-500/10 uppercase tracking-widest"
                >
                  {hero.biography.publisher}
                </Badge>
                <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                  {hero.name}
                </h1>
                <p className="text-xl text-slate-400 font-medium">
                  Real Name:{' '}
                  <span className="text-slate-200">
                    {hero.biography.fullName || 'Unknown'}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-sm">
                  📏 {hero.appearance.height[1]}
                </div>
                <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-sm">
                  ⚖️ {hero.appearance.weight[1]}
                </div>
                <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-sm capitalize">
                  {hero.appearance.race || 'Secret Origin'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Powerstats Grid - Takes 2 columns */}
          <Card className="md:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-400" /> Tactical Power Levels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                {(Object.entries(hero.powerstats) as [PowerStat, number][]).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 capitalize text-slate-400 font-semibold">
                          {statIcons[key]} {key}
                        </div>
                        <span className="font-mono text-lg text-white">
                          {value}
                        </span>
                      </div>
                      <Progress value={value} className="h-2 bg-slate-800" />
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Biography Sidebar */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="text-blue-400" /> Dossier
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Alignment
                  </p>
                  <p
                    className={`text-lg font-bold capitalize ${
                      hero.biography.alignment === 'good'
                        ? 'text-green-400'
                        : 'text-red-500'
                    }`}
                  >
                    {hero.biography.alignment}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Place of Birth
                  </p>
                  <p className="text-slate-200">
                    {hero.biography.placeOfBirth === '-'
                      ? 'Classified'
                      : hero.biography.placeOfBirth}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                    First Appearance
                  </p>
                  <p className="text-slate-300 italic text-sm">
                    {hero.biography.firstAppearance}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetailsPage;
