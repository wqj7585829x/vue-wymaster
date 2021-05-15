import request from "@/utils/Request";

export function queryInvoices(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryInvoices.do",
    method: "post",
    data: data,
  });
}

export function queryInvoiceDetails(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryInvoiceDetails.do",
    method: "post",
    data: data,
  });
}

export function queryInvoiceInformation(data) {
  return request({
    url: "/xp/auditInvoiceInformation/queryInvoiceInformation.do",
    method: "post",
    data: data,
  });
}

export function auditInvoiceInformation(data) {
  return request({
    url: "/xp/auditInvoiceInformation/auditInvoiceInformation.do",
    method: "post",
    data: data,
  });
}

export function queryUncollectedApplyBill(data) {
  return request({
    url: "/xp/billApply/queryUncollectedApplyBill.do",
    method: "post",
    data: data,
  });
}

export function queryCollectedApplyBill(data) {
  return request({
    url: "/xp/billApply/queryCollectedApplyBill.do",
    method: "post",
    data: data,
  });
}

export function queryCollectionDetail(data) {
  return request({
    url: "/xp/billApply/queryCollectionDetail.do",
    method: "post",
    data: data,
  });
}

export function uncollectedApplyForBill(data) {
  return request({
    url: "/xp/billApply/uncollectedApplyForBill.do",
    method: "post",
    data: data,
  });
}

export function uncollectedIncomeApplyForBill(data) {
  return request({
    url: "/xp/billApply/uncollectedIncomeApplyForBill.do",
    method: "post",
    data: data,
  });
}

export function collectedApplyForBill(data) {
  return request({
    url: "/xp/billApply/collectedApplyForBill.do",
    method: "post",
    data: data,
  });
}

export function queryInvoiceInformation1(data) {
  return request({
    url: "/xp/billApply/queryInvoiceInformation.do",
    method: "post",
    data: data,
  });
}

export function queryRemindInvoice(data) {
  return request({
    url: "/xp/remindInvoice/queryRemindInvoice.do",
    method: "post",
    data: data,
  });
}

export function getPayerAndRoomId(data) {
  return request({
    url: "/xp/xpPropertyInvoice/getPayerAndRoomId.do",
    method: "post",
    data: data,
  });
}

export function queryUncollectedFeesById(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryUncollectedFeesById.do",
    method: "post",
    data: data,
  });
}

export function makeCollections(data) {
  return request({
    url: "/xp/xpPropertyInvoice/makeCollections.do",
    method: "post",
    data: data,
  });
}

export function confirmCancellation(data) {
  return request({
    url: "/xp/xpPropertyInvoice/confirmCancellation.do",
    method: "post",
    data: data,
  });
}

//---------------------------------------------------

export function queryUnpaidApplicationForms(data) {
  return request({
    url: "/xp/billExamine/queryUnpaidApplicationForms.do",
    method: "post",
    data: data,
  });
}

export function queryUnpaidConfirmApplicationForms(data) {
  return request({
    url: "/xp/billExamine/queryUnpaidConfirmApplicationForms.do",
    method: "post",
    data: data,
  });
}

export function queryApplicationFormDetails(data) {
  return request({
    url: "/xp/billExamine/queryApplicationFormDetails.do",
    method: "post",
    data: data,
  });
}

export function queryPaidApplicationForms(data) {
  return request({
    url: "/xp/billExamine/queryPaidApplicationForms.do",
    method: "post",
    data: data,
  });
}

export function updateApplyBillSuccess(data) {
  return request({
    url: "/xp/billExamine/updateApplyBillSuccess.do",
    method: "post",
    data: data,
  });
}

export function updateApplyBillFail(data) {
  return request({
    url: "/xp/billExamine/updateApplyBillFail.do",
    method: "post",
    data: data,
  });
}

export function updatePaidApplyBillSuccess(data) {
  return request({
    url: "/xp/billExamine/updatePaidApplyBillSuccess.do",
    method: "post",
    data: data,
  });
}

export function updatePaidApplyBillFail(data) {
  return request({
    url: "/xp/billExamine/updatePaidApplyBillFail.do",
    method: "post",
    data: data,
  });
}
//取消审核
export function updateApplyBillCancelApi(data) {
  return request({
    url: "/xp/billExamine/updateApplyBillCancel.do",
    method: "post",
    data: data,
  });
}
//已收款开票--取消审核
export function updateApplyBillCancelReceivedApi(data) {
  return request({
    url: "/xp/billExamine/updatePaidApplyBillCancel.do",
    method: "post",
    data: data,
  });
}

//取消申请
export function checkbillCancelApplyApi(data) {
  return request({
    url: "/xp/billExamine/xpNoPayCancelApply.do",
    method: "post",
    data: data,
  });
}

//已收款开票--取消申请
export function checkbillCancelApplyReceivedApi(data) {
  return request({
    url: "/xp/billExamine/xpPayCancelApply.do",
    method: "post",
    data: data,
  });
}

export function queryInvoiceDetaile(data) {
  return request({
    url: "/xp/billExamine/queryInvoiceDetaile.do",
    method: "post",
    data: data,
  });
}

export function queryPartition(data) {
  return request({
    url: "/util/queryPartition.do",
    method: "post",
    data: data,
  });
}

