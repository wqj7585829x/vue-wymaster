//  主页

import request from "@/utils/Request";

//整体布局
export function queryPropertyIndexFunction() {
  return request({
    url: "/homePage/queryPropertyIndexFunction.do",
    method: "post",
    data: {},
  });
}

//总户数
export function getTotalNumOfHousehold() {
  return request({
    url: "/homePage/getTotalNumOfHousehold.do",
    method: "post",
    data: {},
  });
}

//今日收入总额
export function getTodayTotalIncome() {
  return request({
    url: "/homePage/getTodayTotalIncome.do",
    method: "post",
    data: {},
  });
}

//今年收入查询
export function getTotalIncome() {
  return request({
    url: "/homePage/getTotalIncome.do",
    method: "post",
    data: {},
  });
}

//未缴费金额
export function getArrear() {
  return request({
    url: "/homePage/getArrear.do",
    method: "post",
    data: {},
  });
}

//公维金余额
export function queryOverage() {
  return request({
    url: "/homePage/queryOverage.do",
    method: "post",
    data: {},
  });
}

//总面积查询
export function queryArea() {
  return request({
    url: "/homePage/queryArea.do",
    method: "post",
    data: {},
  });
}

//未开票凭证数
export function queryNumOfVoucherNotInvoiced() {
  return request({
    url: "/homePage/queryNumOfVoucherNotInvoiced.do",
    method: "post",
    data: {},
  });
}

//票据查询
export function queryBillNum() {
  return request({
    url: "/homePage/queryBillNum.do",
    method: "post",
    data: {},
  });
}

//票据查询
export function queryCharge() {
  return request({
    url: "/homePage/queryCharge.do",
    method: "post",
    data: {},
  });
}

//目标金额
export function getTarget() {
  return request({
    url: "/homePage/getTarget.do",
    method: "post",
    data: {},
  });
}

//工作日志
export function queryWorkLog() {
  return request({
    url: "/homePage/queryWorkLog.do",
    method: "post",
    data: {},
  });
}

//相关信息
export function queryExpirationTimeOfContract(type) {
  return request({
    url: "/homePage/queryExpirationTimeOfContract.do",
    method: "post",
    data: {
      type: type,
    },
  });
}

export function queryUncollectedFeesByRoom(data) {
  return request({
    url: "/homePage/queryUncollectedFeesByRoom.do",
    method: "post",
    data: data,
  });
}

export function queryChargeItem() {
  return request({
    url: "/homePage/queryChargeItem.do",
    method: "post",
    data: {},
  });
}

export function queryRoom() {
  return request({
    url: "/homePage/queryRoom.do",
    method: "post",
    data: {},
  });
}

export function queryChargeByMethod(data) {
  return request({
    url: "/homePage/queryChargeByMethod.do",
    method: "post",
    data: {
      sess_plotDbName: data.sess_plotDbName,
      sess_plotId: data.sess_plotId,
      sess_yxdId: data.sess_yxdId,
    },
  });
}

export function queryChargeByProject(data) {
  return request({
    url: "/homePage/queryChargeByProject.do",
    method: "post",
    data: {
      SKFS: "",
      sess_plotDbName: data.sess_plotDbName,
      sess_plotId: data.sess_plotId,
      sess_yxdId: data.sess_yxdId,
    },
  });
}

export function queryBillMessage(data) {
  return request({
    url: "/homePageBill/queryBillMessage.do",
    method: "post",
    data: data,
  });
}

export function queryELBillMessage(data) {
  return request({
    url: "/homePage/queryELBillMessage.do",
    method: "post",
    data: data,
  });
}

export function queryBillDetailsMessage(data) {
  return request({
    url: "/homePageBill/queryBillDetailsMessage.do",
    method: "post",
    data: data,
  });
}

export function queryPayingProve(data) {
  return request({
    url: "/homePage/queryPayingProve.do",
    method: "post",
    data: data,
  });
}

export function queryPayingProveDetails(data) {
  return request({
    url: "/homePage/queryPayingProveDetails.do",
    method: "post",
    data: data,
  });
}

export function queryTotalDailyIncome(data) {
  return request({
    url: "/homePage/queryTotalDailyIncome.do",
    method: "post",
    data: data,
  });
}

export function queryPublicSecurityBalance(data) {
  return request({
    url: "/homePage/queryPublicSecurityBalance.do",
    method: "post",
    data: data,
  });
}

export function queryStatisticsOfCharges(data, type) {
  return request({
    url: `/homePage/${
      type ? "queryStatisticsOfCharges" : "getCollectionStatisticsByChargeItem"
    }.do`,
    method: "post",
    data: data,
  });
}

export function isLeader() {
  return request({
    url: "/homePage/isLeader.do",
    method: "post",
    data: {},
  });
}

export function queryTotalNumberOfHouseholds(data) {
  return request({
    url: "/homePage/queryTotalNumberOfHouseholds.do",
    method: "post",
    data: data,
  });
}

export function queryAcreage(data) {
  return request({
    url: "/homePage/queryAcreage.do",
    method: "post",
    data: data,
  });
}

export function queryIndexAchievingStatusLead(data) {
  return request({
    url: "/homePage/queryIndexAchievingStatusLead.do",
    method: "post",
    data: data,
  });
}

export function queryIndexAchievingStatusStaff(data) {
  return request({
    url: "/homePage/queryIndexAchievingStatusStaff.do",
    method: "post",
    data: data,
  });
}

export function queryRoomByPlot(data) {
  return request({
    url: "/homePage/queryRoomByPlot.do",
    method: "post",
    data: {
      plotDbName: data.plotDbName,
      GLCID: data.GLCID,
      YXDID: data.YXDID,
    },
  });
}

