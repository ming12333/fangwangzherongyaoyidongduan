<template>
    <div class="about">
        <h1>文章列表</h1>
       <el-table :data="items">
     <el-table-column prop="_id" label="ID" width="220" ></el-table-column>
       <el-table-column prop="bian" label="编号" ></el-table-column>
         <el-table-column prop="categroies.name" label="上级分类" ></el-table-column>
        <el-table-column prop="title" label="标题" ></el-table-column>
       <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
        <el-button type="text" size="small" 
        @click="$router.push(`/articles/edit/${ scope.row._id }`)">
        编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
           </template>   
    </el-table-column>
      </el-table>
        </div>
</template>
<script>
export default {
      props:{
      id:{}
    },
    data(){
        return{
            items:[]
        }
    },
    methods:{
      async fetch(){
      const res=await this.$http.get(`rest/articles`)
      this.items=res.data
      },
        async remove(row){
      this.$confirm(`此操作将永久删除该文章, 是否继续?"${row.tilte}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { 
            const res=await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          }); 
          this.fetch();//重新获取数据
        })        
       
        }
    },

    created(){
    this.fetch();
    }
}
</script>
