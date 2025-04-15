import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile); // Protected route
router.put('/profile', protect, updateUserProfile); // Protected route
router.post('/logout', logoutUser); // Clear cookies for logout

export default router;
