module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser=require('../../models/AdminUser');
  const router = express.Router({
    mergeParams: true
  })
app.set('secret','12uiui2i1u2i1i21iu2')
  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
       const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {

    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  
app.use('/admin/api/rest/:resource',async(req,res,next)=>{
  const modelName=require('inflection').classify(req.params.resource);//小写复数转为大写单数
  req.Model=require(`../../models/${modelName}`)
  next()
},router)

app.post('/admin/api/login', async(req, res)=>{
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据 
    const {username,password}=req.body
    const user=await AdminUser.findOne({ username}).select('+password')//取出password
    if(!user){
      return res.status(422).send({
        message:"用户不存在"
      })
    }
    const pw=await AdminUser.findOne({ password})//取出password
      if(!pw){
    return res.status(422).send({
      message:"密码错误"
    })
  }
  res.send('ok')


 // 3.返回token
 const token = jwt.sign({ id: user._id },app.get('secret'))//secret是密钥
 res.send({ token })

  }
 
)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })





  


}