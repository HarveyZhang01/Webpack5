import Vue from "vue";
import router from "./routes/router";
import store from './store/index'
import App from "./App.vue";

//取消 Vue 所有的日志与警告
Vue.config.silent = true;
const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

window.myApp = app;
