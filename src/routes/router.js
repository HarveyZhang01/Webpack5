// 路由信息
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/index",
    name: "index",
    component: () => import("@/App.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/compoments/Hello.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
