'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Bookmark = {
  _id: string;
  itemId: number;
  itemType: 'pokemon' | 'superhero';
  name: string;
  image: string;
};

const BookmarkClient = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete bookmark');
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to remove this bookmark?</p>

        <div className="flex gap-3 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              toast.dismiss(t.id);

              toast.promise(deleteMutation.mutateAsync(id), {
                loading: 'Removing bookmark...',
                success: 'Bookmark removed 🗑️',
                error: 'Failed to remove bookmark',
              });
            }}
          >
            Delete
          </button>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (bookmarks.length === 0) {
    return <p>No bookmarks yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bookmarks.map((b) => (
        <div
          key={b._id}
          className="border rounded-lg p-3 hover:shadow-md transition relative"
        >
          {/* CARD LINK */}
          <Link href={`/explore/${b.itemType}/${b.itemId}`}>
            <div className="relative h-60 w-full">
              <Image
                src={b.image}
                alt={b.name}
                fill
                className="rounded object-cover"
              />
            </div>
            <p className="mt-2 font-medium capitalize">{b.name}</p>
          </Link>

          {/* DELETE BUTTON */}
          <button
            onClick={() => handleDelete(b._id)}
            disabled={deleteMutation.isPending}
            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
          >
            <Trash size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkClient;
