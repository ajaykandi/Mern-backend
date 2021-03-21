import express from "express";
import User from "../Models/User.js";

const router = express.Router();

//  fetching data from db

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// fetch specific post

router.get("/:userid", async (req, res) => {
  try {
    const specificUser = await User.findById(req.params.userid);
    res.json(specificUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// for post data to db

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
// Update post info
router.patch("/:userid", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userid },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          age: req.body.age,
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});
// Deleting a post
router.delete("/:userid", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.userid });
    res.json(deleteUser);
  } catch (err) {
    res.json({ message: err });
  }
});
export default router;
