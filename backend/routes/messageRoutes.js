import express from 'express'
import authM from '../middleware/authMiddleware.js'
const router = express.Router();

import {
    createMessage,
    getMessages
} from '../controller/messageController.js'

router.route('/:id').get(authM, getMessages).post(authM, createMessage)

export default router