import axios from "axios";
import { Message, Loading } from "element-ui";
import { setToken, getToken, removeToken } from "@/utils/Auth";
import router from "@/router";
import qs from "qs";
import config from "@/utils/config";

let loading; //定义loading变量
let textTips = ""; //loading提示语
let backgroundtips = ""; //loading遮罩层颜色

//弹窗loading
function startLoading() {
  //使用Element loading-start 方法
  switch (
    router.currentRoute.fullPath //根据不同页面loading展示不同样式
  ) {
    case "/ReportManagement/QueryReport": //查询报表
      textTips = "数据加载中,请稍等...";
      backgroundtips = "rgba(0,0,0,0)";
      break;
    default:
      //其他
      textTips = "加载中……";
      backgroundtips = "rgba(0,0,0,0)";
      break;
  }
  loading = Loading.service({
    target: document.querySelector(".loadingtext"),
    lock: true,
    fullscreen: false,
    text: textTips,
    background: backgroundtips,
  });
}
//关闭loading
function endLoading() {
  //使用Element loading-close 方法
  loading.close();
}

//开始loading计数
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

//结束loading计数
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

//接口请求判断拦截
// 创建axios实例---axios请求接口封装拦截
// 实例对象
const service = axios.create({
  baseURL: config.BASE_API, // api的base_url
  // timeout: 30000, // 请求超时时间
  headers: {
    "Content-Type":
      "application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data",
  },
});
service.defaults.withCredentials = true; //跨域请求设置 axios代码中配置withCredentials为true以便可以携带cookie

// request请求拦截器
service.interceptors.request.use(
  (config) => {
    // console.log("==========")
    // console.log(config);
    if (getToken()) {
      config.headers["X_Token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.method === 'post'? config.data = qs.stringify({...config.data}): config.params = {...config.params}
    /* 判断method是否为post，为post则对参数进行序列化，不为post择不进行序列化 */
    //responseType: 'blob'  导出
    //upload_type: true    上传
    if (config.data && !config.upload_type) {
      config.data = qs.stringify(config.data); //转为formdata数据格式
    }
    if (
      router.currentRoute.fullPath.indexOf("/ReportManagement/CustomReport") ==
        -1 &&
      router.currentRoute.fullPath.indexOf("/HomePage") == -1 &&
      router.currentRoute.fullPath.indexOf("/Home") == -1 &&
      config.url.indexOf("/cost/addUseUser.do") == -1 &&
      router.currentRoute.fullPath.indexOf("/billDetail") == -1
    ) {
      //路由--请求接口判断loading  /HomePage路由  /cost/addUseUser.do定时查询在线用户信息 /billDetail不加载loading,其他加载loading
      showFullScreenLoading(); //全屏加载loading
    }
    return config;
  },
  (error) => {
    // Do something with request error
    //console.log(error) // for debug
    return Promise.reject(error);
  }
);

// respone返回拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * returnStatus为0是有异常，未传入参数；为1 表示成功；为2 用户未登录
     */
    //debugger
    const res = response.data;
    if (res.x_token) {
      //x_token如有值，取最新
      setToken(res.x_token); //每次请求接口都重设x_token
    }

    if (res.returnStatus == "SUCCESS") {
      //请求成功SUCCESS
      if (res.message) {
        Message({
          dangerouslyUseHTMLString: true, //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理
          message: res.message,
          type: "success",
          duration: 2 * 1000,
        });
      }
    }

    if (res.returnStatus == "FAIL") {
      //请求失败FAIL
      if (res.message) {
        let message = "";
        if (res.message == "系统异常：SQL Error！") {
          if (
            router.currentRoute.fullPath === "/HomePage/SKTJB" ||
            router.currentRoute.fullPath === "/HomePage/JRSRZE" ||
            router.currentRoute.fullPath === "/ReportManagement/QueryReport" ||
            router.currentRoute.fullPath === "/ReportManagement/CustomReport"
          ) {
            message = "有其他报表正在查询数据，请稍后重试!";
          } else {
            message = res.message;
          }
        } else {
          message = res.message;
        }
        Message({
          dangerouslyUseHTMLString: true, //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理
          message: message,
          type: "warning",
          duration: 2 * 1000,
        });
      }
    }

    if (res.returnStatus == "LOGOUT") {
      //未登录FAIL
      if (res.message) {
        Message({
          dangerouslyUseHTMLString: true, //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理
          message: res.message,
          type: "warning",
          duration: 2 * 1000,
        });
      }
      removeToken(); //清空x_token
      router.push("/Login"); //用户未登陆，无访问权限！返回登录页
    }
    if (res.data != "addUseUser")
      //addUseUser.do不执行隐藏loading
      tryHideFullScreenLoading(); //全屏隐藏加载loading
    return res;
  },
  (error) => {
    // 请求超时时间
    Message({
      dangerouslyUseHTMLString: true, //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理
      message: "系统服务器错误",
      type: "error",
      duration: 2 * 1000,
    });
    return Promise.reject(error);
  }
);
export default service;
