import request from "@/utils/Request";

export function queryPlotsWithAuthority(data) {
  return request({
    url: "/zl/pricingTermSetting/queryPlotsWithAuthority.do",
    method: "post",
    data: data,
  });
}

export function insertEarlyWarning(data) {
  return request({
    url: "/ZL/EarlyWarning/insertEarlyWarning.do",
    method: "post",
    data: data,
  });
}

export function updateEarlyWarning(data) {
  return request({
    url: "/ZL/EarlyWarning/updateEarlyWarning.do",
    method: "post",
    data: data,
  });
}

export function deleteEarlyWarning(data) {
  return request({
    url: "/ZL/EarlyWarning/deleteEarlyWarning.do",
    method: "post",
    data: data,
  });
}

export function queryEarlyWarning(data) {
  return request({
    url: "/ZL/EarlyWarning/queryEarlyWarning.do",
    method: "post",
    data: data,
  });
}

export function queryContractEarlyWarning(data) {
  return request({
    url: "/ZL/EarlyWarning/queryContractEarlyWarning.do",
    method: "post",
    data: data,
  });
}
