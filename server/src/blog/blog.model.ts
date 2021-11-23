import { model, Schema } from 'mongoose';

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: String,
  date: Number,
});

export interface IBlog {
  title: string;
  description: string;
  thumbnail: string;
  date: number;
  _id: string;
}

export const Blog = model<IBlog>('Blog', blogSchema);
