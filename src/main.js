import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "./store";
import Toast from "./components/common/toast";

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;

// 添加事件总对象
Vue.prototype.$bus=new Vue();

Vue.use(Toast);

// 解决移动端300ms的延迟
FastClick.attach(document.body);

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/sakamoto.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
