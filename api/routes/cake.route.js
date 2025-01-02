import express from 'express';
import { create, deletecake, featureCake, getFeaturedCakes, getCakes, getCakesByCategory, unfeatureCake, updateCake, admingetCakes, unavailable, available} from '../controllers/cake.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getcakes',getCakes);
router.get('/getadmincakes', verifyToken, admingetCakes);
router.put('/updatecake/:productId/:userId', verifyToken, updateCake)
router.delete('/deletecake/:productId/:userId', verifyToken, deletecake);
router.put('/featurecake/:productId/:userId', verifyToken, featureCake); 
router.put('/unfeaturecake/:productId/:userId', verifyToken, unfeatureCake);
router.put('/available/:productId/:userId', verifyToken, available); 
router.put('/unavailable/:productId/:userId', verifyToken, unavailable);
router.get('/featured', getFeaturedCakes);
router.get('/category', getCakesByCategory);

export default router;