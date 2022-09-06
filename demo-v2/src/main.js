import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "font-awesome/css/font-awesome.min.css";
// import axios from 'axios'; 引入axios
import service from './axios';
import router from './router';
import * as echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI);

// Vue.prototype.axios = axios;//挂载到原型，可以在全局使用
Vue.prototype.service = service;//挂载到原型，可以在全局使用
Vue.prototype.$echarts = echarts;

//路由守卫
router.beforeEach((to ,from , next) =>{
  if(!localStorage.getItem("username")){
    if(to.path !== "/login"){
      next("/login")
    }else{
      next()
    }
  } next()
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
