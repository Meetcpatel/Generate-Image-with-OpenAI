import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import PostSchema from "../models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECCRET,
});

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await PostSchema.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await PostSchema.create({
      prompt,
      name,
      photo: photoUrl.url,
    });
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

export default router;
