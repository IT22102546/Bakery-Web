import express from 'express';
import { create, deletecake, featureCake, getFeaturedCakes, getCakes, getCakesByCategory, unfeatureCake, updateCake} from '../controllers/cake.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getcakes',getCakes);
router.put('/updatecake/:productId/:userId', verifyToken, updateCake)
router.delete('/deletecake/:productId/:userId', verifyToken, deletecake);
router.put('/featurecake/:productId/:userId', verifyToken, featureCake); 
router.put('/unfeaturecake/:productId/:userId', verifyToken, unfeatureCake); 
router.get('/featured', getFeaturedCakes);
router.get('/category', getCakesByCategory);

export default router;