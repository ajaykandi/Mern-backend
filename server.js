import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import Userrouter from "./Routes/User.js";
import verify from "./auth.js";

const app = express();
const port = process.env.port || 3000;

// middlewares

app.use(express.json());
app.use(cors());
app.use("/user", Userrouter); //to access all user routs from >>> models/User.js

// api routes
app.get("/", (req, res) => {
  res.send("You are on home page");
});

// db Connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

// listening on port
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
