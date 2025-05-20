const { User } = require("../db.js"); 
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
  const{name,password}=req.body
  const hashedPassword=await bcrypt.hash(password,10)
  try {
    const user=await User.create({name,password:hashedPassword})
    res.json({message:"User registred successfully",user})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}
const login= async(req,res)=>{
   const{name,password}=req.body
   const user=await User.findOne({where:{name}})
   if(!user|| !(await bcrypt.compare(password,user.password))){
    return  res.status(401).json({message:"Invalid credentials"})
   }
   const token=jwt.sign({userId:User.id},"secret_key",{
    expresIn:"1h"
   })
   res.json({message:"Looed in successfully!", token})
}

module.exports={
  register,
  login,
  
}