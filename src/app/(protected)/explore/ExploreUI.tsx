'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SpinnerL from '@/components/LoadingSpinner/SpinnerL';
import { PokemonCard } from '@/components/Pokemon/PokemonCard';
import SuperheroCard from '@/components/Superhero/SuperheroCard';

import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { usePokemonExplore } from '@/hooks/usePokemonExplore';
import { useSuperHeroes } from '@/hooks/useSuperHeroes';

import type { PokemonListItem } from '@/types/pokemon';
import { getPokemonIdFromUrl } from '@/utils/getPokemonIdFromUrl';

type PokemonItem = {
  id: number;
  name: string;
  power: number;
};

const POKEMON_PER_PAGE = 24;
const HEROES_PER_PAGE = 20;

const ExploreUI = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ================= TAB STATE (URL) ================= */
  const activeTab =
    searchParams.get('tab') === 'superhero' ? 'superhero' : 'pokemon';

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);

    if (tab === 'pokemon') params.set('page', '1');
    if (tab === 'superhero') params.set('heroPage', '1');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  /* ================= POKEMON ================= */
  const { data, isLoading, isError } = usePokemonExplore();

  const pokemonPage = Number(searchParams.get('page')) || 1;

  const setPokemonPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<string | null>(null);

  const pokemonData: PokemonItem[] = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((p: PokemonListItem) => {
      const id = getPokemonIdFromUrl(p.url);
      return { id, name: p.name, power: id * 2 };
    });
  }, [data]);

  const filteredPokemon = useMemo(() => {
    let result = [...pokemonData];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'name-asc')
      result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc')
      result.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'power-asc') result.sort((a, b) => a.power - b.power);
    if (sort === 'power-desc') result.sort((a, b) => b.power - a.power);

    return result;
  }, [pokemonData, search, sort]);

  const pokemonTotalPages = Math.ceil(
    filteredPokemon.length / POKEMON_PER_PAGE
  );

  const paginatedPokemon = useMemo(() => {
    const start = (pokemonPage - 1) * POKEMON_PER_PAGE;
    return filteredPokemon.slice(start, start + POKEMON_PER_PAGE);
  }, [filteredPokemon, pokemonPage]);

  /* ================= SUPERHERO ================= */
  const {
    data: heroes,
    isLoading: heroesLoading,
    isError: heroesError,
  } = useSuperHeroes();

  const heroPage = Number(searchParams.get('heroPage')) || 1;

  const setHeroPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('heroPage', String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [heroSearch, setHeroSearch] = useState('');
  const [heroSort, setHeroSort] = useState<string | null>(null);

  const filteredHeroes = useMemo(() => {
    if (!heroes) return [];
    let result = [...heroes];

    if (heroSearch.trim()) {
      result = result.filter((h) =>
        h.name.toLowerCase().includes(heroSearch.toLowerCase())
      );
    }

    if (heroSort === 'name-asc')
      result.sort((a, b) => a.name.localeCompare(b.name));
    if (heroSort === 'name-desc')
      result.sort((a, b) => b.name.localeCompare(a.name));
    if (heroSort === 'power-asc')
      result.sort((a, b) => a.powerstats.power - b.powerstats.power);
    if (heroSort === 'power-desc')
      result.sort((a, b) => b.powerstats.power - a.powerstats.power);

    return result;
  }, [heroes, heroSearch, heroSort]);

  const heroTotalPages = Math.ceil(filteredHeroes.length / HEROES_PER_PAGE);

  const paginatedHeroes = useMemo(() => {
    const start = (heroPage - 1) * HEROES_PER_PAGE;
    return filteredHeroes.slice(start, start + HEROES_PER_PAGE);
  }, [filteredHeroes, heroPage]);

  /* ================= UI ================= */
  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-semibold mb-6">Explore</h1>

      <Tabs value={activeTab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="superhero">Superheroes</TabsTrigger>
        </TabsList>

        {/* ================= POKEMON TAB ================= */}
        <TabsContent value="pokemon">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPokemonPage(1);
              }}
              className="sm:max-w-sm"
            />

            <Select
              onValueChange={(v) => {
                setSort(v);
                setPokemonPage(1);
              }}
            >
              <SelectTrigger className="sm:w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                <SelectItem value="power-asc">Power ↑</SelectItem>
                <SelectItem value="power-desc">Power ↓</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <SpinnerL />
          ) : isError ? (
            <p>Error loading Pokémon</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {paginatedPokemon.map((p) => (
                  <PokemonCard key={p.id} id={p.id} name={p.name} />
                ))}
              </div>

              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setPokemonPage(Math.max(1, pokemonPage - 1))
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>
                      {pokemonPage} / {pokemonTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPokemonPage(
                          Math.min(pokemonTotalPages, pokemonPage + 1)
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </TabsContent>

        {/* ================= SUPERHERO TAB ================= */}
        <TabsContent value="superhero">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search Superhero..."
              value={heroSearch}
              onChange={(e) => {
                setHeroSearch(e.target.value);
                setHeroPage(1);
              }}
              className="sm:max-w-sm"
            />

            <Select
              onValueChange={(v) => {
                setHeroSort(v);
                setHeroPage(1);
              }}
            >
              <SelectTrigger className="sm:w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                <SelectItem value="power-asc">Power ↑</SelectItem>
                <SelectItem value="power-desc">Power ↓</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {heroesLoading ? (
            <SpinnerL />
          ) : heroesError ? (
            <p>Error loading Superheroes</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {paginatedHeroes.map((hero) => (
                  <SuperheroCard key={hero.id} hero={hero} />
                ))}
              </div>

              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setHeroPage(Math.max(1, heroPage - 1))}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>
                      {heroPage} / {heroTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setHeroPage(Math.min(heroTotalPages, heroPage + 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreUI;
