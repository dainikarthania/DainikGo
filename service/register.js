const nodemailer = require("nodemailer");
let db=require("../model")
const _=require('lodash')

module.exports={
    sendmail:function(useremail,token){
          // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'dainik.arthania3@gmail.com', // generated ethereal user
      pass: 'Dainik@@000' // generated ethereal password
    }
  });
  let mailOptions = {
    from: '"Dainik 👻" <dainik.arthania3@gmail.com>', // sender address
    to: `${useremail}`, // list of receivers
    subject: "Verify Account DainikGO", // Subject line
    html: `<b>verify Accout please click below Link:</b>${`http://localhost:8000/verifyemail/${token}`}` // html body
  };
  let ino=transporter.sendMail(mailOptions)
  console.log(ino)
    },


    register:function(user){
            db.Users.create(user).then((result) => {
                if(_.isEmpty(result)) throw new Error("Failed To register")
                else
                    result.toJSON()
            }).catch((err) => {
                return err
            });
    },
    checkemail:function(email){
        return db.Users.findOne({where:{email:email}}).then(value=>{
            if(_.isEmpty(value)) return value
            else
            return value.toJSON()
        })
    },
    vaildatemail:function(token){
        return db.Users.update({status:1},{where:{vaildtoken:token},returning: true}).then(result=>{
            result=result[1][0]
            return result.toJSON()
        })
    }

}

