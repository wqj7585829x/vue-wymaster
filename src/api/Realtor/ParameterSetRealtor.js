import request from "@/utils/Request";

//查询通知单备注信息
export function queryRemarkApi(obj) {
  return request({
    url: "/ZL/ChargeParameter/queryRemark.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//修改通知单备注信息
export function updateRemarkApi(obj) {
  return request({
    url: "/ZL/ChargeParameter/updateRemark.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      prmValue: obj.prmValue,
      prmId: obj.prmId,
    },
  });
}

//查询收款方式类型
export function paymentMethodTypeApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/paymentMethodType.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//查询收款方式
export function queryPaymentMethodPageApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/queryPaymentMethodPage.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//新增收款方式
export function addPaymentMethodApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/addPaymentMethod.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      SFKM_SKFS: obj.SFKM_SKFS,
      SFKM_SKFSLX: obj.SFKM_SKFSLX,
      SFKM_SFYX: obj.SFKM_SFYX,
    },
  });
}

//修改收款方式
export function updatePaymentMethodApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/updatePaymentMethod.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      SFKM_ZJ: obj.SFKM_ZJ,
      SFKM_SKFS: obj.SFKM_SKFS,
      SFKM_SKFSLX: obj.SFKM_SKFSLX,
      SFKM_SFYX: obj.SFKM_SFYX,
    },
  });
}

//删除收款方式
export function deletePaymentMethodApi(SFKM_ZJ, obj) {
  return request({
    url: "/ZL/PaymentMethod/deletePaymentMethod.do",
    method: "post",
    data: {
      SFKM_ZJ: SFKM_ZJ,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//查询默认收款方式
export function queryPaymentMethodByChargeApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/queryPaymentMethodByCharge.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//修改默认收款方式
export function updateDefaultPaymentMethodApi(obj) {
  return request({
    url: "/ZL/PaymentMethod/updateDefaultPaymentMethod.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      prmValue: obj.defaultMethodName ? obj.defaultMethodName : "",
    },
  });
}
