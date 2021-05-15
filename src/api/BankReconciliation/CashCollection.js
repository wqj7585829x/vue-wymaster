import request from "@/utils/Request";

export function cashImport(obj) {
  return request({
    url: "/DZ/cashImportManagement/cashImport.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

export function cashAutoMatch(data) {
  return request({
    url: "/DZ/cashImportManagement/cashAutoMatch.do",
    method: "post",
    data: {},
  });
}

export function queryCashData(data) {
  return request({
    url: "/DZ/cashImportManagement/queryCashData.do",
    method: "post",
    data: data,
  });
}

export function addCashData(data) {
  return request({
    url: "/DZ/cashImportManagement/addCashData.do",
    method: "post",
    data: data,
  });
}

export function updateCashData(data) {
  return request({
    url: "/DZ/cashImportManagement/updateCashData.do",
    method: "post",
    data: data,
  });
}

export function deleteCashData(data) {
  return request({
    url: "/DZ/cashImportManagement/deleteCashData.do",
    method: "post",
    data: data,
  });
}

export function queryBuilding(data) {
  return request({
    url: "/DZ/cashImportManagement/queryBuilding.do",
    method: "post",
    data: data,
  });
}

export function queryRoom(data) {
  return request({
    url: "/DZ/cashImportManagement/queryRoom.do",
    method: "post",
    data: data,
  });
}

export function queryCustomer(data) {
  return request({
    url: "/DZ/cashImportManagement/queryCustomer.do",
    method: "post",
    data: data,
  });
}

export function queryReceiptMethod(data) {
  return request({
    url: "/DZ/cashImportManagement/queryReceiptMethod.do",
    method: "post",
    data: data,
  });
}

export function getMaxImportDate(data) {
  return request({
    url: "/DZ/cashImportManagement/getMaxImportDate.do",
    method: "post",
    data: data,
  });
}

export function downloadCash(data) {
  return request({
    url: "/DZ/cashImportManagement/downloadCash.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function exportCashData(data) {
  return request({
    url: "/DZ/cashImportManagement/exportCashData.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
