const getters = {
  visitedviews: (state) => state.tagsview.visitedviews,
  cachedViews: (state) => state.tagsview.cachedViews,
  userName: (state) => state.user.userName, //登录后的用户名字
  currentPlot: (state) => state.user.currentPlot, //登录后的当前小区名字
  previewButtons: (state) => state.user.previewButtons, //登录后所有按钮权限
  groupUser: (state) => state.user.groupUser, //登录后的是否集团用户
  quickPayParams: (state) => state.user.quickPayParams, //登录后快捷登录h5信息
  userPlot: (state) => state.user.userPlot, //登录后的小区列表
  oldrouters: (state) => state.user.oldrouters, //旧路由
  addRouters: (state) => state.user.addRouters, //新路由
};

export default getters;
