import User from "../models/User.js";
import { createError } from "../utilities/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register function
export const register = async (req, res, next) => {
  try {
    //encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save().then(res.status(200).send("User has been created."));
  } catch (err) {
    next(createError(404, "Unable to Register"));
  }
};

// login function
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return next(createError(404, "User Not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(404, "Wrong Password or Username"));

    //hide id and pass
    const { _id, level, password, ...otherProperties } = user._doc;

    //set token with jwt
    const token = jwt.sign(
      { id: user._id, email: user.email, level: user.level },
      process.env.JWT_KEY
    );

    return res
      .cookie("acces_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherProperties }, level });
  } catch (err) {
    next(createError(404, "Unable to Login"));
  }
};

// logout function
export const logout = async (req, res, next) => {
  try {
    //set token with jwt

    return res
      .cookie("acces_token", "none", {
        httpOnly: true,
      })
      .status(200);
  } catch (err) {
    next(createError(404, "Unable to Logout"));
  }
};
