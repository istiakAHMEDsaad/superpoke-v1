import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ExploreUI from './ExploreUI';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'This playground you can find the latest news of pokemon & marvel or dc super hero update! Also people can find their fav. superheros details or pokemon details on this page they can bookmark their superhero for later.',
};

const Explore = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <ExploreUI />;
};

export default Explore;
