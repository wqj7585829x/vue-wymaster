// 费用生成

import request from "@/utils/Request";

// 获取树
export function getTree() {
  return request({
    url: "/basic/FindCusResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

//费用项目树
export function QuerySingleTree(plotid) {
  return request({
    url: "/basic/FindTree_byPlotId.doAdmin",
    method: "post",
    data: {
      plotId: plotid,
    },
  });
}
//生成费用
export function addCalculationCost(obj) {
  return request({
    url: "/receipt/CalculationCost.doAdmin",
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
