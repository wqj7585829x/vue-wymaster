//收款登记  一次性费用
import request from "@/utils/Request";

//按资源的一次性费用列表查询
export function queryOneTimeFeeByClient(obj, type) {
  return request({
    url: "/oneTimeFee/queryOneTimeFeeByClient.do",
    method: "post",
    data: {
      FKGX_ZJ: type == 1 ? obj.FKGX_ZJ : "",
      FKGX_KHWJ: type == 2 ? obj.FKGX_ZJ : "",
      KSRQ: obj.QSNY,
      JSRQ: obj.JZNY,
      type: type,
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
//	一次性费用收费项目下拉框
export function queryOneTimeFeeProject() {
  return request({
    url: "/oneTimeFee/queryOneTimeFeeProject.do",
    method: "post",
    data: {},
  });
}

//一次性费用收费标准下拉框
export function queryOneTimeFeeStandard(CGBZ_SFXMWJ) {
  return request({
    url: "/oneTimeFee/queryOneTimeFeeStandard.do",
    method: "post",
    data: {
      CGBZ_SFXMWJ: CGBZ_SFXMWJ,
    },
  });
}

//一次性费用交款
export function postOneTimeFee(obj) {
  return request({
    url: "/oneTimeFee/postOneTimeFee.do",
    method: "post",
    data: {
      YCXSF_FKGXWJ: obj.YCXSF_FKGXWJ,
      YCXSF_SFXMWJ: obj.CGBZ_SFXMWJ,
      YCXSF_JKR: obj.YCXSF_JKR,
      YCXSF_SFBZ: obj.YCXSF_SFBZ,
      YCXSF_SFJE: obj.YCXSF_SFJE,
      YCXSF_SFRQ: obj.YCXSF_SFRQ,
      YCXSF_PJLX: obj.YCXSF_PJLX,
      YCXSF_SFXMMC: obj.YCXSF_SFXMMC,
      YCXSF_JFJSR: obj.YCXSF_JFJSR,
      YCXSF_RZSJ: obj.YCXSF_RZSJ,

      YCXSF_BZWJ: obj.YCXSF_BZWJ,
      YCXSF_JSMJ: obj.YCXSF_JSMJ,
      YCXSF_JSDJ: obj.YCXSF_JSDJ,
      YCXSF_ZDYCS: obj.YCXSF_ZDYCS,
      YCXSF_SL: obj.YCXSF_SL,
      YCXSF_SE: obj.YCXSF_SE ? obj.YCXSF_SE : 0,
      YCXSF_BHSJE: obj.YCXSF_BHSJE ? obj.YCXSF_BHSJE : 0,

      PJLY_ZJ: obj.PJLY_ZJ,
      YCXSF_SKFS: obj.YCXSF_SKFS,
      YCXSF_PZH: obj.YCXSF_PZH,
      YCXSF_ZDYZD1: obj.YCXSF_ZDYZD1,

      YCXSF_ZDYZD2: obj.YCXSF_ZDYZD2,
      SJFPH: obj.SJFPH,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      YCXSF_BZ: obj.YCXSF_BZ ? obj.YCXSF_BZ : "",
      PJMX_LX: obj.LXNO ? obj.LXNO : "",
      YCXSF_ZDYZD1: obj.YCXSF_ZDYZD1 ? obj.YCXSF_ZDYZD1 : "",
    },
  });
}

//一次性费用作废
export function obsolete(obj, data) {
  return request({
    url: "/oneTimeFee/obsolete.do",
    method: "post",
    data: {
      YCXSF_ZJ: obj.YCXSF_ZJ,
      YCXSF_ZFSJ: obj.YCXSF_ZFSJ,
      YCXSF_ZFYY: obj.YCXSF_ZFYY,
      YCXSF_PJLYMXWJ: data.YCXSF_PJH ? data.YCXSF_PJLYMXWJ : "",
    },
  });
}

//判断是否可以开票
export function canInvoice(YCXSF_ZJ) {
  return request({
    url: "/oneTimeFee/canInvoice.do",
    method: "post",
    data: {
      YCXSF_ZJ: YCXSF_ZJ,
    },
  });
}

//一次性费用退款
export function refundDetails(obj) {
  return request({
    url: "/oneTimeFee/refundDetails.do",
    method: "post",
    data: {
      YCXSF_ZJ: obj.YCXSF_ZJ,
      YCXSFTKMX_TKFS: obj.YCXSFTKMX_TKFS,
      YCXSFTKMX_TKJE: obj.YCXSFTKMX_TKJE,
      YCXSFTKMX_TKXYE: obj.YCXSFTKMX_TKXYE,
      YCXSFTKMX_TKRQ: obj.YCXSFTKMX_TKRQ,
      YCXSFTKMX_TKJSR: obj.YCXSFTKMX_TKJSR,
      YCXSFTKMX_BZ: obj.YCXSFTKMX_BZ,
    },
  });
}

//退款明细列表查询
export function queryRefundDetails(YCXSF_ZJ) {
  return request({
    url: "/oneTimeFee/queryRefundDetails.do",
    method: "post",
    data: {
      YCXSF_ZJ: YCXSF_ZJ,
    },
  });
}

//退款明细作废
export function refundobsolete(YCXSFTKMX_ZJ) {
  return request({
    url: "/oneTimeFee/refundInvalid.do",
    method: "post",
    data: {
      YCXSFTKMX_ZJ: YCXSFTKMX_ZJ,
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

export function checkInvoice() {
  return request({
    url: "/util/checkInvoice.do",
    method: "post",
    data: {},
  });
}

//修改自定义字段1
export function updateCustomFieldApi(obj) {
  return request({
    url: "/oneTimeFee/updateCustomField.do",
    method: "post",
    data: {
      YCXSF_ZJ: obj.YCXSF_ZJ,
      YCXSF_ZDYZD1: obj.YCXSF_ZDYZD1,
    },
  });
}
