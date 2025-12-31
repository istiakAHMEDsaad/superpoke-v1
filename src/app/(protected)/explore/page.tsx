import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FilterBar from '@/components/ExplorePage/FilterBar';
import PlaceholderCard from '@/components/ExplorePage/PlaceholderCard';

const Explore = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-semibold mb-6">Explore</h1>

      <Tabs defaultValue="pokemon" className="w-full">
        {/* Tabs Header */}
        <TabsList className="mb-6">
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="superhero">Superheroes</TabsTrigger>
        </TabsList>

        {/* Pokémon Tab */}
        <TabsContent value="pokemon">
          <FilterBar
            placeholder="Search Pokémon by name..."
            sortOptions={[
              { label: 'Name (A-Z)', value: 'name-asc' },
              { label: 'Name (Z-A)', value: 'name-desc' },
              { label: 'Power (Low → High)', value: 'power-asc' },
              { label: 'Power (High → Low)', value: 'power-desc' },
            ]}
          />

          {/* Results placeholder */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </TabsContent>

        {/* Superhero Tab */}
        <TabsContent value="superhero">
          <FilterBar
            placeholder="Search Superhero by name..."
            sortOptions={[
              { label: 'Name (A-Z)', value: 'name-asc' },
              { label: 'Name (Z-A)', value: 'name-desc' },
              { label: 'Power (Low → High)', value: 'power-asc' },
              { label: 'Power (High → Low)', value: 'power-desc' },
            ]}
          />

          {/* Results placeholder */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
