let db=require("../model")
module.exports={
    create:function(orm,condition){
        return db[orm].create(condition).then(value=>{
            if(_.isEmpty(value)) throw new Error("invalid Data")
            else
            return value.toJSON();
          }).catch(err=> {return err})
    }
}