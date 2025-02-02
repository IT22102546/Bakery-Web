import express  from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { assignAdmin, deleteUser, findUserByClerkId, forgetpassword, getAdmins, getCustomers, getRiders, getShopById, getUser, getUserById, getUsers, mobiledeleteUser, mobileupdateUser, resetpassword, resignAdmin, signout, test, updateResetPassword, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/test',test);
router.put("/update/:id" , verifyToken , updateUser);
router.delete("/delete/:id" , verifyToken , deleteUser);
router.put("/assignadmin/:id" , verifyToken , assignAdmin);
router.put("/resignadmin/:id" , verifyToken , resignAdmin);
router.get('/signout',signout);
router.get('/getadmins', getAdmins);
router.get('/getriders', getRiders);
router.get('/getcustomers', getCustomers);
router.get('/getusers', verifyToken, getUsers);
router.post('/forgetpassword',forgetpassword);
router.get('/resetpassword/:id/:token',resetpassword);
router.post('/updateResetPassword/:id/:token',updateResetPassword);
router.get('/:userId', getUser);
router.get("/getuserById/:userId", getUserById);
router.get("/getshopsById/:userId", getShopById);
router.get('/findByClerkId/:clerkUserId', findUserByClerkId);
router.put('/mobileupdateUser/:id', mobileupdateUser);
router.delete('/mobiledelete/:id', mobiledeleteUser);


export default router;