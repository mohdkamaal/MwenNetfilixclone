import mongoose from "mongoose";

const moiveShcema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    imageTitle: {
      type: String,
    },
    imagesm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Moives", moiveShcema);
