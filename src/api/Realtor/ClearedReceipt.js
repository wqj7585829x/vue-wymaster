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
      contractId: obj.FYSQ_HTWJ ? obj.FYSQ_HTWJ : "",
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

//已收清费用列表查询
export function queryClearedChargeApi(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryClearedCharge.do",
    method: "post",
    data: {
      FYSQ_HTWJ: obj.FYSQ_HTWJ,
      FJDA_ZJ: obj.FJDA_ZJ,
      KHDA_ZJ: obj.KHDA_ZJ,
      startTime: obj.startTime,
      endTime: obj.endTime,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
