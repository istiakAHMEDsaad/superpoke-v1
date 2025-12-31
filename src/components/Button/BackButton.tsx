'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors cursor-pointer"
    >
      <ChevronLeft size={20} />
      <span>Back to Pokédex</span>
    </button>
  );
};

export default BackButton;
