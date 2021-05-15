import request from "@/utils/Request";

//查询资源名称
export function queryRoomNameApi(obj) {
  return request({
    url: "/zl/receiptVoucher/queryRoomName.do",
    method: "post",
    data: {
      plotDbName: obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//查询凭证列表
export function queryReceiptVoucherApi(obj) {
  return request({
    url: "/zl/receiptVoucher/queryReceiptVoucher.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      SKPZ_JKR: obj.SKPZ_JKR,
      SKPZ_LY: obj.SKPZ_LY,
      FJDA_FJMC: obj.FJDA_FJMC,
      plotDbName: obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//查询凭证列表明细
export function queryReceiptVoucherDetailsApi(obj) {
  return request({
    url: "/zl/receiptVoucher/queryReceiptVoucherDetails.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//凭证是否有开票
export function isExistBillForReceiptVoucherApi(obj) {
  return request({
    url: "/zl/receiptVoucher/isExistBillForReceiptVoucher.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//凭证作废
export function destroyReceiptVoucherApi(obj) {
  return request({
    url: "/zl/receiptVoucher/destroyReceiptVoucher.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      SKPZ_ZFYY: obj.SKPZ_ZFYY,
      SKPZ_ZFSJ: obj.SKPZ_ZFSJ,
      PJLYMX_ZJ: obj.PJLYMX_ZJ ? obj.PJLYMX_ZJ : "",
      operationType: "收款凭证",
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      PJLYMX_LX: obj.PJLYMX_LX,
    },
  });
}

//判断凭证是可开票
export function isCanMakeBillForReceiptVoucherApi(obj) {
  return request({
    url: "/zl/receiptVoucher/isCanMakeBillForReceiptVoucher.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//票据分类下拉查询
export function queryBillType(obj) {
  return request({
    url: "/zl/receiptVoucher/queryBillType.do",
    method: "post",
    data: {
      plotDbName: obj.plotDbName ? obj.plotDbName : obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//票据名称下拉查询
export function queryBillName(obj) {
  return request({
    url: "/zl/receiptVoucher/queryBillName.do",
    method: "post",
    data: {
      PJLY_PJFL: obj.billType ? obj.billType : obj.YCXSF_PJLX,
      plotDbName: obj.plotDbName ? obj.plotDbName : obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//交款人、入账时间查询
export function queryPayPerson(obj) {
  return request({
    url: "/zl/receiptVoucher/queryPayPersonAndPaymentReceivingTime.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      operationType: obj.operationType,
    },
  });
}

//资源代码查询
export function queryResourceCode(obj) {
  return request({
    url: "/zl/receiptVoucher/queryResourceCode.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//票据号查询
export function queryBillNumber(obj) {
  return request({
    url: "/zl/receiptVoucher/queryBillNumber.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
      plotDbName: obj.plotDbName ? obj.plotDbName : obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      PJLY_LX: obj.LXNO,
    },
  });
}

//纳税人信息查询
export function queryTaxpayerInformation(obj) {
  return request({
    url: "/zl/receiptVoucher/getTaxpayerInformation.do",
    method: "post",
    data: {
      KHDA_ZJ: obj.KHDA_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//收费项目查询（按项目强制合计）
export function queryPayingItemsByForceTotal(obj, PJFL) {
  return request({
    url: "/zl/receiptVoucher/queryChargeItemsByForceTotal.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      PJFL: PJFL,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//收款凭证确认开票
export function AddensureMakeBill(obj) {
  return request({
    url: "/zl/receiptVoucher/ensureMakeInvoice.do",
    method: "post",
    data: {
      operationType: obj.operationType,
      KHDA_KHMC: obj.KHDA_KHMC ? obj.KHDA_KHMC : "",
      KHDA_NSRSBH: obj.KHDA_NSRSBH ? obj.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: obj.KHDA_NSRDZDH ? obj.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: obj.KHDA_KHHJZH ? obj.KHDA_KHHJZH : "",
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      SKPZ_ZJ: obj.SKPZ_ZJ,
      FKGX_ZJ: obj.FKGX_ZJ,
      JKR: obj.JKR,
      FJID: obj.FJID,
      PJLY_ZJ: obj.PJLY_ZJ,
      billType: obj.billType,
      PJLYMX_PJH: obj.PJLYMX_PJH ? obj.PJLYMX_PJH : "",
      RZSJ: obj.RZSJ,
      makeBillMan: obj.makeBillMan,
      makeBillDate: obj.makeBillDate,
      HJFS: obj.HJFS,
      SKMX_ZJ: obj.SKMX_ZJ,
      SKMX_SFXMWJ: obj.SKMX_SFXMWJ,
      SKMX_SKFYMC: obj.SKMX_SKFYMC,
      SKMX_SKZY: obj.SKMX_SKZY,
      SKMX_SKFS: obj.SKMX_SKFS,
      SKMX_SKBZ: obj.SKMX_SKBZ,
      SKMX_SKJE: obj.SKMX_SKJE,
      SKMX_ZSJE: obj.SKMX_ZSJE,
      SKMX_SE: obj.SKMX_SE,
      SKMX_SL: obj.SKMX_SL,
      SKMX_BHSJE: obj.SKMX_BHSJE,
      SKMX_ZJ: obj.SKMX_ZJ,
      SKPZ_SKNY: obj.SKPZ_SKNY,
      PJMX_LX: obj.LXNO,
      SJFPH: obj.SJFPH,
      ZZLFPFL: obj.ZZLFPFL,
      FJDA_FJID: obj.FJDA_FJID,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      PJLYMX_SFGXJSP: obj.PJLYMX_SFGXJSP.toString() ? obj.PJLYMX_SFGXJSP : "",
    },
  });
}

//获取收款凭证开票所属种类
export function getMakeBillBelongCategory(obj) {
  return request({
    url: "/zl/receiptVoucher/getMakeInvoiceBelongCategory.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      plotDbName: obj.plotDbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}

//是否显示税盘号
export function checkInvoice() {
  return request({
    url: "/util/checkInvoice.do",
    method: "post",
    data: {},
  });
}

//获取需要开电子票据列表的接口
export function queryInvoiceResultsApi(PJLYMX_ZJ) {
  return request({
    url: "EL/ZL/ElectronicInvoice/queryInvoiceResults.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}

//纸质发票开具完回写数据到服务器
export function successWriteBackDataApi(
  PJLYMX_ZJ,
  token,
  RetCode,
  InfoKind,
  infotypecode,
  infonumber,
  dbName
) {
  return request({
    // ?X_Token='+token+"&PJLYMX_ZJ="+PJLYMX_ZJ+"&RetCode="+RetCode+"&PJLYMX_ZZSFPFL="+encodeURIComponent(encodeURIComponent(InfoKind))+"&PJLYMX_FPDM="+infotypecode+"&PJLYMX_FPHM="+infonumber
    url: "/invoiceMode/successWriteBackData.do",
    method: "post",
    data: {
      X_Token: token,
      PJLYMX_ZJ: PJLYMX_ZJ,
      RetCode: RetCode,
      PJLYMX_ZZSFPFL: InfoKind,
      PJLYMX_FPDM: infotypecode,
      PJLYMX_FPHM: infonumber,
      dbName: dbName,
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
      name: "房屋租赁凭证明细",
      list: JSON.stringify(list),
    },
  });
}
