import express  from "express";
import { getMe, signup, login, logout, recoverPassword } from "../controllers/auth.controller.js";
import { protecRoute } from "../middleware/protecRoute.js";


const router = express.Router();

router.get("/me", protecRoute, getMe);
router.post("/signup",signup);
router.post("/login", login)
router.post("/logout",logout)
router.post("/recover-password", recoverPassword);



export default router;
