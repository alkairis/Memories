import React, {useState, useEffect} from 'react'
import {Grow, Container, Grid} from '@material-ui/core'
import Form from '../Forms/Form.componenet'
import Posts from '../Posts/Posts.component'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import { getPosts } from '../../actions/posts'

const Home = () => {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch(getPosts())

    useEffect(()=>{
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
                <Container>
                  <Grid className={classes.mainContainer} container spacing={3} justify='space-between' alignItems='stretch'>
                        <Grid item xs={12} sm={8}>
                            <Posts setCurrentId = {setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{flexDirection: 'column-reverse'}}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    
                  </Grid>
                </Container>
            </Grow>
    )
}

export default Home
