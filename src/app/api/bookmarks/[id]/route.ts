import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';
import { headers } from 'next/headers';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession({
    req: {
      headers: headers(),
    },
    ...authOptions,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  await Bookmark.findOneAndDelete({
    _id: params.id,
    userId: session.user.id,
  });

  return NextResponse.json({ success: true });
}
