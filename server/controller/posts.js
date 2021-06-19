import PostMessage from '../models/postmessage.js';

export const getPosts = async (req, resp) => {
    try {
        const postmessages = await PostMessage.find();
        resp.status(200).json(postmessages);
    } catch (error) {
        resp.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, resp) => {
    const post = req.body();
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
            resp.status(201).json(newPost);
        } catch (error) {
        resp.status(409).json({message: error.message});
    }
}