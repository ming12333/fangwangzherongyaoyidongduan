<template>
    <div class="about">
        <h1>{{ id ? '编辑' : "新建" }}英雄</h1>

        <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
        <el-form @submit.native.prevent="save">
           <el-tabs type="border-card" value="skills">
             <el-tab-pane label="基本信息" name="basic">
                 <el-form-item label="名称">
                <!--双向绑定至model.name-->
                <el-input v-model="model.name"></el-input>
            </el-form-item>
<el-form-item label="称号">
                <!--双向绑定至model.name-->
                <el-input v-model="model.title"></el-input>
            </el-form-item>
<el-form-item label="类型">       
                <!--双向绑定至model.name multiple实现了多选分类-->
                <el-select v-model="model.categories" multiple placeholder="请选择" >
                <el-option  v-for="item of categories" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
                </el-select>
            </el-form-item>
      <el-form-item label="难度">
                <!--双向绑定至model.name rate打分 :max="9"最高9分 show-score显示分数-->
                <el-rate :max="9" show-score v-model="model.scores.difficult"></el-rate>
            </el-form-item>
      <el-form-item label="技能">
                <!--双向绑定至model.name rate打分 :max="9"最高9分 show-score显示分数-->
                <el-rate :max="9" show-score v-model="model.scores.skills"></el-rate>
            </el-form-item>
       <el-form-item label="攻击">
                <!--双向绑定至model.name rate打分 :max="9"最高9分 show-score显示分数-->
                <el-rate :max="9" show-score v-model="model.scores.attack"></el-rate>
            </el-form-item>    
              <el-form-item label="生存">
                <!--双向绑定至model.name rate打分 :max="9"最高9分 show-score显示分数-->
                <el-rate :max="9" show-score v-model="model.scores.survive"></el-rate>
            </el-form-item> 

  <el-form-item label="顺风出装" >       
                <!--双向绑定至model.name multiple实现了多选分类-->
                <el-select v-model="model.Items1" multiple placeholder="请选择">
                <el-option  v-for="item of Items" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
              </el-select>
 </el-form-item>
<el-form-item label="逆风出装" >       
                <!--双向绑定至model.name multiple实现了多选分类-->
                <el-select v-model="model.Items2" multiple placeholder="请选择">
                <el-option  v-for="item of Items" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
</el-select>
 </el-form-item>

<el-form-item label="使用技巧">
  <el-input type="textarea" v-model="model.usageTips"></el-input>
</el-form-item>
<el-form-item label="对抗技巧">
  <el-input type="textarea" v-model="model.battleTips"></el-input>
</el-form-item>
<el-form-item label="团战思路">
  <el-input type="textarea" v-model="model.teamTips"></el-input>
</el-form-item>
            <el-form-item>
                <el-form-item label="头像">
                <!--双向绑定至model.name-->
               <!-- action上传的请求地址
               $http.defaults.baseUrl 默认参数
               :action动态请求-->
             <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="afterUpload"
  
  >
  <img v-if="model.avatar" :src="model.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
                </el-form-item> 
            </el-form-item>
             </el-tab-pane>

             <el-tab-pane label="技能" name="skills">
               <!--el-button @click="model.skills.push({})"空数组，起添加对象的作用 点一下添加一次-->
             <el-button type=""  size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
              <el-row type="flex" style="flex-wrap:wrap">
              <!--style="flex-wrap:wrap"换行-->
                <!--行 flex布局-->
                 <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                   <!--v-for="(item,i) in model.skills" :key="i" 取for循环的索引值。key取到i即索引值-->
                   <!--列 :md="12"一行展示2个框-->
                    <el-form-item label="名称">
                          <el-input v-model="item.name">
                          </el-input>
                    </el-form-item>
 <el-form-item label="图标">
                         <el-upload
                       class="avatar-uploader"
                 :action="$http.defaults.baseURL+'/upload'"
                 :show-file-list="false"
                 :on-success="res=>$set(item,'icon',res.url)"><!--上传图片-->
  <img v-if="item.icon" :src="item.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>  
                      
                    </el-form-item>
                     <el-form-item label="描述">
                          <el-input v-model="item.description" type="textarea">
                          </el-input>
                    </el-form-item>

              

                     <el-form-item label="小提示">
                          <el-input v-model="item.tips" type="textarea">
                          </el-input>
                    </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.skills.splice(i,1)">
                      <!--在i的位置删除 删除1个-->
                      删除</el-button>
                  </el-form-item>
                 </el-col>
              </el-row>
             </el-tab-pane>
           </el-tabs>
            
            <el-form-item class="margin-top:1rm;">
                <el-button type="primary" native-type="submit"> 保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
      props:{
      id:{}
    },
    data(){
        return{
            model:{
              name:'', 
              categories:[],
              avatar:'',
              scores:{//解决scores有时找不到的问题
                difficult:0,
                skills:0,
                attack:0,
                survive:0
              },
             
            },
        
        }
    },
  methods:{ 
  async fetchCategories(){//获取分类
  const res=await this.$http.get(`rest/categories`)
    this.categories=res.data
},  
  async fetchItems(){//获取物品装备
  const res=await this.$http.get(`rest/items`)
    this.Items=res.data
},  
  afterUpload(res){
  
     this.model.avatar=res.url;
     },
        //请求接口来提交数据
   async save(){
       let res;
  if(this.id){
      res=await this.$http.put(`rest/heros/${this.id}`,this.model)//提交到categories接口，传递model参数 新建
       //更新编辑的内容
  }else{
      res=await this.$http.post(`rest/heros`,this.model)//提交到categories接口，传递model参数 新建
 }
  this.$router.push('/heros/list')//跳转至./categories/list页面
   this.$message({
      type:'success',
      message:"保存成功"
  })
},
async fetch(){//获取内容
    const res=await this.$http.get(`rest/heros/${this.id}`)//找出内容
    this.model=Object.assign({},this.model,res.data)//方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
},


    },
created(){
 this.fetchCategories(),//执行函数//执行函数
 this.fetchItems(),
    this.id && this.fetch()
}
}


</script>
<style>
 
</style>