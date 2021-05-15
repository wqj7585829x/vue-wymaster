// 开票弹窗公共js
import request from "@/utils/Request";

// 开票查询
export function FindOpenTicket(obj) {
  return request({
    url: "/receipt/receipt_findOpenTicket.doAdmin",
    method: "post",
    data: {
      flag: obj.flag, //标志
      vouId: obj.vouId, //主键id
      cusId: obj.cusId, //客户id
      plotId: obj.plotId, //小区id
    },
  });
}
// 开票查询this.TicketlPop,this.multipleSelection,this.formList,this.tableDataComponent
export function ReceiptTicketOpen(obj1, obj2, obj3, obj4) {
  //收款凭证开票
  var idsArray = [];
  for (var i = 0; i < obj2.length; i++) {
    idsArray.push(obj2[i].detaId);
  }
  var ids = idsArray.join();
  return request({
    url: "/receipt/receipt_TicketOpen.doAdmin",
    method: "post",
    data: {
      flag: obj1.flag, //标志
      plotId: obj1.plotId,
      partid: obj1.partid,
      buildid: obj1.buildid,
      roomid: obj1.roomid,
      cusId: obj1.cusId,
      vouId: obj2[0].vouId,
      ids: ids,
      recId: obj3.recId,
      delId: obj3.delId,
      type: obj3.type,
      name: obj3.name,
      billNum: obj3.billNum,
      resName: obj4[0].resource,
      paymentPle: obj1.paymentPle,
      entryAccount: obj3.entryAccount,
      totalMethod: obj3.totalMethod,
      invoiceType: obj3.invoiceType,
      remark: obj3.remark,
      openObj: obj3.cusName,
      TaxpayerNumber: obj3.invoiceType == 2 ? obj3.TaxpayerNumber : null,
      addTel: obj3.invoiceType == 2 ? obj3.addTel : null,
      bank: obj3.invoiceType == 2 ? obj3.bank : null,
      openDate: obj3.openDate,
    },
  });
}
// 开票查询this.TicketlPop,this.multipleSelection,this.formList,this.tableDataComponent
export function PrepaidTicketOpen(obj1, obj2, obj3, obj4) {
  //预交充值开票
  var idsArray = [];
  for (var i = 0; i < obj2.length; i++) {
    idsArray.push(obj2[i].detaId);
  }
  var ids = idsArray.join();
  return request({
    url: "/prepaid/prepaid_TicketOpen.doAdmin",
    method: "post",
    data: {
      flag: obj1.flag, //标志
      plotId: obj1.plotId,
      partid: obj1.partid,
      buildid: obj1.buildid,
      roomid: obj1.roomid,
      cusId: obj1.cusId,
      vouId: obj2[0].vouId,
      ids: ids,
      recId: obj3.recId,
      delId: obj3.delId,
      type: obj3.type,
      name: obj3.name,
      billNum: obj3.billNum,
      resName: obj4[0].resource,
      paymentPle: obj1.paymentPle,
      entryAccount: obj3.entryAccount,
      totalMethod: obj3.totalMethod,
      invoiceType: obj3.invoiceType,
      remark: obj3.remark,
      openObj: obj3.cusName,
      TaxpayerNumber: obj3.invoiceType == 2 ? obj3.TaxpayerNumber : null,
      addTel: obj3.invoiceType == 2 ? obj3.addTel : null,
      bank: obj3.invoiceType == 2 ? obj3.bank : null,
      openDate: obj3.openDate,
    },
  });
}
// 开票查询this.TicketlPop,this.multipleSelection,this.formList,this.tableDataComponent
export function DisposableChargeTicketOpen(obj1, obj2, obj3, obj4) {
  //一次性费用开票
  var idsArray = [];
  for (var i = 0; i < obj2.length; i++) {
    idsArray.push(obj2[i].detaId);
  }
  var ids = idsArray.join();
  return request({
    url: "/disposable/disposable_TicketOpen.doAdmin",
    method: "post",
    data: {
      flag: obj1.flag, //标志
      plotId: obj1.plotId,
      partid: obj1.partid,
      buildid: obj1.buildid,
      roomid: obj1.roomid,
      cusId: obj1.cusId,
      vouId: obj2[0].vouId,
      ids: ids,
      recId: obj3.recId,
      delId: obj3.delId,
      type: obj3.type,
      name: obj3.name,
      billNum: obj3.billNum,
      resName: obj4[0].resource,
      paymentPle: obj1.paymentPle,
      entryAccount: obj3.entryAccount,
      totalMethod: obj3.totalMethod,
      invoiceType: obj3.invoiceType,
      remark: obj3.remark,
      openObj: obj3.cusName,
      TaxpayerNumber: obj3.invoiceType == 2 ? obj3.TaxpayerNumber : null,
      addTel: obj3.invoiceType == 2 ? obj3.addTel : null,
      bank: obj3.invoiceType == 2 ? obj3.bank : null,
      openDate: obj3.openDate,
    },
  });
}

// 开票查询--新开页面
export function FindOpenTicketQuery(obj) {
  return request({
    url: "/receipt/receipt_findInvoice.doAdmin",
    method: "post",
    data: {
      delId: obj,
    },
  });
}
// 开票打印
export function receipt_updateInvoice(delId, obj, RetCode, InfoKind) {
  return request({
    url: "/receipt/receipt_updateInvoice.doAdmin",
    method: "post",
    data: {
      delId: delId,
      returnNum: obj.billNum,
      returnCode: RetCode,
      returnType: InfoKind === 2 ? 1 : 2, //1：增值税普通发票，2：增值税专用发票
      isprinted: RetCode === 5011 ? 1 : 2,
    },
  });
}

//收据查询打印
export function BillQueryTemplate(obj) {
  return request({
    url: "/bill/bill_QueryTemplate.doAdmin",
    method: "post",
    data: {
      delId: Number(obj),
    },
  });
}
