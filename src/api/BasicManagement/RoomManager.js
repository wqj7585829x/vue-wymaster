// 房间管理
import request from "@/utils/Request";

//房间审核查询
export function queryRoomAudit(obj) {
  return request({
    url: "/roomAudit/queryRoomAudit.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      STATE: obj.STATE == 3 ? "" : obj.STATE,
      FJSH_SQRSJH: obj.FJSH_SQRSJH,
      FJSH_SQSJ_begin: obj.FJSH_SQSJ_begin,
      FJSH_SQSJ_end: obj.FJSH_SQSJ_end,
      FJSH_SFZH: obj.FJSH_SFZH,
      FJSH_FJMC: obj.FJSH_FJMC,
    },
  });
}

//房间审核未通过
export function auditNoPass(list) {
  return request({
    url: "/roomAudit/auditNoPass.do",
    method: "post",
    data: {
      data: JSON.stringify(list),
    },
  });
}

//房间审核通过
export function auditPass(list) {
  return request({
    url: "/roomAudit/auditPass.do",
    method: "post",
    data: {
      data: JSON.stringify(list),
    },
  });
}
//房间审核回退
export function cancelRoomAuditApi(list) {
  return request({
    url: "/roomAudit/cancelRoomAudit.do",
    method: "post",
    data: {
      data: JSON.stringify(list),
    },
  });
}
