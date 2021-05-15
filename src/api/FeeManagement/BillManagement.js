//票据管理
import request from "@/utils/Request";

//4.1.	票据分类查询
export function orgTreeBill() {
  return request({
    url: "/billManagement/orgTreeBill.do",
    method: "post",
    data: {},
  });
}

//4.2.	票据分类新增
export function addBillSort(obj) {
  return request({
    url: "/billManagement/addBillSort.do",
    method: "post",
    data: {
      PJFL_FLMC: obj.PJFL_FLMC,
      PJFL_PJLX: obj.PJFL_PJLX,
    },
  });
}

//4.3.	票据分类修改
export function updateBillSort(obj) {
  return request({
    url: "/billManagement/updateBillSort.do",
    method: "post",
    data: {
      PJFL_FLMC: obj.PJFL_FLMC,
      PJFL_PJLX: obj.PJFL_PJLX,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      PJFL_ZJ: obj.ZJ,
    },
  });
}

//4.4.	票据分类删除
export function deleteBillSort(obj) {
  return request({
    url: "/billManagement/deleteBillSort.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      PJFL_ZJ: obj.ZJ,
    },
  });
}

//4.5.	判断是否删除
export function countBillClassification(obj) {
  return request({
    url: "/billManagement/countBillClassification.do",
    method: "post",
    data: {
      PJFL_ZJ: obj.ZJ,
    },
  });
}

//5.1.	票据本查询
export function queryBillBook(obj) {
  return request({
    url: "/billManagement/queryBillBook.do",
    method: "post",
    data: {
      PJLY_ZT: obj.PJLY_ZT != undefined ? obj.PJLY_ZT : "",
      PJLY_PJFL: obj.PJLY_PJFL != undefined ? obj.PJLY_PJFL : "",
      PJLY_PJMC: obj.PJLY_PJMC != undefined ? obj.PJLY_PJMC : "",
      PJLYMX_PJH: obj.PJLYMX_PJH != undefined ? obj.PJLYMX_PJH : "",
    },
  });
}

//5.2.	票据本明细查询
export function queryBillBookMessage(obj) {
  return request({
    url: "/billManagement/queryBillBookMessage.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//5.3.	票据本总金额查询当前票据号
export function queryBillAmount(obj) {
  return request({
    url: "/billManagement/queryBillAmount.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
    },
  });
}

//5.4.	票据明细查询
export function queryBillMessage(obj) {
  return request({
    url: "/billManagement/queryBillMessage.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
    },
  });
}

//5.5.	票据作废
export function queryCancelBill(obj) {
  return request({
    url: "/billManagement/queryCancelBill.do",
    method: "post",
    data: {
      PJLYMX_PJLYWJ: obj.PJLYMX_PJLYWJ,
      ZFYY: obj.ZFYY,
      ZFSJ: obj.ZFSJ,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.6.	判断是否作废
export function judgmentInvalid(obj) {
  return request({
    url: "/billManagement/judgmentInvalid.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
    },
  });
}

//5.7.	票据重用
export function queryBillReuse(obj) {
  return request({
    url: "/billManagement/queryBillReuse.do",
    method: "post",
    data: {
      PJLYMX_PJLYWJ: obj.PJLYMX_PJLYWJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      PJLYMX_XH: obj.PJLYMX_XH,
    },
  });
}

//5.8.	票据打印
export function queryBillPrinting(obj) {
  return request({
    url: "/billManagement/queryBillPrinting.do",
    method: "post",
    data: {
      PJLYMX_PJLYWJ: obj.PJLYMX_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.9.	票据新增
export function addBillBook(obj) {
  return request({
    url: "/billManagement/addBillBook.do",
    method: "post",
    data: {
      PJLY_PJT: obj.PJLY_PJT,
      PJFL_FLMC: obj.PJFL_FLMC,
      PJFL_PJLX: obj.PJFL_PJLX,
      PJLY_PJMC: obj.PJLY_PJMC,
      PJLY_LSHCD: obj.PJLY_LSHCD,
      PJLY_QSH: obj.PJLY_QSH,
      PJLY_JZH: obj.PJLY_JZH,
      PJLY_ZDJE: obj.PJLY_ZDJE,
      PJLY_ZDHS: obj.PJLY_ZDHS,
      PJLY_BBMC: obj.PJLY_BBMC,
      YH_BH: obj.YH_BH,
      YH_MC: obj.YH_MC,
      ZDHQPJH: obj.ZDHQPJH,
      PJBCFSM: !obj.check ? 1 : obj.PJBCFSM,
    },
  });
}

//5.10.	票据修改
export function updateBillBook(obj) {
  return request({
    url: "/billManagement/updateBillBook.do",
    method: "post",
    data: {
      PJFL_FLMC: obj.PJFL_FLMC,
      PJFL_PJLX: obj.PJLY_PJLX,
      PJLY_PJMC: obj.PJLY_PJMC,
      PJLY_ZDJE: obj.PJLY_ZDJE,
      PJLY_ZDHS: obj.PJLY_ZDHS,
      PJLY_BBMC: obj.PJLY_BBMC,
      YH_BH: obj.YH_BH,
      YH_MC: obj.YH_MC,
      ZDHQPJH: obj.ZDHQPJH,
      PJLY_BZ: obj.PJLY_BZ,
      PJLY_ZJ: obj.PJLY_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.11.	票据删除
export function deleteBillBook(obj) {
  return request({
    url: "/billManagement/deleteBillBook.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.12.	判断是否能够票据本删除
export function judgmentDeleteBill(obj) {
  return request({
    url: "/billManagement/judgmentDeleteBill.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
    },
  });
}

//5.13.	员工查询
export function queryEmployeeTree() {
  return request({
    url: "/billManagement/queryEmployeeTree.do",
    method: "post",
    data: {},
  });
}

export function cancelinv(obj) {
  return request({
    url: "/api/cancelinv",
    method: "post",
    data: {
      infokind: obj.infokind,
      infotypecode: obj.infotypecode,
      infonumber: obj.infonumber,
    },
  });
}

//获取需要开电子票据列表的接口
export function submitInvoice(obj) {
  return request({
    url: "/invoiceMode/submitInvoice.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      type: 1,
    },
  });
}

export function getBillDistributeType() {
  return request({
    url: "/util/getBillDistributeType.do",
    method: "post",
    data: {},
  });
}
