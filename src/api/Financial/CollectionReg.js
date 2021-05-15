// 收款登记
import request from "@/utils/Request";

// 获取树
export function getTree(obj) {
  return request({
    url: "/basic/FindCusResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

// 收费项目查询条件
export function ChargingProjects(obj) {
  return request({
    url: "/financial/financial_findItem.doAdmin",
    method: "post",
    data: {
      type: 2, //1：常规类，2：走表类
      plotId: obj, //小区
    },
  });
}
// 按客户查询条件取得所有客户
export function GuestList(obj) {
  return request({
    url: "/receipt/receipt_cusList.doAdmin",
    method: "post",
    data: {
      content: null, //客户搜索条件
    },
  });
}

// 点击资源房间查询资源信息
export function FindCusAndResource(obj) {
  return request({
    url: "/receipt/receipt_findCusAndResource.doAdmin",
    method: "post",
    data: {
      roomId: obj, //客户搜索条件
    },
  });
}

// 点击资源房间查询收费项目
export function FindExpByCus(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: null,
      roomId: obj, //客户搜索条件
    },
  });
}
// 点击按客户查询收费项目
export function GuestRowClickData(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: obj,
    },
  });
}
