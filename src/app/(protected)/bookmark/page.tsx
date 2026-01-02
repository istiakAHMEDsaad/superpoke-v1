import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NormalBack from '../../../components/Button/NormalBack';

const BookMark = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <NormalBack text="Back" />
      <p>BookMark</p>
    </div>
  );
};

export default BookMark;
