const express=require("express")
const cors=require("cors")
const db=require("./db.js")
const userRoute=require("./routes/userRoute.js")
const carRoute=require("./routes/carRoute.js")
const app=express()
const port=3000
app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/cars",carRoute)
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})