import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // get token in cookies
  const token = req.cookies.acces_token;

  //if not autintached
  if (!token) return next(createError(401, "You're not authentichated"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, "Your token is not valid"));
    req.getUserData = user;

    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.getUserData.id === req.params.id) {
      next();
    } else {
      return next(createError(401, "You're not authentichated"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.getUserData.username === "admanjunios") {
      next();
    } else {
      return next(
        createError(401, "You're not authentichated to do this action!")
      );
    }
  });
};
