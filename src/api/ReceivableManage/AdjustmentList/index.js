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
    url: "/receivableManagement/queryAdjustedReceivablePayment.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      YSLB_LDWJ: obj.DLDA_ZJ,
      YSLB_ZYWJ: obj.FJDA_ZJ,
      YSLB_SFXMWJ: obj.SFXM_ZJ,
      startMonth: obj.startMonth,
      endMonth: obj.endMonth,
      YSLB_SHZT: obj.YSLB_SHZT,
    },
  });
}
//应收列表统计
export function ReceivableListSumApi(obj) {
  return request({
    url: "/receivableManagement/getAdjustedReceivablePaymentStatistics.do",
    method: "post",
    data: {
      YSLB_LDWJ: obj.DLDA_ZJ,
      YSLB_ZYWJ: obj.FJDA_ZJ,
      YSLB_SFXMWJ: obj.SFXM_ZJ,
      startMonth: obj.startMonth,
      endMonth: obj.endMonth,
      YSLB_SHZT: obj.YSLB_SHZT,
    },
  });
}
//新增
export function addApi(obj) {
  return request({
    url: "/receivableManagement/addAdjustedReceivablePayment.do",
    method: "post",
    data: {
      YSLB_LDWJ: obj.YSLB_LDWJ,
      YSLB_LDMC: obj.YSLB_LDMC,
      YSLB_ZYWJ: obj.YSLB_ZYWJ,
      YSLB_ZYDM: obj.YSLB_ZYDM,
      YSLB_SFMJ: obj.YSLB_SFMJ, //收费面积
      YSLB_ZYMC: obj.YSLB_ZYMC,
      YSLB_SFXMWJ: obj.YSLB_SFXMWJ,
      YSLB_SFXMMC: obj.YSLB_SFXMMC,
      YSLB_SL: obj.YSLB_SL,
      YSLB_JEHS: obj.YSLB_JEHS,
      YSLB_FYSSNY: obj.YSLB_FYSSNY,
      YSLB_TZSM: obj.YSLB_TZSM,
    },
  });
}
//修改
export function editApi(obj) {
  return request({
    url: "/receivableManagement/updAdjustedReceivablePayment.do",
    method: "post",
    data: {
      YSLB_ZJ: obj.YSLB_ZJ,
      YSLB_SL: obj.YSLB_SL,
      YSLB_JEHS: obj.YSLB_JEHS,
      YSLB_TZSM: obj.YSLB_TZSM,
    },
  });
}
//删除
export function DeleteApi(obj) {
  return request({
    url: "/receivableManagement/delAdjustedReceivablePayment.do",
    method: "post",
    data: {
      YSLB_ZJ: obj,
    },
  });
}
//提交审核
export function submitAuditApi(obj) {
  return request({
    url: "/receivableManagement/submitReview.do",
    method: "post",
    data: {
      YSLB_ZJ: obj,
    },
  });
}
