import express from 'express'
import { addPost, deletePost, getAllPosts, getPostOfUser, updatePost, updatePostCover, updatePostImages } from './post.controller.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { getUserHeader, verifyTokenMiddleware } from '../../src/middleware/middleware.js'

const postRouter = express.Router()
postRouter.get('/allposts', getAllPosts)
postRouter.post('/post',verifyTokenMiddleware,addPost)
postRouter.post('/GetPosts', verifyTokenMiddleware, getPostOfUser)
postRouter.put('/post',verifyTokenMiddleware, updatePost)
postRouter.delete('/post',verifyTokenMiddleware, deletePost)

postRouter.post('/postCoverUpdate/:id', upload.single('file'), updatePostCover)
postRouter.post('/postImages/:id', upload.array('file', 6), updatePostImages)


export default postRouter