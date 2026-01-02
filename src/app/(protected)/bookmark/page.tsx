import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import NormalBack from '@/components/Button/NormalBack';
import BookmarkClient from './BookmarkClient';

const BookMark = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <NormalBack text="Back" />
      <h1 className="text-2xl font-semibold mb-6">Bookmarks</h1>

      <BookmarkClient />
    </div>
  );
};

export default BookMark;
