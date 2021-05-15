// 收费月结

import request from "@/utils/Request";

// 获取树
export function findReviewTree() {
  return request({
    url: "/basic/basic_findReviewTree.doAdmin",
    method: "post",
    data: {},
  });
}

//根据小区 查询当前账期和下一个账期
export function findOwnYears(obj) {
  return request({
    url: "/basic/basic_findOwnYears.doAdmin",
    method: "post",
    data: {
      plotId: obj,
    },
  });
}
//收费月结
export function Monthly(obj) {
  return request({
    url: "/basic/basic_Monthly.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
    },
  });
}

//生成费用费用删除
export function deleteCalculationCost(obj) {
  return request({
    url: "/receipt/CalculationCostDelete.doAdmin",
    method: "post",
    data: {
      plotid: obj.plotid,
      roomid: obj.roomid,
      startdate: obj.startdate,
      enddate: obj.enddate,
      costId: obj.costId,
    },
  });
}

// 查询所属年月
export function findAccountPeriod(obj) {
  return request({
    url: "/receipt/receipt_findAccountPeriod.doAdmin",
    method: "post",
    data: {
      plotId: obj,
    },
  });
}
