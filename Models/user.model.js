import mongoose from "mongoose";

const schema = new mongoose.Schema({

    _id: String,
    clerkID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        minLength: [2, 'name is too short']
    },
    email: {
        type: String,
        required: true,

    },
    userPFP: {
        type: String,
        required: false,
        default: ""
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})
export const userModel = mongoose.model("user", schema)