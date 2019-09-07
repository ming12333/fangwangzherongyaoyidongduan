const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    bian: { type: String },
    name:{ type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Category' },//关联Category模型的id类型数据
})
schema.virtual('children',{
    localField:"_id",
    foreignField:"parent",
    justOne:false,
    ref:'Category'
})
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',//外键
    justOne: false,
    ref: 'Article'//关联的数据
  })//子分类
 
module.exports=mongoose.model('Category',schema)