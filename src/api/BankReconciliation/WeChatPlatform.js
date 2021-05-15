import request from "@/utils/Request";

export function queryPlotSubscribeBill(data) {
  return request({
    url: "/dz/wechatReconciliation/queryPlotSubscribeBill.do",
    method: "post",
    data: data,
  });
}

export function queryPlotVoucher(data) {
  return request({
    url: "/dz/wechatReconciliation/queryPlotVoucher.do",
    method: "post",
    data: data,
  });
}

export function queryPlotVoucherDetaile(data) {
  return request({
    url: "/dz/wechatReconciliation/queryPlotVoucherDetaile.do",
    method: "post",
    data: data,
  });
}

export function updateSubscribeDetailTOConfirm(data) {
  return request({
    url: "/dz/wechatReconciliation/updateSubscribeDetailTOConfirm.do",
    method: "post",
    data: data,
  });
}

export function updateSubscribeDetailTOExamine(data) {
  return request({
    url: "/dz/wechatReconciliation/updateSubscribeDetailTOExamine.do",
    method: "post",
    data: data,
  });
}

export function getMaxImportDate(data) {
  return request({
    url: "/dz/wechatReconciliation/getMaxImportDate.do",
    method: "post",
    data: data,
  });
}

export function exportPlotSubscribeBill(data) {
  return request({
    url: "/dz/wechatReconciliation/exportPlotSubscribeBill.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
