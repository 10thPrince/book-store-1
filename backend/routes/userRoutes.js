import express from "express";

const router = express.Router();


//desc Register new User
//post users
//access public
router.post('/', async(req, res)=>{
    res.json({message: "Register user"})
})



//desc authenticate  User
//post users/login
//access public
router.post('/login', async(req, res)=>{
    res.json({message: "Login User"})
})



//desc Get User data
//get users/me
//access public
router.get('/', async(req, res)=>{
    res.json({message: "User DATA display"})
})

export default router;