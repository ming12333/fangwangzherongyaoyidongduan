<template>
    <div class="about">
        <h1>{{ id ? '编辑' : "新建" }}管理员</h1>

        <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
        <el-form @submit.native.prevent="save">


            <el-form-item label="用户名">
                <!--双向绑定至model.name-->
                <el-input v-model="model.username"></el-input>
            </el-form-item>

            <el-form-item>
                <el-form-item label="密码">
                <!--双向绑定至model.name-->
                <el-input type="password"  v-model="model.password"></el-input>
            <!--type="password"密码框-->
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
      res=await this.$http.put(`rest/admin_users/${this.id}`,this.model)//提交到categories接口，传递model参数 新建
       //更新编辑的内容
  }else{
      res=await this.$http.post(`rest/admin_users`,this.model)//提交到categories接口，传递model参数 新建
 }
  this.$router.push('/admin_users/list')//跳转至./categories/list页面
   this.$message({
      type:'success',
      message:"保存成功"
  })
},
async fetch(){//获取内容
    const res=await this.$http.get(`rest/admin_users/${this.id}`)//找出内容
    this.model=res.data
},

    },
created(){
   //执行函数
    this.id && this.fetch()
}
}


</script>
