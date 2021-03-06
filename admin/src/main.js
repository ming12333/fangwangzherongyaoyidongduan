import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from './http'

Vue.prototype.$http=http//在任意界面到可以使用axios了
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
