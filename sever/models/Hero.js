const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    avatar: { type: String },
    name:{ type: String },
    title:{ type: String },
    banner: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//关联分类

    scores:{//评分
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type: String},
        name:{type: String},
        description:{type: String},
        tips:{type: String}
    }],//技能
   items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}], 
   items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}], //装备2
   usageTips:{type:String},
   battleTips:{type:String },
   teamTips:{ type:String },
   partners:[{
 heros:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    description:{ type:String }            
}]
})
module.exports=mongoose.model('Hero',schema,'heros')