import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { itemId, itemType, name, image } = body;

  await connectDB();

  const bookmark = await Bookmark.create({
    userId: session.user.id,
    itemId,
    itemType,
    name,
    image,
  });

  return NextResponse.json(bookmark);
}
