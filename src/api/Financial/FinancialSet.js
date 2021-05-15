import request from "@/utils/Request";
//财务设置列表
export function getfinacialList(obj) {
  return request({
    url: "/financial/financial_queryFinancialByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: 10,
    },
  });
}
//财务修改
export function updateFnd(obj) {
  return request({
    url: "/financial/financial_insertAndModify.doAdmin",
    method: "post",
    data: {
      finId: obj.finId != undefined ? obj.finId : null,
      cliqId: obj.cliqId,
      tenId: obj.tenid,
      plotId: obj.plotid,
      ownYears: obj.ownYears,
      status: obj.status,
    },
  });
}
//获取收款方式列表
export function getPaymentList(obj) {
  return request({
    url: "/financial/financial_queryReceiptWayByPage.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
      startRownumber: obj.startRownumber,
      pageSize: 10,
    },
  });
}

//收款方式新增
export function addPayment(obj) {
  return request({
    url: "/financial/financial_receiptAdd.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      receiptType: obj.receiptType,
      receiptWay: obj.receiptWay,
      remark: obj.remark,
    },
  });
}

//收款方式修改
export function updatePayment(obj) {
  return request({
    url: "/financial/financial_receiptModify.doAdmin",
    method: "post",
    data: {
      recId: obj.recId ? obj.recId : null,
      receiptType: obj.receiptType,
      receiptWay: obj.receiptWay,
      remark: obj.remark,
    },
  });
}
//设置默认收款方式
export function setDefaultPayment(recId) {
  return request({
    url: "/financial/financial_setDefault.doAdmin",
    method: "post",
    data: {
      recId: recId,
    },
  });
}

//删除收款方式
export function deletePayment(recId) {
  return request({
    url: "/financial/financial_receiptDelete.doAdmin",
    method: "post",
    data: {
      recId: recId,
    },
  });
}
