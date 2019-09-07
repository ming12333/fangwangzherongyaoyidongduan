<template>
    <div class="about">
        <h1>{{ id ? '编辑' : "新建" }}分类</h1>

        <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
        <el-form @submit.native.prevent="save">

            <el-form-item label="上级分类">
                <!--双向绑定至model.name-->
                <el-select v-model="model.parent">
                <el-option  v-for="item in parents" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="名称">
                <!--双向绑定至model.name-->
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-form-item label="编号">
                <!--双向绑定至model.name-->
                <el-input v-model="model.bian"></el-input>
            </el-form-item>
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
            model:{},
            parents:[],
        }
    },
    methods:{
       
        //请求接口来提交数据
   async save(){
       let res;
  if(this.id){
      res=await this.$http.put(`rest/categories/${this.id}`,this.model)//提交到categories接口，传递model参数 新建
       //更新编辑的内容
  }else{
      res=await this.$http.post(`rest/categories`,this.model)//提交到categories接口，传递model参数 新建
 }
  this.$router.push('/categories/list')//跳转至./categories/list页面
   this.$message({
      type:'success',
      message:"保存成功"
  })
},
async fetch(){//获取内容
    const res=await this.$http.get(`rest/categories/${this.id}`)//找出内容
    this.model=res.data
},
async fetchParents(){//获取父级的选项
  const res=await this.$http.get(`rest/categories`)
    this.parents=res.data
},
    },
created(){
    this.fetchParents(),//执行函数
    this.id && this.fetch()
}
}


</script>
