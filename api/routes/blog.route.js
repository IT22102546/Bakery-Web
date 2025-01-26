import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { Create, getblogs, deleteBlog, Getblog, updateblog, Delete, getBlogBySlug } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/create', verifyToken, Create);  
router.get('/get', getblogs);
router.delete('/delete/:id', verifyToken, deleteBlog);  
router.get('/getblog/:id',Getblog);
router.put('/updateblog/:id',updateblog);
router.delete('/delete/:id',Delete);
router.get('/getblogbyslug/:slug', getBlogBySlug);

export default router;