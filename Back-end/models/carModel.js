const{DataTypes}=require('sequelize')
module.exports=(sequelize)=>{
    const Car=sequelize.define('Car',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
         quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
        image:{
            type:DataTypes.STRING,
        allowNull:true
          },
        description:{
            type: DataTypes.TEXT,
            allowNull: true 
        }
    })
    return Car
}