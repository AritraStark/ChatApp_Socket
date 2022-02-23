import express from 'express'
import authM from '../middleware/authMiddleware.js'
const router = express.Router();

import {
    loginUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
} from '../controller/userController.js'

router.route('/login').post(loginUser)
router.route('/').post(createUser).get(authM, getAllUsers)
router.route('/:id').post(authM, updateUser).delete(authM, deleteUser)
router.route('/profile').get(authM, getUser)

export default router