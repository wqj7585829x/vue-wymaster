// 收款中心 票据明细

import request from "@/utils/Request";

//收款中心票据查询分页
export function QueryTicketBillList(obj) {
  return request({
    url: "/receipt/receipt_queryBillByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      roomId: obj.roomId == "" ? null : obj.roomId,
      cusStatus: obj.cusStatus,
      cusId: obj.cusId == "" ? null : obj.cusId,
      expId: obj.expId == "" ? null : obj.expId,
      openBegin: obj.openBegin == "" ? null : obj.openBegin,
      openEnd: obj.openEnd == "" ? null : obj.openEnd,
      type: obj.type == 0 ? null : obj.type,
      status: obj.status == 0 ? null : obj.status,
    },
  });
}
//作废
export function BillDetailObsolete(obj) {
  return request({
    url: "receipt/receipt_billInvalid.doAdmin",
    method: "post",
    data: {
      delId: obj.delId,
      recId: obj.recId,
      invalidDay: obj.invalidDay,
      invalidReason: obj.invalidReason,
    },
  });
}
//票据本重用
export function BillDetailReuse(obj) {
  return request({
    url: "bill/bill_Reuse.doAdmin",
    method: "post",
    data: {
      recId: obj.recId,
      billNum: obj.billNum,
      delId: obj.delId,
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

//开票明细
export function QueryOpenBillDeailList(delId) {
  return request({
    url: "bill/bill_OpenDetailByPage.doAdmin",
    method: "post",
    data: {
      delId: delId,
    },
  });
}
