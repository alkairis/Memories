import React from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import memories from './images/memories.png'
import Form from './Components/Forms/Form.componenet'
import Cards from './Components/Cards/Cards.component.jsx'
import useStyles from './styles'

const App = () =>{
    const classes = useStyles();
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
                  <Grid container spacing={1} justify='space-between' alignItems='stretch'>
                        <Grid item xs={12} sm={8}>
                            <Cards/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form/>
                        </Grid>
                    
                  </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;