import User from "../models/User.js";
import { createError } from "../utilities/error.js";

// register function
export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save().then(res.status(200).send("User has been created."));
  } catch (err) {
    next(createError(404, "Unable to Register"));
  }
};
