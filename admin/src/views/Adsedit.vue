<template>
    <div class="about">
        <h1>{{ id ? '编辑' : "新建" }}分类</h1>

        <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
        <el-form @submit.native.prevent="save">

            <el-form-item label="名称">
                <!--双向绑定至model.name-->
                <el-input v-model="model.title"></el-input>
            </el-form-item>

      
            <el-form-item label="编号">
                <!--双向绑定至model.name-->
                <el-input v-model="model.bian"></el-input>
            </el-form-item>
            
        <el-form-item label="广告">
             <el-button type=""  size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>
             添加广告</el-button>
        
               <el-row type="flex" style="flex-wrap:wrap">
              <!--style="flex-wrap:wrap"换行-->
                <!--行 flex布局-->
                 <el-col :md="24" v-for="(item,i) in model.items" :key="i">
                   <!--v-for="(item,i) in model.skills" :key="i" 取for循环的索引值。key取到i即索引值-->
                   <!--列 :md="24"一行展示1个框-->
                    <el-form-item label="跳转链接（url）">
                          <el-input v-model="item.name">
                          </el-input>
                    </el-form-item>

                    <el-form-item label="图片" style="margin 3px">
                         <el-upload
                       class="avatar-uploader"
                 :action="$http.defaults.baseURL+'/upload'"
                 :show-file-list="false"
                 :on-success="res=>$set(item,'image',res.url)"><!--上传图片-->
                <img v-if="item.icon" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                   </el-upload>    
                    </el-form-item>

        
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.items.splice(i,1)">
                      <!--在i的位置删除 删除1个-->
                      删除</el-button>
                  </el-form-item>

                 </el-col>
              </el-row>
    </el-form-item>
            <el-form-item>
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
                items:[],
            }, 
        }
    },
    methods:{
        //请求接口来提交数据
   async save(){
       let res;
  if(this.id){
      res=await this.$http.put(`rest/ads/${this.id}`,this.model)//提交到categories接口，传递model参数 新建
       //更新编辑的内容
  }else{
      res=await this.$http.post(`rest/ads`,this.model)//提交到categories接口，传递model参数 新建
 }
  this.$router.push('/ads/list')//跳转至./categories/list页面
   this.$message({
      type:'success',
      message:"保存成功"
  })
},
async fetch(){//获取内容
    const res=await this.$http.get(`rest/ads/${this.id}`)//找出内容
    this.model=Object.assign({},this.model,res.data)
},

    },
created(){
    this.id && this.fetch()
}
}
</script>
