//预交收款
import request from "@/utils/Request";

//----------------------------------------------------------------预交登记
//查询导航树
export function queryOrgTreeHaveClient() {
  return request({
    url: "/util/queryOrgTreeHaveClient.do",
    method: "post",
    data: {},
  });
}

//查询预交方案下拉
export function queryPreplan() {
  return request({
    url: "/prepayment/queryPreplan.do",
    method: "post",
    data: {},
  });
}

//查询预交方式下拉
export function queryPaymentMethod() {
  return request({
    url: "/uncollectedFees/queryPaymentMethod.do",
    method: "post",
    data: {},
  });
}

//查询余额信息
export function getBalanceInformation(data) {
  return request({
    url: "/prepayment/getBalanceInformation.do",
    method: "post",
    data: data,
  });
}

//查询预交登记
export function queryPrepaymentRegister(data) {
  return request({
    url: "/prepayment/queryPrepaymentRegister.do",
    method: "post",
    data: data,
  });
}

//查询预交记录/查询退款记录
export function queryPrepayRecord(data) {
  return request({
    url: "/prepayment/queryPrepayRecord.do",
    method: "post",
    data: data,
  });
}

//冻结/解冻
export function freezeOrThaw(data) {
  return request({
    url: "/prepayment/freezeOrThaw.do",
    method: "post",
    data: data,
  });
}

//预交退款/收款
export function prepay(data) {
  return request({
    url: "/prepayment/prepay.do",
    method: "post",
    data: data,
  });
}

//接口定义
export function prepayBatch(data) {
  return request({
    url: "/prepayment/prepayBatch.do",
    method: "post",
    data: data,
  });
}

//查询冲抵资源
export function queryOffsetResources(data) {
  return request({
    url: "/prepayment/queryOffsetResources.do",
    method: "post",
    data: data,
  });
}

//修改冲抵资源
export function updateOffsetResources(data) {
  return request({
    url: "/prepayment/updateOffsetResources.do",
    method: "post",
    data: data,
  });
}

//----------------------------------------------------------------预交凭证

//预交凭证列表查询
export function queryPrepayProve(data) {
  return request({
    url: "/prepayment/queryPrepayProve.do",
    method: "post",
    data: data,
  });
}

//预交凭证是否可以作废
export function isCancelPrepayProve(data) {
  return request({
    url: "/prepayment/isCancelPrepayProve.do",
    method: "post",
    data: data,
  });
}

//预交凭证是否存在票据号
export function isExistBillForPrepayProve(data) {
  return request({
    url: "/prepayment/isExistBillForPrepayProve.do",
    method: "post",
    data: data,
  });
}

//作废预交凭证
export function destroyPrepayProve(data) {
  return request({
    url: "/prepayment/destroyPrepayProve.do",
    method: "post",
    data: data,
  });
}

//获取预交凭证作废参数
export function getCancelParameterOfPayingProve(data) {
  return request({
    url: "/prepayment/getCancelParameterOfPayingProve.do",
    method: "post",
    data: data,
  });
}

//预交凭证是否可以开票
export function isCanMakeBillForPrepayProve(data) {
  return request({
    url: "/prepayment/isCanMakeBillForPrepayProve.do",
    method: "post",
    data: data,
  });
}

//查询增值税发票分类
export function queryClassificationOfAddValueTaxInvoice(data) {
  return request({
    url: "/prepayment/queryClassificationOfAddValueTaxInvoice.do",
    method: "post",
    data: data,
  });
}

//资源代码查询
export function queryResourceCode(data) {
  return request({
    url: "/prepayment/queryResourceCode.do",
    method: "post",
    data: data,
  });
}

//票据号查询
export function queryBillNumber(data) {
  return request({
    url: "/prepayment/queryBillNumber.do",
    method: "post",
    data: data,
  });
}

//票据号查询
export function queryTaxpayerInformation(data) {
  return request({
    url: "/prepayment/queryTaxpayerInformation.do",
    method: "post",
    data: data,
  });
}

//预交明细查询按项目明细
export function queryPrepayDetailByItemsDetail(data) {
  return request({
    url: "/prepayment/queryPrepayDetailByItemsDetail.do",
    method: "post",
    data: data,
  });
}

//预交明细查询
export function queryPrepayDetail(data) {
  return request({
    url: "/prepayment/queryPrepayDetail.do",
    method: "post",
    data: data,
  });
}

//预交凭证确认开票
export function ensureMakeBill(data) {
  return request({
    url: "/prepayment/ensureMakeBill.do",
    method: "post",
    data: data,
  });
}
