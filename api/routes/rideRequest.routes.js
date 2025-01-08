import express from "express";
import { confirmRiderRequest, createRideRequest, getAllRideRequests, rejectRiderRequest } from "../controllers/rideRequest.controller.js";

const router = express.Router();

router.post("/riderequest", createRideRequest);
router.get("/getriderequest", getAllRideRequests);
router.put("/confirmrequest/:id", confirmRiderRequest);
router.put("/rejectrequest/:id", rejectRiderRequest);

export default router;
