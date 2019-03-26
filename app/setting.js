const express = require('express')
app=express()
bodyParser=require('body-parser')
const _=require('lodash')
var session = require('express-session')
const async=require('async');
let db=require("../model")
let service=require('../service')
let moment=require('moment')
var path = require('path');
const fileUpload = require('express-fileupload');
const flash = require('express-flash-notification');


module.exports ={
    private:function(){

         //set view engine
         app.set('views', path.join(__dirname, './views'));

         app.set('view engine', 'ejs');
         //post data set
         app.use(bodyParser.urlencoded({extended:false}));  
        
         app.use(fileUpload());

    app.get('/setting', (req, res) => {
        private=req.session.user.private
        if(private==0){
            op='On'
        }
        else{
            op='Off'
        }
        res.render('setting',{option:op});        
    });


    }
}