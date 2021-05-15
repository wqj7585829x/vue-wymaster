const tagsview = {
  state: {
    visitedviews: [], // 存放所有浏览过的且不重复的路由数据
    cachedViews: [], //暂存放数据
  },
  mutations: {
    // 左边点击菜单
    ADD_VISITED_VIEWS: (state, view) => {
      // 打开新页签--添加路由数据的方法
      if (state.visitedviews.some((v) => v.path === view.path)) {
        return;
      } else {
        state.cachedViews.push(view.meta.title);
        // state.cachedViews.push(view.name)
        state.visitedviews.push({
          title: view.meta.title,
          name: view.name,
          path: view.path,
        });
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      // 关闭页签--删除路由数据的方法
      for (const [i, v] of state.visitedviews.entries()) {
        //entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
        if (v.path === view.path) {
          state.visitedviews.splice(i, 1);
          break;
        }
      }

      for (const i of state.cachedViews) {
        if (i === view.title) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OtherVISITED_VIEWS: (state, view) => {
      // 关闭其他页签
      const curItem = state.visitedviews.filter((item) => {
        return item.path === view.fullPath;
      });
      state.visitedviews = curItem; //只保留当前页面

      const cacheItem = state.cachedViews.filter((item) => {
        return item == state.visitedviews[0].title;
      });
      state.cachedViews = cacheItem; //只保留当前页面,其他页面删除缓存
    },
    DEL_AllVISITED_VIEWS: (state, view) => {
      // 关闭全部页签
      state.visitedviews = []; //清空
      state.cachedViews = []; //清空
    },
  },
  actions: {
    // 调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
    addVisitedViews({ commit }, view) {
      // 通过解构赋值得到commit方法
      commit("ADD_VISITED_VIEWS", view); // 去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews({ commit, state }, view) {
      // 删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
      commit("DEL_VISITED_VIEWS", view);
      return new Promise((resolve) => {
        // resolve方法：未来成功后回掉的方法
        commit("DEL_VISITED_VIEWS", view);
        resolve([...state.visitedviews]);
      });
    },
    delOtherVisitedViews({ commit, state }, view) {
      //关闭其他
      commit("DEL_OtherVISITED_VIEWS", view);
      return new Promise((resolve) => {
        // resolve方法：未来成功后回掉的方法
        commit("DEL_OtherVISITED_VIEWS", view);
        resolve([...state.visitedviews]);
      });
    },
    delAllVisitedViews({ commit, state }, view) {
      //关闭全部
      commit("DEL_AllVISITED_VIEWS", view);
      return new Promise((resolve) => {
        // resolve方法：未来成功后回掉的方法
        commit("DEL_AllVISITED_VIEWS", view);
        resolve([...state.visitedviews]);
      });
    },
  },
};
export default tagsview;
