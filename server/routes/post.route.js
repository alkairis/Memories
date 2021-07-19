import express from "express";
import {getPostsBySearch, getPosts, createPosts, updatePost, deletePost, likePost} from '../controller/posts.controller.js'
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);

router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost)

export default router;