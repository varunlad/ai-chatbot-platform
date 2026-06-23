/**
 * Authentication Routes
 */

import { Router } from "express";
import {
  signupController,
  loginController,
  getCurrentUserController,
  logoutController,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authenticate, getCurrentUserController);

export default router;
