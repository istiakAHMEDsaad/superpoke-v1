import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`
  const avatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`;

  await User.create({
    name,
    email,
    password: hashedPassword,
    image: avatar,
    provider: 'credentials',
  });

  return NextResponse.json({ success: true });
}
