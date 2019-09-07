<template>
    <div class="about">
        <h1>{{ id ? '编辑' : "新建" }}文章</h1>

        <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
        <el-form @submit.native.prevent="save">

            <el-form-item label="上级分类">
                <!--双向绑定至model.name-->
                <el-select v-model="model.categories" multiple>
                <el-option  v-for="item in categories" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题">
                <!--双向绑定至model.name-->
                <el-input v-model="model.title"></el-input>
            </el-form-item>

            <el-form-item label="详情">
                <!--双向绑定至model.name-->
                <!--useCustomImageHandler自定义模块组件 imageAdded="handleImageAdded"使用handleImageAdded函数-->
                <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit"> 保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
      props:{
      id:{}
    },
    components:{//添加子组件使用vue2-editor
     VueEditor 
    },
    data(){
        return{
            model:{},
            categories:[],
        }
    },
    methods:{
     async  handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file); 
     var res=await this.$http.post("upload",formData);
     Editor.insertEmbed(cursorLocation, "image", res.data.url);
     resetUploader();
    },//上传图片代码
        //请求接口来提交数据
   async save(){
       let res;
  if(this.id){
      res=await this.$http.put(`rest/articles/${this.id}`,this.model)//提交到articles接口，传递model参数 新建
       //更新编辑的内容
  }else{
      res=await this.$http.post(`rest/articles`,this.model)//提交到articles接口，传递model参数 新建
 }
  this.$router.push('/articles/list')//跳转至./categories/list页面
   this.$message({
      type:'success',
      message:"保存成功"
  })
},
async fetch(){//获取内容
    const res=await this.$http.get(`rest/articles/${this.id}`)//找出内容
    this.model=res.data
},
async fetchCategroies(){//获取分类的选项
  const res=await this.$http.get(`rest/categories`)
    this.categories=res.data
},
    },
created(){
    this.fetchCategroies(),//执行函数
    this.id && this.fetch()
}
}


</script>
