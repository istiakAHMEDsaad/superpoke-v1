import { Schema, model, models } from 'mongoose';

export type BookmarkType = 'pokemon' | 'superhero';

const BookmarkSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    itemId: {
      type: Number,
      required: true,
    },

    itemType: {
      type: String,
      enum: ['pokemon', 'superhero'],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate bookmark
BookmarkSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

export const Bookmark = models.Bookmark || model('Bookmark', BookmarkSchema);
