const express = require("express")
const router = express.Router()
const UserModel = require("../model/UserSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.post("/register", async(req,res) => {
    const { username,email,password} = req.body;
    if(!username || !email || !password){
        return res.json({message:"please fill all the fields"})
    }
    const user = await UserModel.findOne({email})
    if(user){
        return res.json({message:"email already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({username,email,password:hashPassword})
    await newUser.save()
    return res.json({message:"successfully register"})
})


router.post("/login", async(req,res) => {
    const {email,password} = req.body;
    if( !email || !password){
        return res.json({message:"please fill all the fields"})
    }
    const user = await UserModel.findOne({email})
    if(!user){
        return res.json({message:"invalid email"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"incorrect password"})
    }
    const token = jwt.sign({id:user._id}, "Secret Key")
    res.cookie('token',token)
    return res.json({message:"logined",id:user._id,token})  
})


// router.get('/logout', async(req,res) => {
//     res.clearCookie(token)
//     return res.json("token has been removed")
// })


module.exports = router