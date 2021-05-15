import Vue from "vue";

/**权限指令**/
const has = Vue.directive("has", {
  inserted: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },
});
//权限检查方法
Vue.prototype.$_has = function (value) {
  //  debugger
  let isExist = false;
  let buttonpermsStr = sessionStorage.getItem("buttenpremissions");
  if (buttonpermsStr == undefined || buttonpermsStr == null) {
    return false;
  }
  let buttonperms = JSON.parse(buttonpermsStr);
  // console.log(buttonperms);

  for (let i = 0; i < buttonperms.length; i++) {
    if (buttonperms[i].indexOf(value) > -1) {
      isExist = true;
      break;
    }
  }
  return isExist;
};
export { has };
