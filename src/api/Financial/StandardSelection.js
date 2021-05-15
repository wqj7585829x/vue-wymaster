// 标准选用

import request from "@/utils/Request";

// 获取树
export function getTree() {
  return request({
    url: "/basic/FindCusResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

// 查询收费项目
export function findItem(obj) {
  return request({
    url: "/financial/financial_findItem.doAdmin",
    method: "post",
    data: {
      type: obj.type,
      plotId: obj.plotId,
    },
  });
}

// 查询 表
export function queryStanSelByPage(obj) {
  return request({
    url: "/financial/financial_queryStanSelByPage.doAdmin",
    method: "post",
    data: {
      type: obj.type,
      expId: obj.expId ? obj.expId : null,
      roomId: obj.roomId ? obj.roomId : null,
      buildId: obj.buildId,
    },
  });
}

// 根据 收费项目 查询 标准名称
export function findStandardByExp(obj) {
  return request({
    url: "/financial/financial_findStandardByExp.doAdmin",
    method: "post",
    data: {
      expId: obj,
    },
  });
}

// 根据房间 查询 客户
export function findCusByRoomId(obj) {
  return request({
    url: "/financial/financial_findCusByRoomId.doAdmin",
    method: "post",
    data: {
      roomId: obj,
    },
  });
}

// 新增 走表类
export function addWalkingTable(obj) {
  return request({
    url: "/financial/financial_addWalkingTable.doAdmin",
    method: "post",
    data: {
      costId: obj.costId,
      expId: obj.expId,
      tenanId: obj.tenanId,
      type: obj.type,
      plotId: obj.plotId,
      tabName: obj.tabName,
      roomid: obj.roomid,
    },
  });
}

// 修改 走表类
export function modifyWalkingTable(obj) {
  return request({
    url: "/financial/financial_modifyWalkingTable.doAdmin",
    method: "post",
    data: {
      costId: obj.costId,
      expId: obj.expId,
      tabName: obj.tabName,
      conId: obj.conId,
      roomid: obj.roomid,
    },
  });
}

// 删除
export function delStanSele(obj) {
  return request({
    url: "/financial/financial_delStanSele.doAdmin",
    method: "post",
    data: {
      ids: obj.ids,
    },
  });
}

// 批量
export function standSeleBatch(obj) {
  return request({
    url: "/financial/financial_standSeleBatch.doAdmin",
    method: "post",
    data: obj,
  });
}
