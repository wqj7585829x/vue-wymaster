//收费系统参数设置
import request from "@/utils/Request";

//查询收款方式类型
export function queryPaymentType() {
  return request({
    url: "/util/paymentMethodType.do",
    method: "post",
    data: {},
  });
}
//查询收款方式
export function queryPaymentWay(obj) {
  return request({
    url: "/paymentMethod/queryPaymentMethodPage.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//新增收款方式
export function AddPaymentWay(obj) {
  return request({
    url: "/paymentMethod/addPaymentMethod.do",
    method: "post",
    data: {
      SFKM_SKFS: obj.SFKM_SKFS,
      SFKM_SKFSLX: obj.SFKM_SKFSLX,
      SFKM_SFYX: obj.SFKM_SFYX,
    },
  });
}

//修改收款方式
export function UpdatePaymentWay(obj) {
  return request({
    url: "/paymentMethod/updatePaymentMethod.do",
    method: "post",
    data: {
      SFKM_ZJ: obj.SFKM_ZJ,
      SFKM_SKFS: obj.SFKM_SKFS,
      SFKM_SKFSLX: obj.SFKM_SKFSLX,
      SFKM_SFYX: obj.SFKM_SFYX,
    },
  });
}

//删除收款方式
export function delPaymentWay(SFKM_ZJ) {
  return request({
    url: "/paymentMethod/deletePaymentMethod.do",
    method: "post",
    data: {
      SFKM_ZJ: SFKM_ZJ,
    },
  });
}

//查询默认收款方式
export function queryDefaultPayment() {
  return request({
    url: "/paymentMethod/queryPaymentMethodByCharge.do",
    method: "post",
    data: {},
  });
}

//修改默认收款方式
export function updateDefaultPayment(obj) {
  return request({
    url: "/paymentMethod/updateDefaultPaymentMethod.do",
    method: "post",
    data: {
      SFKM_ZJ: obj.SFKM_ZJ,
      SFCS_ZFX: obj.defaultMethodName,
    },
  });
}

//收费日期类查询
export function queryDateType(obj) {
  return request({
    url: "/chargeParameter/getTotalTimeParameter.do",
    method: "post",
    data: {},
  });
}

//提交收费日期类
export function AddDateType(obj) {
  return request({
    url: "/chargeParameter/updateTotalTimeParameter.do",
    method: "post",
    data: {
      date: obj.methodType == 2 ? obj.date1 : obj.date2,
      methodType: obj.methodType,
      yearAndMonth: obj.yearAndMonth,
      methodTypeId: obj.methodTypeId,
      dateId: obj.dateId,
    },
  });
}

//备注信息查询
export function queryRemarksMessage(obj) {
  return request({
    url: "/chargeParameter/queryRemark.do",
    method: "post",
    data: {},
  });
}

//备注信息修改
export function updateRemarksMessage(obj) {
  return request({
    url: "/chargeParameter/updateRemark.do",
    method: "post",
    data: {
      SFCS_BZX: obj.SFCS_BZX,
      SFCS_ZJ: obj.SFCS_ZJ,
    },
  });
}

//收费参数初始化
export function chargeParameterInit() {
  return request({
    url: "/chargeParameter/chargeParameterInit.do",
    method: "post",
    data: {},
  });
}

//查询收费控制信息
export function queryChargeControlMessageApi() {
  return request({
    url: "/chargeParameter/queryChargeControlMessage.do",
    method: "post",
    data: {},
  });
}

//修改系统收费控制
export function updateSystemChargeControlApi(isRelatedCharge) {
  return request({
    url: "/chargeParameter/updateSystemChargeControl.do",
    method: "post",
    data: {
      isRelatedCharge: isRelatedCharge ? 1 : 0,
    },
  });
}

//微信/pos收费控制
export function updateWeChatChargeControlApi(chargeCycle) {
  return request({
    url: "/chargeParameter/updateWeChatChargeControl.do",
    method: "post",
    data: {
      chargeCycle: chargeCycle,
    },
  });
}
