//费用调整
import request from "@/utils/Request";

export function queryBatchAdjustmentList(data) {
  return request({
    url: "/batchAdjustment/queryBatchAdjustmentList.do",
    method: "post",
    data: data,
  });
}

export function queryAdjustResourceInformation(data) {
  return request({
    url: "/batchAdjustment/queryAdjustResourceInformation.do",
    method: "post",
    data: data,
  });
}

export function queryPayItemsList(data) {
  return request({
    url: "/batchAdjustment/queryPayItemsList.do",
    method: "post",
    data: data,
  });
}

export function insertBatchAdjustment(obj) {
  return request({
    url: "/batchAdjustment/insertBatchAdjustment.do",
    method: "post",
    data: obj,
    upload_type: true,
  });
}

export function updateBatchAdjustment(obj) {
  return request({
    url: "/batchAdjustment/updateBatchAdjustment.do",
    method: "post",
    data: obj,
    upload_type: true,
  });
}

export function deleteBatchAdjustment(data) {
  return request({
    url: "/batchAdjustment/deleteBatchAdjustment.do",
    method: "post",
    data: data,
  });
}

export function previewAdjustmentList(data) {
  return request({
    url: "/batchAdjustment/previewAdjustmentList.do",
    method: "post",
    data: data,
  });
}

export function submitAudit(data) {
  return request({
    url: "/batchAdjustment/submitAudit.do",
    method: "post",
    data: data,
  });
}

export function performAdjustment(data) {
  return request({
    url: "/batchAdjustment/performAdjustment.do",
    method: "post",
    data: data,
  });
}