export function queryArrearage() {
  return request({
    url: "/homePage/queryArrearage.do",
    method: "post",
    data: {},
  });
}

export function queryPaymentMethod() {
  return request({
    url: "/homePage/queryPaymentMethod.do",
    method: "post",
    data: {},
  });
}

export function feeCollection(data) {
  return request({
    url: "/homePage/feeCollection.do",
    method: "post",
    data: data,
  });
}

export function speedinessInvoiceExcel(data) {
  return request({
    url: "/homePageExport/speedinessInvoiceExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
export function exportUncollectedFeesApi(data) {
  return request({
    url: "/homePageExport/exportUncollectedFees.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportExcelOfQuicklyOpenBilling(data) {
  return request({
    url: "/homePage/exportExcelOfQuicklyOpenBilling.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function billMessageExcel(data) {
  return request({
    url: "/homePageExport/billMessageExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportExcelOfTotalDailyIncome(data) {
  return request({
    url: "/homePage/exportExcelOfTotalDailyIncome.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportExcelOfStatisticsCharges(data) {
  return request({
    url: "/homePage/exportExcelOfStatisticsCharges.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportExcelOfPublicSecurity(data) {
  return request({
    url: "/homePage/exportExcelOfPublicSecurity.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportExcelOfTotalHouseholds(data) {
  return request({
    url: "/homePage/exportExcelOfTotalHouseholds.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function totalAreaExcel(data) {
  return request({
    url: "/homePageExport/totalAreaExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function annualTargetExcel(data) {
  return request({
    url: "/homePageExport/annualTargetExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function annualSalesVolumeExcel(data) {
  return request({
    url: "/homePageExport/annualSalesVolumeExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryIsMayCancellation(data) {
  return request({
    url: "/homePageBill/queryIsMayCancellation.do",
    method: "post",
    data: data,
  });
}

export function confirmCancellation(data) {
  return request({
    url: "/homePageBill/confirmCancellation.do",
    method: "post",
    data: data,
  });
}

export function reuseOfTicketNumber(data) {
  return request({
    url: "/homePageBill/reuseOfTicketNumber.do",
    method: "post",
    data: {
      PJLYMX_PJLYWJ: data.PJLYMX_PJLYWJ,
      PJLYMX_XH: data.PJLYMX_XH,
      PJLYMX_PJH: data.PJLYMX_PJH,
      PJLYMX_ZJ: data.PJLYMX_ZJ,
      type: data.type,
    },
  });
}

export function notePrint(data) {
  return request({
    url: "/homePageBill/notePrint.do",
    method: "post",
    data: data,
  });
}

export function chromatographyPrint(data) {
  return request({
    url: "/homePageBill/chromatographyPrint.do",
    method: "post",
    data: data,
  });
}

export function updatePrintTimes(data) {
  return request({
    url: "/homePageBill/updatePrintTimes.do",
    method: "post",
    data: data,
  });
}

export function BatchToMakeInvoice(data) {
  return request({
    url: "/homePage/BatchToMakeInvoice.do",
    method: "post",
    data: data,
  });
}

export function queryArrearageAll(data) {
  return request({
    url: "/homePage/queryArrearageAll.do",
    method: "post",
    data: {
      SFXM_SFXMMC: "",
      FJDA_FJID: "",
      KHDA_KHMC: "",
    },
  });
}

export function receivedDailyReport(data) {
  return request({
    url: "/homePage/receivedDailyReport.do",
    method: "post",
    data: data,
  });
}

export function officialReceiptsExcel(data) {
  return request({
    url: "/homePageExport/officialReceiptsExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryUncollectedFeesColumn(data) {
  return request({
    url: "/homePage/queryUncollectedFeesColumn.do",
    method: "post",
    data: data,
  });
}

export function exportExcel(data) {
  return request({
    url: "/util/exportExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryBillPrintType(data) {
  return request({
    url: "/util/queryBillPrintType.do",
    method: "post",
    data: data,
  });
}

export function redDashedInvoice(data) {
  return request({
    url: "/invoiceMode/redDashedInvoice.do",
    method: "post",
    data: data,
  });
}

export function queryRedDashedInvoiceResults(data) {
  return request({
    url: "/invoiceMode/queryRedDashedInvoiceResults.do",
    method: "post",
    data: data,
  });
}

export function queryInvoiceInformation(data) {
  return request({
    url: "/payingProve/queryInvoiceInformation.do",
    method: "post",
    data: data,
  });
}

export function makeElectronicInvoiceAndElectronicReceiptBatch(data) {
  return request({
    url: "/payingProve/makeElectronicInvoiceAndElectronicReceiptBatch.do",
    method: "post",
    data: data,
  });
}

export function queryAllChargeItemByOrg(data) {
  return request({
    url: "/homePage/queryAllChargeItemByOrg.do",
    method: "post",
    data: data,
  });
}

export function queryWhetherCanRedFlush(data) {
  return request({
    url: "/homePageBill/queryWhetherCanRedFlush.do",
    method: "post",
    data: data,
  });
}

export function queryPaymentMethods(data) {
  return request({
    url: "/util/queryPaymentMethods.do",
    method: "post",
    data: data,
  });
}

export function invalidApplication(data) {
  return request({
    url: "/homePageBill/invalidApplication.do",
    method: "post",
    data: data,
  });
}

export function isBatchElectronicInvoice(data) {
  return request({
    url: "/util/isBatchElectronicInvoice.do",
    method: "post",
    data: data,
  });
}
