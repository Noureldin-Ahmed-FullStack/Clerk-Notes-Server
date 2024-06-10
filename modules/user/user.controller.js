import { userModel } from "../../Models/user.model.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../../mail/sendMail.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../src/middleware/catchError.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

const register = catchError(async (req, res) => {
    // console.log(req.user.primaryEmailAddress.emailAddress);
    let user = await userModel.findOne({ email: req.user.primaryEmailAddress.emailAddress });
    if (user) {
        res.json( user );
    }
    else {
        const data = {
            _id: req.user.id,
            clerkID: req.user.id,
            name: req.user.fullName,
            email: req.user.primaryEmailAddress.emailAddress,
            userPFP: req.user.imageUrl,
            role: "user"
        }
        const UserData = userModel.create(data)
        res.json({ message: "user added successfully", UserData });
    }
});
const setUserRole = catchError(async (req, res) => {
    const isDoctor = req.body.isDoctor;
    await userModel.findByIdAndUpdate(req.user.uid, {
        isDoctor: isDoctor,
        decided: true,
    });
    res.json({ message: "success" });
});
const getAllUsers = catchError(async (req, res) => {
    const users = await userModel.find();
    res.json(users);
});

export const GetSingleUser = catchError(async (req, res, next) => {
    const users = await userModel.findById(req.params.id);
    if (!users) {
        return res.json({ message: "user doesnt exist" });
    }
    next();
});

const updateUser = catchError(async (req, res) => {
    if (req.file) {
        cloudinary.config({
            cloud_name: "dqijwldax",
            api_key: "764827226872981",
            api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc",
        });
        await cloudinary.uploader.upload(
            req.file.path,
            { public_id: uuidv4() + "-" + req.file.originalname },
            async function (error, result) {
                console.log(result);
                req.body.userPFP = result.secure_url;
            }
        );
    }

    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: success });
});
const updateUserPic = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: "dqijwldax",
        api_key: "764827226872981",
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc",
    });
    await cloudinary.uploader.upload(
        req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            console.log(result.secure_url);
            await userModel.findByIdAndUpdate(req.params.id, {
                userPFP: result.secure_url,
            });
            res.json({ message: "success" });
        }
    );
});

export { register, getAllUsers, updateUserPic, updateUser, setUserRole };
