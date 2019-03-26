const Sequelize=require('sequelize')

sequelize=require("../config/database")    
    
let { STRING, INTEGER, DATE, literal, BOOLEAN } = Sequelize

    follow=sequelize.define('follow',{
        // id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        // status:{type:INTEGER,allowNull:false},
        // follows:{type:BOOLEAN,allowNull:false,defaultValue:false}
        // },{
        //   schema:'dainikgo'
        // })
        id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        status:{type:INTEGER,allowNull:false},
        follows:{type:BOOLEAN,allowNull:false,defaultValue:false}
        })

        module.exports=follow