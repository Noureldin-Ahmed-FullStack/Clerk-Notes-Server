import express from 'express'
import { getUserHeader, verifyTokenMiddleware } from '../../src/middleware/middleware.js'
import { GetSingleUser, getAllUsers, register, setUserRole, updateUser, updateUserPic } from './user.controller.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const userRouter = express.Router()

userRouter.post('/register',verifyTokenMiddleware, register)
userRouter.post('/userRole',getUserHeader, setUserRole)
userRouter.get('/users', getAllUsers)
 
// userRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
userRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
userRouter.put('/user/:id',GetSingleUser, upload.single('file'), updateUser)


export default userRouter