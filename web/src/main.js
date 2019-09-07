import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//引用css样式

//导入mui
import  './lib/mui/css/mui.min.css';
//import './lib/mui/css/icons-extra.css';
Vue.use(VueAwesomeSwiper)//使用组件

//使用组件
import Card from './components/Card.vue'
Vue.component('m-card',Card)
//使用ListCard
import ListCard from './components/ListCard.vue'
Vue.component('m-listcard',ListCard)
//导入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
