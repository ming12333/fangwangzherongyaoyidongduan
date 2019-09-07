module.exports=app=>{
    const mongoose=require("mongoose")
    mongoose.connect("mongodb://localhost/test",{
     useNewUrlParser: true
    }) 

require('require-all')(__dirname+'/../models')
//require(__dirname+"/../models/ad.js")
//require(__dirname+"/../models/AdminUser.js")
//require(__dirname+"/../models/Article.js")
//require(__dirname+"/../models/Category.js")
//require(__dirname+"/../models/Hero.js")
//require(__dirname+"/../models/Item.js")
}//导出的是函数，接收的参数是app