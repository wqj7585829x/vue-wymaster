//标准选用
import request from "@/utils/Request";

//获取当前年月
export function queryCurrentYear(obj) {
  return request({
    url: "/util/queryCurrentYear.do",
    method: "post",
    data: {},
  });
}

export function queryPretreatment(obj) {
  return request({
    url: `/reportManagement/queryPretreatment.do`,
    method: "post",
    data: obj,
  });
}

export function Costcalculation(obj) {
  return request({
    url: "/reportManagement/Costcalculation.do",
    method: "post",
    data: obj,
  });
}

export function queryReportTree(obj) {
  return request({
    url: "/reportManagement/queryReportTree.do",
    method: "post",
    data: {},
  });
}

//2.16.1.1.	查询所有报表分类
export function queryReportType(obj) {
  return request({
    url: "/reportManagement/queryReportType.do",
    method: "post",
    data: {},
  });
}

//2.16.1.2.	新增报表分类
export function addReportType(obj) {
  return request({
    url: "/reportManagement/addReportType.do",
    method: "post",
    data: {
      typeName: obj.typeName,
      status: obj.status ? 1 : 0,
    },
  });
}

//2.16.1.3.	修改报表分类
export function updateReportType(obj) {
  return request({
    url: "/reportManagement/updateReportType.do",
    method: "post",
    data: {
      typeName: obj.typeName,
      status: obj.status ? 1 : 0,
      typeId: obj.typeId,
    },
  });
}

//2.16.1.4.	删除报表分类
export function deleteReportType(obj) {
  return request({
    url: "/reportManagement/deleteReportType.do",
    method: "post",
    data: {
      typeId: obj.typeId,
    },
  });
}

//2.16.1.7.	关系绑定
export function reportBind(obj) {
  return request({
    url: "/reportManagement/reportBind.do",
    method: "post",
    data: obj,
  });
}

//2.16.1.8.	查询所有的报表
export function queryAllReport(obj) {
  return request({
    url: "/reportManagement/queryAllReport.do",
    method: "post",
    data: obj,
  });
}

//2.1.1.1.	查询合同到期提醒报表
export function querycontractExpireWarn() {
  return request({
    url: "/commonReport/querycontractExpireWarn.do",
    method: "post",
    data: {},
  });
}

//2.1.1.2.	导出合同到期提醒报表
export function contractExpireWarnExcel() {
  return request({
    url: "/reportExport/contractExpireWarnExcel.do",
    method: "post",
    responseType: "blob",
    data: {},
  });
}

//6.17.	高级报表水电通知单预处理
export function queryWaterPretreatment(obj) {
  return request({
    url: "/reportManagement/queryWaterPretreatment.do",
    method: "post",
    data: obj,
  });
}

export function queryBuildingMessage(obj) {
  return request({
    url: "/util/queryBuildingMessage.do",
    method: "post",
    data: obj,
  });
}

export function queryRoomMessage(obj) {
  return request({
    url: "/util/queryRoomMessage.do",
    method: "post",
    data: obj,
  });
}

export function queryClientList(obj) {
  return request({
    url: "/util/queryClientList.do",
    method: "post",
    data: obj,
  });
}

