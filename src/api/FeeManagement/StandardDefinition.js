// 标准

import request from "@/utils/Request";

// 5.1.	获取标准定义资源树
export function getTree() {
  return request({
    url: "/util/queryStandardDefinitionsTree.do",
    method: "post",
    data: {},
  });
}

// 5.2.	费用项目查询
export function queryExpenseItem(obj) {
  return request({
    url: "/standardDefinitions/queryExpenseItem.do",
    method: "post",
    data: {
      SFXM_ZJ: obj.SFXM_ZJ ? obj.SFXM_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

// 5.3.	费用项目新增
export function addExpenseItem(obj) {
  return request({
    url: "/standardDefinitions/addExpenseItem.do",
    method: "post",
    data: {
      SFXM_SFXMMC: obj.SFXM_SFXMMC,
      SFXM_SFXMDM: obj.SFXM_SFXMDM != undefined ? obj.SFXM_SFXMDM : "",
      SFXM_SFXMYWMC: obj.SFXM_SFXMYWMC != undefined ? obj.SFXM_SFXMYWMC : "",
      SFXM_FYLB: obj.SFXM_FYLB != undefined ? obj.SFXM_FYLB : "",
      SFXM_QZFS: obj.SFXM_QZFS,
      SFXM_JQWS: obj.SFXM_JQWS,
      SFXM_PJLX: obj.SFXM_PJLX != undefined ? obj.SFXM_PJLX : "",
      SFXM_SL: obj.SFXM_SL,
      SFXM_KMBZ: obj.SFXM_KMBZ,
      SFXM_SFYX: obj.SFXM_SFYX ? 1 : 0,
      SFXM_SFCWF: obj.SFXM_SFCWF ? 1 : 0,
      SFXM_BZ: obj.SFXM_BZ != undefined ? obj.SFXM_BZ : "",
      SFXM_SFBXBZ: obj.SFXM_SFBXBZ != undefined ? obj.SFXM_SFBXBZ : false,
      SFXM_DFZNJKMMC: obj.SFXM_DFZNJKMMC,
      SFXM_BJKMMC: obj.SFXM_BJKMMC ? 1 : 0,
      SFXM_BJKMDM: obj.SFXM_BJKMDM ? 1 : 0,
      SFXM_ZNJKMDM: obj.SFXM_ZNJKMDM != undefined ? obj.SFXM_ZNJKMDM : 0,
      SFXM_LXGL: obj.SFXM_LXGL != undefined ? obj.SFXM_LXGL : 0,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

// 5.4.	费用项目修改
export function updateExpenseItem(obj) {
  return request({
    url: "/standardDefinitions/updateExpenseItem.do",
    method: "post",
    data: {
      SFXM_SFXMMC: obj.SFXM_SFXMMC,
      SFXM_SFXMDM: obj.SFXM_SFXMDM != undefined ? obj.SFXM_SFXMDM : "",
      SFXM_SFXMYWMC: obj.SFXM_SFXMYWMC != undefined ? obj.SFXM_SFXMYWMC : "",
      SFXM_FYLB: obj.SFXM_FYLB,
      SFXM_QZFS: obj.SFXM_QZFS,
      SFXM_JQWS: obj.SFXM_JQWS,
      SFXM_PJLX: obj.SFXM_PJLX,
      SFXM_SL: obj.SFXM_SL != undefined ? obj.SFXM_SL : "",
      SFXM_SFYX: obj.SFXM_SFYX ? 1 : 0,
      SFXM_SFCWF: obj.SFXM_SFCWF ? 1 : 0,
      SFXM_BZ: obj.SFXM_BZ != undefined ? obj.SFXM_BZ : "",
      SFXM_ZJ: obj.SFXM_ZJ,
      LB: obj.LB,
      SFXM_SFBXBZ: obj.SFXM_SFBXBZ != undefined ? obj.SFXM_SFBXBZ : false,
      SFXM_KMBZ: obj.SFXM_KMBZ,
      SFXM_DFZNJKMMC: obj.SFXM_DFZNJKMMC,
      SFXM_BJKMMC: obj.SFXM_BJKMMC ? 1 : 0,
      SFXM_BJKMDM: obj.SFXM_BJKMDM ? 1 : 0,
      SFXM_ZNJKMDM: obj.SFXM_ZNJKMDM != undefined ? obj.SFXM_ZNJKMDM : 0,
      SFXM_LXGL: obj.SFXM_LXGL != undefined ? obj.SFXM_LXGL : 0,
    },
  });
}

// 5.5.	费用项目删除
export function deleteExpenseItem(obj) {
  return request({
    url: "/standardDefinitions/deleteExpenseItem.do",
    method: "post",
    data: {
      SFXM_ZJ: obj.SFXM_ZJ ? obj.SFXM_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

// 5.6.	常规标准查询
export function queryExpenseItemCharges(obj) {
  return request({
    url: "/standardDefinitions/queryExpenseItem.do",
    method: "post",
    data: {
      CGBZ_ZJ: obj.CGBZ_ZJ ? obj.CGBZ_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

// 5.7.	收费币种下拉框查询
export function queryChargeForCurrency() {
  return request({
    url: "/util/queryChargeForCurrency.do",
    method: "post",
    data: {},
  });
}

// 5.8.	计算参数下拉框查询
export function queryDesignConditions() {
  return request({
    url: "/util/queryDesignConditions.do",
    method: "post",
    data: {},
  });
}

// 5.8.	计算参数下拉框查询(一次性费用)
export function queryOneTimeDesignConditions() {
  return request({
    url: "/util/queryOneTimeDesignConditions.do",
    method: "post",
    data: {},
  });
}

// 5.9.	常规标准新增
export function addConvention(obj) {
  return request({
    url: "/standardDefinitions/addConvention.do",
    method: "post",
    data: {
      CGBZ_BZDM: obj.CGBZ_BZDM != undefined ? obj.CGBZ_BZDM : "",
      CGBZ_BZMC: obj.CGBZ_BZMC,
      CGBZ_JSBS: obj.CGBZ_JSBS,
      CGBZ_DJFS: obj.CGBZ_DJFS,
      CGBZ_CSMC: obj.CGBZ_CSMC,
      CGBZ_SDJE: obj.CGBZ_SDJE,
      CGBZ_SFBZ: obj.CGBZ_SFBZ,
      CGBZ_SFXMWJ: obj.CGBZ_SFXMWJ,
      CGBZ_OFFSET: obj.CGBZ_OFFSET ? obj.CGBZ_OFFSET : "",
      CGBZ_JSDJ: obj.CGBZ_JSDJ,
      CGBZ_XGBL: obj.CGBZ_XGBL,
      CGBZ_XGFY: obj.CGBZ_XGFY,
      CGBZ_XGFZ: obj.CGBZ_XGFZ,
      CGBZ_XGSFXMWJ: obj.CGBZ_XGSFXMWJ,
      CGBZ_CLLX: obj.CGBZ_CLLX,
      CGBZ_JNDJ: obj.CGBZ_JNDJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.10.	常规标准修改
export function updateExpenseItemCharges(obj) {
  return request({
    url: "/standardDefinitions/updateExpenseItem.do",
    method: "post",
    data: {
      CGBZ_BZDM: obj.CGBZ_BZDM != undefined ? obj.CGBZ_BZDM : "",
      CGBZ_BZMC: obj.CGBZ_BZMC,
      CGBZ_SFBZ: obj.CGBZ_SFBZ,
      CGBZ_DJFS: obj.CGBZ_DJFS,
      CGBZ_OFFSET: obj.CGBZ_OFFSET,
      CGBZ_SDJE: obj.CGBZ_SDJE,
      CGBZ_JSBS: obj.CGBZ_JSBS,
      CGBZ_CSMC: obj.CGBZ_CSMC,
      CGBZ_JSDJ: obj.CGBZ_JSDJ,
      CGBZ_XGBL: obj.CGBZ_XGBL,
      CGBZ_XGFY: obj.CGBZ_XGFY,
      CGBZ_XGFZ: obj.CGBZ_XGFZ,
      CGBZ_XGSFXMWJ: obj.CGBZ_XGSFXMWJ,
      CGBZ_SFXMWJ: obj.CGBZ_SFXMWJ,
      CGBZ_ZJ: obj.CGBZ_ZJ,
      LB: obj.LB,
      CGBZ_CLLX: obj.CGBZ_CLLX,
      CGBZ_JNDJ: obj.CGBZ_JNDJ,
    },
  });
}

// 5.11.	常规标准删除
export function deleteExpenseItemCharges(obj) {
  return request({
    url: "/standardDefinitions/deleteExpenseItem.do",
    method: "post",
    data: {
      CGBZ_ZJ: obj.CGBZ_ZJ ? obj.CGBZ_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

// 5.18.	获取相关收费项目下拉框
export function queryRelatedFees(SFXM_ZJ) {
  return request({
    url: "/util/queryRelatedFees.do",
    method: "post",
    data: {
      SFXM_ZJ: SFXM_ZJ,
    },
  });
}

// 5.19.	收费周期查询
export function queryChargeCycle(CGBZ_ZJ) {
  return request({
    url: "/standardDefinitions/queryChargeCycle.do",
    method: "post",
    data: {
      CGBZ_ZJ: CGBZ_ZJ,
    },
  });
}

//5.12.	收费周期修改
export function updateChargeCycle(obj) {
  return request({
    url: "/standardDefinitions/updateChargeCycle.do",
    method: "post",
    data: {
      CGBZ_FYABL: obj.CGBZ_FYABL != undefined ? obj.CGBZ_FYABL : "",
      CGBZ_SFYF: obj.CGBZ_SFYF != undefined ? obj.CGBZ_SFYF : "",
      CGBZ_YFSD: obj.CGBZ_YFSD != undefined ? obj.CGBZ_YFSD : "",
      CGBZ_YFSFBS: obj.CGBZ_YFSFBS != undefined ? obj.CGBZ_YFSFBS : "",
      CGBZ_QSR: obj.CGBZ_QSR != undefined ? obj.CGBZ_QSR : "",
      CGBZ_FX: obj.CGBZ_FX != undefined ? obj.CGBZ_FX : "",
      CGBZ_QJLX: obj.CGBZ_QJLX != undefined ? obj.CGBZ_QJLX : "",
      CGBZ_QJQZ: obj.CGBZ_QJQZ != undefined ? obj.CGBZ_QJQZ : "",
      CGBZ_QJOFFSET: obj.CGBZ_QJOFFSET != undefined ? obj.CGBZ_QJOFFSET : "",
      CGBZ_XGZQ: obj.CGBZ_XGZQ != undefined ? obj.CGBZ_XGZQ : "",
      CGBZ_ZJ: obj.CGBZ_ZJ,
    },
  });
}

// 5.13.	走表标准查询
export function queryExpenseItemMeter(obj) {
  return request({
    url: "/standardDefinitions/queryExpenseItem.do",
    method: "post",
    data: {
      ZBBZ_ZJ: obj.ZBBZ_ZJ ? obj.ZBBZ_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

//5.14.	走表标准新增
export function addWalkTableStandards(obj) {
  return request({
    url: "/standardDefinitions/addWalkTableStandards.do",
    method: "post",
    data: {
      ZBBZ_BZMC: obj.ZBBZ_BZMC,
      ZBBZ_SFBZ: obj.ZBBZ_SFBZ,
      ZBBZ_YLLX: obj.ZBBZ_YLLX,
      ZBBZ_ZBJS: obj.ZBBZ_ZBJS,
      ZBBZ_BZDM: obj.ZBBZ_BZDM != undefined ? obj.ZBBZ_BZDM : "",
      ZBBZ_JNDJ: obj.ZBBZ_JNDJ,
      ZBBZ_BBL: obj.ZBBZ_BBL,
      ZBBZ_SYJH: obj.ZBBZ_SYJH,
      ZBBZ_ANDJL: obj.ZBBZ_ANDJL,
      ZBBZ_QJYF: obj.ZBBZ_QJYF != undefined ? obj.ZBBZ_QJYF : "",
      ZBBZ_BZRKS: obj.ZBBZ_BZRKS != undefined ? obj.ZBBZ_BZRKS : 0,
      ZBBZ_JSZZZ: obj.ZBBZ_JSZZZ != undefined ? obj.ZBBZ_JSZZZ : 0,
      ZBBZ_JHYL: obj.ZBBZ_JHYL != undefined ? obj.ZBBZ_JHYL : 0,
      ZBBZ_JWFD1: obj.ZBBZ_JWFD1 != undefined ? obj.ZBBZ_JWFD1 : 0,
      ZBBZ_JWFD2: obj.ZBBZ_JWFD2 != undefined ? obj.ZBBZ_JWFD2 : 0,
      ZBBZ_JWDJ1: obj.ZBBZ_JWDJ1 != undefined ? obj.ZBBZ_JWDJ1 : 0,
      ZBBZ_JWDJ2: obj.ZBBZ_JWDJ2 != undefined ? obj.ZBBZ_JWDJ2 : 0,
      ZBBZ_JWDJ3: obj.ZBBZ_JWDJ3 != undefined ? obj.ZBBZ_JWDJ3 : 0,
      ZBBZ_BLJE: obj.ZBBZ_BLJE,
      ZBBZ_SFXMWJ: obj.ZBBZ_SFXMWJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//5.15.	走表标准修改
export function updateExpenseItemmeterstandard(obj) {
  return request({
    url: "/standardDefinitions/updateExpenseItem.do",
    method: "post",
    data: {
      ZBBZ_BZMC: obj.ZBBZ_BZMC,
      ZBBZ_SFBZ: obj.ZBBZ_SFBZ,
      ZBBZ_YLLX: obj.ZBBZ_YLLX,
      ZBBZ_ZBJS: obj.ZBBZ_ZBJS,
      ZBBZ_BZDM: obj.ZBBZ_BZDM != undefined ? obj.ZBBZ_BZDM : "",
      ZBBZ_JNDJ: obj.ZBBZ_JNDJ,
      ZBBZ_BBL: obj.ZBBZ_BBL,
      ZBBZ_SYJH: obj.ZBBZ_SYJH,
      ZBBZ_ANDJL: obj.ZBBZ_ANDJL,
      ZBBZ_QJYF: obj.ZBBZ_QJYF != undefined ? obj.ZBBZ_QJYF : "",
      ZBBZ_BZRKS: obj.ZBBZ_BZRKS != undefined ? obj.ZBBZ_BZRKS : 0,
      ZBBZ_JSZZZ: obj.ZBBZ_JSZZZ != undefined ? obj.ZBBZ_JSZZZ : 0,
      ZBBZ_JHYL: obj.ZBBZ_JHYL != undefined ? obj.ZBBZ_JHYL : 0,
      ZBBZ_JWFD1: obj.ZBBZ_JWFD1 != undefined ? obj.ZBBZ_JWFD1 : 0,
      ZBBZ_JWFD2: obj.ZBBZ_JWFD2 != undefined ? obj.ZBBZ_JWFD2 : 0,
      ZBBZ_JWDJ1: obj.ZBBZ_JWDJ1 != undefined ? obj.ZBBZ_JWDJ1 : 0,
      ZBBZ_JWDJ2: obj.ZBBZ_JWDJ2 != undefined ? obj.ZBBZ_JWDJ2 : 0,
      ZBBZ_JWDJ3: obj.ZBBZ_JWDJ3 != undefined ? obj.ZBBZ_JWDJ3 : 0,
      ZBBZ_BLJE: obj.ZBBZ_BLJE,
      ZBBZ_ZJ: obj.ZBBZ_ZJ,
      LB: obj.LB,
    },
  });
}

// 5.16.	走表标准删除
export function deleteExpenseItemMeterstandard(obj) {
  return request({
    url: "/standardDefinitions/deleteExpenseItem.do",
    method: "post",
    data: {
      ZBBZ_ZJ: obj.ZBBZ_ZJ ? obj.ZBBZ_ZJ : "",
      LB: obj.LB ? obj.LB : "",
    },
  });
}

// 5.17.	刷新方法
export function refresh(obj) {
  return request({
    url: "/standardDefinitions/refresh.do",
    method: "post",
    data: {},
  });
}

// 5.17.	刷新方法
export function administrativeAndOperating(obj) {
  return request({
    url: "/standardDefinitions/administrativeAndOperating.do",
    method: "post",
    data: {},
  });
}

// 5.17.	刷新方法
export function queryCarType(obj) {
  return request({
    url: "/standardDefinitions/queryCarType.do",
    method: "post",
    data: {},
  });
}

export function queryClassify(obj) {
  return request({
    url: "/standardDefinitions/queryClassify.do",
    method: "post",
    data: {},
  });
}
