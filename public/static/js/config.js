//生成环境全局配置
window.common={
  BASE_API:location.hostname.indexOf("xmtfwy")>-1?location.protocol +"//" + location.hostname+":8097/property":location.protocol +"//" + location.hostname+":888/property",
  SERVICE_IP:location.hostname.indexOf("xmtfwy")>-1?location.protocol +"//" + location.hostname+":8097":location.protocol +"//" + location.hostname+":888",
  REPORT_IP:location.hostname.indexOf("xmtfwy")>-1?location.protocol +"//" + location.hostname+":8097/property":location.protocol +"//" + location.hostname+":888/property",
  // q5Url:"http://island.imwork.net/q5/pay",//快捷登录下载二维码
}