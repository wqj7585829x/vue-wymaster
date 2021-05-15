//预交方案设置
import request from "@/utils/Request";

//查询预交方案列表
export function queryAcceptingThePlan() {
  return request({
    url: "/ys/acceptingThePlan/queryAcceptingThePlan.do",
    method: "post",
    data: {},
  });
}

//查询冲抵明细
export function queryAcceptingThePlanDetail(data) {
  return request({
    url: "/ys/acceptingThePlan/queryAcceptingThePlanDetail.do",
    method: "post",
    data: data,
  });
}
