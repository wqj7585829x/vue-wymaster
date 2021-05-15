import request from "@/utils/Request";
//获取树
export function getTree() {
  return request({
    url: "/basic/basic_billResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

//获取使用人
export function getUsePersonTree(plotid) {
  return request({
    url: "/bill/bill_usePleTree.doAdmin",
    method: "post",
    data: {
      plotId: plotid,
    },
  });
}

//新增票据
export function addBillForm(obj) {
  return request({
    url: "/bill/bill_receiptInvoiceAdd.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      type: obj.type,
      name: obj.name,
      status: obj.status,
      useStatus: obj.useStatus,
      prefix: obj.prefix,
      minNum: obj.minNum,
      maxNum: obj.maxNum,
      serialLength: obj.serialLength,
      remark: obj.remark,
      temId: obj.temId,
      uid: obj.uid,
      range: obj.range,
    },
  });
}

//修改票据
export function updateBillForm(obj) {
  return request({
    url: "/bill/bill_receiptInvoiceModify.doAdmin",
    method: "post",
    data: {
      recId: obj.recId,
      type: obj.type,
      name: obj.name,
      status: obj.status,
      useStatus: obj.useStatus,
      remark: obj.remark,
      temId: obj.temId,
      uid: obj.uid,
      range: obj.range,
    },
  });
}

//删除票据
export function deleteBillForm(recId) {
  return request({
    url: "/bill/bill_receiptInvoiceDel.doAdmin",
    method: "post",
    data: {
      recId: recId,
    },
  });
}

//查询票据列表
export function QueryBillList(obj) {
  return request({
    url: "/bill/bill_queryByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      plotId: obj.plotId,
      type: obj.type == 0 ? null : obj.type,
      name: obj.name,
      useStatus: obj.useStatus,
      status: obj.status,
      billNum: obj.billNum,
    },
  });
}

//查询票据本列表
export function QueryBillDetailList(obj) {
  return request({
    url: "bill/bill_queryDetailByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      recId: obj.recId,
    },
  });
}

//票据本作废
export function BillDetailObsolete(obj) {
  return request({
    url: "bill/bill_invalid.doAdmin",
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

//新增票据打印模板
export function addPrintModel(obj) {
  return request({
    url: "/bill/bill_insertTemplate.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      name: obj.name,
      status: obj.status,
    },
  });
}

//修改票据打印模板
export function updatePrintModel(obj) {
  return request({
    url: "/bill/bill_templateModify.doAdmin",
    method: "post",
    data: {
      temId: obj.temId,
      name: obj.name,
      status: obj.status,
    },
  });
}

//获取票据打印模板列表
export function getPrintModelList(obj) {
  return request({
    url: "/bill/bill_queryTemplateByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      plotId: obj.plotId,
      name: obj.name ? obj.name : null,
      status: obj.status,
    },
  });
}

//模板导入
export function ReportFile_MainFile(data, editValue) {
  return request({
    url: "/bill/bill_TemplateImport.doAdmin",
    method: "post",
    data: data,
    upload_type: true,
  });
}
