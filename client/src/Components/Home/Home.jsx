import React, {useState, useEffect} from 'react'
import {Grow, Container, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import Form from '../Forms/Form.componenet'
import Posts from '../Posts/Posts.component'
import useStyles from './styles'
import { getPosts, getPostBySearch } from '../../actions/posts'
import Paginate from '../Pagination/Pagination'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch(getPosts())
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page')
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, settags] = useState([])

    const handlekeypress = (e) => {
        if(e.keyCode===13){
            searchPost()
        }
        //searchpost
    }

    const handleAdd = (tag) => settags([...tags, tag])
    
    const handleDelete = (Deletetag) => settags(tags.filter((tag) => tag!==Deletetag))

    const searchPost = () =>{
        if(search.trim() || tags){
            dispatch(getPostBySearch({search, tags:tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/')
        }
    }
    return (
        <Grow in>
                <Container maxWidth='xl'>
                  <Grid className={classes.gridContainer} container spacing={3}  alignItems='stretch'>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId = {setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{flexDirection: 'column-reverse'}}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField name='search' size='small' variant='outlined' label='Search' fullWidth value={search} onKeyPress={handlekeypress} onChange={(e) => setSearch(e.target.value)}/>
                                <ChipInput style={{margin: '10px 0'}} size='small' value={tags} onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined' />
                                <Button onClick={searchPost} variant='contained' color='primary'>Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper  elevation={6}>
                                <Paginate page={page}/>
                            </Paper>
                        </Grid>
                    
                  </Grid>
                </Container>
            </Grow>
    )
}

export default Home
