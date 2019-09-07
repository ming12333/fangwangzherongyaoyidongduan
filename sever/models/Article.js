const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    title:{ type: String },
    body:{ type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Category' }],//关联分类

},{
    timestamps:true//时间戳，自动显示时间
})
module.exports=mongoose.model('Article',schema)