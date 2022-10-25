import express from 'express'

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middlerware/authMiddleware.js'
const router = express.Router()

// @desc Register new user
// @route GET /api/users
// @access Public
router.post('/', registerUser)

// @desc  Auth user & get token
// @route GET /api/users/login
// @access Public
router.post('/login', authUser)

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
router.get('/profile', protect,getUserProfile)

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
router.put('/profile', protect, updateUserProfile)
export default router