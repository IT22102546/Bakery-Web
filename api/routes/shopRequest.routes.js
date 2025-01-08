import express from "express";
import { confirmShopRequest, createShopRequest, getAllShopRequests, rejectmShopRequest } from "../controllers/shopRequest.controller.js";


const router = express.Router();

router.post("/shoprequest", createShopRequest);
router.get("/getshoprequest", getAllShopRequests);
router.put("/confirmrequest/:id", confirmShopRequest);
router.put("/rejectrequest/:id", rejectmShopRequest);

export default router;
