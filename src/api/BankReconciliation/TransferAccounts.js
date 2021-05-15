import request from "@/utils/Request";

export function querySubscribeBillByPlot(data) {
  return request({
    url: "/DZ/transferAccountsManagement/querySubscribeBillByPlot.do",
    method: "post",
    data: data,
  });
}

export function queryChargingVoucherByPlot(data) {
  return request({
    url: "/DZ/transferAccountsManagement/queryChargingVoucherByPlot.do",
    method: "post",
    data: data,
  });
}

export function queryChargingVoucherDetailsByPlot(data) {
  return request({
    url: "/DZ/transferAccountsManagement/queryChargingVoucherDetailsByPlot.do",
    method: "post",
    data: data,
  });
}

export function queryAccountRecognitionList(data) {
  return request({
    url: "/DZ/transferAccountsManagement/queryAccountRecognitionList.do",
    method: "post",
    data: data,
  });
}

export function accountRecognition(data) {
  return request({
    url: "/DZ/transferAccountsManagement/accountRecognition.do",
    method: "post",
    data: data,
  });
}

export function subscriptionConfirmation(data) {
  return request({
    url: "/DZ/transferAccountsManagement/subscriptionConfirmation.do",
    method: "post",
    data: data,
  });
}

export function subscriptionCancellation(data) {
  return request({
    url: "/DZ/transferAccountsManagement/subscriptionCancellation.do",
    method: "post",
    data: data,
  });
}

export function getMaxImportDate(data) {
  return request({
    url: "/DZ/transferAccountsManagement/getMaxImportDate.do",
    method: "post",
    data: data,
  });
}

export function exportSubscribeBillByPlot(data) {
  return request({
    url: "/DZ/transferAccountsManagement/exportSubscribeBillByPlot.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
