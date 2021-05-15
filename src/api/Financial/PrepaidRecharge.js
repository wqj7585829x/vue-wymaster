// 预交充值管理
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

// 点击客户信息下拉修改查询收费项目下拉数据
export function GuestexpitemData(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: obj == "" ? null : obj,
    },
  });
}
// 查询未收清款项表格分页
export function prepaidQueryByPage(obj) {
  return request({
    url: "/prepaid/prepaid_queryByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      cusType: obj.status,
      cusId: obj.cusId == "" ? null : obj.cusId,
      expId: obj.expId == "" ? null : obj.expId,
      roomid: obj.roomid == "" ? null : obj.roomid,
      prepaidBegin: obj.prepaidBegin == "" ? null : obj.prepaidBegin,
      prepaidEnd: obj.prepaidEnd == "" ? null : obj.prepaidEnd,
      refundBegin: obj.refundBegin == "" ? null : obj.refundBegin,
      refundEnd: obj.refundEnd == "" ? null : obj.refundEnd,
      type: obj.type == "" ? null : obj.type,
    },
  });
}

// 根据小区和类型查询收款方式
export function findReceiptWay(obj) {
  return request({
    url: "/receipt/receipt_findReceiptWay.doAdmin",
    method: "post",
    data: {
      plotId: obj,
      type: 4, //1:收取,2:划款,3:减免,4:预交冲抵,5:暂欠
    },
  });
}

// 根据费用项目查询税率
export function findTaxRateByExp(obj) {
  return request({
    url: "/receipt/receipt_findTaxRateByExp.doAdmin",
    method: "post",
    data: {
      expId: obj, //费用项目id
    },
  });
}
// 2.1.14.2预交充值
export function prepaidRecharge(obj, obj2) {
  return request({
    url: "/prepaid/prepaid_Recharge.doAdmin",
    method: "post",
    data: {
      preId: obj.preId,
      cliqId: obj.cliqId,
      tenid: obj.tenid,
      plotid: obj.plotid,
      partid: obj.partid,
      buildid: obj.buildid,
      roomid: obj.roomid,
      cusId: obj.cusId,
      type: obj2.type,
      receiptWay: obj2.receiptWay,
      expId: obj2.expId,
      prepaidDate: obj2.prepaidDate,
      entryDate: obj2.entryDate,
      rceivableTax: obj2.rceivableTax,
      taxRate: obj2.taxRate,
      remark: obj2.remark,
    },
  });
}
// 充值查明细
export function findRechargeDetail(obj) {
  return request({
    url: "/prepaid/prepaid_findRechargeDetail.doAdmin",
    method: "post",
    data: {
      preId: obj, //预交管理主键id
    },
  });
}
// 预交退款
export function prepaidRefund(obj, obj2) {
  return request({
    url: "/prepaid/prepaid_Refund.doAdmin",
    method: "post",
    data: {
      preId: obj.preId,
      plotid: obj.plotid,
      cusId: obj.cusId,
      type: obj2.type,
      receiptWay: obj2.receiptWay,
      expId: obj2.expId,
      refundDate: obj2.refundDate,
      rceivableTax: obj2.rceivableTax,
      taxRate: obj2.taxRate,
      remark: obj2.remark,
    },
  });
}
//预交充值管理作废
export function prepaidrechargeInvalid(obj) {
  return request({
    url: "/prepaid/prepaid_rechargeInvalid.doAdmin",
    method: "post",
    data: {
      id: obj.id,
      invalidDay: obj.invalidDay,
      invalidReason: obj.invalidReason,
    },
  });
}
