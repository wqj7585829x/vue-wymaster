//收款登记  未收清
import request from "@/utils/Request";

//按年月询未收清费用
export function queryResourceNotReceipt(obj, type) {
  return request({
    url: "/uncollectedFees/queryUncollectedFeesByRoom.do",
    method: "post",
    data: {
      FKGX_ZJ: type == 1 ? obj.FKGX_ZJ : "",
      FKGX_KHWJ: type == 2 ? obj.KHDA_ZJ : "",
      type: type,
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ,
      QSNY: obj.QSNY,
      JZNY: obj.JZNY,
    },
  });
}

//按收费项目询未收清费用
export function queryUncollectedFeesGroupByItemsApi(obj, type) {
  return request({
    url: "/uncollectedFees/queryUncollectedFeesGroupByItems.do",
    method: "post",
    data: {
      FKGX_ZJ: type == 1 ? obj.FKGX_ZJ : "",
      FKGX_KHWJ: type == 2 ? obj.KHDA_ZJ : "",
      type: type,
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ,
      QSNY: obj.QSNY,
      JZNY: obj.JZNY,
    },
  });
}

//子级数据
export function queryChildrenUncollectedFees(FYSQ_FKGXWJ, FYSQ_SFXMWJ) {
  return request({
    url: "/uncollectedFees/queryChildrenUncollectedFees.do",
    method: "post",
    data: {
      FYSQ_FKGXWJ: FYSQ_FKGXWJ,
      FYSQ_SFXMWJ: FYSQ_SFXMWJ,
    },
  });
}
//收款明细查询
export function querReceiptList(FYSQ_ZJ) {
  return request({
    url: "/uncollectedFees/queryCollectionDetails.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
    },
  });
}

//走表读数查询
export function querWalkList(FYSQ_FKGXWJ, FYSQ_SFXMWJ) {
  return request({
    url: "/uncollectedFees/queryTableNumber.do",
    method: "post",
    data: {
      FYSQ_FKGXWJ: FYSQ_FKGXWJ,
      FYSQ_SFXMWJ: FYSQ_SFXMWJ,
    },
  });
}

//	默认收款方式查询
export function queryDefaultPayWay() {
  return request({
    url: "/uncollectedFees/queryDefaultMethod.do",
    method: "post",
    data: {},
  });
}

//收款方式查询
export function querytPayWay() {
  return request({
    url: "/uncollectedFees/queryPaymentMethod.do",
    method: "post",
    data: {},
  });
}

//客户名称、资源代码查询
export function queryGuestData(FKGX_ZJ, type) {
  return request({
    url: "/uncollectedFees/queryKHDA_KHMCAndFKGX_FJID.do",
    method: "post",
    data: {
      FKGX_ZJ: FKGX_ZJ,
      type: type,
    },
  });
}

//收清选中
export function submitFeeCollection(obj, list) {
  return request({
    url: "/uncollectedFees/feeCollection.do",
    method: "post",
    data: {
      PZPC: obj.PZPC,
      SKPZ_FKGXWJ: obj.SKPZ_FKGXWJ,
      SKPZ_JKR: obj.paymentPle,
      SKPZ_SFBZ: obj.SKPZ_SFBZ,
      SKPZ_SKR: obj.SKPZ_SKR,
      SKPZ_TZRQ: obj.tabulation,
      SKPZ_RZSJ: obj.entryAccount,
      SKPZ_ZDYZD1: obj.SKPZ_ZDYZD1,
      SKPZ_ZDYZD2: obj.SKPZ_ZDYZD2,
      list: JSON.stringify(list),
    },
  });
}

