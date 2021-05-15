//公维金管理 工程实施
import request from "@/utils/Request";

//大项目查询
export function queryBigProject(obj) {
  return request({
    url: "/bigProjectImplement/queryBigProject.do",
    method: "post",
    data: {
      queryTime1: obj.queryTime1,
      queryTime2: obj.queryTime2,
      message: obj.message,
      state: obj.state,
    },
  });
}
//小项目查询
export function queryLittleProject(obj) {
  return request({
    url: "/littleProjectImplement/queryLittleProject.do",
    method: "post",
    data: {
      queryTime1: obj.queryTime1,
      queryTime2: obj.queryTime2,
      message: obj.message,
      state: obj.state,
    },
  });
}
//大项目工程进度查询
export function queryBigProjectProgress(WXDJ_ZJ) {
  return request({
    url: "/bigProjectImplement/queryBigProjectProgress.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//小项目工程进度查询
export function queryLittleProjectProgress(WXDJ_ZJ) {
  return request({
    url: "/littleProjectImplement/queryLittleProjectProgress.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//新增大项目工程进展
export function insertBigProjectProgress(obj) {
  return request({
    url: "/bigProjectImplement/insertBigProjectProgress.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      WXDJ_ZJ: obj.WXDJ_ZJ,
      SSGC_BW: obj.SSGC_BW,
      SSGC_SM: obj.SSGC_SM,
      WXDJSJ_CZR: obj.WXDJSJ_CZR,
      SSGC_WXDJNO: obj.SSGC_WXDJNO,
      SSGC_XMMC: obj.SSGC_XMMC,
      SSGC_FXMC: obj.SSGC_FXMC,
      SSGC_DW: obj.SSGC_DW,
      SSGC_SL: obj.SSGC_SL,
      SSGC_DJ: obj.SSGC_DJ,
      SSGC_ZJQ: obj.SSGC_ZJQ,
      SSGC_KSRQ: obj.SSGC_KSRQ,
      SSGC_JZRQ: obj.SSGC_JZRQ,
      SSGC_HD: obj.SSGC_HD,
      WXFA_ZJ: obj.WXFA_ZJ,
    },
  });
}

//新增小项目工程进展
export function insertLittleProjectProgress(obj) {
  return request({
    url: "/littleProjectImplement/insertLittleProjectProgress.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      WXDJ_ZJ: obj.WXDJ_ZJ,
      SSGC_BW: obj.SSGC_BW,
      SSGC_SM: obj.SSGC_SM,
      WXDJSJ_CZR: obj.WXDJSJ_CZR,
      SSGC_WXDJNO: obj.SSGC_WXDJNO,
      SSGC_XMMC: obj.SSGC_XMMC,
      SSGC_FXMC: obj.SSGC_FXMC,
      SSGC_DW: obj.SSGC_DW,
      SSGC_SL: obj.SSGC_SL,
      SSGC_DJ: obj.SSGC_DJ,
      SSGC_ZJQ: obj.SSGC_ZJQ,
      SSGC_KSRQ: obj.SSGC_KSRQ,
      SSGC_JZRQ: obj.SSGC_JZRQ,
      SSGC_HD: obj.SSGC_HD,
    },
  });
}

//修改大项目工程进展
export function updateBigProjectProgress(obj) {
  return request({
    url: "/bigProjectImplement/updateBigProjectProgress.do",
    method: "post",
    data: {
      SSGC_BW: obj.SSGC_BW,
      SSGC_SM: obj.SSGC_SM,
      SSGC_FXMC: obj.SSGC_FXMC,
      SSGC_DW: obj.SSGC_DW,
      SSGC_SL: obj.SSGC_SL,
      SSGC_DJ: obj.SSGC_DJ,
      SSGC_ZJQ: obj.SSGC_ZJQ,
      SSGC_HD: obj.SSGC_HD,
      SSGC_ZJ: obj.SSGC_ZJ,
    },
  });
}

//修改小项目工程进展
export function updateLittleProjectProgress(obj) {
  return request({
    url: "/littleProjectImplement/updateLittleProjectProgress.do",
    method: "post",
    data: {
      SSGC_BW: obj.SSGC_BW,
      SSGC_SM: obj.SSGC_SM,
      SSGC_FXMC: obj.SSGC_FXMC,
      SSGC_DW: obj.SSGC_DW,
      SSGC_SL: obj.SSGC_SL,
      SSGC_DJ: obj.SSGC_DJ,
      SSGC_ZJQ: obj.SSGC_ZJQ,
      SSGC_HD: obj.SSGC_HD,
      SSGC_ZJ: obj.SSGC_ZJ,
    },
  });
}

//删除大项目工程进展
export function deleteBigProjectProgress(WXDJ_ZJ, obj) {
  return request({
    url: "/bigProjectImplement/deleteBigProjectProgress.do",
    method: "post",
    data: {
      SSGC_ZJ: obj.SSGC_ZJ,
      WXDJ_ZJ: WXDJ_ZJ,
      SSGC_FXMC: obj.SSGC_FXMC,
    },
  });
}

//删除小项目工程进展
export function deleteLittleProjectProgress(WXDJ_ZJ, obj) {
  return request({
    url: "/littleProjectImplement/deleteLittleProjectProgress.do",
    method: "post",
    data: {
      SSGC_ZJ: obj.SSGC_ZJ,
      WXDJ_ZJ: WXDJ_ZJ,
      SSGC_FXMC: obj.SSGC_FXMC,
    },
  });
}

//查询大项目工程验收列表
export function queryBigAcceptanceProject(WXDJ_ZJ) {
  return request({
    url: "/bigProjectImplement/queryAcceptanceProject.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//查询小项目工程验收列表
export function querySmallAcceptanceProject(WXDJ_ZJ) {
  return request({
    url: "/littleProjectImplement/queryAcceptanceProject.do",
    method: "post",
    data: {
      WXDJ_ZJ: WXDJ_ZJ,
    },
  });
}

//大项目工程进展交付验收
export function bigProjectDeliveryAcceptance(obj) {
  return request({
    url: "/bigProjectImplement/bigProjectDeliveryAcceptance.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      GCYS_YSBH: obj.GCYS_YSBH,
      WXDJ_ZJ: obj.WXDJ_ZJ,
      SSGC_WXDJNO: obj.WXDJ_NO,
      SSGC_XMMC: obj.SSGC_XMMC,
      GCYS_CCYSSJ: obj.GCYS_CCYSSJ,
      GCYS_ZZYSSJ: obj.GCYS_ZZYSSJ,
      GCYS_YSJR: obj.GCYS_YSJR,
      GCYS_SFHG: obj.GCYS_SFHG,
      WXDJSJ_CZR: obj.GCYS_YSR,
      GCYS_YSQK: obj.GCYS_YSQK,
      GCYS_SM: obj.GCYS_SM,
      state: 1,
    },
  });
}

//小项目工程进展交付验收
export function littleProjectDeliveryAcceptance(obj) {
  return request({
    url: "/littleProjectImplement/littleProjectDeliveryAcceptance.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      GCYS_YSBH: obj.GCYS_YSBH,
      WXDJ_ZJ: obj.WXDJ_ZJ,
      SSGC_WXDJNO: obj.WXDJ_NO,
      SSGC_XMMC: obj.SSGC_XMMC,
      GCYS_CCYSSJ: obj.GCYS_CCYSSJ,
      GCYS_ZZYSSJ: obj.GCYS_ZZYSSJ,
      GCYS_YSJR: obj.GCYS_YSJR,
      GCYS_SFHG: obj.GCYS_SFHG,
      WXDJSJ_CZR: obj.GCYS_YSR,
      GCYS_YSQK: obj.GCYS_YSQK,
      GCYS_SM: obj.GCYS_SM,
      state: 1,
    },
  });
}

//修改大项目工程验收
export function updateAcceptanceProject(obj) {
  return request({
    url: "/bigProjectImplement/updateAcceptanceBigProject.do",
    method: "post",
    data: {
      GCYS_YSBH: obj.GCYS_YSBH,
      GCYS_CCYSSJ: obj.GCYS_CCYSSJ,
      GCYS_ZZYSSJ: obj.GCYS_ZZYSSJ,
      GCYS_YSR: obj.GCYS_YSR,
      GCYS_YSQK: obj.GCYS_YSQK,
      GCYS_YSJR: obj.GCYS_YSJR,
      GCYS_SFHG: obj.GCYS_SFHG,
      GCYS_SM: obj.GCYS_SM,
      GCYS_ZJ: obj.GCYS_ZJ,
    },
  });
}

//修改小项目工程验收
export function updateAcceptanceLittleProject(obj) {
  return request({
    url: "/littleProjectImplement/updateAcceptanceLittleProject.do",
    method: "post",
    data: {
      GCYS_YSBH: obj.GCYS_YSBH,
      GCYS_CCYSSJ: obj.GCYS_CCYSSJ,
      GCYS_ZZYSSJ: obj.GCYS_ZZYSSJ,
      GCYS_YSR: obj.GCYS_YSR,
      GCYS_YSQK: obj.GCYS_YSQK,
      GCYS_YSJR: obj.GCYS_YSJR,
      GCYS_SFHG: obj.GCYS_SFHG,
      GCYS_SM: obj.GCYS_SM,
      GCYS_ZJ: obj.GCYS_ZJ,
    },
  });
}

//删除大项目工程验收
export function deleteAcceptanceBigProject(obj) {
  return request({
    url: "/bigProjectImplement/deleteAcceptanceBigProject.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      GCYS_ZJ: obj.GCYS_ZJ,
      state: 2,
    },
  });
}

//删除小项目工程验收
export function deleteAcceptanceLittleProject(obj) {
  return request({
    url: "/littleProjectImplement/deleteAcceptanceLittleProject.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      GCYS_ZJ: obj.GCYS_ZJ,
      state: 2,
    },
  });
}

//修改大项目开工/完工时间
export function updateBigProjectTime(obj) {
  return request({
    url: "/bigProjectImplement/updateBigProjectTime.do",
    method: "post",
    data: {
      state: obj.state,
      time: obj.time,
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//修改小项目开工/完工时间
export function updateLittleProjectTime(obj) {
  return request({
    url: "/littleProjectImplement/updateLittleProjectTime.do",
    method: "post",
    data: {
      state: obj.state,
      time: obj.time,
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//获取工程验收编号
export function getGenNumber() {
  return request({
    url: "/numberGeneration/maintenanceRequestNumberGeneration.do",
    method: "post",
    data: {},
  });
}

//获取维修登记编号
export function getRegGenNumber() {
  return request({
    url: "/numberGeneration/maintenanceRegisterNumberGeneration.do",
    method: "post",
    data: {},
  });
}