export function queryBuildingMessage(data) {
  return request({
    url: "/util/queryBuildingMessage.do",
    method: "post",
    data: data,
  });
}

export function queryRoomMessage(data) {
  return request({
    url: "/util/queryRoomMessage.do",
    method: "post",
    data: data,
  });
}

export function unpaidInvoice(data) {
  return request({
    url: "/xp/xpPropertyInvoice/unpaidInvoice.do",
    method: "post",
    data: data,
  });
}

export function paidInvoice(data) {
  return request({
    url: "/xp/xpPropertyInvoice/paidInvoice.do",
    method: "post",
    data: data,
  });
}

export function queryXPAllPayItems(data) {
  return request({
    url: "/util/queryXPAllPayItems.do",
    method: "post",
    data: data,
  });
}

export function queryClientForRoom(data) {
  return request({
    url: "/util/queryClientForRoom.do",
    method: "post",
    data: data,
  });
}

export function getXpInvoiceApplyCheck(data) {
  return request({
    url: "/xp/billExamine/getXpInvoiceApplyCheck.do",
    method: "post",
    data: data,
  });
}

export function queryPayingItemsByForceTotal(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryPayingItemsByForceTotal.do",
    method: "post",
    data: data,
  });
}

export function queryBillNumber(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryBillNumber.do",
    method: "post",
    data: data,
  });
}

export function queryResourceCode(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryResourceCode.do",
    method: "post",
    data: data,
  });
}

export function queryTaxpayerInformation(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryTaxpayerInformation.do",
    method: "post",
    data: data,
  });
}

export function unpaidInvoiceNew(data) {
  return request({
    url: "/xp/xpPropertyInvoice/unpaidInvoiceNew.do",
    method: "post",
    data: data,
  });
}

export function paidInvoiceNew(data) {
  return request({
    url: "/xp/xpPropertyInvoice/paidInvoiceNew.do",
    method: "post",
    data: data,
  });
}

export function queryBillTypes(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryBillType.do",
    method: "post",
    data: data,
  });
}

export function queryBillBook(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryBillBook.do",
    method: "post",
    data: data,
  });
}

export function queryBillNumberNew(data) {
  return request({
    url: "/xp/xpPropertyInvoice/queryBillNumberNew.do",
    method: "post",
    data: data,
  });
}

export function xpApplyNoPayCancellation(data) {
  return request({
    url: "/xp/billExamine/xpApplyNoPayCancellation.do",
    method: "post",
    data: data,
  });
}

export function xpApplyPayCancellation(data) {
  return request({
    url: "/xp/billExamine/xpApplyPayCancellation.do",
    method: "post",
    data: data,
  });
}

export function queryUncollectedConfirmApplyBill(data) {
  return request({
    url: "/xp/billApply/queryUncollectedConfirmApplyBill.do",
    method: "post",
    data: data,
  });
}

export function queryDefaultMethod(data) {
  return request({
    url: "/uncollectedFees/queryDefaultMethod.do",
    method: "post",
    data: data,
  });
}

export function InvoiceInformationImport(obj) {
  return request({
    url: "/xp/auditInvoiceInformation/InvoiceInformationImport.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

export function queryClientByNull(data) {
  return request({
    url: "/util/queryClientByNull.do",
    method: "post",
    data: data,
  });
}

//查询导航树
export function queryOrgTreeHaveClientApi() {
  return request({
    url: "/util/queryOrgTreeHaveClient.do",
    method: "post",
    data: {},
  });
}

//开票资料审核--新增
export function insertInvoiceInformationkpDataApi(obj, arr1, arr2) {
  return request({
    url: "/xp/auditInvoiceInformation/insertInvoiceInformation.do",
    method: "post",
    data: {
      invoiceNsrmc: obj.invoiceNsrmc,
      invoiceNsrsbh: obj.invoiceNsrsbh,
      invoiceKhhjzh: obj.invoiceKhhjzh,
      invoiceNsrdzdh: obj.invoiceNsrdzdh,
      startDate: obj.startDate,
      endDate: obj.endDate,
      invoiceRemindDate: obj.invoiceRemindDate,
      invoiceIsRemind: obj.invoiceIsRemind,
      invoiceIsUsable: obj.invoiceIsUsable,
      invoiceKhdawj: arr1.join(","),
      invoiceKhmc: arr2.join(","),
    },
  });
}
//开票资料审核--修改
export function updateInvoiceInformationkpDataApi(obj) {
  return request({
    url: "/xp/auditInvoiceInformation/updateInvoiceInformation.do",
    method: "post",
    data: {
      invoiceNsrmc: obj.invoiceNsrmc,
      invoiceNsrsbh: obj.invoiceNsrsbh,
      invoiceKhhjzh: obj.invoiceKhhjzh,
      invoiceNsrdzdh: obj.invoiceNsrdzdh,
      startDate: obj.startDate,
      endDate: obj.endDate,
      invoiceRemindDate: obj.invoiceRemindDate,
      invoiceIsRemind: obj.invoiceIsRemind,
      invoiceIsUsable: obj.invoiceIsUsable,
      invoiceId: obj.invoiceId,
    },
  });
}
