import request from "@/utils/Request";

export function queryAlipayAndWeChatCheck(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/queryAlipayAndWeChatCheck.do",
    method: "post",
    data: data,
  });
}

export function getAlipayAndWeChatCheckSum(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/getAlipayAndWeChatCheckSum.do",
    method: "post",
    data: data,
  });
}

export function confirmCheck(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/confirmCheck.do",
    method: "post",
    data: data,
  });
}

export function cancelCheck(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/cancelCheck.do",
    method: "post",
    data: data,
  });
}

export function queryPayingVoucher(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/queryPayingVoucher.do",
    method: "post",
    data: data,
  });
}

export function queryPayingProveDetails(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/queryPayingProveDetails.do",
    method: "post",
    data: data,
  });
}

export function queryUnmatchPayingVoucher(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/queryUnmatchPayingVoucher.do",
    method: "post",
    data: data,
  });
}

export function register(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/register.do",
    method: "post",
    data: data,
  });
}

export function queryImportDate() {
  return request({
    url: "/dz/alipayAndWeChatCheck/queryImportDate.do",
    method: "post",
    data: {},
  });
}

export function exportReconciliationList(data) {
  return request({
    url: "/dz/alipayAndWeChatCheck/exportReconciliationList.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
