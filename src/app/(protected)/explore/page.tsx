import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ExploreUI from './ExploreUI';

const Explore = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <ExploreUI />;
};

export default Explore;
