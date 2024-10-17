import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//import VueSocketIO from 'vue-socket.io';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'; ///nakon instaliranja bootstrap-vue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSocketIO from 'vue-socket.io';
import vueJoiValidation ,{Joi} from 'vue-joi-validation';
const options= {

}
Vue.use(vueJoiValidation,options);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


Vue.use(new VueSocketIO({
  debug: false,
  connection: 'ws://127.0.0.1:8000',
  vuex: {
      store,
      actionPrefix: 'socket_',
  }
}));


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
