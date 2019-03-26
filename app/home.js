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

module.exports={
    home:function(){
         //set view engine
 app.set('views', path.join(__dirname, './views'));

 app.set('view engine', 'ejs');
 //post data set
 app.use(bodyParser.urlencoded({extended:false}));  

 app.use(fileUpload());

app.get('/home', async(req, res) => {
    allfollowq=await service.user.getalluserfollowing(req.session.user.id)
    req.session.follow=allfollowq
    allfollowingq=await service.user.getalluserfollow(req.session.user.id)
    req.session.following=allfollowingq
    
    user=req.session.user
    alluser=await service.user.getAllUser(user.id)
    allfollow=await service.user.alluser(req.session.user.id)
    req.session.allfollow=allfollow;
    req.session.alluser=alluser
    profilepic=req.session.profilepic
    totalfollow=req.session.totalfollow
    totalfollowing=req.session.totalfollowing
    totalreq=await service.user.gettotalrequest(req.session.user.id)
    console.log("ee",totalfollow)
    if(_.isEmpty(profilepic)){
        profilepic=user.profilepic
    }
    if(_.isFinite(totalfollow)==false){
        totalfollow=user.totalfollow
    }
    if(_.isFinite(totalfollowing)==false){
        totalfollowing=user.totalfollowing
    }

  res.render("Home",{error:req.session.error,userprofile:profilepic,user:user,totalfollow:totalfollow,totalfollowing:totalfollowing,totalreq:totalreq});
});
app.get('/login', (req, res) => {
   
    res.render("login",{msg:''});
});
app.post('/login', async(req, res) => {
    
    model=req.body
    user={
        username:model.name,
        password:model.pwd
    }
    try{
        user=await service.user.login(user)
        if(user.status==0) throw new  Error("Plz verify Your Email")
        req.session.user=user
        followuser=await service.user.getfollow(user.id)
        alluser=await service.user.getAllUser(user.id)
        req.session.alluser=alluser
        req.session.error='';
        req.session.totalfollow=''
        req.session.totalfollowing=''        
         res.redirect('/home');

    }
    catch(e){
            res.render("login",{msg:e.message});
    }
});
app.get('/verifyemail/:id', async(req, res) => {
    let {params} = req
    let vaildem= await service.register.vaildatemail(params.id)
    if(!_.isEmpty(vaildem))  res.render("login",{msg:"EMAIL VALIDATION COMPLETE"});

});

app.post('/uploadprofile', async(req, res) => {
  
  try{
    if(req.files.profilepic.mimetype=='image/gif' || req.files.profilepic.mimetype=='image/jpeg' || req.files.profilepic.mimetype=='image/png'){
        let {id:userid}=req.session.user
        file=req.files.profilepic
        filename=file.name
    
        if(file.mv('./upload/'+filename)){
            rop=await service.user.changeprofile(userid,filename)
            req.session.profilepic=rop.profilepic
            req.session.error='';
            res.redirect('/home');

        }    
     }
     else{
         throw new Error("MUST BE IMAGE FORMAT")
     }
  

  }
  catch(e){
req.session.error=e.message;
 res.redirect('/home');
}

});
}
}
