//标准选用
import request from "@/utils/Request";

//导航树查询
export function getTree() {
  return request({
    url: "/dataEntry/queryDataEntryTree.do",
    method: "post",
    data: {},
  });
}

//查询收费项目下拉框
export function queryChargeItem(type) {
  return request({
    url: "/dataEntry/queryMoveWatchCostLevel.do",
    method: "post",
    data: {
      type: type == 1 ? "走表录入" : "分摊录入",
    },
  });
}

//查询走表数据录入
export function queryWalkEntryList(obj) {
  return request({
    url: "/dataEntry/queryMoveWatchCost.do",
    method: "post",
    data: {
      FCDM_ZJ: obj.FCDM_ZJ,
      selectCategory: obj.selectCategory,
      ZBJS_FJID: obj.ZBJS_FJID,
      SFXM_ZJ: obj.SFXM_ZJ,
      ZBJS_GLQWJ: obj.ZBJS_GLQWJ,
    },
  });
}

//走表费用（按走表读数）录入保存
export function saveTableRead(obj) {
  return request({
    url: "/dataEntry/entrySaveForMoveWatchReading.do",
    method: "post",
    data: {
      ZBJS_SCLRRQ: obj.ZBJS_SCLRRQ ? obj.ZBJS_SCLRRQ : "",
      ZBJS_LRRQ: obj.ZBJS_LRRQ ? obj.ZBJS_LRRQ : "",
      ZBJS_ZJ: obj.ZBJS_ZJ,
      ZBJS_BYDS: obj.ZBJS_BYDS ? obj.ZBJS_BYDS : 0,
      ZBJS_SYDS: obj.ZBJS_SYDS ? obj.ZBJS_SYDS : 0,
      ZBJS_ZBBZWJ: obj.ZBJS_ZBBZWJ,
      ZBJS_ZBBZ: obj.ZBBZ_INT,
      ZBJS_BBL: obj.ZBJS_BBL,
    },
  });
}

//走表费用（按走表读数）转表
export function transferTable(obj) {
  return request({
    url: "/dataEntry/turnTable.do",
    method: "post",
    data: {
      ZBJS_LRRQ: obj.ZBJS_LRRQ,
      ZBJS_SCLRRQ: obj.ZBJS_SCLRRQ,
      ZBJS_BYDS: obj.ZBJS_BYDS,
      ZBJS_SYDS: obj.ZBJS_SYDS,
      ZBJS_ZBBZWJ: obj.ZBJS_ZBBZWJ,
      ZBJS_ZJ: obj.ZBJS_ZJ,
      ZBJS_ZBBZ: obj.ZBBZ_INT,
    },
  });
}
//走表费用（按输入量）录入保存
export function saveForInputQuantity(obj) {
  return request({
    url: "/dataEntry/entrySaveForInputQuantity.do",
    method: "post",
    data: {
      ZBJS_LRRQ: obj.ZBJS_LRRQ,
      ZBJS_ZJ: obj.ZBJS_ZJ,
      ZBJS_SCLRRQ: obj.ZBJS_SCLRRQ,
      ZBJS_BYXD: obj.ZBJS_BYXD ? obj.ZBJS_BYXD : 0,
    },
  });
}

//批量日期
export function setBatchDate(obj) {
  return request({
    url: "/dataEntry/updateEntryDateBatch.do",
    method: "post",
    data: {
      ZBJS_SCLRRQ: obj.ZBJS_SCLRRQ,
      ZBJS_LRRQ: obj.ZBJS_LRRQ,
      FCDM_ZJ: obj.FCDM_ZJ,
      selectCategory: obj.selectCategory,
      ZBJS_FJID: obj.ZBJS_FJID,
      SFXM_ZJ: obj.SFXM_ZJ,
    },
  });
}
//批量日期--分摊录入
export function TotalsetBatchDate(obj) {
  return request({
    url: "/dataEntry/updateTableDateBatch.do",
    method: "post",
    data: {
      FTZB_CBRQ: obj.FTZB_CBRQ,
      FTZB_SCCBRQ: obj.FTZB_SCCBRQ,
      SFXM_ZJ: obj.SFXM_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_SJBMC: obj.FTZB_SJBMC,
    },
  });
}

