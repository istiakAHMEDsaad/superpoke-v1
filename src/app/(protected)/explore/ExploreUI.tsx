'use client';

import { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockPokemon, PokemonItem } from '@/data/mockPokemon';

const Explore = () => {
  // search text
  const [search, setSearch] = useState('');
  // sort option
  const [sort, setSort] = useState<string | null>(null);

  // DERIVED STATE (this is the key)
  const filteredPokemon = useMemo(() => {
    let result: PokemonItem[] = [...mockPokemon];

    // Search by name
    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort logic
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
  }, [search, sort]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-semibold mb-6">Explore</h1>

      <Tabs defaultValue="pokemon">
        <TabsList className="mb-6">
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="superhero">Superheroes</TabsTrigger>
        </TabsList>

        {/* ================== POKEMON TAB ================== */}
        <TabsContent value="pokemon">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              placeholder="Search Pokémon by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-sm"
            />

            <Select onValueChange={setSort}>
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

          {/* Results */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredPokemon.length === 0 ? (
              <p className="text-muted-foreground col-span-full">
                No Pokémon found
              </p>
            ) : (
              filteredPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="rounded-lg border p-4 text-center"
                >
                  <p className="capitalize font-medium">{pokemon.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Power: {pokemon.power}
                  </p>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* ================== SUPERHERO TAB ================== */}
        <TabsContent value="superhero">
          <p className="text-muted-foreground">Superhero logic coming next…</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;

// ExploreUI
