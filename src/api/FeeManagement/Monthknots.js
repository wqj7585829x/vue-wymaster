//收费月结
import request from "@/utils/Request";

//3.5.	收费月结
export function monthlycharge() {
  return request({
    url: "/cost/monthlycharge.do",
    method: "post",
    data: {},
  });
}

//3.6.	当前日期
export function queryCurrentMonth() {
  return request({
    url: "/cost/queryCurrentMonth.do",
    method: "post",
    data: {},
  });
}

//3.7.	是否有走表读数录入未生成费用
export function countNotEntered() {
  return request({
    url: "/cost/countNotEntered.do",
    method: "post",
    data: {},
  });
}

// 更新在线用户信息
export function addUseUser() {
  return request({
    url: "/cost/addUseUser.do",
    method: "post",
    data: {},
  });
}
