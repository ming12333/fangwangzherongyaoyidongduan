import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'//导入Login.vue
import Main from './views/Main.vue'//导入Main.vue
import Categoryedit from './views/Categoryedit.vue'
import Categorylist from './views/Categorylist.vue'
import Itemedit from './views/Itemedit.vue'
import Itemlist from './views/Itemlist.vue'
import Heroedit from './views/Heroedit.vue'
import Herolist from './views/Herolist.vue'
import Articleedit from './views/Articleedit.vue'
import Articlelist from './views/Articlelist.vue'
import Adsedit from './views/Adsedit.vue'
import Adslist from './views/Adslist.vue'
import AdminUseredit from './views/AdminUseredit.vue'
import AdminUserlist from './views/AdminUserlist.vue'
Vue.use(Router)

const router =new Router({
  routes: [
    {path: '/login',name:"login",component:Login },
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/categories/create',component:Categoryedit},//子路由
        {path:'/categories/list',component:Categorylist},//子路由
        {path:'/categories/edit/:id',component:Categoryedit,props:true},//子路由
           //把id注入url中，在Categoryedit页面中可以直接使用id;

           {path:'/items/create',component:Itemedit},//子路由
           {path:'/items/list',component:Itemlist},//子路由
           {path:'/items/edit/:id',component:Itemedit,props:true},//子路由    
      
           {path:'/heros/create',component:Heroedit},//子路由
           {path:'/heros/list',component:Herolist},//子路由
           {path:'/heros/edit/:id',component:Heroedit,props:true},//子路由  
        
           {path:'/articles/create',component:Articleedit},//子路由
           {path:'/articles/list',component:Articlelist},//子路由
           {path:'/articles/edit/:id',component:Articleedit,props:true},//子路由  
          
           {path:'/ads/create',component:Adsedit},//子路由
           {path:'/ads/list',component:Adslist},//子路由
           {path:'/ads/edit/:id',component:Adsedit,props:true},//子路由  
           
           {path:'/admin_users/create',component:AdminUseredit},//子路由
           {path:'/admin_users/list',component:AdminUserlist},//子路由
           {path:'/admin_users/edit/:id',component:AdminUseredit,props:true},//子路由
          ]
    },
    
  ]
})
//router.beforeEach((to,from,next) => {
  ///if(!to.meta.isPublic){
  //  router.push('/login') 
 ///}
 //next()
//})
export default router