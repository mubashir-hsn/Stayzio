import express from 'express'
import { deleteUser, emailVerification, getAllUsers, login, logout, updateUserRole, uploadUserImage, userSignup , verifyEmail } from '../controllers/user.controller.js';
import { isVerifiedUser } from '../middleware/isUserVerified.js';
import verifyToken from '../jwt/verifyToken.js';

const router = express.Router();

router.post('/signup', userSignup)
router.post("/verifyemail" , verifyEmail);
router.post("/emailverification" , emailVerification);
router.post('/login',isVerifiedUser,login)
router.post('/logout',logout)
router.post('/upload-image',verifyToken , uploadUserImage)
router.get('/all-users',verifyToken ,getAllUsers)
router.delete('/delete-user/:id',verifyToken ,deleteUser)
router.put('/user-role/:id',verifyToken ,updateUserRole)

export default router