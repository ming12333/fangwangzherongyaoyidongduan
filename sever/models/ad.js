const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    title:{ type: String },
    body:{ type: String },
   items:[
       {
           image:{ type:String },
           url:{ type:String }
       }
   ]//广告位数组
})
module.exports=mongoose.model('Ad',schema)