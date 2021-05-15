// 户帐管理

import request from "@/utils/Request";

// 获取树
export function getTree() {
  return request({
    url: "/basic/FindCusResourceTree.doAdmin",
    method: "post",
    data: {},
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

// 根据房间查询客户资源
export function findCusAndResource(obj) {
  return request({
    url: "/receipt/receipt_findCusAndResource.doAdmin",
    method: "post",
    data: {
      roomId: obj.roomid,
    },
  });
}

// 公维金户帐列表
export function selectByPage(obj, cusName) {
  var data = {};
  data.startRownumber = obj.startRownumber;
  data.pageSize = obj.pageSize;
  data.belongPlot = obj.belongPlot;
  data.partid = obj.partid;
  data.buildid = obj.buildid;
  data.roomid = obj.roomid;
  if (cusName == "") {
    data.status = obj.status;
  }
  data.cusId = obj.cusId ? obj.cusId : null;
  return request({
    url: "/pubRepFund/PubRepFundAccount_selectByPage.doAdmin",
    method: "post",
    data: data,
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

// 建账
export function add(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_add.doAdmin",
    method: "post",
    data: {
      accountName: obj.accountName,
      remark: obj.remark ? obj.remark : null,
      TenantRelationID: obj.TenantRelationID,
    },
  });
}

// 修改
export function modify(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_modify.doAdmin",
    method: "post",
    data: {
      accountName: obj.accountName,
      remark: obj.remark ? obj.remark : null,
      fundAccountID: obj.fundAccountID,
    },
  });
}

// 批量建账 获取右边表格 客户
export function batchAccount(obj) {
  return request({
    url: "/account/account_batchAccount.doAdmin",
    method: "post",
    data: {
      orgId: obj.orgId,
      agencyType: obj.agencyType,
    },
  });
}

// 批量建账 建账
export function batchAdd(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_batchAdd.doAdmin",
    method: "post",
    data: {
      TenantRelationID: obj.TenantRelationID,
    },
  });
}

// 充值
export function Recharge(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_Recharge.doAdmin",
    method: "post",
    data: {
      money: obj.money,
      remark: obj.remark ? obj.remark : null,
      fundAccountID: obj.fundAccountID,
    },
  });
}

// 批量充值
export function batchRecharge(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_batchRecharge.doAdmin",
    method: "post",
    data: {
      money: obj.money,
      remark: obj.remark ? obj.remark : null,
      fundAccountID: obj.fundAccountID,
    },
  });
}

// 批量充值 右边表格 数据
export function findAccountTable(obj) {
  return request({
    url: "/pubRepFund/PubRepFundAccount_selectByPage.doAdmin",
    method: "post",
    data: {
      belongPlot: obj.belongPlot,
      partid: obj.partid,
      buildid: obj.buildid,
      roomid: obj.roomid,
    },
  });
}

// 充值明细
export function PubRepFundRecharge_Select(obj) {
  return request({
    url: "/pubRepFund/PubRepFundRecharge_Select.doAdmin",
    method: "post",
    data: {
      fundAccountID: obj.fundAccountID,
    },
  });
}

// 使用记录
export function PubRepFundShare_Select(obj) {
  return request({
    url: "/pubRepFund/PubRepFundShare_Select.doAdmin",
    method: "post",
    data: {
      fundAccountID: obj.fundAccountID,
    },
  });
}
