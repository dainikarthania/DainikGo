let db=require("../model")
const _=require('lodash')
sequelize=require("../config/database")

module.exports={
login:function(model){
    return db.Users.findOne({where:{$or:[{username:model.username},{email:model.username}],password:model.password}}).then((result) => {
        if(_.isEmpty(result)) throw new Error("Username or password Invaild")
        else
        return result.toJSON()
    })
},
changeprofile:function(id,path){
    return db.Users.update({profilepic:'/upload/'+path},{where:{id:id},returning:true}).then(value=>{
        value=value[1][0]
        return value.toJSON()
    })

},
getfollow:function(id){
    return db.follow.findAll({where:{followId:id}}).then(value=>{
        if(_.isEmpty(value)) return value
        else

      return value
    })
},
getfollowing:function(id){
    return db.follow.findAll({where:{followingId:id}}).then(value=>{
        if(_.isEmpty(value)) return value
        else
        return value
    })
},
getAllUser:function(id){
sql=`with follow as(select *from dainikgo."Users" where id not in (select "followingId" from dainikgo.follows where "followId"=${id}))
select id,"Name",private from follow where id not in(select "followId" from dainikgo.follows where "followingId"=${id})`;

return sequelize.query(sql,{type: sequelize.QueryTypes.SELECT}).then(value=>{
    if(_.isEmpty(value)) return value
    else
    return value
})

},
followuser:function(uid,fid,private){
    if(private==0){
        return db.follow.create({status:1,followId:uid,followingId:parseInt(fid)}).then(value=>{
            if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
            else
            return value.toJSON()
        })
    }
        else if (private==1){
            return db.follow.create({status:0,followId:uid,followingId:parseInt(fid)}).then(value=>{
                if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
                else
                return value.toJSON()
            })

    }
},

unfollowuser:function(uid,fid){
    return db.follow.destroy({where:{$or:[{followId:uid,followingId:fid},{followId:fid,followingId:uid}]}}).then(value=>{
        if(_.isEmpty(value)) return value
        else
            return value;
    })
},
getallfollow:function(id){
    return db.follow.findAll({where:{followId:id}}).then(value=>{
        if(_.isEmpty(value)) return value
        else 
        return value
    })
},
getallfollowing:function(id){
    return db.follow.findAll({where:{followingId:id}}).then(value=>{
        if(_.isEmpty(value)) return value
        else 
        return value
    })
},
alluser:function(id){
    sql=`with follow as(select *from dainikgo."Users" where id not in (select "followingId" from dainikgo.follows where "followId"=${id}))
    select *from follow`;
    return sequelize.query(sql,{type: sequelize.QueryTypes.SELECT}).then(value=>{
        if(_.isEmpty(value)) return value
        else
        return value
    })
 
},
acceptfollow:function(id,fid){
    return db.follow.update({status:1},{where:{followingId:id,followId:fid}}).then(value=>{
        if(_.isEmpty(value)) return value
        else
        return db.Users.update({totalfollowing:sequelize.literal('totalfollowing+1')},{where:{id:fid}}).then(value=>{
            if(_.isEmpty(value)) return value
            else
            return db.Users.update({totalfollow:sequelize.literal('totalfollow+1')},{where:{id:id}}).then(value=>{
                if(_.isEmpty(value)) return value
                else
                return value
            })
    
    })
})
},
followback:function(uid,fid,private){
    if(private==0){
        return db.follow.create({follows:true,status:1,followId:uid,followingId:parseInt(fid)}).then(value=>{
            if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
            else
            return db.follow.update({follows:true},{where:{followingId:uid}}).then(value=>{
                if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
                else
                return value
            })
        })
    }
        else if (private==1){
            return db.follow.create({follows:true,status:0,followId:uid,followingId:parseInt(fid)}).then(value=>{
                if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
                else
                return db.follow.update({follows:true},{where:{followingId:uid,followId:fid}}).then(value=>{
                    if(_.isEmpty(value)) throw new Error("Can't follow Something Wrong")
                    else
                    return value
                })
            })

    }
},
gettotalfollowdata:function(id){
    console.log("gettotalfollowdata")
    return db.Users.findOne({attributes:['totalfollow','totalfollowing'],where:{id:id}}).then(value=>{
        if(_.isEmpty(value)) return value
        else
        return value.toJSON()
    })
},
getalluserfollowing:function(id){
    return db.follow.findAll({where:{followId:id,status:1}}).then(value=>{
        if(_.isEmpty(value)) return value
        else 
        return value
    })
},
getalluserDetails:function(){
       return db.Users.findAll({attributes: ["Name", "id","private"]}).then(value=>{
        if(_.isEmpty(value)) return value
        else
        return value
    })
},
getalluserfollow:function(id){
    return db.follow.findAll({where:{followingId:id,status:1}}).then(value=>{
        if(_.isEmpty(value)) return value
        else 
        return value
    })
},
gettotalrequest:function(id){
    return db.follow.count({where:{follows:false,followingId:id}}).then(value=>{
        return value
    })
}
}

