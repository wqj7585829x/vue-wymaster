import { DB } from "../../public/static/js/dev"; //导入开发环境变量
export default {
  BASE_API:
    process.env.NODE_ENV === "development"
      ? DB.BASE_API
      : window.common.BASE_API,
  SERVICE_IP:
    process.env.NODE_ENV === "development"
      ? DB.SERVICE_IP
      : window.common.SERVICE_IP,
  REPORT_IP:
    process.env.NODE_ENV === "development"
      ? DB.REPORT_IP
      : window.common.REPORT_IP,
  // q5Url: process.env.NODE_ENV === 'development' ? DB.q5Url : window.common.q5Url
};
