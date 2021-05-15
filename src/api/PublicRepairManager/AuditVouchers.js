//公维金管理 审核
import request from "@/utils/Request";

//非财务审核凭证查询
export function queryNoFinancial() {
  return request({
    url: "/auditdocument/queryNoFinancial.do",
    method: "post",
    data: {},
  });
}

//非财务审核凭证修改
export function updateNoFinancial(obj) {
  return request({
    url: "/auditdocument/updateNoFinancial.do",
    method: "post",
    data: {
      YFPZ_SPR: obj.YFPZ_SPR,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      YFPZ_SHBZ: obj.YFPZ_SHBZ,
      YFPZ_SPYJ: obj.YFPZ_SPYJ,
      YFPZ_SPSJ: obj.YFPZ_SPSJ,
    },
  });
}

//非财务审核凭证通过
export function updateNoFinancialPass(obj) {
  return request({
    url: "/auditdocument/updateNoFinancialPass.do",
    method: "post",
    data: {
      YFPZ_WXFAWJ: obj.YFPZ_WXFAWJ,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      YFPZ_XMLX: obj.YFPZ_XMLX,
      YFPZ_WXDJZJC: obj.YFPZ_WXDJZJC,
    },
  });
}

//非财务审核凭证不通过
export function updateNoFinancialNoPass(obj) {
  return request({
    url: "/auditdocument/updateNoFinancialNoPass.do",
    method: "post",
    data: {
      YFPZ_SPWTGYY: obj.YFPZ_SPWTGYY,
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}

//财务审核凭证查询
export function queryFinancial() {
  return request({
    url: "/auditdocument/queryFinancial.do",
    method: "post",
    data: {},
  });
}

//财务审核凭证修改
export function updateFinancial(obj) {
  return request({
    url: "/auditdocument/updateFinancial.do",
    method: "post",
    data: {
      YFPZ_CWSPR: obj.YFPZ_CWSPR,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      YFPZ_CWSHBZ: obj.YFPZ_CWSHBZ,
      YFPZ_CWSPYJ: obj.YFPZ_CWSPYJ,
      YFPZ_CWSPSJ: obj.YFPZ_CWSPSJ,
    },
  });
}

//非财务审核凭证通过
export function updateFinancialPass(obj) {
  return request({
    url: "/auditdocument/updateFinancialPass.do",
    method: "post",
    data: {
      YFPZ_WXFAWJ: obj.YFPZ_WXFAWJ,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      YFPZ_XMLX: obj.YFPZ_XMLX,
      YFPZ_WXDJZJC: obj.YFPZ_WXDJZJC,
    },
  });
}

//非财务审核凭证不通过
export function updateFinancialNoPass(obj) {
  return request({
    url: "/auditdocument/updateFinancialNoPass.do",
    method: "post",
    data: {
      YFPZ_SPWTGYY: obj.YFPZ_SPWTGYY,
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}
