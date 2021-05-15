import request from "@/utils/Request";
//房间号查询
export function queryZLRoomApi(obj) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      contractId: obj.contractId ? obj.contractId : "",
    },
  });
}

//合同编码查询
export function queryContractListApi(obj) {
  return request({
    url: "/util/queryContractList.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//客户名称查询
export function queryClientsApi(obj) {
  return request({
    url: "/util/queryClients.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FJDA_ZJ: obj.FJDA_ZJ,
    },
  });
}

//违约金列表查询
export function queryListApi(obj) {
  return request({
    url: "/ZL/liquidateDamages/query.do",
    method: "post",
    data: {
      roomId: obj.roomId,
      contractId: obj.contractId,
      customerId: obj.customerId,
      startTime: obj.startTime,
      endTime: obj.endTime,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//违约金交款
export function addApi(obj) {
  return request({
    url: "/ZL/liquidateDamages/add.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      customerId: obj.customerId,
      contractId: obj.contractId,
      roomId: obj.roomId,
      penaltySort: obj.penaltySort,
      penaltyEvent: obj.penaltyEvent,
      penaltyType: obj.penaltyType,
      penaltyMoney: obj.penaltyMoney,
      payDate: obj.payDate,
      remark: obj.remark,
      status: obj.status,
    },
  });
}

//违约金交款
export function updateStatusApi(obj, penaltyId) {
  return request({
    url: "/ZL/liquidateDamages/updateStatus.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      penaltyId: penaltyId,
    },
  });
}
