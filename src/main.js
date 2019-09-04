// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import { pcaa } from 'area-data-vue'
import 'area-linkage-vue/dist/index.css'
import VueAreaLinkage from 'area-linkage-vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false
Vue.prototype.$pcaa = pcaa
Vue.use(VueAreaLinkage)
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
