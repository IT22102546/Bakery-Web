import express from "express";
import { google, mobilegoogle, mobilesignin, mobilesignup, signin, signup } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/mobilesignup",mobilesignup);
router.post("/signin",signin);
router.post("/mobilesignin",mobilesignin);
router.post("/google",google);
router.post("/mobilegoogle",mobilegoogle);


export default router;