const { Router } = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/auth.controller");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */
authRouter.post("/login", loginUserController);

module.exports = authRouter;
