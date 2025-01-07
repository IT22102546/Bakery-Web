import express from 'express';
import { saveDesign } from '../controllers/design.controller.js';

import multer from 'multer';
const router = express.Router();




const upload = multer(); // Create multer instance to parse form data


router.post('/save', upload.none(), saveDesign); 

export default router;
