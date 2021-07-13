import React from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Typography, Avatar, Button, Toolbar} from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './Styles'

const Navbar = () => {
    const classes = useStyles()

    const user = null

    return (
        <AppBar position='static' color='inherit' className={classes.appBar}>
            <div className={classes.brandContainer}>
            <Typography variant="h2" color="inherit" align='center' className={classes.heading}>
                Memories
            </Typography>
            <img src={memories} alt='memories' height='60' className={classes.image}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary'></Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
