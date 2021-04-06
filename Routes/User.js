import express from "express";
import User from "../Models/User.js";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userValidation, loginValidation } from "../validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

/* ************************
    regisering new user
   *************************/

router.post("/register", async (req, res) => {
  // validating the data
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email already exixts
  const emailexists = await User.findOne({ email: req.body.email });
  if (emailexists) return res.status(400).send("Email already exists");

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  // creating the new user

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    password: hashedpassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ userid: user._id });
  } catch (err) {
    res.json({ message: err });
  }
});

// fetching user info by userid

// router.get("/:userid", async (req, res) => {
//   try {
//     const specificUser = await User.findById(req.params.userid);
//     res.json(specificUser);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// for updating the user info
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

/*  ***************************
          login
    **************************/

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email already exixts
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does't exist");

  // checking the password is it correct

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
    };
    // creating the auth token
    const token = jwt.sign(payload, process.env.SECRETE_TOKEN);
    res
      .header("auth-token", token)
      .send(res.json({ success: true, token: token }));
  } else {
    return res.status(400).send("Somthing wrong with email or password");
  }

  // res.send("Logged in");
});

export default router;
