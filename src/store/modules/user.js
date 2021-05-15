import { getInfo } from "@/api/User/User";
import { constantRouterMap, runAsyncRouterMap } from "@/router";

const user = {
  state: {
    userName: "", //登录后的用户名
    currentPlot: "", //登录后的小区名字
    userPlot: [], //查询登录后小区列表
    previewButtons: [], //查询所有按钮权限
    groupUser: "", //登录后的是否集团用户
    quickPayParams: {}, //快捷登录h5信息
    oldrouters: constantRouterMap, //加载默认路由
    addRouters: [], //接口返回的新路由
  },
  actions: {
    GetInfo({ commit, state }, item) {
      return new Promise((resolve, reject) => {
        getInfo(item)
          .then((response) => {
            commit("userName", response.data.userName); //登录后的用户名
            commit("currentPlot", response.data.currentPlot); //当前小区
            commit("userPlot", response.data.userPlot); //下拉所有小区
            commit("previewButtons", response.data.previewButtons); //按钮权限
            commit("groupUser", response.data.groupUser); //登录后的是否集团用户
            commit("quickPayParams", response.data.quickPayParams); //快捷登录h5信息
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    removeUsername({ commit, state }) {
      commit("userName", "");
    },
    GenerateRoutes({ commit }, data) {
      //左边菜单传参第一步---从根目录下的 permission.js beforeEnter  1
      return new Promise((resolve) => {
        runAsyncRouterMap(data).then(function (rdata) {
          //左边菜单传参第二步  2
          commit("setRouters", rdata);
          resolve();
        });
      });
    },
  },
  mutations: {
    userName: (state, userName) => {
      state.userName = userName;
    },
    currentPlot: (state, currentPlot) => {
      state.currentPlot = currentPlot;
    },
    userPlot: (state, userPlot) => {
      state.userPlot = userPlot;
    },
    previewButtons: (state, previewButtons) => {
      state.previewButtons = previewButtons;
      // sessionStorage.setItem("buttenpremissions",[previewButtons])
    },
    groupUser: (state, groupUser) => {
      state.groupUser = groupUser;
    },
    quickPayParams: (state, quickPayParams) => {
      state.quickPayParams = quickPayParams;
    },
    setRouters: (state, routers) => {
      var menuNameArry = JSON.parse(localStorage.getItem("arrmenuName"));
      if (menuNameArry.length) {
        //判断如果数组不为空
        routers.forEach((item) => {
          //一级栏目
          menuNameArry.forEach((its) => {
            if (its.type === 1 && its.code === item.name && its.value != "") {
              item.name = its.value;
            }
          });
          //二级栏目
          if (item.children) {
            item.children.forEach((its) => {
              menuNameArry.forEach((im) => {
                if (im.type === 1 && im.code === its.name && im.value != "") {
                  its.name = im.value;
                }
              });
              //三级栏目
              if (its.children) {
                its.children.forEach((izs) => {
                  menuNameArry.forEach((im) => {
                    if (
                      im.type === 1 &&
                      im.code === izs.name &&
                      im.value != ""
                    ) {
                      izs.name = im.value;
                    }
                  });
                });
              }
            });
          }
        });
      }

      state.addRouters = routers;
      state.oldrouters = constantRouterMap.concat(routers); //拼接路由
    },
  },
};
export default user;
