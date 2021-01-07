import Vue from "vue";
import router from "./routes/router";
import index from "./views/Index.vue";

//取消 Vue 所有的日志与警告
Vue.config.silent = true;
const app = new Vue({
  el: "#app",
  router,
  render: h => h(index)
});

window.myApp = app;
