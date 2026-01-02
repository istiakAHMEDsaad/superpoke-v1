'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type BackType = {
  text: string;
};
const NormalBack = ({ text }: BackType) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors cursor-pointer"
    >
      <ChevronLeft size={20} />
      <span>{text}</span>
    </button>
  );
};

export default NormalBack;
