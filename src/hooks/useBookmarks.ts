import { useQuery } from '@tanstack/react-query';

export const useBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const res = await fetch('/api/bookmark/list');
      return res.json();
    },
  });
};
