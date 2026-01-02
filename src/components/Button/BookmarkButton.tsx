'use client';

import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useBookmarks } from '@/hooks/useBookmarks';

type Props = {
  itemId: number;
  itemType: 'pokemon' | 'superhero';
  name: string;
  image: string;
};

const BookmarkButton = ({ itemId, itemType, name, image }: Props) => {
  const queryClient = useQueryClient();
  const { data: bookmarks } = useBookmarks();

  const isBookmarked = bookmarks?.some(
    (b) => b.itemId === itemId && b.itemType === itemType
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, itemType, name, image }),
      });

      if (!res.ok) {
        throw new Error('Failed to bookmark');
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  const handleBookmark = () => {
    toast.promise(mutation.mutateAsync(), {
      loading: 'Adding to bookmarks...',
      success: 'Added to bookmarks ❤️',
      error: 'Failed to bookmark ❌',
    });
  };

  return (
    <button
      disabled={isBookmarked || mutation.isPending}
      onClick={handleBookmark}
      className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
    >
      <Heart
        className={`w-6 h-6 transition-colors ${
          isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-700'
        }`}
      />
    </button>
  );
};

export default BookmarkButton;
