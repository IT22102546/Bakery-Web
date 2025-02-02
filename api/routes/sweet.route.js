import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { admingetSweets, available, create, deletesweet, featureSweet, getFeaturedSweets, getSweets, getSweetsByCategory, mobilegetSweets, mobilegetSweetsByCategory, unavailable, unfeatureSweet, updateSweet } from '../controllers/sweet.controller.js';

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getsweets',getSweets);
router.get('/getadminsweet', verifyToken, admingetSweets);
router.put('/updatesweet/:productId/:userId', verifyToken, updateSweet)
router.delete('/deletesweet/:productId/:userId', verifyToken, deletesweet);
router.put('/featuresweet/:productId/:userId', verifyToken, featureSweet); 
router.put('/unfeaturesweet/:productId/:userId', verifyToken, unfeatureSweet);
router.put('/available/:productId/:userId', verifyToken, available); 
router.put('/unavailable/:productId/:userId', verifyToken, unavailable);
router.get('/featured', getFeaturedSweets);
router.get('/category', getSweetsByCategory);
router.get('/mobilegetsweets',mobilegetSweets);
router.get('/mobilecategory', mobilegetSweetsByCategory);

export default router;