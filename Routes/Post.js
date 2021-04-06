import express from "express";
// import User from "../Models/Post.js";

const router = express.Router();

//  for fetching all post from db

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//for deleting a post from db

router.delete("/:postid", async (req, res) => {
  try {
    const deletepost = await Post.deleteOne({ _id: req.params.postid });
    res.json(deletepost);
  } catch (err) {
    res.json({ message: err });
  }
});
