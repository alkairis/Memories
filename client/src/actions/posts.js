import * as api from '../api'
import {CREATE, DELETE, FETCH_ALL, UPDATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST} from '../Constants/Constants'

// Action creators
export const getPosts = (page) => async(dispatch) =>  {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPosts(page);
        const action = {type: FETCH_ALL, payload: data}
        dispatch(action);
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPost(id)
        dispatch({type:FETCH_POST})
        dispatch({type:END_LOADING})
    } catch (error) {
        
    }
}

export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data: {data}} = await api.fetchPostBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async(dispatch)=> {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.createPost(post)
        dispatch({type: CREATE, payload: data})
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

