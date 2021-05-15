import request from "@/utils/Request";

//查询项目名称
export function queryPlotsWithAuthorityApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/queryPlotsWithAuthority.do",
    method: "post",
    data: {
      type: obj.type ? obj.type : "",
    },
  });
}

//查询签约资源下拉框
export function queryZLRoomApi(obj) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      type: obj.type ? obj.type : "",
    },
  });
}

//查询票据列表
export function queryBillApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/queryBill.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_ZJ: obj.FJDA_ZJ,
      PJLYMX_SKRQ1: obj.PJLYMX_SKRQ1,
      PJLYMX_SKRQ2: obj.PJLYMX_SKRQ2,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      PJLYMX_JKR: obj.PJLYMX_JKR,
      PJLYMX_PJZT: obj.PJLYMX_PJZT,
      PJLY_PJLX: obj.PJLY_PJLX,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//查询票据明细列表
export function queryPaperSubsidiaryApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/queryPaperSubsidiary.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      dbName: obj.dbName,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//判断是否能作废
export function queryIsMayCancellationApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/queryIsMayCancellation.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      dbName: obj.dbName,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据作废
export function billCancellationApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/billCancellation.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      ZFR: obj.YGDA_YGXM,
      ZFYY: obj.ZFYY,
      ZFSJ: obj.ZFSJ,
      dbName: obj.dbName,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据号重用
export function reuseOfTicketNumberApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/reuseOfTicketNumber.do",
    method: "post",
    data: {
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      PJLYMX_XH: obj.PJLYMX_XH,
      PJLYMX_PJLYWJ: obj.PJLY_ZJ,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      dbName: obj.dbName,
      type: obj.typeValue ? obj.typeValue : "",
    },
  });
}

//票据打印（电子收据，纸质发票）
export function billPrintDataApi(PJLYMX_ZJ, dbName, token) {
  return request({
    url:
      "/ZL/ChargeManagementBill/billPrintData.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ +
      "&dbName=" +
      dbName,
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
      dbName: dbName,
    },
  });
}

//纸质收据打印
export function paperReceiptPrintApi(PJLYMX_ZJ, dbName, token) {
  return request({
    url:
      "/ZL/ChargeManagementBill/paperReceiptPrint.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ +
      "&dbName=" +
      dbName,
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
      dbName: dbName,
    },
  });
}

//纸质收据套打
export function paperReceiptCoverUpPrintApi(PJLYMX_ZJ, dbName, token) {
  return request({
    url:
      "/ZL/ChargeManagementBill/paperReceiptCoverUpPrint.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ +
      "&dbName=" +
      dbName,
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
      dbName: dbName,
    },
  });
}

//获取需要开电子票据列表的接口
export function queryInvoiceResultsApi(PJLYMX_ZJ) {
  return request({
    url: "ZL/NuoNuoElectronicInvoice/queryInvoiceResults.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}

//导出Excel表格数据
export function exportExcelApi(list) {
  return request({
    url: "/util/exportExcel.do",
    method: "post",
    responseType: "blob",
    data: {
      name: "房屋租赁票据明细",
      list: JSON.stringify(list),
    },
  });
}

//查询电子票据列表
export function queryEnBillApi(obj) {
  return request({
    url: "/ZL/ChargeManagementBill/queryELBill.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_ZJ: obj.FJDA_ZJ,
      PJLYMX_SKRQ1: obj.PJLYMX_SKRQ1,
      PJLYMX_SKRQ2: obj.PJLYMX_SKRQ2,
      PJLYMX_PJH: obj.PJLYMX_PJH,
      PJLYMX_JKR: obj.PJLYMX_JKR,
      PJLYMX_PJZT: obj.PJLYMX_PJZT,
      PJLY_PJLX: obj.PJLY_PJLX,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
