import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js'
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


//desc Register new User
//post users
//access public
router.post('/', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields!');

    }

    //check if user Exist

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error('User already Exist');
    }

    // Hash password

    const hashedPassword = await hash(password, 10);

    // Create new user

    const newUser = {
        name,
        email,
        password: hashedPassword
    }

    const user = await User.create(newUser)

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('INVALID USER DATA');
    }
}))



//desc authenticate  User
//post users/login
//access public
router.post('/login', asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    //check for user email
    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }


    
}))



//desc Get User data
//get users/me
//access private
router.get('/me', protect, asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
}))



//Generate Token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

export default router;