import request from "@/utils/Request";

//分摊总表级别查询
export function queryTotalTableLevelApi() {
  return request({
    url: "/newSharedExpenses/queryTotalTableLevel.do",
    method: "post",
    data: {},
  });
}

//列表查询查询
export function getSharingTableTreeApi(obj) {
  return request({
    url: "/newSharedExpenses/getSharingTableTree.do",
    method: "post",
    data: {
      FTZB_FTJB: obj.FTZB_FTJB,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_BDM: obj.FTZB_BDM,
      FTZB_FTFS: obj.FTZB_FTFS,
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//编辑本月读数和上月读数
export function editMeterReadingApi(data) {
  return request({
    url: "/newSharedExpenses/editMeterReading.do",
    method: "post",
    data: {
      FTZB_ZJ: data.FTZB_ZJ,
      isUserMeter: data.isUserMeter,
      FTZB_SYDS: data.FTZB_SYDS,
      FTZB_BYDS: data.FTZB_BYDS,
      FTZB_JNDJ: data.FTZB_JNDJ,
      FTZB_BBL: data.FTZB_BBL,
    },
  });
}

//编辑本期金额
export function editMoneyApi(data) {
  return request({
    url: "/newSharedExpenses/editMoney.do",
    method: "post",
    data: {
      FTZB_ZJ: data.FTZB_ZJ,
      isUserMeter: data.isUserMeter,
      FTZB_ZBJE: data.FTZB_ZBJE,
    },
  });
}

//编辑本期实际分摊量
export function editThisPeriodApportionmentApi(data) {
  return request({
    url: "/newSharedExpenses/editThisPeriodApportionment.do",
    method: "post",
    data: {
      FTZB_ZJ: data.FTZB_ZJ,
      FTZB_BQFTL: data.FTZB_BYXD,
    },
  });
}

//分摊总表录入日期和上次录入日期修改
export function editEntryDateApi(data) {
  return request({
    url: "/newSharedExpenses/editEntryDate.do",
    method: "post",
    data: {
      FTZB_ZJ: data.FTZB_ZJ,
      FTZB_CBRQ: data.FTZB_CBRQ,
      FTZB_SCCBRQ: data.FTZB_SCCBRQ,
    },
  });
}

//数据导出
export function exportSharingTableApi(obj) {
  return request({
    url: "/newSharedExpenses/exportSharingTable.do",
    method: "post",
    responseType: "blob",
    data: {
      FTZB_FTJB: obj.FTZB_FTJB,
      FTZB_ZBMC: obj.FTZB_ZBMC,
      FTZB_BDM: obj.FTZB_BDM,
      FTZB_FTFS: obj.FTZB_FTFS,
    },
  });
}

//数据导入
export function importSharingTableApi(obj) {
  return request({
    url: "/newSharedExpenses/importSharingTable.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

//分摊计算
export function apportionmentCalculationApi() {
  return request({
    url: "/newSharedExpenses/apportionmentCalculation.do",
    method: "post",
    data: {},
  });
}
