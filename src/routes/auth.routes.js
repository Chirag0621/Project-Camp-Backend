import { Router } from "express";

import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, logoutUser, refreshAccessToken, registerUser, resetForgotPassword, verifyEmail } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js"; 
import { validate } from "../middlewares/validator.middlewares.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import { userLoginValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router();

//unsecure route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetForgotPassword)

// secure route or protect route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword);

router.route("/resend-email-verification").post(userResetForgotPasswordValidator(), validate, resetForgotPassword)

export default router;