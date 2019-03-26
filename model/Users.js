const Sequelize=require('sequelize')

sequelize=require("../config/database")

let { STRING, INTEGER, DATE, literal, BOOLEAN,JSONB } = Sequelize
    Users=sequelize.define('User',{
      id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        Name:{type:Sequelize.STRING,allowNull:false},
        password:{type:Sequelize.STRING,allowNull:false},
        email:{type:STRING,allowNull:false,unique: true},
        username:{type:STRING,allowNull:false},
        private:{type:INTEGER,allowNull:false,defaultValue:0},
        DOB:{type:DATE,allowNull:false},
        profilepic:{type:STRING,allowNull:false,defaultValue:''},
        vaildtoken:{type:STRING,allowNull:false},
        gender:{type:STRING,allowNull:false},
        totalfollow:{type:INTEGER,allowNull:false,defaultValue:0},
        totalfollowing:{type:INTEGER,allowNull:false,defaultValue:0},
        totalpost:{type:INTEGER,allowNull:false,defaultValue:0},
        totalfileupload:{type:INTEGER,allowNull:false,defaultValue:0},
        leftfileupload:{type:INTEGER,allowNull:false,defaultValue:2000},
        status:{type:INTEGER,allowNull:false,defaultValue:0},
        fields:{type:STRING,allowNull:false,defaultValue:''},
        deactiveAt:{type:DATE,defaultValue:null},
        city:{type:STRING,allowNull:false,defaultValue:''},
        country:{type:STRING,allowNull:false,defaultValue:''},
        religion:{type:STRING,allowNull:false,defaultValue:''},
        language:{type:JSONB,allowNull:false,defaultValue:[]},
        },{
          schema:'dainikgo'
        })

        
        module.exports = Users;
