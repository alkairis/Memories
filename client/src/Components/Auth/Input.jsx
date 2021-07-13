import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

/**
 * 
 * @param {id, name, label, handleChange, autoFocus, type, half, handleShowPassword} props 
 * @returns 
 */
const Input = (props) => {
    const {id, name, label, handleChange, autoFocus, type, half, handleShowPassword} = props

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                id={id}
                label={label}
                name={name}
                onChange={handleChange}
                variant='filled'
                required
                fullWidth
                autoFocus={autoFocus}
                type={type}
                InputProps={name==='password' && {
                    endAdornment : (
                        <InputAdornment position='end'>
                            <IconButton aria-label="show password" onClick={handleShowPassword}>
                              {type==='password'? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ) 
                }}
            />
        </Grid>
    )
}

export default Input
