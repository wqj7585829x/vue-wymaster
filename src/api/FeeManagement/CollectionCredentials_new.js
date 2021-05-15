//收款登记  收款凭证
import request from "@/utils/Request";

//查询收款凭证
export function queryPayingProve(obj, type) {
  return request({
    url: "/payingProve/queryPayingProve.do",
    method: "post",
    data: {
      FKGX_ZJ: type == 1 ? obj.FKGX_ZJ : "",
      KHDA_ZJ: type == 2 ? obj.KHDA_ZJ : "",
      QSNY: obj.QSNY,
      JZNY: obj.JZNY,
      SKPZ_TZRQ_START: obj.SKPZ_TZRQ_START,
      SKPZ_TZRQ_END: obj.SKPZ_TZRQ_END,
      SFXM_ZJ: obj.SFKM_ZJ,
    },
  });
}

//收款凭证明细查询
export function queryPayingProveDetails(SKPZ_ZJ) {
  return request({
    url: "/payingProve/queryPayingProveDetails.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//收款凭证是否可作废
export function isCancelProve(SKPZ_ZJ) {
  return request({
    url: "/payingProve/isCancelProve.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//判断凭证是否有开过票
export function isCanMakeBill(SKPZ_ZJ) {
  return request({
    url: "/payingProve/isExistBillForProve.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//凭证作废
export function destroyPaying(obj) {
  return request({
    url: "/payingProve/destroyPayingProve.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
      SKPZ_ZJ: obj.SKPZ_ZJ,
      SKPZ_ZFYY: obj.SKPZ_ZFYY,
      SKPZ_ZFSJ: obj.SKPZ_ZFSJ,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      PJLYMX_LX: obj.PJLYMX_LX,
      operationType: "收款凭证",
      type: obj.type,
    },
  });
}

//判断凭证是可开票
export function queryisCanBill(SKPZ_ZJ) {
  return request({
    url: "/payingProve/isCanMakeBillForPayingProve.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//票据分类查询
export function queryBillType() {
  return request({
    url: "/util/queryBillType.do",
    method: "post",
    data: {},
  });
}

//票据名查询
export function queryBillName(obj) {
  return request({
    url: "/util/queryBillName.do",
    method: "post",
    data: {
      PJLY_PJFL: obj.billType ? obj.billType : obj.YCXSF_PJLX,
    },
  });
}

//交款人、入账时间查询
export function queryPayPerson(obj) {
  return request({
    url: "/payingProve/queryPayPersonAndPaymentReceivingTime.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      operationType: obj.operationType,
      FKGX_ZJ: obj.FKGX_ZJ,
    },
  });
}

//资源代码查询
export function queryResourceCode(obj) {
  return request({
    url: "/payingProve/queryResourceCode.do",
    method: "post",
    data: {
      SKPZ_ZJ: obj.SKPZ_ZJ,
      operationType: obj.operationType,
    },
  });
}

//票据号查询
export function queryBillNumber(obj) {
  return request({
    url: "/payingProve/queryBillNumber.do",
    method: "post",
    data: {
      PJLY_ZJ: obj.PJLY_ZJ,
      PJLY_LX: obj.LXNO,
    },
  });
}

//纳税人信息查询旧接口
export function queryTaxpayerInformation(FKGX_ZJ) {
  return request({
    url: "/payingProve/queryTaxpayerInformation.do",
    method: "post",
    data: {
      FKGX_ZJ: FKGX_ZJ,
    },
  });
}

//纳税人信息查询
export function queryConfigurationOfMakeBill() {
  return request({
    url: "/payingProve/queryConfigurationOfMakeBill.do",
    method: "post",
    data: {},
  });
}

//收费项目查询（按明细）
export function queryPayingItemsByDetail(SKPZ_ZJ, PJFL) {
  return request({
    url: "/payingProve/queryPayingItemsByDetail.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
      PJFL: PJFL,
    },
  });
}

//收费项目查询（按项目强制合计）
export function queryPayingItemsByForceTotal(SKPZ_ZJ, PJFL) {
  return request({
    url: "/payingProve/queryPayingItemsByForceTotal.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
      PJFL: PJFL,
    },
  });
}

//收款凭证确认开票
export function AddensureMakeBill(obj) {
  return request({
    url: "/payingProve/ensureMakeBill.do",
    method: "post",
    data: {
      operationType: obj.operationType,
      KHDA_KHMC: obj.KHDA_KHMC ? obj.KHDA_KHMC : "",
      KHDA_NSRMC: obj.KHDA_NSRMC ? obj.KHDA_NSRMC : "",
      KHDA_NSRSBH: obj.KHDA_NSRSBH ? obj.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: obj.KHDA_NSRDZDH ? obj.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: obj.KHDA_KHHJZH ? obj.KHDA_KHHJZH : "",
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      SKPZ_ZJ: obj.SKPZ_ZJ,
      FKGX_ZJ: obj.FKGX_ZJ,
      JKR: obj.JKR,
      FJID: obj.FJID,
      PJLY_ZJ: obj.PJLY_ZJ,
      PJLY_PJMC: obj.PJLY_PJMC,
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
      ZZLFPFL: obj.PJFL == 1 ? obj.ZZLFPFL : "",
      PJLYMX_SFGXJSP: obj.PJLYMX_SFGXJSP.toString() ? obj.PJLYMX_SFGXJSP : "",
    },
  });
}

//锁定票据号
export function lockBillNumber(PJLYMX_ZJ) {
  return request({
    url: "/payingProve/lockBillNumber.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}

//该收款凭证是否开过电子发票
export function isExistDigitalReceipts(SKPZ_ZJ) {
  return request({
    url: "/payingProve/isExistDigitalReceipts.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//获取收款凭证开票所属种类
export function getMakeBillBelongCategory(SKPZ_ZJ) {
  return request({
    url: "/payingProve/getMakeBillBelongCategory.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
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

//是否显示税盘号
export function checkInvoice() {
  return request({
    url: "/util/checkInvoice.do",
    method: "post",
    data: {},
  });
}

//电子发票开票开票接口   新通道状态0调用接口
export function queryInvoiceResultsApi(PJLYMX_ZJ) {
  return request({
    url: "/invoiceMode/queryInvoiceResults.do",
    method: "post",
    data: {
      PJLYMX_ZJ: PJLYMX_ZJ,
    },
  });
}
//电子发票开票开票接口   新通道状态1调用接口
export function ELqueryInvoiceResultsApi(PJLYMX_ZJ) {
  return request({
    url: "EL/SF/ElectronicInvoice/queryInvoiceResults.do",
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
      name: "凭证明细",
      list: JSON.stringify(list),
    },
  });
}

//获取作废参数
export function getCancelParamProveApi(SKPZ_ZJ) {
  return request({
    url: "/payingProve/getCancelParameterOfPayingProve.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}

//获取是否是新通道
export function queryGroupInfoByJTApi() {
  return request({
    url: "/util/queryGroupInfoByJT.do",
    method: "post",
    data: {},
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
export function submitCancelApplicationsApi(SKPZ_ZJ) {
  return request({
    url: "/payingProve/submitCancelApplications.do",
    method: "post",
    data: {
      SKPZ_ZJ: SKPZ_ZJ,
    },
  });
}
