import { userModel } from "../../Models/user.model.js";
import { catchError } from "./catchError.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

export const checkEmailExist = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.status(409).json({ message: "email already exists!" });
  next();
};
export const getUserHeader = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(409).json({ message: "You are not logged in" });
  }
  let decoded = jwt.verify(req.headers.token, "key");
  req.user = decoded;
  next();
};
export const verifyTokenMiddleware = (req, res, next) => {
  if (!req.body.user) {
    return res.status(401).json({ error: "Unauthorized" , request:req.body});
  }
  req.user = req.body.user;
  next();
};
export const GetSingleUser = catchError(async (req, res, next) => {
  let users = await userModel.findById(req.params.id);
  if (!users) return res.json({ message: "user doesn't exist!" });
  next();
});
export const checkForImgMiddleWare = catchError(async (req, res, next) => {
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
        req.body.image = result.secure_url;
        next();
      }
    );
  } else {
    next();
  }
});
