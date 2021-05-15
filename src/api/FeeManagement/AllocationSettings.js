//标准选用
import request from "@/utils/Request";

//导航树查询
export function getTree() {
  return request({
    url: "/util/orgTree.do",
    method: "post",
    data: {},
  });
}

//导航树查询
export function queryOrgTreeNoRoom() {
  return request({
    url: "/util/queryOrgTreeNoRoom.do",
    method: "post",
    data: {},
  });
}

// 3.2.1.1.	查询客户档案
export function queryTable(obj) {
  return request({
    url: "/totalTableSettings/queryTable.do",
    method: "post",
    data: {
      FCDM_ZJ: obj.FCDM_ZJ,
      FCDM_LX: obj.FCDM_LX,
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      SFXMMC: obj.SFXMMC != undefined ? obj.SFXMMC : "",
      FTZBMC: obj.FTZBMC != undefined ? obj.FTZBMC : "",
    },
  });
}

// 2.4.1.3.	总表查询
export function queryTotalTable(obj) {
  return request({
    url: "/totalTableSettings/queryTotalTable.do",
    method: "post",
    data: obj,
  });
}

//  2.4.1.4.	新增总表
export function addTotalTable(obj) {
  return request({
    url: "/totalTableSettings/addTotalTable.do",
    method: "post",
    data: {
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_SFXMMC: obj.FTZB_SFXMMC,
      FTZB_SFXMWJ: obj.FTZB_SFXMWJ,
      FTZB_XSXMWJ: obj.FTZB_XSXMWJ,
      FTZB_SYDS: obj.FTZB_SYDS != undefined ? obj.FTZB_SYDS : 0,
      FTZB_BYDS: obj.FTZB_BYDS != undefined ? obj.FTZB_BYDS : 0,
      FTZB_BYXD: obj.FTZB_BYXD != undefined ? obj.FTZB_BYXD : 0,
      FTZB_FTBL: obj.FTZB_FTBL != undefined ? obj.FTZB_FTBL : 100,
      FTZB_SFJE: obj.FTZB_SFJE != undefined ? obj.FTZB_SFJE : 0,
      FTZB_FTFS: obj.FTZB_FTFS,
      FTZB_FTLB: obj.FTZB_FTLB,
      FTZB_ZJFTYL: obj.FTZB_ZJFTYL != undefined ? obj.FTZB_ZJFTYL : 0,
      FTZB_ZBJS: obj.FTZB_ZBJS != undefined ? obj.FTZB_ZBJS : 9999,
      FTZB_RZXS: obj.FTZB_RZXS != undefined ? obj.FTZB_RZXS : 0,
      FTZB_BBL: obj.FTZB_BBL,
      FTZB_JNDJ: obj.FTZB_JNDJ,
      FTZB_FDCS: obj.FTZB_FDCS != undefined ? obj.FTZB_FDCS : 0,
      FTZB_DZXS: obj.FTZB_DZXS != undefined ? obj.FTZB_DZXS : 0,
      FTZB_QSLC: obj.FTZB_QSLC != undefined ? obj.FTZB_QSLC : 0,
      FTZB_ZBJE: obj.FTZB_ZBJE != undefined ? obj.FTZB_ZBJE : 0,
    },
  });
}

