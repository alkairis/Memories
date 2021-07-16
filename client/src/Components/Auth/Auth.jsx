import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Typography,
  Paper,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import {useDispatch} from 'react-redux'
import {signin, signup} from '../../actions/auth'

import UseStyles from "./Styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from './Icon'

const initial = {
  firstname : '',
  lastname : '',
  email: '',
  password : '',
  confirmpassword: ''
}

const Auth = () => {
  const classes = UseStyles();
  const [isSignUp, setSignUp] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const [formData, setformData] = useState(initial)

  const handleSubmit = (event) => {
    event.preventDefault()
    if(isSignUp){
      dispatch(signup(formData, history))
    }else{
      dispatch(signin(formData, history))
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleShowPassword = () => setshowpassword((password) => !password);

  const switchmode = () => {
    setSignUp(!isSignUp);
    setshowpassword(false);
  };

  const googleSuccess = async (resp) => {
    const result = resp?.profileObj;   // undefined
    const token = resp?.tokenId;

    try {
        dispatch({type: 'AUTH', data: {result, token}});
        history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
      console.log(`Google SignIn failed : ${error}`)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
              autoFocus
              half={false}
            />
            <Input
              id="password"
              name="password"
              label="Password"
              type={showpassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
              autoFocus
              half={false}
            />
            {isSignUp && (
              <Input
                id="confirmpassword"
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                handleChange={handleChange}
                autoFocus
                half={false}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
            clientId="755932927456-fm55i868bnajr5r2fsc8hldmlojcgd2n.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchmode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don' have account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
