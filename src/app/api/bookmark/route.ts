import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { itemId, itemType, name, image } = await req.json();

  if (!itemId || !itemType) {
    return NextResponse.json(
      { error: 'Invalid data' },
      { status: 400 }
    );
  }

  await connectDB();

  const existing = await Bookmark.findOne({
    userId: session.user.id,
    itemId,
    itemType,
  });

  // Toggle logic
  if (existing) {
    await Bookmark.deleteOne({ _id: existing._id });
    return NextResponse.json({ removed: true });
  }

  await Bookmark.create({
    userId: session.user.id,
    itemId,
    itemType,
    name,
    image,
  });

  return NextResponse.json({ added: true });
}
