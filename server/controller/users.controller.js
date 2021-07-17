import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()

export const signin = async (req, resp) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return resp.status(404).json({message: `User doesn't exist`})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return resp.status(404).json({message: `Invalid credentials`})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SIGNINTOKEN, {expiresIn: '30d'})

        resp.status(200).json({result: existingUser, token})

    } catch (error) {
        resp.status(500).json({message: `Something went wrong`})
    }
}

export const signup = async (req, resp) => {
    const {email, password, firstName, lastName, confirmPassword} = req.body
    
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return resp.status(400).json({message: `User already exist`})
        if(password!==confirmPassword) return resp.status(400).json({message: `Password didn't matched`})

        const hashpassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, name: `${firstName} ${lastName}`, password: hashpassword})
        const token = jwt.sign({email: result.email, id: result._id}, process.env.SIGNINTOKEN, {expiresIn: '30d'})

        resp.status(200).json({result: result, token})
    } catch (error) {
        resp.status(500).send({message: `Something went wrong`})
    }
}
