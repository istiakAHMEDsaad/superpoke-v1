import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    name: String,
    image: String,
  },
  { timestamps: true }
);

// Prevent duplicate bookmarks
BookmarkSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

export const Bookmark =
  mongoose.models.Bookmark ||
  mongoose.model('Bookmark', BookmarkSchema);
