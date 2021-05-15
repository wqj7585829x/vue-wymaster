import request from "@/utils/Request";

export function queryPartition() {
  return request({
    url: "/util/queryPartition.do",
    method: "post",
    data: {},
  });
}

export function queryBuildingMessage(obj) {
  return request({
    url: "/util/queryBuildingMessage.do",
    method: "post",
    data: obj,
  });
}

export function queryAllPayItems(obj) {
  return request({
    url: "/util/queryAllPayItems.do",
    method: "post",
    data: obj,
  });
}

export function queryCostDetails(obj) {
  return request({
    url: "/generalReport/queryCostDetails.do",
    method: "post",
    data: obj,
  });
}

export function queryCostTotal(obj) {
  return request({
    url: "/generalReport/queryCostTotal.do",
    method: "post",
    data: obj,
  });
}

export function exportCostDetails(data) {
  return request({
    url: "/generalReport/exportCostDetails.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryClientAll(obj) {
  return request({
    url: "/util/queryClientAll.do",
    method: "post",
    data: obj,
  });
}

export function queryDistinctBuildingNames(obj) {
  return request({
    url: "/util/queryDistinctBuildingNames.do",
    method: "post",
    data: obj,
  });
}
