import mongoose from "mongoose";

const ListShcema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String
        },
        genre: {
            type: String
        },
        content: { type: Array },
    },
    { timestamps: true }
);

export default mongoose.model("List", ListShcema);
