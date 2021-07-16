import React, { useState, useEffect } from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {AppBar, Typography, Avatar, Button, Toolbar} from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './Styles'


const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout= () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }
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
                        <Button variant='contained' color='secondary' onClick={logout}>Sign Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
