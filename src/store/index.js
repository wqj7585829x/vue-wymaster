import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import getters from "./getters";
import tagsview from "./modules/tagsview"; //多页签切换vuex
import user from "./modules/user"; //用户信息vuex

const store = new Vuex.Store({
  modules: {
    tagsview,
    user,
  },
  getters,
});

export default store;
