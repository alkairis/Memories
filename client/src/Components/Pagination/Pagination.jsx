import React, {useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { Link } from 'react-router-dom'
import useStyles from './Styles'

const Paginate = ({page}) =>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const {noofPages} = useSelector((state) => state.posts)
    useEffect(()=>{
        if(page){
            dispatch(getPosts(page))
        }
    }, [page])
    return (
        <Pagination 
            classes={{ul: classes.ul}}
            count={noofPages}
            page={Number(page)||1}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/post?page=${item.page}`}/>
            )}
        />
    )
}

export default Paginate