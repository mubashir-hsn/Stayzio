import express from 'express'
import {blogs, createNewBlog, deleteBlog, getBlogs, getRelatedBlogs, getSingleBlog, updateBlog } from '../controllers/blog.controller.js';
import verifyToken from '../jwt/verifyToken.js';
import isAdmin from '../jwt/isAdmin.js';

const router = express.Router();

router.get('/', blogs)
router.get('/getblogs', getBlogs)
router.get('/:id', getSingleBlog)
router.get('/related-blogs/:id', getRelatedBlogs)
router.post('/create-blog',verifyToken,isAdmin ,createNewBlog)
router.patch('/update-blog/:id',verifyToken,isAdmin ,updateBlog)
router.delete('/delete-blog/:id', verifyToken,isAdmin,deleteBlog)

export default router