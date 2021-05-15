import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
// import { Message } from "element-ui";
import { getToken } from "@/utils/Auth"; // 验权

NProgress.configure({ showSpinner: false }); //隐藏页面进度条loading图标

const whiteList = [
  "/Login",
  "/Receipt",
  "/elReceipt",
  "/Ticket",
  "/billDetail",
]; // 不重定向白名单

//路由权限判断拦截
router.beforeEach((to, _from, next) => {
  //路由重定向开始 router.beforeEach
  NProgress.start(); //进度条开始
  if (getToken()) {
    console.log(to.path);
    if (to.path === "/Login") {
      next({ path: "/" }); //有token直接进入首页
    } else {
      if (store.getters.userName == "") {
        //判断内存是否有用户名，如果为空---重新加载
        var plotItem = "";
        if (sessionStorage.getItem("plotItem")) {
          plotItem = JSON.parse(sessionStorage.getItem("plotItem"));
        } //判断是否选中了下拉小区
        store
          .dispatch("GetInfo", { ...plotItem })
          .then((response) => {
            sessionStorage.setItem(
              "buttenpremissions",
              JSON.stringify(response.data.previewButtons)
            ); //获取按钮权限sessionStorage--记住！！

            if (response.data.previewTree) {
              const previewTree = response.data.previewTree; //左边菜单树
              store
                .dispatch("GenerateRoutes", { previewTree })
                .then(() => {
                  // 生成可访问的路由表----//左边菜单传参第一步(点任何页面都会触发这个事情) 0
                  if (store.getters.addRouters) {
                    router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                  }
                  // 设置replace:true，这样导航就不会留下历史记录
                  next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        next();
      } else {
        //有用户名就直接走下一步不执行调用用户信息
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //当前与白名单一样匹配成功
      next();
    } else {
      next("/Login");
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach((route) => {
  //路由重定向结束 router.afterEach()
  // console.log(route);
  NProgress.done(); // 进度条结束
});
