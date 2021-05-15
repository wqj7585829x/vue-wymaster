import request from "@/utils/Request";

//应收列表
export function queryReceivableCostListApi(obj, dbList) {
  return request({
    url: "/ZL/receivableManagement/queryReceivableCostList.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_FJMC: obj.FJDA_FJMC ? obj.FJDA_FJMC : "",
      contractNum: obj.contractNum ? obj.contractNum : "",
      KHDA_KHMC: obj.KHDA_KHMC ? obj.KHDA_KHMC : "",
      FYSQ_SSNY_start: obj.FYSQ_SSNY_start ? obj.FYSQ_SSNY_start : "",
      FYSQ_SSNY_end: obj.FYSQ_SSNY_end ? obj.FYSQ_SSNY_end : "",
      dbList: JSON.stringify(dbList),
    },
  });
}
//调整列表
export function queryAdjustFeeListApi(obj, dbList) {
  return request({
    url: "/ZL/receivableManagement/queryAdjustFeeList.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_FJMC: obj.FJDA_FJMC ? obj.FJDA_FJMC : "",
      contractNum: obj.contractNum ? obj.contractNum : "",
      KHDA_KHMC: obj.KHDA_KHMC ? obj.KHDA_KHMC : "",
      FYSQ_SSNY_start: obj.FYSQ_SSNY_start ? obj.FYSQ_SSNY_start : "",
      FYSQ_SSNY_end: obj.FYSQ_SSNY_end ? obj.FYSQ_SSNY_end : "",
      dbList: JSON.stringify(dbList),
    },
  });
}
//收费项目查询
export function queryZLChargeItemApi(obj) {
  return request({
    url: "/util/queryZLChargeItem.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//新增调整费用
export function addReceivableApi(obj) {
  return request({
    url: "/ZL/receivableManagement/addReceivable.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_TZNY: obj.FYSQ_TZNY ? obj.FYSQ_TZNY : "",
      FYSQ_KHDAWJ: obj.FYSQ_KHDAWJ ? obj.FYSQ_KHDAWJ : "",
      FYSQ_FJDAWJ: obj.FYSQ_FJDAWJ ? obj.FYSQ_FJDAWJ : "",
      FYSQ_HTWJ: obj.FYSQ_HTWJ ? obj.FYSQ_HTWJ : "",
      FYSQ_YSJE: obj.FYSQ_YSJE ? obj.FYSQ_YSJE : "",
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ ? obj.FYSQ_SFXMWJ : "",
      FYSQ_SFXMMC: obj.FYSQ_SFXMMC ? obj.FYSQ_SFXMMC : "",
    },
  });
}
//修改调整费用
export function updateReceivableApi(obj) {
  return request({
    url: "/ZL/receivableManagement/updateReceivable.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_TZNY: obj.FYSQ_TZNY ? obj.FYSQ_TZNY : "",
      FYSQ_KHDAWJ: obj.FYSQ_KHDAWJ ? obj.FYSQ_KHDAWJ : "",
      FYSQ_FJDAWJ: obj.FYSQ_FJDAWJ ? obj.FYSQ_FJDAWJ : "",
      FYSQ_HTWJ: obj.FYSQ_HTWJ ? obj.FYSQ_HTWJ : "",
      FYSQ_YSJE: obj.FYSQ_YSJE ? obj.FYSQ_YSJE : "",
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ ? obj.FYSQ_SFXMWJ : "",
      FYSQ_SFXMMC: obj.FYSQ_SFXMMC ? obj.FYSQ_SFXMMC : "",
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}
//删除调整费用
export function deleteReceivableApi(obj) {
  return request({
    url: "/ZL/receivableManagement/deleteReceivable.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}
//房间名称查询
export function queryZLRoomApi(obj, dbList) {
  return request({
    url: "/ZL/receivableManagement/queryZLRoom.do",
    method: "post",
    data: {
      dbList: JSON.stringify(dbList),
      contract_num: obj.contractNum ? obj.contractNum : "",
    },
  });
}

//合同编码查询
export function queryAllChargeItemApi(dbList) {
  return request({
    url: "/ZL/receivableManagement/queryContractList.do",
    method: "post",
    data: {
      dbList: JSON.stringify(dbList),
    },
  });
}

//实际应收列表查询
export function queryRealReceivableCostListApi(obj, dbList) {
  return request({
    url: "/ZL/receivableManagement/queryRealReceivableCostList.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_FJMC: obj.FJDA_FJMC ? obj.FJDA_FJMC : "",
      contractNum: obj.contractNum ? obj.contractNum : "",
      KHDA_KHMC: obj.KHDA_KHMC ? obj.KHDA_KHMC : "",
      FYSQ_SSNY_start: obj.FYSQ_SSNY_start ? obj.FYSQ_SSNY_start : "",
      FYSQ_SSNY_end: obj.FYSQ_SSNY_end ? obj.FYSQ_SSNY_end : "",
      dbList: JSON.stringify(dbList),
    },
  });
}

//调整列表审核
export function auditReceivableApi(obj) {
  return request({
    url: "/ZL/receivableManagement/auditReceivable.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}

//确认本月应收
export function freezeApi(obj) {
  return request({
    url: "/ZL/receivableManagement/freeze.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}
