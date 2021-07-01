import React from 'react'
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost} from '../../../actions/posts'


const Post = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {post, setCurrentId} = props
    return (
        <Card className={classes.card}>
             <CardMedia
              className={classes.media}
               title={post.title}
               image={post.selectedFile}
             />

             <div className={classes.overlay}>
                 <Typography variant="h6" color="initial">
                     {post.creator}
                 </Typography>
                 <Typography variant="body2" color="initial">
                     {moment(post.createdAt).fromNow()}
                 </Typography>
             </div>
             <div className={classes.overlay2}>
                 <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
                     <MoreHorizIcon fontSize='default'/>
                 </Button>
             </div>
             <div className={classes.details}>
                 <Typography variant="body2" color="textSecondary">
                     {
                         post.tags.map((tag) => `#${tag} `)
                     }
                 </Typography>
             </div>
                <Typography variant="h6" color="initial" className={classes.title} gutterBottom>{post.title}</Typography>
             <CardContent>
                <Typography variant="subtitle2" color="initial" gutterBottom>{post.message}</Typography>
             </CardContent>
             <CardActions className={classes.cardActions} >
                 <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                     <ThumbUpAltIcon fontSize='small'/>
                      &nbsp; Like&nbsp; {post.likeCount}
                 </Button>
                 <Button size='small' onClick={() => dispatch(deletePost(post._id))}>
                     <DeleteIcon fontSize='small'  color='primary'/>
                     Delete
                 </Button>
             </CardActions>
        </Card>
    )
}

export default Post;