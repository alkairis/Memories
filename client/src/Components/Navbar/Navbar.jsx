import React, { useState, useEffect } from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {AppBar, Typography, Avatar, Button, Toolbar} from '@material-ui/core'
import memoriesLogo from '../../images/memories-Logo.png'
import memories from '../../images/memories-Text.png'
import useStyles from './Styles'
import decode from 'jwt-decode'


const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedtoken = decode(token)
            if(decodedtoken.exp*1000  < new Date().getTime()) logout()
        }
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
            
            <Link to='/'>
            <img src={memories} alt='memories' height='45'/>
            <img src={memoriesLogo} alt='memories' height='40' className={classes.image}/></Link>
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
