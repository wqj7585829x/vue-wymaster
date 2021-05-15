//公维金管理 维修方案
import request from "@/utils/Request";

//维修方案列表查询
export function queryMaintenanceProposal(obj) {
  return request({
    url: "/maintenanceProposal/queryMaintenanceProposal.do",
    method: "post",
    data: {
      KSRQ: obj.KSRQ,
      JSRQ: obj.JSRQ,
      keyword: obj.keyword,
      ZT: obj.ZT,
    },
  });
}

//维修方案对应申请单查询
export function queryRequisition(WXFA_ZJ) {
  return request({
    url: "/maintenanceProposal/queryRequisition.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}

//业主签字查询
export function queryOwnerSignature(WXFA_ZJ) {
  return request({
    url: "/maintenanceProposal/queryOwnerSignature.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}

//新增时，对应申请单列表查询
export function queryNewRequisition(obj) {
  return request({
    url: "/maintenanceProposal/queryNewRequisition.do",
    method: "post",
    data: {
      KSRQ: obj.KSRQ,
      JSRQ: obj.JSRQ,
      keyword: obj.keyword,
    },
  });
}

//新增时，对应申请单模糊搜索下拉框列表查询
export function queryProjectDropDownBox() {
  return request({
    url: "/maintenanceProposal/queryProjectDropDownBox.do",
    method: "post",
    data: {},
  });
}

//分摊标准下拉框
export function queryDistributionMethod() {
  return request({
    url: "/maintenanceProposal/queryDistributionMethod.do",
    method: "post",
    data: {},
  });
}

//新增维修方案
export function addMaintenanceProposal(obj, list) {
  return request({
    url: "/maintenanceProposal/addMaintenanceProposal.do",
    method: "post",
    data: {
      WXFA_BZRQ: obj.WXFA_BZRQ,
      WXFA_NO: obj.WXFA_NO,
      WXFA_BZR: obj.WXFA_BZR,
      WXFA_FASM: obj.WXFA_FASM,
      WXFA_XCCKJL: obj.WXFA_XCCKJL ? obj.WXFA_XCCKJL : null,
      WXFA_YSFY: obj.WXFA_YSFY ? obj.WXFA_YSFY : 0,
      WXFA_YZWYYJ: obj.WXFA_YZWYYJ ? obj.WXFA_YZWYYJ : null,
      WXFA_YZWYQM: obj.WXFA_YZWYQM ? obj.WXFA_YZWYQM : null,
      WXFA_GLCQM: obj.WXFA_GLCQM ? obj.WXFA_GLCQM : null,
      WXFA_GCBQM: obj.WXFA_GCBQM ? obj.WXFA_GCBQM : null,
      WXFA_YZFY: obj.WXFA_YZFY ? obj.WXFA_YZFY : 0,
      WXFA_BZ: obj.WXFA_BZ ? obj.WXFA_BZ : null,
      WXFA_YSR: obj.WXFA_YSR ? obj.WXFA_YSR : null,
      WXFA_FTBZ: obj.WXFA_FTBZ ? obj.WXFA_FTBZ : null,
      list: JSON.stringify(list),
    },
  });
}

//新增时维修方案编号查询
export function maintenancePlanNumberGeneration(obj, list) {
  return request({
    url: "/numberGeneration/maintenancePlanNumberGeneration.do",
    method: "post",
    data: {},
  });
}

//修改维修方案
export function updateMaintenanceProposal(obj, list) {
  return request({
    url: "/maintenanceProposal/updateMaintenanceProposal.do",
    method: "post",
    data: {
      WXFA_BZRQ: obj.WXFA_BZRQ,
      WXFA_NO: obj.WXFA_NO,
      WXFA_BZR: obj.WXFA_BZR,
      WXFA_FASM: obj.WXFA_FASM,
      WXFA_XCCKJL: obj.WXFA_XCCKJL ? obj.WXFA_XCCKJL : null,
      WXFA_YSFY: obj.WXFA_YSFY,
      WXFA_YZWYYJ: obj.WXFA_YZWYYJ ? obj.WXFA_YZWYYJ : null,
      WXFA_YZWYQM: obj.WXFA_YZWYQM ? obj.WXFA_YZWYQM : null,
      WXFA_GLCQM: obj.WXFA_GLCQM ? obj.WXFA_GLCQM : null,
      WXFA_GCBQM: obj.WXFA_GCBQM ? obj.WXFA_GCBQM : null,
      WXFA_YZFY: obj.WXFA_YZFY ? obj.WXFA_YZFY : 0,
      WXFA_BZ: obj.WXFA_BZ ? obj.WXFA_BZ : null,
      WXFA_YSR: obj.WXFA_YSR ? obj.WXFA_YSR : null,
      WXFA_FTBZ: obj.WXFA_FTBZ ? obj.WXFA_FTBZ : null,
      WXFA_ZJ: obj.WXFA_ZJ,
      list: JSON.stringify(list),
    },
  });
}
//删除维修方案
export function deleteMaintenanceProposal(WXFA_ZJ) {
  return request({
    url: "/maintenanceProposal/deleteMaintenanceProposal.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}
//总的业主签字查询
export function queryOwnerList(WXFA_ZJ) {
  return request({
    url: "/maintenanceProposal/queryOwnerList.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}

//业主签字保存
export function saveOwnerSignature(WXFA_ZJ, list) {
  return request({
    url: "/maintenanceProposal/saveOwnerSignature.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
      list: JSON.stringify(list),
    },
  });
}

//提交审核
export function submitApproval(WXFA_ZJ) {
  return request({
    url: "/maintenanceProposal/submitApproval.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}
