import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User } from "../models/userModel.js";

export const protect = asyncHandler(async ( req, res, next ) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //get token from header

            token = req.headers.authorization.split(' ')[1]

            //verify the token

            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //get uset from the token

            req.user = await User.findById(decode.id).select('-password')

            next();
        }catch(err){
            console.log(err);
            res.status(401);
            throw new Error('Not Authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})