import React from 'react'
import {Avatar, Typography, Paper, Button, Container, Grid, TextField} from '@material-ui/core'
import UseStyles from './Styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'

const Auth = () => {
    const classes = UseStyles()
    const isSignUp = true

    const handleSubmit = () => {}
    const handleChange = () => {}

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      {isSignUp && (
                          <>
                                <Input id="firstname" name="firstname" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input id="lastname" name="lastname" label="Last Name" handleChange={handleChange} half/>
                          </>
                      )}
                      <Input id="email" name="email" label="Email" type='email' handleChange={handleChange} autoFocus half={false}/>
                      <Input id="password" name="password" label="Password" type='password' handleChange={handleChange} autoFocus half={false}/>
                      <Input id="cnfpassword" name="cnfpassword" label="Confirm Password" type='password' handleChange={handleChange} autoFocus half={false}/>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
