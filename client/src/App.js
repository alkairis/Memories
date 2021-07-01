import React, {useEffect, useState} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import memories from './images/memories.png'
import Form from './Components/Forms/Form.componenet'
import Posts from './Components/Posts/Posts.component'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts'


const App = () =>{
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch(getPosts())

    useEffect(()=>{
        dispatch(getPosts())
    }, [currentId, dispatch])

    return(
        <Container maxWidth='lg'>
            <AppBar position='static' color='inherit' className={classes.appBar}>
                <Typography variant="h2" color="inherit" align='center' className={classes.heading}>
                    Memories
                </Typography>
                <img src={memories} alt='memories' height='60' className={classes.image}/>
            </AppBar>
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
        </Container>
    )
}

export default App;