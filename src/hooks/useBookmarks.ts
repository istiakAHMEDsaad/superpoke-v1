import { useQuery } from '@tanstack/react-query';
import type { Bookmark } from '@/types/Bookmark';

export const useBookmarks = (enabled = true) => {
  return useQuery<Bookmark[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const res = await fetch('/api/bookmarks/user');
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      return res.json();
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
