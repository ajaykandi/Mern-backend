import jwt from "jsonwebtoken";
import "dotenv";

export const authentication = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("access-denied");
  try {
    const verified = jwt.verify(token, process.env.SECRETE_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid-Token");
  }
};
export default authentication;
