import request from "@/utils/Request";

//查询列表
export function queryLessorInformationApi(obj) {
  return request({
    url: "/ZL/LessorInformation/queryLessorInformation.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      taxpayer_identifier: obj.taxpayer_identifier,
      company_phone: obj.company_phone,
      company_name: obj.company_name,
      plotId: obj.plotId,
      lessor_type: obj.lessor_type,
      lessor_identifier: obj.lessor_identifier,
    },
  });
}

//新增
export function addLessorInformationApi(obj) {
  return request({
    url: "/ZL/LessorInformation/addLessorInformation.do",
    method: "post",
    data: {
      bank_name: obj.bank_name,
      company_address: obj.company_address,
      company_name: obj.company_name,
      company_phone: obj.company_phone,
      legal_representative: obj.legal_representative,
      receivingn_account: obj.receivingn_account,
      taxpayer_identifier: obj.taxpayer_identifier,
      dbName: obj.dbName,
      plotId: obj.plotId,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      lessor_type: obj.lessor_type,
      lessor_identifier: obj.lessor_identifier,
    },
  });
}

//修改
export function updateLessorInformationApi(obj) {
  return request({
    url: "/ZL/LessorInformation/updateLessorInformation.do",
    method: "post",
    data: {
      bank_name: obj.bank_name,
      company_address: obj.company_address,
      company_name: obj.company_name,
      company_phone: obj.company_phone,
      legal_representative: obj.legal_representative,
      receivingn_account: obj.receivingn_account,
      taxpayer_identifier: obj.taxpayer_identifier,
      dbName: obj.dbName,
      plotId: obj.plotId,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
      lessor_id: obj.lessor_id,
      lessor_type: obj.lessor_type,
      lessor_identifier: obj.lessor_identifier,
    },
  });
}

//删除修改
export function deleteLessorInformationApi(obj) {
  return request({
    url: "/ZL/LessorInformation/deleteLessorInformation.do",
    method: "post",
    data: {
      lessor_id: obj.lessor_id,
      dbName: obj.dbName,
    },
  });
}

//设置默人出租方
export function defaultSettingsApi(obj) {
  return request({
    url: "/ZL/LessorInformation/defaultSettings.do",
    method: "post",
    data: {
      lessor_id: obj.lessor_id,
      dbName: obj.dbName,
      YXDID: obj.YXDID,
      GLCID: obj.GLCID,
    },
  });
}
