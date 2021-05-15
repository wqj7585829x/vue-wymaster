import request from "@/utils/Request";

export function queryAPPCheck(data) {
  return request({
    url: "/dz/appCheck/queryAPPCheck.do",
    method: "post",
    data: data,
  });
}

export function getAPPCheckSum(data) {
  return request({
    url: "/dz/appCheck/getAPPCheckSum.do",
    method: "post",
    data: data,
  });
}

export function confirmCheck(data) {
  return request({
    url: "/dz/appCheck/confirmCheck.do",
    method: "post",
    data: data,
  });
}

export function cancelCheck(data) {
  return request({
    url: "/dz/appCheck/cancelCheck.do",
    method: "post",
    data: data,
  });
}

export function queryPayingVoucher(data) {
  return request({
    url: "/dz/appCheck/queryPayingVoucher.do",
    method: "post",
    data: data,
  });
}

export function queryPayingProveDetails(data) {
  return request({
    url: "/dz/appCheck/queryPayingProveDetails.do",
    method: "post",
    data: data,
  });
}
