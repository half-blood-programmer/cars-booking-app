import User from "../models/User.js";
import { createError } from "../utilities/error.js";

// no create a User, bcs have regist

// update a User
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(404, "Unable to Update this User"));
  }
};

//delete a User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`User with id : ${req.params.id} successfully deleted`);
  } catch (err) {
    next(createError(404, "Unable to Delete this User"));
  }
};

//get a User
export const getUser = async (req, res, next) => {
  try {
    const getedUser = await User.findById(req.params.id);
    res.status(200).json(getedUser);
  } catch (err) {
    next(createError(404, "There is no data found."));
  }
};

//get all Users
export const getAllUser = async (req, res, next) => {
  try {
    const getedAllUser = await User.find();
    res.status(200).json(getedAllUser);
  } catch (err) {
    next(createError(404, "There is no data yet."));
  }
};
