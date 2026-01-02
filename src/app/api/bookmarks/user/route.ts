import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 });
  }

  await connectDB();

  const bookmarks = await Bookmark.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(bookmarks);
}
