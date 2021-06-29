import React from 'react'
import Post  from './Post/Post.component'
import useStyles from './styles'
import { useSelector } from 'react-redux'

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts)
    console.log(posts);
    return (
        <>
            <Post/> 
        </>
    )
}

export default Posts;