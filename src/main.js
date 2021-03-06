// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import './plugins/element.js'
import './index.css'
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper' 


import axios from 'axios'
Vue.config.productionTip = false

//全局注册axios
Vue.prototype.$axios = axios; 

Vue.use(less)
Vue.use(VueCropper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
