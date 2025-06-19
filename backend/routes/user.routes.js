import express  from "express";
import {protecRoute} from "../middleware/protecRoute.js";
import {getUserProfile, updateUser, deleteUser, deactivateUser} from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile/:username",protecRoute, getUserProfile);
router.post("/update",protecRoute, updateUser);
router.delete("/delete", protecRoute, deleteUser);
router.post("/deactivate", protecRoute, deactivateUser);

export default router;
