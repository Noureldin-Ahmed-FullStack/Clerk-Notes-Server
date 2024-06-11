
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { postModel } from "../../Models/post.model.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const addPost = catchError(async (req, res) => {
    // req.body.createdBy = req.user.clerkID
    const note = req.body.note
    note.createdBy = req.user.clerkID
    const post = await postModel.create(note)
    res.json({ message: "success" ,post})
})
const getPostOfUser = catchError(async (req, res) => {
    const posts = await postModel.find({ createdBy: req.user.clerkID }).populate({
        path: 'createdBy',
    })
    res.json(posts)
})

const getAllPosts = catchError(async (req, res) => {
    const posts = await postModel.find({ urgent:false }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'comments',
        populate: {
            path: 'createdBy',
        }
    }).sort({ createdAt: -1 }).limit(10)
    res.json(posts)
})

const updatePost = catchError(async (req, res) => {
    const data = req.body.note
    let post = await postModel.findByIdAndUpdate(req.body.postID, data)
    if (!post) {
        return res.status(404).json({ message: "Note doesnt exist" })
    }
    console.log(data,post);
    res.json({ message: "Note updated" })
})
const deletePost = catchError(async (req, res) => {
    let post = await postModel.findByIdAndDelete(req.body.postID)
    if (!post) {
        return res.status(404).json({ message: "Note doesnt exist" })
    }
    res.json({ message: "deleted" })

})

const updatePostCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            console.log(result);
            await postModel.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url })

        });
    res.json(req.file);
})

const updatePostImages = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    const imageUrls = [];
    try {
        // Loop through uploaded files and upload them to Cloudinary
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
        }

        // All files uploaded, send response with image URLs
        await postModel.findByIdAndUpdate(req.params.id, { images: imageUrls })
        res.status(200).json({ imageUrls });
    } catch (error) {
        console.error('Error uploading files to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading files to Cloudinary' });
    }
});



export {
    addPost,
    getPostOfUser,
    getAllPosts,
    updatePost,
    deletePost,
    updatePostCover,
    updatePostImages
}