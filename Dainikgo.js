const express = require('express')
app=express()
let session=require('express-session')
let  appstart=require("./app")
let path=require("path")
app.use(session({  secret: 'DAINIKARTHANIA007))',
}));
app.use("/upload",express.static(path.join(__dirname, 'upload')));

appstart.register.register()
appstart.home.home()
appstart.followPage.follwpage()
appstart.setting.private()
app.listen(8000, () => {
    console.log(`Server started on port`);
});


