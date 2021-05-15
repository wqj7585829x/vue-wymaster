// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"; //兼容IE模式
// import promise from "es6-promise"; //IE浏览器es6转es5
// promise.polyfill(); //兼容IE模式

import Vue from "vue";
import App from "./App";
import router from "./router"; //路由

import ElementUI from "element-ui"; //element-ui 框架
import "element-ui/lib/theme-chalk/index.css"; //element-ui 框架css
Vue.use(ElementUI);

import "normalize.css/normalize.css"; // A modern alternative to CSS resets 初始化css
import "@/styles/index.scss"; // global css 全局css
import store from "./store"; //状态管理vuex
import "@/permission"; // permission control 权限控制
// eslint-disable-next-line no-unused-vars
import has from "@/directive/btnPermission.js"; //按钮权限

import img2base64 from "@/utils/img2base64"; //引入转图片为base64
Vue.prototype.img2base64 = img2base64;

//定义全局过滤器,如{{金额|过滤器名}}-->金额为过滤器第一个参数;多个参数为{{金额|过滤器名(参数2,参数3,...)}}
import * as filters from "@/filters/index.js";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]); //插入过滤器名和对应方法
});
// import "jquery";

import math from "@/utils/mathjs"; //合计数字相加,精度问题
Vue.prototype.$math = math;

//svg配置引入icon组件
// import '@/icons' //svg-icon
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});

//物业端全局加载菜单与登录页自定义配置名称图标替换
import { CustConfigMenuApi } from "./api/User/User";
var arrmenuName = [];
CustConfigMenuApi().then((res) => {
  arrmenuName = JSON.stringify(res.data);
  localStorage.setItem("arrmenuName", arrmenuName);
});

import { addUseUser } from "./api/FeeManagement/Monthknots";
if (window.location.href.indexOf("billDetail") == -1) {
  //票据详情页面不进行在线用户登记
  clearInterval("func");
  // eslint-disable-next-line no-unused-vars
  var func = setInterval(function () {
    addUseUser().then(() => {});
  }, 60000); //添加在线用户，60s执行一次
}

import "./utils/directives.js"; //弹窗拖拽功能，在需要拖拽地方添加v-dialogDrag，例：<el-dialog v-dialogDrag :visible.sync="dialogVisible" v-dialogDrag></el-dialog>

// eslint-disable-next-line no-unused-vars
import preventReClick from "./directive/preventReClick.js"; //防止重复点击  在按钮上加上 v-preventReClick
