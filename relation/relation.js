let db=require("../model")


module.exports ={
    follow_relation:function(){
        db.Users.sync()
        db.Users.hasMany(db.follow,{foreignKey:'followId'})
        db.follow.belongsTo(db.Users,{foreignKey:'followId'})

        db.Users.hasMany(db.follow,{foreignKey:'followingId'})
        db.follow.belongsTo(db.Users,{foreignKey:'followingId'})
        db.follow.sync()
    }
     
}