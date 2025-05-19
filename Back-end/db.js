const{Sequelize}=require("sequelize")
const sequelize=new Sequelize('carsStore','root','root',{
    host:'localhost',
    dialect:'mysql'
})
sequelize
.authenticate()
.then(()=>{
    console.log('👌 Connection has been established successfully.')
})
.catch((error)=>{
    console.error('❌ Unable to connect to the database:', error)
})
const Car=require("./models/carModel.js")(sequelize)
const User=require("./models/userModel.js")(sequelize)
User.hasMany(Car)
Car.belongsTo(User)

// sequelize
//   .sync({ alter: true })  
//   .then(() => {
//     console.log('✅ Database synced successfully.');
//   })
//   .catch((err) => {
//     console.error('❌ Error syncing database:', err);
//   })
  module.exports={sequelize,
    Car,
    User}