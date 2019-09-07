<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
     <!--保存时给一个save方法 -native.prevent 阻止默认提交-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <!--双向绑定至model.name-->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
          <!-- action上传的请求地址
               $http.defaults.baseUrl 默认参数
               :action动态请求-->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
        
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    afterUpload(res){
      this.$set(this.model, 'icon', res.url)//显示赋值vue专属
      // this.model.icon = res.url
    },
      //请求接口来提交数据
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      //更新编辑的内容
     } else {
        res = await this.$http.post("rest/items", this.model);//提交到接口，传递model参数 新建
      }
      this.$router.push("/items/list");//跳转至./categories/list页面
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {//获取内容
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>