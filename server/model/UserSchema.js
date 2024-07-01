const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})

const UserModel = mongoose.model("UserModel",UserSchema)
module.exports = UserModel 