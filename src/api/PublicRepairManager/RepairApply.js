//公维金管理 维修申请
import request from "@/utils/Request";

//维修登记查询
export function queryRepairRegister(obj) {
  return request({
    url: "/repairApply/queryRepairRegister.do",
    method: "post",
    data: {
      beginDate: obj.beginDate,
      endDate: obj.endDate,
      ZT: obj.ZT,
      likeCondition: obj.likeCondition,
    },
  });
}

//维修单查询
export function queryRepairBill(WXDJ_ZJ) {
  return request({
    url: "/repairApply/queryRepairBill.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//工程进度查询
export function queryProjectProgress(WXDJ_ZJ) {
  return request({
    url: "/repairApply/queryProjectProgress.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//工程验收查询
export function queryProjectAcceptance(WXDJ_ZJ) {
  return request({
    url: "/repairApply/queryProjectAcceptance.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//获取维修单编号
export function getRepairBillNo(WXDJ_ZJ) {
  return request({
    url: "/repairApply/getRepairBillNo.do",
    method: "post",
    data: {},
  });
}

//新增维修申请
export function addRepairApply(obj) {
  return request({
    url: "/repairApply/addRepairApply.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      WXDJ_YSFY: obj.WXDJ_YSFY,
      WXDJ_KGSJ: obj.WXDJ_KGSJ,
      WXDJ_WGSJ: obj.WXDJ_WGSJ,
      WXDJ_WXJD: obj.WXDJ_WXJD,
      WXDJ_NO: obj.WXDJ_NO,
      WXD_NO: obj.WXD_NO,
      WXD_XMMC: obj.WXDJ_XMMC ? obj.WXDJ_XMMC : "",
      WXD_KDR: obj.WXD_KDR,
      WXD_KDSJ: obj.WXD_KDSJ,
      WXD_JDSJ: obj.WXD_JDSJ,
      WXD_KGSJ: obj.WXD_KGSJ,
      WXD_WGSJ: obj.WXD_WGSJ,
      WXD_YSFY: obj.WXD_YSFY ? obj.WXD_YSFY : 0,
      WXD_YYXWSJ: obj.WXD_YYXWSJ ? obj.WXD_YYXWSJ : null,
      WXD_JDR: obj.WXD_JDR ? obj.WXD_JDR : null,
      WXD_GCSM: obj.WXD_GCSM ? obj.WXD_GCSM : null,
    },
  });
}

//修改维修申请
export function updateRepairApply(obj) {
  return request({
    url: "/repairApply/updateRepairApply.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      WXDJ_YSFY: obj.WXDJ_YSFY,
      WXDJ_KGSJ: obj.WXDJ_KGSJ,
      WXDJ_WGSJ: obj.WXDJ_WGSJ,
      WXDJ_WXJD: obj.WXDJ_WXJD,
      WXDJ_NO: obj.WXDJ_NO,
      WXD_NO: obj.WXD_NO,
      WXD_YSFY: obj.WXD_YSFY ? obj.WXD_YSFY : 0,
      WXD_ZJ: obj.WXD_ZJ,
      WXD_YYXWSJ: obj.WXD_YYXWSJ ? obj.WXD_YYXWSJ : null,
      WXD_KDR: obj.WXD_KDR,
      WXD_JDR: obj.WXD_JDR ? obj.WXD_JDR : null,
      WXD_GCSM: obj.WXD_GCSM ? obj.WXD_GCSM : null,
      WXD_KDSJ: obj.WXD_KDSJ,
      WXD_JDSJ: obj.WXD_JDSJ,
      WXD_KGSJ: obj.WXD_KGSJ,
      WXD_WGSJ: obj.WXD_WGSJ,
    },
  });
}

//删除维修申请
export function delRepairApply(WXDJ_ZJ, WXD_ZJ) {
  return request({
    url: "/repairApply/deleteRepairApply.do",
    method: "post",
    data: {
      WXD_ZJ: WXD_ZJ,
      WXDJ_ZJ: WXDJ_ZJ,
      WXDJ_WXJD: "维修登记",
    },
  });
}
