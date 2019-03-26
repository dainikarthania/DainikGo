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
const relation=require('../relation')

module.exports={
    follwpage:function(){
         //set view engine
 app.set('views', path.join(__dirname, './views'));

 app.set('view engine', 'ejs');
 //post data set
 app.use(bodyParser.urlencoded({extended:false})); 
 relation.releation.follow_relation() 

app.get('/getfollow', async(req, res) => {
    allfollow=await service.user.getalluserfollowing(req.session.user.id)
    user=await service.user.getalluserDetails()
    follow=req.session.follow
    res.render("getfollow",{newdata:allfollow,old:follow,user:user,cid:req.session.user.id});
});
app.get('/getfollowing', async(req, res) => {
    allfollowing=await service.user.getalluserfollow(req.session.user.id)
    user=await service.user.getalluserDetails()
    following=req.session.following
    res.render("getfollowing",{newdata:allfollowing,old:following,user:user,cid:req.session.user.id});

});

app.get('/follows', async(req, res) => {
    alluser=req.session.allfollow
    allu=req.session.alluser
    allfollow=await service.user.getallfollow(req.session.user.id)
    allfollowing=await service.user.getallfollowing(req.session.user.id)
    totalfollowdata=await service.user.gettotalfollowdata(req.session.user.id)
    req.session.totalfollow=totalfollowdata.totalfollow
    req.session.totalfollowing=totalfollowdata.totalfollowing
    res.render("userfollow",{all:allfollow,allfollowing:allfollowing,user:allu,cuid:req.session.user.id,alluser:alluser});
   
});


app.get('/followuser/:id/:private', async(req, res) => {
try{
    followuser=await service.user.followuser(req.session.user.id,req.params.id,req.params.private)
 res.redirect('/follows');
}
catch(e){
     res.json({error:e.message});
}

});

app.get('/followback/:id/:private', async(req, res) => {
    try{
        followuser=await service.user.followback(req.session.user.id,req.params.id,req.params.private)

     res.redirect('/follows');
    }
    catch(e){
         res.json({error:e.message});
    }
    
    });

app.get('/unfollowuser/:id/:private', async(req, res) => {
    try{
        followuser=await service.user.unfollowuser(req.session.user.id,req.params.id)
     res.redirect('/follows');
    }
    catch(e){
         res.json({error:e.message});
    }
    
    });
    app.get('/Acceptfollowuser/:id/:private', async(req, res) => {
        try{
            followuser=await service.user.acceptfollow(req.session.user.id,req.params.id)
         res.redirect('/follows');
        }
        catch(e){
             res.json({error:e.message});
        }
        
        });
        app.get('/getfollowuser/:id/:private', async(req, res) => {
            try{
                followuser=await service.user.followuser(req.session.user.id,req.params.id,req.params.private)
             res.redirect('/getfollow');
            }
            catch(e){
                 res.json({error:e.message});
            }
            
            });

            app.get('/getunfollowuser/:id/:private', async(req, res) => {
                try{
                    followuser=await service.user.unfollowuser(req.session.user.id,req.params.id)
                 res.redirect('/getfollow');
                }
                catch(e){
                     res.json({error:e.message});
                }
                
                });
}

}
