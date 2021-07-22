import React from 'react'
import Post  from './Post/Post.component'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import {Grid, CircularProgress} from '@material-ui/core'

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const {posts, isLoading} = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return 'No Posts available'
    return (
            isLoading ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => {
                        return (
                            <Grid key={post._id} xs={12} sm={12} md={6} lg={4} xl={3} item>
                                <Post post={post} setCurrentId={setCurrentId}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    )
}

export default Posts;