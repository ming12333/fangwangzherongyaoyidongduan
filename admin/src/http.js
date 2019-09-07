import axios from 'axios'
import Vue from 'vue'
const http=axios.create({
    baseURL:'http://localhost:3000/admin/api'//指向的接口地址，后台接口
})
http.interceptors.response.use(res=>{//通用错误处理
  return res
},err=>{
    if(err.response.data.message){//有报错是执行
      Vue.prototype.$message({
        type:"error",
        message:err.response.data.message
    })//弹出错误   
    }
   
return Promise.reject(err)

})//给http加拦截器
export default http//导出此变量