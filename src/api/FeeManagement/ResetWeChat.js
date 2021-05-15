import request from "@/utils/Request";

export function queryWYPayDetail(data) {
  return request({
    url: "/payment/queryWYPayDetail.do",
    method: "post",
    data: data,
  });
}

export function updatePCWYPaystatus(data) {
  return request({
    url: "/payment/updatePCWYPaystatus.do",
    method: "post",
    data: data,
  });
}
