import request from "@/utils/Request";

export function queryUnmatchReconciliation(data) {
  return request({
    url: "/DZ/unmatchReconciliation/queryUnmatchReconciliation.do",
    method: "post",
    data: data,
  });
}

export function queryUnmatchReconciliationTotal(data) {
  return request({
    url: "/DZ/unmatchReconciliation/queryUnmatchReconciliationTotal.do",
    method: "post",
    data: data,
  });
}

export function updateLockAmount(data) {
  return request({
    url: "/DZ/unmatchReconciliation/updateLockAmount.do",
    method: "post",
    data: data,
  });
}

export function recogniseConfirmation(data) {
  return request({
    url: "/DZ/unmatchReconciliation/recogniseConfirmation.do",
    method: "post",
    data: data,
  });
}

export function stoneToCancel(data) {
  return request({
    url: "/DZ/unmatchReconciliation/stoneToCancel.do",
    method: "post",
    data: data,
  });
}

export function queryVoucherDetail(data) {
  return request({
    url: "/DZ/unmatchReconciliation/queryVoucherDetail.do",
    method: "post",
    data: data,
  });
}

export function queryDetail(data) {
  return request({
    url: "/DZ/unmatchReconciliation/queryDetail.do",
    method: "post",
    data: data,
  });
}

export function queryPartition(data) {
  return request({
    url: "/util/queryPartition.do",
    method: "post",
    data: data,
  });
}

export function queryBuildingMessage(data) {
  return request({
    url: "/util/queryBuildingMessage.do",
    method: "post",
    data: data,
  });
}

export function queryRoomMessage(data) {
  return request({
    url: "/util/queryRoomMessage.do",
    method: "post",
    data: data,
  });
}

export function queryClientForRoom(data) {
  return request({
    url: "/util/queryClientForRoom.do",
    method: "post",
    data: data,
  });
}

export function queryAllPayItems(data) {
  return request({
    url: "/util/queryAllPayItems.do",
    method: "post",
    data: data,
  });
}

export function queryPaymentMethods(data) {
  return request({
    url: "/util/queryPaymentMethods.do",
    method: "post",
    data: data,
  });
}

export function addGatheringStone(data) {
  return request({
    url: "/DZ/unmatchReconciliation/addGatheringStone.do",
    method: "post",
    data: data,
  });
}

export function confirmTheStone(data) {
  return request({
    url: "/DZ/unmatchReconciliation/confirmTheStone.do",
    method: "post",
    data: data,
  });
}

export function queryPlotDb(data) {
  return request({
    url: "/util/queryPlotDb.do",
    method: "post",
    data: data,
  });
}

export function queryImportDate(data) {
  return request({
    url: "/DZ/unmatchReconciliation/queryImportDate.do",
    method: "post",
    data: data,
  });
}

export function unlocked(data) {
  return request({
    url: "/DZ/unmatchReconciliation/unlocked.do",
    method: "post",
    data: data,
  });
}

export function exportUnmatchReconciliation(data) {
  return request({
    url: "/DZ/unmatchReconciliation/exportUnmatchReconciliation.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
