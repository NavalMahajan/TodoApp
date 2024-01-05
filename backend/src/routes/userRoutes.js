import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();

router.route("/register/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout/").post(verifyJWT, logoutUser);
// router.route("/refresh-token").post(refreshAcessToken);
export default router;
