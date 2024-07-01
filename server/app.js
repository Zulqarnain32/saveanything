const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000
// const cookieParser = require('cookie-parser')

const mongoose = require("mongoose")
const userRouter = require("./routes/auth")


app.use(express.json())
// app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true,
    
}))
app.use("/auth",userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/savedMethod")
.then(() => {
    console.log("connected to database");
}).catch(err => console.log("not connected"))

app.listen(port, () => {
    console.log("server is listening at port 5000");
})

