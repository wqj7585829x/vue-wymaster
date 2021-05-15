// 访客登记审核
import request from "@/utils/Request";

export function queryBuilding() {
  return request({
    url: "/visitorRecord/queryBuilding.do",
    method: "post",
    data: {},
  });
}

export function queryRoom(data) {
  return request({
    url: "/visitorRecord/queryRoom.do",
    method: "post",
    data: data,
  });
}

//12.1.1.3.	访客审核查询
export function queryVisitorRecord(data) {
  return request({
    url: "/visitorRecord/queryVisitorRecord.do",
    method: "post",
    data: data,
  });
}

//12.1.1.4.	房间审核未通过
export function auditNoPass(data) {
  return request({
    url: "/visitorAudit/auditNoPass.do",
    method: "post",
    data: data,
  });
}

//12.1.1.5.	房间审核通过
export function auditPass(data) {
  return request({
    url: "/visitorAudit/auditPass.do",
    method: "post",
    data: data,
  });
}