//  2.4.1.5.	修改总表
export function updateTotalTable(obj) {
  return request({
    url: "/totalTableSettings/updateTotalTable.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_SFXMMC: obj.FTZB_SFXMMC,
      FTZB_SFXMWJ: obj.FTZB_SFXMWJ,
      FTZB_XSXMWJ: obj.FTZB_XSXMWJ,
      FTZB_SYDS: obj.FTZB_SYDS != undefined ? obj.FTZB_SYDS : 0,
      FTZB_BYDS: obj.FTZB_BYDS != undefined ? obj.FTZB_BYDS : 0,
      FTZB_BYXD: obj.FTZB_BYXD != undefined ? obj.FTZB_BYXD : 0,
      FTZB_FTBL: obj.FTZB_FTBL != undefined ? obj.FTZB_FTBL : 100,
      FTZB_SFJE: obj.FTZB_SFJE != undefined ? obj.FTZB_SFJE : 0,
      FTZB_FTFS: obj.FTZB_FTFS,
      FTZB_FTLB: obj.FTZB_FTLB,
      FTZB_ZJFTYL: obj.FTZB_ZJFTYL != undefined ? obj.FTZB_ZJFTYL : 0,
      FTZB_ZBJS: obj.FTZB_ZBJS != undefined ? obj.FTZB_ZBJS : 9999,
      FTZB_RZXS: obj.FTZB_RZXS != undefined ? obj.FTZB_RZXS : 0,
      FTZB_BBL: obj.FTZB_BBL,
      FTZB_JNDJ: obj.FTZB_JNDJ,
      FTZB_FDCS: obj.FTZB_FDCS != undefined ? obj.FTZB_FDCS : 0,
      FTZB_DZXS: obj.FTZB_DZXS != undefined ? obj.FTZB_DZXS : 0,
      FTZB_QSLC: obj.FTZB_QSLC != undefined ? obj.FTZB_QSLC : 0,
      FTZB_ZBJE: obj.FTZB_ZBJE != undefined ? obj.FTZB_ZBJE : 0,
    },
  });
}

// 2.4.1.6.	总表设置分摊项目、系数项目名称下拉列表查询
export function queryApportionedProjectName(obj) {
  return request({
    url: "/util/queryApportionedProjectName.do",
    method: "post",
    data: {},
  });
}

// 2.4.1.7.	删除总表
export function deleteTotalTable(obj) {
  return request({
    url: "/totalTableSettings/deleteTotalTable.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
    },
  });
}

// 2.4.1.8.	分摊计算
export function allocationCalculation(obj) {
  return request({
    url: "/relationshipBinding/allocationCalculation.do",
    method: "post",
    data: {},
  });
}

// 2.4.1.9.	关系设定总表查询下拉框
export function queryTotalTableNameAndZJ(obj) {
  return request({
    url: "/totalTableSettings/queryTotalTableNameAndZJ.do",
    method: "post",
    data: {},
  });
}

// 2.4.1.10.	关系设定总表分摊关系查询（已选记录）
export function queryChildrenTable(obj) {
  return request({
    url: "/relationshipBinding/queryChildrenTable.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      keyword: obj.keyword2,
    },
  });
}

// 2.4.1.11.	关系设定总表分摊关系查询（分摊系数）
export function queryDistributionCoefficient(obj) {
  return request({
    url: "/relationshipBinding/queryDistributionCoefficient.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_XSXMWJ: obj.FTZB_XSXMWJ,
    },
  });
}

// 2.4.1.12.	关系待选记录查询
export function queryPendingResource(obj) {
  return request({
    url: "/relationshipBinding/queryPendingResource.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_SFXMWJ: obj.FTZB_SFXMWJ,
      FCDM_ID: obj.FCDM_ID,
      keyword: obj.keyword1,
      FCDM_LX: obj.FCDM_LX,
      FTZB_SJBZJ: obj.FTZB_SJBZJ,
    },
  });
}

// 22.4.1.13.	关系绑定左到右
export function relationshipBindingLeftToRight(obj) {
  return request({
    url: "/relationshipBinding/relationshipBindingLeftToRight.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_FTJB: obj.FTZB_FTJB,
      FTZB_FTFS: obj.FTZB_FTFS,
      list: JSON.stringify(obj.list),
      type: obj.type,
    },
  });
}

// 2.4.1.14.	关系绑定右到左
export function relationshipBindingRightToLeft(obj) {
  return request({
    url: "/relationshipBinding/relationshipBindingRightToLeft.do",
    method: "post",
    data: {
      FTZB_ZJ: obj.FTZB_ZJ,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_FTJB: obj.FTZB_FTJB,
      FTZB_FTFS: obj.FTZB_FTFS,
      list: JSON.stringify(obj.list),
      type: obj.type,
    },
  });
}

export function reportTablePage(data) {
  return request({
    url: "/totalTableSettings/reportTablePage.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function checkAllocationFactor(obj) {
  return request({
    url: "/relationshipBinding/checkAllocationFactor.do",
    method: "post",
    data: obj,
  });
}
