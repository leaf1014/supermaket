import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/toast";

import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.use(toast)

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
