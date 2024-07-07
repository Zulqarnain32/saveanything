const express = require("express")
const router = express.Router()
const UserModel = require("../model/UserSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register the user
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


// Login the user 
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


// Fetch all login users 

router.get("/users", async(req,res) => {
   UserModel.find({})
   .then(users => {
    // console.log(users);
    return res.json(users)
   }).catch(err => {
    console.log("couldn't fetch users!",err);
   })
})



// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Corrected the token retrieval
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'Secret Key', (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log('Decoded token:', decoded);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Route to fetch a single user's details
router.get('/singleUser', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId, { name: 2, email: 1, role: 1, _id: 1 });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name, email: user.email, role: user.role, id: user._id });
    } catch (error) {
        console.log("Backend error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router