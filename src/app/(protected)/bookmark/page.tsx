import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import NormalBack from '@/components/Button/NormalBack';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';
import Link from 'next/link';
import Image from 'next/image';

const BookMark = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  await connectDB();

  const bookmarks = await Bookmark.find({
    userId: session.user.id,
  });

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <NormalBack text="Back" />

      <h1 className="text-2xl font-semibold mb-6">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bookmarks.map((b) => (
            <Link
              key={b._id}
              href={`/explore/${b.itemType}/${b.itemId}`}
              className="border rounded-lg p-3 hover:shadow-md transition"
            >
              <Image
                src={b.image}
                alt={b.name}
                width={200}
                height={200}
                className="rounded"
              />
              <p className="mt-2 font-medium capitalize">{b.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookMark;
