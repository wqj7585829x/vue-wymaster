import request from "@/utils/Request";
//资源名称查询
export function queryZLRoomApi(obj) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      contractId: obj.YCXSF_HTWJ ? obj.YCXSF_HTWJ : "",
    },
  });
}

//合同编码查询
export function queryAllChargeItemApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryContractList.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//收费项目查询
export function queryDepositPaymentProjectApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryDepositPaymentProject.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//客户名称查询
export function queryClientsApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryClients.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FJDA_ZJ: obj.FJDA_ZJ,
    },
  });
}

//收费标准下拉框
export function queryOneTimeFeeStandard(obj) {
  return request({
    url: "/ZL/depositPayment/queryDepositPaymentStandard.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      CGBZ_SFXMWJ: obj.CGBZ_SFXMWJ,
    },
  });
}
//查询票据列表
export function queryDepositPaymentApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryDepositPayment.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_FJID: obj.FJDA_FJID,
      YCXSF_HTWJ: obj.YCXSF_HTWJ,
      KHDA_KHMC: obj.KHDA_KHMC,
      YCXSF_SFXMMC: obj.YCXSF_SFXMMC,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//交款
export function payDepositApi(obj) {
  return request({
    url: "/ZL/depositPayment/payDeposit.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      YCXSF_HTWJ: obj.YCXSF_HTWJ,
      YCXSF_KHDAWJ: obj.YCXSF_KHDAWJ,
      YCXSF_FJDAWJ: obj.YCXSF_FJDAWJ,
      YCXSF_SFXMMC: obj.YCXSF_SFXMMC,
      YCXSF_SFXMWJ: obj.YCXSF_SFXMWJ,
      YCXSF_JKR: obj.YCXSF_JKR,
      YCXSF_JFJSR: obj.YCXSF_JFJSR,
      YCXSF_SKFS: obj.YCXSF_SKFS,
      YCXSF_SFJE: obj.YCXSF_SFJE,
      YCXSF_SFRQ: obj.YCXSF_SFRQ,
      YCXSF_RZSJ: obj.YCXSF_RZSJ,
      PJLY_ZJ: obj.PJLY_ZJ,
      PJMX_LX: obj.LXNO ? obj.LXNO : "",
      YCXSF_PJLX: obj.YCXSF_PJLX,
      SFXM_JQWS: obj.SFXM_JQWS,
      YCXSF_SL: obj.YCXSF_SL,
      YCXSF_SE: obj.YCXSF_SE ? obj.YCXSF_SE : 0,
      YCXSF_BHSJE: obj.YCXSF_BHSJE ? obj.YCXSF_BHSJE : 0,
      PJLYMX_ZJ: obj.PJLYMX_ZJ,
      YCXSF_PJH: obj.YCXSF_PZH,
      YCXSF_BZ: obj.YCXSF_BZ ? obj.YCXSF_BZ : "",
      SJFPH: obj.SJFPH,
    },
  });
}

//查询退款明细
export function queryRefundDetailsApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryRefundDetails.do",
    method: "post",
    data: {
      YCXSF_ZJ: obj.YCXSF_ZJ,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//收款方式查询
export function querytPayWay(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryPaymentMethod.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//	默认收款方式查询
export function queryDefaultPayWay(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryDefaultMethod.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//退款
export function refundDetailsApi(obj) {
  return request({
    url: "/ZL/depositPayment/refundDetails.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
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

//判断是否可以开票
export function canInvoiceApi(obj) {
  return request({
    url: "/ZL/depositPayment/canInvoice.do",
    method: "post",
    data: {
      YCXSF_ZJ: obj.YCXSF_ZJ,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//费用作废
export function obsoleteApi(obj, data) {
  return request({
    url: "/ZL/depositPayment/obsolete.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      YCXSF_ZJ: obj.YCXSF_ZJ,
      YCXSF_ZFSJ: obj.YCXSF_ZFSJ,
      YCXSF_ZFYY: obj.YCXSF_ZFYY,
      YCXSF_PJLYMXWJ: data.YCXSF_PJH ? data.YCXSF_PJLYMXWJ : "",
    },
  });
}

//退款明细作废
export function refundInvalidApi(YCXSFTKMX_ZJ, obj, dbName) {
  return request({
    url: "/ZL/depositPayment/refundInvalid.do",
    method: "post",
    data: {
      dbName: dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      YCXSFTKMX_ZJ: YCXSFTKMX_ZJ,
      YCXSFTKMX_YCXSFWJ: obj.YCXSFTKMX_YCXSFWJ,
      YCXSFTKMX_TKJE: obj.YCXSFTKMX_TKJE,
    },
  });
}