//查询分摊录入列表
export function querySplitInto(obj) {
  return request({
    url: "/dataEntry/querySplitInto.do",
    method: "post",
    data: {
      SFXM_ZJ: obj.SFXM_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_SJBMC: obj.FTZB_SJBMC,
    },
  });
}

//保存分摊录入读数
export function saveSplitInto(obj) {
  return request({
    url: "/dataEntry/saveSplitIntoReading.do",
    method: "post",
    data: {
      FTZB_BYDS: obj.FTZB_BYDS ? obj.FTZB_BYDS : 0,
      FTZB_SYDS: obj.FTZB_SYDS ? obj.FTZB_SYDS : 0,
      FTZB_BYXD: obj.FTZB_BYXD,
      FTZB_CBRQ: obj.FTZB_CBRQ,
      FTZB_SCCBRQ: obj.FTZB_SCCBRQ ? obj.FTZB_SCCBRQ : "",
      FTZB_ZJ: obj.FTZB_ZJ,
      // FTZB_ZBBZ:obj.ZBBZ_INT,
      FTZB_ZBJE: obj.FTZB_ZBJE ? obj.FTZB_ZBJE : 0,
      FTZB_ZJYL: obj.FTZB_ZJYL ? obj.FTZB_ZJYL : 0,
    },
  });
}

//分摊列入的转表
export function TotalReadtransferTable(obj) {
  return request({
    url: "/dataEntry/turnTableForSplitInto.do",
    method: "post",
    data: {
      FTZB_BYDS: obj.FTZB_BYDS,
      FTZB_SYDS: obj.FTZB_SYDS,
      FTZB_ZBBZ: obj.FTZB_ZBBZ,
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_ZBBZ: 1,
    },
  });
}

//导出Excel表格数据
export function downloadExcel(obj) {
  return request({
    url: "/dataEntry/downloadExcel.do",
    method: "post",
    responseType: "blob",
    data: {
      name: "走表数据录入",
      GLCMC: obj.GLCMC,
      GLQMC: obj.GLQMC,
      DLMC: obj.DLMC,
      FCDM_ZJ: obj.FCDM_ZJ,
      selectCategory: obj.selectCategory,
      SFXM_ZJ: obj.SFXM_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      ZBJS_GLQWJ: obj.ZBJS_GLQWJ,
      state: obj.state,
    },
  });
}

//导入
export function excelFileUpload(obj, selectCategory) {
  return request({
    url: "/dataEntry/excelFileUpload.do?selectCategory=" + selectCategory,
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

//判断是否可以下载模板
export function queryIsStartGathering(obj) {
  return request({
    url: "/dataEntry/queryIsStartGathering.do",
    method: "post",
    data: {
      name: "走表数据录入",
      GLCMC: obj.GLCMC,
      GLQMC: obj.GLQMC,
      DLMC: obj.DLMC,
      FCDM_ZJ: obj.FCDM_ZJ,
      selectCategory: obj.selectCategory,
      SFXM_ZJ: obj.SFXM_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      state: obj.state,
      ZBJS_GLQWJ: obj.ZBJS_GLQWJ,
    },
  });
}

//分摊录入 导入
export function excelFileUploadSplitData(obj) {
  return request({
    url: "/dataEntry/excelFileUploadSplitData.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

//分摊录入导出Excel表格数据
export function downloadExcelReading(obj, list) {
  return request({
    url: "/dataEntry/downloadExcel.do",
    method: "post",
    responseType: "blob",
    data: {
      name: "走表数据录入",
      GLCMC: obj.GLCMC,
      GLQMC: obj.GLQMC,
      DLMC: obj.DLMC,
      FCDM_ZJ: obj.FCDM_ZJ,
      selectCategory: obj.selectCategory,
      SFXM_ZJ: obj.SFXM_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      ZBJS_GLQWJ: obj.ZBJS_GLQWJ,
      state: obj.state,
      list: JSON.stringify(list),
    },
  });
}
