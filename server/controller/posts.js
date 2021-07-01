import PostMessage from '../models/postmessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, resp) => {
    try {
        const postmessages = await PostMessage.find();
        resp.status(200).json(postmessages);
    } catch (error) {
        resp.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, resp) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
            resp.status(201).json(newPost);
        } catch (error) {
        resp.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, resp) => {
    const {id: _id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return resp.status(404).send('No post with that id')

    const updatedPost =await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})

    resp.json(updatedPost)
}

export const deletePost = async(req, resp) =>{
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return resp.status(404).send('No post with that id')
    const deletedPost = await PostMessage.findByIdAndRemove(_id);
    resp.json(deletedPost)

}