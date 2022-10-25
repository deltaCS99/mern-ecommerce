import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(401)
        throw new Error('User already exists')
    }


    const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, 10)
    })

    if(user){
        res.status(201).json({
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
}
)

const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user){
        const validPassword = await bcrypt.compare(password, user.get("password"))

        if(validPassword){
            res.json({
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('Invalid Password')
        }
    }else{
        res.status(401)
        throw new Error('Invalid Email')
    }
}
)

const getUserProfile = asyncHandler(async(req,res)=>{

    const user =  await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })

    }else{
        res.status(401)
        throw new Error('User not found')
    }
}
)

const updateUserProfile = asyncHandler(async(req,res)=>{

    const user =  await User.findById(req.user._id)

    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await user.save()

        res.json({
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(401)
        throw new Error('User not found')
    }
}
)


export {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
}