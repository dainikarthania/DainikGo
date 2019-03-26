const Sequelize=require('sequelize')

sequelize=require("../config/database")    
    
let { STRING, INTEGER, DATE, literal, BOOLEAN } = Sequelize


       totalfollow=sequelize.define('totalfollow',{
            id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
            totalfollow:{type:INTEGER,allowNull:false},
            createdAt: {
                type:DATE,
                field: 'createdAt',
                defaultValue: literal('NOW()'),
              },
              updatedAt: {
                type:DATE,
                field: 'updatedAt',
                defaultValue: literal('NOW()'),
              }
            })

            module.exports=totalfollow