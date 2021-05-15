import request from "@/utils/Request";

//楼栋下拉框查询
export function BuildArrayListApi(obj) {
  return request({
    url: "/receivableManagement/queryBuildings.do",
    method: "post",
    data: {},
  });
}
//资源下拉框查询
export function RoomArrayListApi(obj) {
  return request({
    url: "/receivableManagement/queryRooms.do",
    method: "post",
    data: {
      DLDA_ZJ: obj.DLDA_ZJ,
    },
  });
}
//收费项目下拉框查询
export function ChargeItemsArrayListApi(obj) {
  return request({
    url: "/util/queryAllPayItems.do",
    method: "post",
    data: {},
  });
}
//表格查询
export function listApi(obj) {
  return request({
    url: "/receivableManagement/queryActualReceivablePayment.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      YSLB_LDWJ: obj.DLDA_ZJ,
      YSLB_ZYWJ: obj.FJDA_ZJ,
      YSLB_SFXMWJ: obj.SFXM_ZJ,
      startMonth: obj.startMonth,
      endMonth: obj.endMonth,
    },
  });
}
//应收列表统计
export function ReceivableListSumApi(obj) {
  return request({
    url: "/receivableManagement/getActualReceivablePaymentStatistics.do",
    method: "post",
    data: {
      YSLB_LDWJ: obj.DLDA_ZJ,
      YSLB_ZYWJ: obj.FJDA_ZJ,
      YSLB_SFXMWJ: obj.SFXM_ZJ,
      startMonth: obj.startMonth,
      endMonth: obj.endMonth,
    },
  });
}

//确认本月应收
export function confirmMonthApi(obj) {
  return request({
    url: "/receivableManagement/confirmedIncome.do",
    method: "post",
    data: {
      YSLB_ZJ: obj,
    },
  });
}

//取消本月应收
export function cancelMonthApi(obj) {
  return request({
    url: "/receivableManagement/cancelConfirmedIncome.do",
    method: "post",
    data: {
      YSLB_ZJ: obj,
    },
  });
}