//收清选中-首页
export function submitFeeCollectionHome(obj, list) {
  return request({
    url: "/uncollectedFees/feeCollection.do",
    method: "post",
    data: {
      PZPC: obj.PZPC,
      SKPZ_FKGXWJ: obj.SKPZ_FKGXWJ,
      SKPZ_JKR: obj.paymentPle,
      SKPZ_SFBZ: obj.SKPZ_SFBZ,
      SKPZ_SKR: obj.SKPZ_SKR,
      SKPZ_TZRQ: obj.tabulation,
      SKPZ_RZSJ: obj.entryAccount,
      SKPZ_ZDYZD1: obj.SKPZ_ZDYZD1,
      SKPZ_ZDYZD2: obj.SKPZ_ZDYZD2,
      isChanged: obj.isChanged,
      list: JSON.stringify(list),
    },
  });
}

//收清选中列表查询
export function queryUncollectedFeesByIdApi(FYSQ_ZJ) {
  return request({
    url: "/uncollectedFees/queryUncollectedFeesById.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
    },
  });
}
//费用调整查询
export function queryCostAdjustment(FKGX_ZJ) {
  return request({
    url: "/customCostAdjustment/queryCostAdjustmentApply.do",
    method: "post",
    data: {
      apply_fkgxid: FKGX_ZJ,
    },
  });
}

//	收费项目查询
export function queryChargeItem(FKGX_ZJ) {
  return request({
    url: "/uncollectedFees/queryChargeItem.do",
    method: "post",
    data: {},
  });
}

//调整类型下拉框查询
export function queryCostAdjustmentDefinitionApi() {
  return request({
    url: "/customCostAdjustment/queryCostAdjustmentDefinition.do",
    method: "post",
    data: {},
  });
}

//费用调整新增
export function addCostAdjustment(list) {
  return request({
    url: "/customCostAdjustment/saveCostAdjustmentApply.do",
    method: "post",
    data: {
      list: JSON.stringify(list),
    },
  });
}

//删除
export function delCostAdjustment(adjustment_apply_id) {
  return request({
    url: "/customCostAdjustment/deleteCostAdjustmentApply.do",
    method: "post",
    data: {
      adjustment_apply_id: adjustment_apply_id,
    },
  });
}

//默认应收年月
export function defaultYSNY() {
  return request({
    url: "/uncollectedFees/getAdjustFeeYSRQ.do",
    method: "post",
    data: {},
  });
}

//单个计算树
export function QuerySingleTree() {
  return request({
    url: "/util/queryCalculationOfCharges.do",
    method: "post",
    data: {},
  });
}

//生成、删除费用
export function addCosts(obj) {
  return request({
    url: "/uncollectedFees/costCalculation.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
      SFXM_ZJ: obj.SFXM_ZJ,
      CGBZ_ZJ: obj.CGBZ_ZJ,
      ZBBZ_ZJ: obj.ZBBZ_ZJ,
      QSFYNY: obj.QSFYNY,
      JZFYNY: obj.JZFYNY,
      type: obj.type,
    },
  });
}

//修改备注
export function updateNote(obj) {
  return request({
    url: "/uncollectedFees/updateNote.do",
    method: "post",
    data: {
      FYSQ_ZJ: obj.FYSQ_ZJ,
      FYSQ_BZ: obj.FYSQ_BZ,
    },
  });
}

//修改摘要
export function updateSummary(FYSQ_ZJ, FYSQ_ZY) {
  return request({
    url: "/uncollectedFees/updateSummary.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
      FYSQ_ZY: FYSQ_ZY,
    },
  });
}

//栏位配置查询
export function queryDynamicFieldConfigurationApi() {
  return request({
    url: "/dynamicFieldConfig/queryDynamicFieldConfiguration.do",
    method: "post",
    data: {},
  });
}

//栏位配置保存
export function setDynamicFieldConfigApi(content, code) {
  return request({
    url: "/dynamicFieldConfig/setDynamicFieldConfig.do",
    method: "post",
    data: {
      content: JSON.stringify(content),
      code: code,
    },
  });
}

//挂起
export function hangUncollectedFeesApi(FYSQ_ZJ, value) {
  return request({
    url: "/uncollectedFees/hangUncollectedFees.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
      FYSQ_GQ: value ? 1 : 0,
    },
  });
}
