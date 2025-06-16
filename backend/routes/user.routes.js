import express  from "express";
import {protecRoute} from "../middleware/protecRoute.js";
import {getUserProfile, updateUser} from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile/:username",protecRoute, getUserProfile);

router.post("/update",protecRoute, updateUser);


export default router;
