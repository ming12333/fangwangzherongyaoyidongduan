const express=require("express")
const bodyParser = require('body-parser')
const app=express()
// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json())//使用exprss的json
app.use(require('cors')())//使用跨域模块
app.use('/uploads', express.static(__dirname + '/uploads'))//写死的静态路径
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});