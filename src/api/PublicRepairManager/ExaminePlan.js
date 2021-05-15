//公维金管理 审核方案
import request from "@/utils/Request";

//审核方案列表查询
export function queryMaintenanceProposal(obj) {
  return request({
    url: "/auditPlan/queryMaintenanceProposal.do",
    method: "post",
    data: {},
  });
}

//审核方案通过
export function examinationPassed(obj) {
  return request({
    url: "/auditPlan/examinationPassed.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ,
      WXFA_SHBZ: obj.WXFA_SHBZ,
      WXFA_SPYJ: obj.WXFA_SPYJ,
    },
  });
}

//审核方案不通过
export function examinationNotPassed(obj) {
  return request({
    url: "/auditPlan/examinationNotPassed.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ,
      WXFA_SPWTGYY: obj.WXFA_SPWTGYY,
      WXFA_SHBZ: obj.WXFA_SHBZ,
      WXFA_SPYJ: obj.WXFA_SPYJ,
    },
  });
}

//审核方案对应的申请单维修登记查询
export function queryMaintenanceRegistration(WXFA_ZJ) {
  return request({
    url: "/auditPlan/queryMaintenanceRegistration.do",
    method: "post",
    data: {
      WXFA_ZJ: WXFA_ZJ,
    },
  });
}

//审核核方案对应的申请单维修单查询
export function getRepairOrder(WXDJ_ZJ) {
  return request({
    url: "/auditPlan/getRepairOrder.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}
