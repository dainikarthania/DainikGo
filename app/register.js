const express = require('express')
app=express()
bodyParser=require('body-parser')
const _=require('lodash')
var path = require('path');
var session = require('express-session')
const async=require('async');
let db=require("../model")
var randomToken = require('random-token');
let service=require('../service')
let moment=require('moment')

module.exports={
    register:function(){
        db.Users.sync()
        //set view engine
        app.set('views', path.join(__dirname, './views'));

        app.set('view engine', 'ejs');
        //post data set
        app.use(bodyParser.urlencoded({extended:false}));        
        
        app.get('/register', (req, res) => {
            res.render("register",{msg:''});
        });
        
        app.post('/register', async(req, res) => {
            var token = randomToken(16);
            model=req.body
            
            try{
                vailddob=moment("2009-01-01").format('YYYY')
                dob=moment(model.DOB).format('YYYY')
                validate=vailddob-dob
                if(model.name.length<3){
                    throw new Error("Name must have 3 charecter")
                }
                else if(model.pwd.length<6){
                    throw new Error("password  must have 6 charecter long")
                }
                else if(model.cpwd!==model.pwd){
                    throw new Error("confirm password  must be same as password")
                }
                else if(model.username.length<3){
                    throw new Error("UserName must have 3 charecter")
                }
                else if(validate<0){
                    throw new Error("UserName must be 10 years Old")
                }

                emailcheck=await service.register.checkemail(model.email)
               
                if(!_.isEmpty(emailcheck)){
                    throw new Error(`Email id ${emailcheck.email} already Used`)
                }
               
                user={
                    Name:model.name,
                    password:model.pwd,
                    email:model.email,
                    username:model.username,
                    DOB:model.DOB,
                    gender:model.gender,
                    vaildtoken:token,
                }
                if(model.gender=="male"){
                    user.profilepic="/upload/blank-profile-men.png"
                }
                else{
                    user.profilepic="/upload/blank-female-profile.jpg"

                }
                user=await service.register.register(user)
                sendmail=await service.register.sendmail(model.email,token)

                res.render("varifyemail",{email:model.email});
            }
            catch(e){
                res.render("register",{msg:e.message});
            }
        });

    }
}
    
    
        
    
    




