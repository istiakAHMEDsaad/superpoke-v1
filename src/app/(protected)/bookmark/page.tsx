import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';
import NormalBack from '@/components/Button/NormalBack';
import BookmarkClient from './BookmarkClient';

const BookMark = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  await connectDB();

  const bookmarks = await Bookmark.find({
    userId: session.user.id,
  }).lean();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <NormalBack text="Back" />
      <h1 className="text-2xl font-semibold mb-6">Bookmarks</h1>

      <BookmarkClient bookmarks={JSON.parse(JSON.stringify(bookmarks))} />
    </div>
  );
};

export default BookMark;
