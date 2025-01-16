import express from 'express'
import { countComment, deleteComment, getComments, postComment } from '../controllers/comment.controller.js'
import verifyToken from '../jwt/verifyToken.js'
import isAdmin from '../jwt/isAdmin.js'

const router = express.Router()
router.post('/post-comment', postComment)
router.get('/count-comments', countComment)
router.get('/get-comments',verifyToken, isAdmin ,getComments)
router.delete('/delete/:id',verifyToken,isAdmin,deleteComment)

export default router