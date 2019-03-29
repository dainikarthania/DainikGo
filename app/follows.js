const express = require('express')
app=express()
const Sequelize=require('sequelize')
bodyparser=require('body-parser')
const _=require('lodash')
var session = require('express-session')
const async=require('async');
let db=require("../model")
let relation=require("../relation")
let service=require('../service')


//set view engine
app.set('view engine', 'ejs');
//post data set
app.use(bodyparser.urlencoded({extended:false}));
//session make 
app.use(session({  secret: 'DAINIKARTHANIA007))',
}));


const Op = Sequelize.Op;

// //relation of table get 
// relation.releation.follow_relation()


app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
 
  db.Users.findOne({where:{Name:req.body.name,password:req.body.pwd}}).then((result) => {
        req.session.userid=result.id;
        res.redirect('/login');
    }).catch((err) => {   
 res.redirect('/');    });

});




app.get('/login', (req, res) => {
  
  userid=req.session.userid

user=new Promise((reslove,reject)=>{
users=db.Users.findAll().then(result => {
if(_.isEmpty(result)) throw new Error("Empty")  
return _.map(result,result=>result.toJSON())
}).catch((err) => {
  res.send(err);
});
reslove(users)
})




followusers=new Promise((reslove,reject)=>{
  followsuser = db.follow.findAll({where:{[Op.or]:[{followId:userid},{followingId:userid}]}}).then(follow => {
    
    if(_.isEmpty(follow)) return follow
    else
    return _.map(follow,follow=>follow.toJSON())
  }).catch((err) => {
  console.log(err)
      });

      reslove(followsuser)

})


totfollow=new Promise((reslove,reject)=>{
  totfollow = db.totalfollow.findOne({where:{uid:userid},attributes:['totalfollow']}).then(tot => {
    
    if(_.isEmpty(tot)) return follow
    else
    return tot.toJSON()
  }).catch((err) => {
  console.log(err)
      });

      reslove(totfollow)

})



Promise.all([user,followusers,totfollow]).then(([users,follow,totfollow])=>{


    res.render('home',{userid:userid,user:users,userfollow:follow,totalfollow:totfollow});


})


  // Users.findAll({attributes:['id','Name']}).then((result) => {
  //   console.log(result[0])
  //   res.render('home',{userid:userid,data:result});
  // }).catch((err) => {
  //   res.send(err);
  // });
});


app.post('/follow', async(req, res) => {
  user=req.body
userid=req.session.userid
follow=await service.query.create("follow",{status:0,followId:userid,followingId:user.fid})
if(!_.isEmpty(follow)){
   res.redirect('/login');
}
else{
  res.send(follow);
}
// db.follow.create({status:0,followId:userid,followingId:user.fid}).then(value=>{
//   if(_.isEmpty(value)) throw new Error("invalid Data")
//   else
//   return value.toJSON();
// }).catch(err=> res.send(err))

})

app.post('/unfollow', async(req, res) => {
  console.log(req.bod)
  user=req.body
userid=req.session.userid
unfollow=await service.followDetails.unfollow(userid,user.fid)
if(!_.isEmpty(unfollow)){
  res.redirect('/login');
}
else{
 res.send(follow);
}
// db.follow.destroy({where:{[Op.or]:[{status:1,followId:userid,followingId:user.fid},{status:1,followId:user.fid,followingId:userid}]}}).then(value=>{
//   if(_.isEmpty(value)) throw new Error("invalid Data")
//   else
//      res.redirect('/login');
// }).catch(err=> res.send(err))
});


app.post('/cancelfollow', async(req, res) => {
  user=req.body
userid=req.session.userid

cancelfollow=await service.followDetails.cancelfollow(userid,user.fid)

if(!_.isEmpty(cancelfollow)){
  res.redirect('/login');
}
else{
 res.send(follow);
}
});




app.post('/acceptfollow', async(req, res) => {
  user=req.body
userid=req.session.userid

acceptfollow=await service.followDetails.acceptfollow(userid,user.fid)
if(!_.isEmpty(acceptfollow)){
  res.redirect('/login');
}
else{
 res.send("acceptfollow");
}
// db.follow.update({status:1},{where:{followId:user.fid,followingId:userid}}).then(value1=>{
//   if(_.isEmpty(value1)) throw new Error("invalid Data")
//   else
//   return db.totalfollow.findOne({where:{uid:userid}}).then(value=>{
//     if(_.isEmpty(value)){
//         db.totalfollow.create({totalfollow:1,uid:userid}).then(value=>{
//           if(_.isEmpty(value)){
//             return "Invalid"
//           }
//           else
//           db.totalfollow.findOne({where:{uid:ufid}}).then(uufid=>{
//             if(_.isEmpty(uufid)){
//               db.totalfollow.create({totalfollow:1,uid:ufid}).then(fidres=>{
//                 if(_.isEmpty(fidres)) return "InVaild";
//                 else
//                 return fidres
//               })
              
//             }
//             else{
//               db.totalfollow.update({totalfollow:uufid.totalfollow+1},{where:{uid:ufid}})
//             }
//           })

//         })
//     }
//     else{
// db.totalfollow.update({totalfollow:value.totalfollow+1},{where:{uid:userid}}).then(value=>{
//   if(_.isEmpty(value)){
//     return "Update Failed"
//   }
//   else
//      db.totalfollow.findOne({where:{uid:ufid}}).then(uufid=>{
//             if(_.isEmpty(uufid)){
//               db.totalfollow.create({totalfollow:1,uid:ufid}).then(fidres=>{
//                 if(_.isEmpty(fidres)) return "InVaild";
//                 else
//                 return fidres
//               })
              
//             }
//             else{
//               db.totalfollow.update({totalfollow:uufid.totalfollow+1},{where:{uid:ufid}})
//             }
//           })
    
//   })
// }
// }).catch(err=> res.send(err))
// })
});


app.post('/cancelReq', (req, res) => {
  user=req.body
userid=req.session.userid
db.follow.destroy({where:{status:0,followId:user.fid,followingId:userid}}).then(value=>{
  if(_.isEmpty(value)) throw new Error("invalid Data")
  else
     res.redirect('/login');
}).catch(err=> res.send(err))
});


app.post('/setprivate', async(req, res) => {
  userid=req.body.uid

  setactive=await service.followDetails.setprivate(userid)
  
  if(!_.isEmpty(setactive)){
    res.redirect('/login');
  }
  else{
   res.send(`setactive:${setactive}`);
  }

});

app.listen(8000, () => {
    console.log(`Server started on port`);
})