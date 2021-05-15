import request from "@/utils/Request";

export function queryposCreditCheck(data) {
  return request({
    url: "/DZ/posCreditCheck/queryposCreditCheck.do",
    method: "post",
    data: data,
  });
}

export function queryposCreditCheckTotal(data) {
  return request({
    url: "/DZ/posCreditCheck/queryposCreditCheckTotal.do",
    method: "post",
    data: data,
  });
}

export function recogniseConfirmation(data) {
  return request({
    url: "/DZ/posCreditCheck/recogniseConfirmation.do",
    method: "post",
    data: data,
  });
}

export function stoneToCancel(data) {
  return request({
    url: "/DZ/posCreditCheck/stoneToCancel.do",
    method: "post",
    data: data,
  });
}

export function queryVoucherDetail(data) {
  return request({
    url: "/DZ/posCreditCheck/queryVoucherDetail.do",
    method: "post",
    data: data,
  });
}

export function queryDetail(data) {
  return request({
    url: "/DZ/posCreditCheck/queryDetail.do",
    method: "post",
    data: data,
  });
}

export function queryBankPulldownSelect(data) {
  return request({
    url: "/util/queryBankPulldownSelect.do",
    method: "post",
    data: {},
  });
}

export function queryVoucher(data) {
  return request({
    url: "/DZ/posCreditCheck/queryVoucher.do",
    method: "post",
    data: data,
  });
}

export function confirmTheStone(data) {
  return request({
    url: "/DZ/posCreditCheck/confirmTheStone.do",
    method: "post",
    data: data,
  });
}

export function queryImportDate(data) {
  return request({
    url: "/DZ/posCreditCheck/queryImportDate.do",
    method: "post",
    data: data,
  });
}

export function queryPaymentMethod(data) {
  return request({
    url: "/uncollectedFees/queryPaymentMethod.do",
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

export function exportPosCreditCheck(data) {
  return request({
    url: "/DZ/posCreditCheck/exportPosCreditCheck.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryClientForRoom(data) {
  return request({
    url: "/util/queryClientByNull.do",
    method: "post",
    data: data,
  });
}
