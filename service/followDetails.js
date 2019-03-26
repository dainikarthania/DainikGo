let db=require("../model")
const Sequelize=require('sequelize')
const Op = Sequelize.Op;
const _=require('lodash')

module.exports={
    unfollow:function(userid,userfid){
        db.follow.destroy({where:{[Op.or]:[{status:1,followId:userid,followingId:userfid},{status:1,followId:userfid,followingId:userid}]}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("invalid Data")
            else
            return value.toJSON()          
}).catch(err=> {return err})
    },


    cancelfollow:function(userid,userfid){
        db.follow.destroy({where:{status:0,followId:userid,followingId:userfid}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("invalid Data")
            else
               return value.toJSON()
          }).catch(err=> {return err})
    },

    acceptfollow:function(userid,userfid){
        
    db.follow.update({status:1},{where:{followId:userfid,followingId:userid}}).then(value1=>{
  if(_.isEmpty(value1)) throw new Error("invalid Data")
  else
  return db.totalfollow.findOne({where:{uid:userid}}).then(value=>{
    if(_.isEmpty(value)){
        db.totalfollow.create({totalfollow:1,uid:userid}).then(value=>{
          if(_.isEmpty(value)){
            return "Invalid"
          }
          else
          db.totalfollow.findOne({where:{uid:userfid}}).then(uuserfid=>{
            if(_.isEmpty(uuserfid)){
              db.totalfollow.create({totalfollow:1,uid:userfid}).then(fidres=>{
                if(_.isEmpty(fidres)) return "InVaild";
                else
                return fidres.toJSON()
              })
              
            }
            else{
              db.totalfollow.update({totalfollow:uuserfid.totalfollow+1},{where:{uid:userfid}})
            }
          })

        })
    }
    else{
db.totalfollow.update({totalfollow:value.totalfollow+1},{where:{uid:userid}}).then(value=>{
  if(_.isEmpty(value)){
    return "Update Failed"
  }
  else
     db.totalfollow.findOne({where:{uid:userfid}}).then(uuserfid=>{
            if(_.isEmpty(uuserfid)){
              db.totalfollow.create({totalfollow:1,uid:userfid}).then(fidres=>{
                if(_.isEmpty(fidres)) return "InVaild";
                else
                return fidres
              })
              
            }
            else{
              db.totalfollow.update({totalfollow:uuserfid.totalfollow+1},{where:{uid:userfid}})
            }
          })
    
  })
}
}).catch(err=> res.send(err))
})
    },
    setprivate(userid){
        db.Users.update({private:1},{where:{id:userid}}).then(value=>{
            if(_.isEmpty(value)) return "Invaild";
            else
            return value
        })
    }
}