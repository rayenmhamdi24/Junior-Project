const express=require("express")
const router=express.Router()
const{getCars,getCarById,addCar,updateCar,deleteCar}=require("../controllers/carController.js")
router.get("/getAll",getCars)
router.get("/getOne",getCarById)
router.post("/add",addCar)
router.put("/update/:id",updateCar)
router.delete("/delete/:id",deleteCar)
module.exports=router