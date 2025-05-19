const {Car}=require('../db')
const getCars=async(req,res)=>{
    try {
       const cars=await Car.findAll() 
       return res.status(200).json(cars)
    } catch (error) {
        res.status(500).json({ error:"error fetching cars"},error)
    }
}
const getCarById=async(req,res)=>{
    try {
        const car =await Car.findByPk(req.params.id)
        return res.status(200).json(car)
    } catch (error) {
        return res.status(500).json("error fetching cars")
    }
}
const addCar=async(req,res)=>{
    try {
        const{name,price,quantity,image,description}=req.body
        const car= await Car.create({
      name,
      price,
      quantity,
       image,
      description
    });

    return res.status(201).json(car);
    } catch (err) {
        return  res.status(500).json("error",err)
    }}
    const updateCar=async(req,res)=>{
        try {
            const {id}=req.params
            const { name, price,quantity,image, description } = req.body
            const car=await Car.findByPk(id)
            await car.update({
                name:name||car.name,
                 price: price || car.price,
                 quantity: quantity || car.quantity,
                  image: image !== undefined ? image : car.image,
                 description: description !== undefined ? description : car.description
     })
            return res.status(200).json(car)
        } catch (error) {
            return res.status(500).json("error updating car",error)
        }
 }
 const deleteCar=async(req,res)=>{
     try {
          const { id } = req.params;
     const car= await Car.findByPk(id);
     await car.destroy();
     return res.status(204).send("cars deleted");
     } catch (error) {
         return res.status(500).json("error deleting cars")
     }
 }


module.exports={getCars,getCarById,addCar,updateCar,deleteCar}