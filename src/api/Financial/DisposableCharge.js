// 一次性费用生成

import request from "@/utils/Request";

// 获取收费项目
export function findExpByCus(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: obj.cusId,
      roomId: obj.roomId ? obj.roomId : null,
    },
  });
}

// 2.1.15.5	根据小区查询费用项目
export function findExpByPlot(obj) {
  return request({
    url: "/disposable/disposable_findExpByPlot.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
      expenseType: 3,
    },
  });
}

// 交款
export function Payment(obj) {
  return request({
    url: "/disposable/disposable_Payment.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      partid: obj.partid,
      buildid: obj.buildid,
      roomId: obj.roomId,
      cusId: obj.cusId,
      expId: obj.expId,
      receiptWay: obj.receiptWay,
      receiptAmount: obj.receiptAmount,
      taxRate: obj.taxRate,
      payDate: obj.payDate,
      entryAccount: obj.entryAccount,
      payRemark: obj.payRemark ? obj.payRemark : null,
    },
  });
}

// 查询分页
export function queryByPage(obj) {
  return request({
    url: "/disposable/disposable_queryByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      roomId: obj.roomId ? obj.roomId : null,
      cusStatus: obj.cusStatus,
      cusId: obj.cusId ? obj.cusId : null,
      expId: obj.expId ? obj.expId : null,
      status: obj.status ? obj.status : null,
    },
  });
}

//根据收费项目查询税率
export function TaxRateByExp(obj) {
  return request({
    url: "/receipt/receipt_findTaxRateByExp.doAdmin",
    method: "post",
    data: {
      expId: obj.expId,
    },
  });
}

// 查询收款方式下拉列表
export function FindReceiptWay(obj) {
  return request({
    url: "/receipt/receipt_findReceiptWay.doAdmin",
    method: "post",
    data: {
      plotId: obj,
      type: 1, //1收取
    },
  });
}

// 退款
export function Refund(obj) {
  return request({
    url: "/disposable/disposable_Refund.doAdmin",
    method: "post",
    data: {
      disId: obj.disId,
      refundWay: obj.refundWay,
      refundAmount: obj.refundAmount,
      refundDate: obj.refundDate,
      refundRemark: obj.refundRemark ? obj.refundRemark : null,
    },
  });
}

// 作废
export function invalid(obj) {
  return request({
    url: "/disposable/disposable_invalid.doAdmin",
    method: "post",
    data: {
      disId: obj.disId,
    },
  });
}

// 退款明细
export function RefundDetail(obj) {
  return request({
    url: "/disposable/disposable_RefundDetail.doAdmin",
    method: "post",
    data: {
      disId: obj.disId,
    },
  });
}
