const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000

const mongoose = require("mongoose")
const userRouter = require("./routes/auth")


app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true,
    
}))
app.use("/auth",userRouter)

// mongoose.connect("mongodb://127.0.0.1:27017/savedMethod")
mongoose.connect("mongodb+srv://zulqarnain:savedFriends@cluster0.u0lv4zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected to database");
}).catch(err => console.log("not connected"))

app.get("/", (req,res) => {
    res.json("Hello World")
})

app.listen(port, () => {
    console.log("server is listening at port 5000");
})

