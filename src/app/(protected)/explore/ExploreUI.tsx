'use client';

import SpinnerL from '@/components/LoadingSpinner/SpinnerL';
import { PokemonCard } from '@/components/Pokemon/PokemonCard';
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
import type { PokemonListItem } from '@/types/pokemon';
import { getPokemonIdFromUrl } from '@/utils/getPokemonIdFromUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

type PokemonItem = {
  id: number;
  name: string;
  power: number;
};

const ITEMS_PER_PAGE = 24;

const ExploreUI = () => {
  const { data, isLoading, isError } = usePokemonExplore();

  const router = useRouter();
  const searchParams = useSearchParams();

  //  page from URL
  const page = Number(searchParams.get('page')) || 1;

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<string | null>(null);

  // helper to update page in URL
  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // 1. Map API response
  const pokemonData: PokemonItem[] = useMemo(() => {
    if (!data?.results) return [];

    return data.results.map((p: PokemonListItem) => {
      const id = getPokemonIdFromUrl(p.url);
      return { id, name: p.name, power: id * 2 };
    });
  }, [data]);

  // 2. Filter + sort
  const filteredPokemon = useMemo(() => {
    let result = [...pokemonData];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sort === 'power-asc') {
      result.sort((a, b) => a.power - b.power);
    }

    if (sort === 'power-desc') {
      result.sort((a, b) => b.power - a.power);
    }

    return result;
  }, [pokemonData, search, sort]);

  // 3️. Pagination slice
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  const paginatedPokemon = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredPokemon.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPokemon, page]);

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-semibold mb-6">Explore</h1>

      <Tabs defaultValue="pokemon">
        <TabsList className="mb-6">
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="superhero">Superheroes</TabsTrigger>
        </TabsList>

        {/* ================== POKEMON TAB ================== */}
        <TabsContent value="pokemon">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <Input
              placeholder="Search Pokémon by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="sm:max-w-sm"
            />

            <Select
              onValueChange={(v) => {
                setSort(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="sm:w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                <SelectItem value="power-asc">Power (Low → High)</SelectItem>
                <SelectItem value="power-desc">Power (High → Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <SpinnerL />
            </div>
          ) : isError ? (
            <p>Error loading Pokémon</p>
          ) : filteredPokemon.length === 0 ? (
            <p className="text-muted-foreground">No Pokémon found</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {paginatedPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage(Math.max(1, page - 1))}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink>
                      {page} / {totalPages}
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </TabsContent>

        {/* ================== SUPERHERO TAB ================== */}
        <TabsContent value="superhero">
          <p className="text-muted-foreground">Superhero logic coming next…</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreUI;
