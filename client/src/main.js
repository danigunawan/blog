// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

let host = 'http://localhost:3000'
const hostname = document.location.hostname
if (hostname !== 'localhost') {
  host = 'http://blog-api.geekosta.com'
}
Vue.prototype.$http = axios.create({
  baseURL: host
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
