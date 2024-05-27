import mongoose from "mongoose";
import { IBlog } from "../entities";

const blogSchema: mongoose.Schema<IBlog> = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

const blogModel = mongoose.model("blog", blogSchema);

export { blogModel };
