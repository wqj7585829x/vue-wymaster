//票据
import request from "@/utils/Request";

//票据查询
export function orgTreeBill(obj) {
  return request({
    url: "/paymentRegistrationBill/queryBill.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ ? obj.FKGX_ZJ : null,
      PJLYMX_SKRQ1: obj.QSNY,
      PJLYMX_SKRQ2: obj.JZNY,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      invoiceType: obj.invoiceType,
      PJLYMX_PJFL: obj.PJLYMX_PJFL,
      PJLY_PJLX: obj.PJLY_PJLX,
      PJLYMX_PJZT: obj.PJLYMX_PJZT,
      ZFZT: obj.ZFZT,
      PJMX_SKFS: obj.SFKM_SKFS,
    },
  });
}

//票据本明细查询
export function orgTreeBillDetail(obj) {
  return request({
    url: "/paymentRegistrationBill/queryPaperSubsidiary.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//判断是否能够作废
export function IsMayCancellation(obj) {
  return request({
    url: "/paymentRegistrationBill/queryIsMayCancellation.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据作废
export function confirmCancellation(obj) {
  return request({
    url: "/paymentRegistrationBill/confirmCancellation.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      ZFR: obj.ZFR,
      ZFYY: obj.ZFYY,
      ZFSJ: obj.ZFSJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据重用
export function reuseOfTicketNumber(obj) {
  return request({
    url: "/paymentRegistrationBill/reuseOfTicketNumber.do",
    method: "post",
    data: {
      PJLYMX_PJLYWJ: obj.PJLY_ZJ,
      PJLYMX_XH: obj.PJLYMX_XH,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据打印
export function billPrint(PJLYMX_ZJ, token) {
  return request({
    url:
      "/paymentRegistrationBill/notePrint.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ,
    method: "get",
    data: {},
  });
}

//打印状态修改
export function updatePrintTimes(PJLYMX_ZJ) {
  return request({
    url: "/paymentRegistrationBill/updatePrintTimes.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
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

//是否套打  orgPrintType": true  false
export function getPrintType(obj) {
  return request({
    url: "/util/getPrintType.do",
    method: "post",
    data: {},
  });
}

//导出Excel表格数据
export function exportExcelApi(list) {
  return request({
    url: "/util/exportExcel.do",
    method: "post",
    responseType: "blob",
    data: {
      name: "票据明细",
      list: JSON.stringify(list),
    },
  });
}

//电子发票列表查询
export function queryELBillApi(obj) {
  return request({
    url: "/paymentRegistrationBill/queryELBill.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ ? obj.FKGX_ZJ : null,
      PJLYMX_SKRQ1: obj.QSNY,
      PJLYMX_SKRQ2: obj.JZNY,
    },
  });
}

//获取票据打印类型billPrintType
export function queryBillPrintTypeApi(PJLYMX_ZJ) {
  return request({
    url: "/util/queryBillPrintType.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}

//收款方式查询
export function querytPayWay() {
  return request({
    url: "/uncollectedFees/queryPaymentMethod.do",
    method: "post",
    data: {},
  });
}

//申请作废
export function invalidApplicationApi(PJLYMX_ZJ) {
  return request({
    url: "/paymentRegistrationBill/invalidApplication.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}
