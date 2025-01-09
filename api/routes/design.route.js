import express from 'express';
import { getDesignRequestsByUser, getDesignsByShopId,  getUserDesigns,  saveDesign, updateDesignStatus } from '../controllers/design.controller.js';

import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();




const upload = multer(); // Create multer instance to parse form data


router.post('/save', upload.none(), saveDesign); 
router.get("/getDesignsByShopId/:shopId", verifyToken, getDesignsByShopId);
router.patch('/updateStatus/:id', updateDesignStatus);
router.get('/getDesignRequestsByUser/:userId', getDesignRequestsByUser);

export default router;
