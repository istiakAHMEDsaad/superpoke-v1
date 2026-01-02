'use client';

import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
  itemId: number;
  itemType: 'pokemon' | 'superhero';
  name: string;
  image: string;
};

const BookmarkButton = ({ itemId, itemType, name, image }: Props) => {
  const toggleBookmark = async () => {
    await toast.promise(
      fetch('/api/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          itemType,
          name,
          image,
        }),
      }),
      {
        loading: 'Updating bookmark...',
        success: 'Bookmark updated',
        error: 'Failed to update bookmark',
      }
    );
  };

  return (
    <button
      onClick={toggleBookmark}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-red-500 p-4 text-white shadow-lg hover:scale-105 transition"
    >
      <Heart />
    </button>
  );
};

export default BookmarkButton;
