import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store'
import Axios from 'axios'
import Carousel3d from 'vue-carousel-3d';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
Vue.use(Carousel3d);
Vue.config.productionTip = false
//Vue.use(VueRouter);


new Vue({ 
  render: h => h(App),
  store,
  router,
}).$mount('#app')
