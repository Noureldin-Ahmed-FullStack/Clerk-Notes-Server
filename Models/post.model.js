import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    status:{
        type: String,
        enum: ['not completed', 'completed'],
        default: 'not completed'
    },
    theme: String,
    coverImage: {
        type: String
    },
    images: [{
        type: String
    }],
    createdBy: {
        type: String,
        ref: 'user', // Reference to User model (author of the post)
        required: true
    }
}, { timestamps: true });
export const postModel = mongoose.model("post", postSchema)