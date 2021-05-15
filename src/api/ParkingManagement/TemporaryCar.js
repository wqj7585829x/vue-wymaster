import request from "@/utils/Request";

export function queryTemporaryCarPage(data) {
  return request({
    url: "/carManagement/queryTemporaryCarPage.do",
    method: "post",
    data: data,
  });
}

export function updTemporaryCar(data) {
  return request({
    url: "/carManagement/updTemporaryCar.do",
    method: "post",
    data: data,
  });
}

export function delTemporaryCar(data) {
  return request({
    url: "/carManagement/delTemporaryCar.do",
    method: "post",
    data: {
      carId: data.carId,
    },
  });
}

export function queryTemporaryCarRecordPage(data) {
  return request({
    url: "/carManagement/queryTemporaryCarRecordPage.do",
    method: "post",
    data: data,
  });
}

export function queryMonthlyCarPage(data) {
  return request({
    url: "/carManagement/queryMonthlyCarPage.do",
    method: "post",
    data: data,
  });
}

export function queryPaymentType() {
  return request({
    url: "/customerProfile/queryPaymentType.do",
    method: "post",
  });
}

export function queryGateName() {
  return request({
    url: "/customerProfile/queryGateName.do",
    method: "post",
  });
}

export function updateMonthlyCar(data) {
  var obj = JSON.parse(JSON.stringify(data));
  obj.CLXX_ZT = data.CLXX_ZT ? 1 : 0;
  return request({
    url: "/carManagement/updateMonthlyCar.do",
    method: "post",
    data: obj,
  });
}

export function deleteMonthlyCar(data) {
  return request({
    url: "/carManagement/deleteMonthlyCar.do",
    method: "post",
    data: {
      CLXX_ZJ: data.CLXX_ZJ,
    },
  });
}

export function queryNewMonthlyCarRecordPage(data) {
  return request({
    url: "/carManagement/queryNewMonthlyCarRecordPage.do",
    method: "post",
    data: data,
  });
}

export function queryCarMessage(data) {
  return request({
    url: "/customerProfile/queryCarMessage.do",
    method: "post",
    data: {
      FKGX_ZJ: data,
    },
  });
}

export function insertCarMessage(data) {
  return request({
    url: "/customerProfile/insertCarMessage.do",
    method: "post",
    data: data,
  });
}

export function updateCarMessage(data) {
  return request({
    url: "/customerProfile/updateCarMessage.do",
    method: "post",
    data: data,
  });
}

export function deleteCarMessage(data) {
  return request({
    url: "/customerProfile/deleteCarMessage.do",
    method: "post",
    data: data,
  });
}

export function getMonthlyCarTotalMoney(data) {
  return request({
    url: "/carManagement/getMonthlyCarTotalMoney.do",
    method: "post",
    data: {},
  });
}

export function getTemporaryCarTotalMoney(data) {
  return request({
    url: "/carManagement/getTemporaryCarTotalMoney.do",
    method: "post",
    data: {},
  });
}

export function exportTemporaryCar(data) {
  return request({
    url: "/carManagement/exportTemporaryCar.do",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
