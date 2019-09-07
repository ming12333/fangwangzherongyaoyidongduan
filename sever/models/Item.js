const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    icon: { type: String },
    name:{ type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Item' },//关联Category模型的id类型数据
})
module.exports=mongoose.model('Item',schema)