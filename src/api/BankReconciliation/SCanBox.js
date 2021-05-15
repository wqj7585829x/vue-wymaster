import request from "@/utils/Request";

export function queryScanCodeBoxCheck(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/queryScanCodeBoxCheck.do",
    method: "post",
    data: data,
  });
}

export function getScanCodeBoxCheckSum(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/getScanCodeBoxCheckSum.do",
    method: "post",
    data: data,
  });
}

export function confirmCheck(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/confirmCheck.do",
    method: "post",
    data: data,
  });
}

export function cancelCheck(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/cancelCheck.do",
    method: "post",
    data: data,
  });
}

export function queryPayingVoucher(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/queryPayingVoucher.do",
    method: "post",
    data: data,
  });
}

export function queryPayingProveDetails(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/queryPayingProveDetails.do",
    method: "post",
    data: data,
  });
}

export function queryUnmatchPayingVoucher(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/queryUnmatchPayingVoucher.do",
    method: "post",
    data: data,
  });
}

export function register(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/register.do",
    method: "post",
    data: data,
  });
}

export function queryImportDate() {
  return request({
    url: "/dz/scanCodeBoxCheck/queryImportDate.do",
    method: "post",
    data: {},
  });
}

export function exportReconciliationList(data) {
  return request({
    url: "/dz/scanCodeBoxCheck/exportReconciliationList.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