export function printCustomReport(data) {
  return request({
    url: "/reportDemo/printCustomReport.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryPretreatmentCustom(obj) {
  return request({
    url: "/reportManagement/queryPretreatmentCustom.do",
    method: "post",
    data: obj,
  });
}

export function queryYFPZ_LKZRR(obj) {
  return request({
    url: "/reportDemo/queryYFPZ_LKZRR.do",
    method: "post",
    data: obj,
  });
}

export function queryYFPZ_XMMC(obj) {
  return request({
    url: "/reportDemo/queryYFPZ_XMMC.do",
    method: "post",
    data: obj,
  });
}

export function queryYFPZ_PZBH(obj) {
  return request({
    url: "/reportDemo/queryYFPZ_PZBH.do",
    method: "post",
    data: obj,
  });
}

export function queryKHDA_KHMC(obj) {
  return request({
    url: "/reportDemo/queryKHDA_KHMC.do",
    method: "post",
    data: obj,
  });
}

export function queryKHDA(obj) {
  return request({
    url: "/reportDemo/queryKHDA.do",
    method: "post",
    data: obj,
  });
}

export function queryAllPayItems(obj) {
  return request({
    url: "/util/queryAllPayItems.do",
    method: "post",
    data: obj,
  });
}

//
export function queryReceivableDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryReceivableDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function queryAdjustmentReceivableDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryAdjustmentReceivableDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function queryAllReceivableDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryAllReceivableDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function queryReceivedDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryReceivedDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function queryArrearsDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryArrearsDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function queryActualPaymentDetailsReportApi(obj) {
  return request({
    url: "/newPropertyReport/queryActualPaymentDetailsReport.do",
    method: "post",
    data: obj,
  });
}
export function exportApi(obj) {
  return request({
    url: "/newPropertyReport/export.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function queryPaymentMethods(obj) {
  return request({
    url: "/util/queryPaymentMethods.do",
    method: "post",
    data: obj,
  });
}

export function queryPartition(obj) {
  return request({
    url: "/util/queryPartition.do",
    method: "post",
    data: obj,
  });
}

export function queryUniqueDLDA_DLMC(obj) {
  return request({
    url: "/reportDemo/queryUniqueDLDA_DLMC.do",
    method: "post",
    data: obj,
  });
}

export function queryUniqueFJDA_FJID(obj) {
  return request({
    url: "/reportDemo/queryUniqueFJDA_FJID.do",
    method: "post",
    data: obj,
  });
}

export function queryUniqueFJDA_FJMC(obj) {
  return request({
    url: "/reportDemo/queryUniqueFJDA_FJMC.do",
    method: "post",
    data: obj,
  });
}

export function queryBuildingNum(obj) {
  return request({
    url: "/util/queryBuildingNum.do",
    method: "post",
    data: obj,
  });
}

export function queryAdjustmentReceivableDetailsByCondition(obj) {
  return request({
    url: "/newPropertyReport/queryAdjustmentReceivableDetailsByCondition.do",
    method: "post",
    data: obj,
  });
}

export function queryAllReceivableDetailsReportByCondition(obj) {
  return request({
    url: "/newPropertyReport/queryAllReceivableDetailsReportByCondition.do",
    method: "post",
    data: obj,
  });
}

export function queryReceivedDetails(obj) {
  return request({
    url: "/newPropertyReport/queryReceivedDetails.do",
    method: "post",
    data: obj,
  });
}

export function queryActualAccountIncome(obj) {
  return request({
    url: "/actualAccount/queryActualAccountIncome.do",
    method: "post",
    data: obj,
  });
}

export function queryActualAccountAgentBusiness(obj) {
  return request({
    url: "/actualAccount/queryActualAccountAgentBusiness.do",
    method: "post",
    data: obj,
  });
}

export function queryGatheringOpenBillReconciliation(obj) {
  return request({
    url:
      "/gatheringOpenBillReconciliation/queryGatheringOpenBillReconciliation.do",
    method: "post",
    data: obj,
  });
}

export function ReportExcel(obj) {
  return request({
    url: "/gatheringOpenBillReconciliation/ReportExcel.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function exportExcelData(obj) {
  return request({
    url: "/chargeReportBasis/exportExcelData.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function queryPrepaymentProject(obj) {
  return request({
    url: "/chargeReportBasis/queryPrepaymentProject.do",
    method: "post",
    data: obj,
  });
}

export function queryPrepaymentDetail(obj) {
  return request({
    url: "/chargeReportBasis/queryPrepaymentDetail.do",
    method: "post",
    data: obj,
  });
}

export function queryAdjustmentChargeDetail(obj) {
  return request({
    url: "/chargeReportBasis/queryAdjustmentChargeDetail.do",
    method: "post",
    data: obj,
  });
}

export function queryNoAdjustmentChargeDetail(obj) {
  return request({
    url: "/chargeReportBasis/queryNoAdjustmentChargeDetail.do",
    method: "post",
    data: obj,
  });
}

export function queryPayingToAccountDetails(obj) {
  return request({
    url: "/chargeReportBasis/queryPayingToAccountDetails.do",
    method: "post",
    data: obj,
  });
}

export function queryOneCostReportSfxm(obj) {
  return request({
    url: "/onePropertyReport/queryOneCostReportSfxm.do",
    method: "post",
    data: obj,
  });
}

export function queryChargeRateSfxm(obj) {
  return request({
    url: "/onePropertyReport/queryChargeRateSfxm.do",
    method: "post",
    data: obj,
  });
}

export function queryOneCostReport(obj) {
  return request({
    url: "/onePropertyReport/queryOneCostReport.do",
    method: "post",
    data: obj,
  });
}

export function exportOneCostReport(obj) {
  return request({
    url: "/onePropertyReport/exportOneCostReport.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function queryAnnualFeeRate(obj) {
  return request({
    url: "/onePropertyReport/queryAnnualFeeRate.do",
    method: "post",
    data: obj,
  });
}

export function exportAnnualFeeRateMonth(obj) {
  return request({
    url: "/onePropertyReport/exportAnnualFeeRateMonth.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function exportAnnualFeeRateYear(obj) {
  return request({
    url: "/onePropertyReport/exportAnnualFeeRateYear.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function queryNoteSumReport(obj) {
  return request({
    url: "/onePropertyReport/queryNoteSumReport.do",
    method: "post",
    data: obj,
  });
}

export function exportNoteSumReport(obj) {
  return request({
    url: "/onePropertyReport/exportNoteSumReport.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function exportActualAccountIncome(obj) {
  return request({
    url: "/actualAccount/exportActualAccountIncome.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function exportActualAccountAgentBusiness(obj) {
  return request({
    url: "/actualAccount/exportActualAccountAgentBusiness.do",
    method: "post",
    responseType: "blob",
    data: obj,
  });
}

export function queryPaymentMethod(obj) {
  return request({
    url: "/uncollectedFees/queryPaymentMethod.do",
    method: "post",
    data: obj,
  });
}
