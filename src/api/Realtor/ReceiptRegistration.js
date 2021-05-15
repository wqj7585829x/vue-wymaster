import request from "@/utils/Request";

//查询未收清费用
export function queryUncollectedFeesApi(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryUncollectedFees.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      ownerName: obj.ownerName,
      roomName: obj.roomName,
      chargeItem: obj.chargeItem ? obj.chargeItem : "",
      FYSQ_HTWJ: obj.FYSQ_HTWJ ? obj.FYSQ_HTWJ : "",
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//合同编码查询
export function queryContractListApi(obj) {
  return request({
    url: "/ZL/depositPayment/queryContractList.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//收费项目查询
export function queryAllChargeItemApi(obj) {
  return request({
    url: "/util/queryZLChargeItem.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//资源名称查询
export function queryZLRoomApi(obj) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      contractId: obj.FYSQ_HTWJ ? obj.FYSQ_HTWJ : "",
    },
  });
}
//业主名称查询
export function queryZLCustomerApi(obj) {
  return request({
    url: "/util/queryZLCustomer.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//收清选中列表查询
export function queryUncollectedFeesByIdApi(FYSQ_ZJ, obj) {
  return request({
    url: "/ZL/ChargeManagement/queryUncollectedFeesById.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
      dbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
//	默认收款方式查询
export function queryDefaultPayWay(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryDefaultMethod.do",
    method: "post",
    data: {
      dbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//收款方式查询
export function querytPayWay(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryPaymentMethod.do",
    method: "post",
    data: {
      dbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//客户名称、资源代码查询
export function queryGuestData(KHDA_ZJ, FJDA_ZJ, obj) {
  return request({
    url: "/ZL/ChargeManagement/queryPayMessage.do",
    method: "post",
    data: {
      KHDA_ZJ: KHDA_ZJ,
      FJDA_ZJ: FJDA_ZJ,
      dbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//收清选中
export function submitFeeCollection(obj, list) {
  return request({
    url: "/ZL/ChargeManagement/feeCollection.do",
    method: "post",
    data: {
      SKPZ_JKR: obj.paymentPle,
      SKPZ_SKR: obj.SKPZ_SKR,
      SKPZ_TZRQ: obj.tabulation,
      SKPZ_RZSJ: obj.entryAccount,
      SKMX_SKFS: obj.SFKM_SKFS,
      SKMX_SKFSLX: obj.SFKM_SKFSLX,
      SKPZ_LY: obj.SKPZ_LY,
      dbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      list: JSON.stringify(list),
    },
  });
}

//修改备注
export function updateNote(obj) {
  return request({
    url: "/ZL/ChargeManagement/updateNote.do",
    method: "post",
    data: {
      FYSQ_ZJ: obj.FYSQ_ZJ,
      FYSQ_BZ: obj.FYSQ_BZ,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//修改摘要
export function updateSummary(obj) {
  return request({
    url: "/ZL/ChargeManagement/updateSummary.do",
    method: "post",
    data: {
      FYSQ_ZJ: obj.FYSQ_ZJ,
      FYSQ_ZY: obj.FYSQ_ZY,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//收款明细查询
export function querReceiptList(FYSQ_ZJ) {
  return request({
    url: "/ZL/ChargeManagement/queryClientUnderRoom.do",
    method: "post",
    data: {
      FYSQ_ZJ: FYSQ_ZJ,
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//费用调整房间查询
export function queryCostAdZLRoomApi(obj) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      type: 1,
    },
  });
}

//费用调整合同/客户查询
export function queryCostAdContractList(obj) {
  return request({
    url: "/ZL/depositPayment/queryContractList.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      roomId: obj.FYSQ_FJDAWJ ? obj.FYSQ_FJDAWJ : "",
    },
  });
}

//费用调整查询
export function queryCostAdjustmentListApi(obj) {
  return request({
    url: "/ZL/ChargeManagement/queryCostAdjustmentList.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_KHDAWJ: obj.FYSQ_KHDAWJ,
      FYSQ_HTWJ: obj.FYSQ_HTWJ,
      FYSQ_FJDAWJ: obj.FYSQ_FJDAWJ,
    },
  });
}

//费用调整新增
export function addFeeCollectionApi(obj, FeeObj) {
  return request({
    url: "/ZL/ChargeManagement/addFeeCollection.do",
    method: "post",
    data: {
      dbName: FeeObj.dbName,
      GLCID: FeeObj.GLCID,
      YXDID: FeeObj.YXDID,
      FYSQ_KHDAWJ: FeeObj.FYSQ_KHDAWJ,
      FYSQ_HTWJ: FeeObj.FYSQ_HTWJ,
      FYSQ_FJDAWJ: FeeObj.FYSQ_FJDAWJ,
      FYSQ_SFXMMC: obj.FYSQ_SFXMMC,
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ,
      FYSQ_SSNY: obj.FYSQ_SSNY,
      FYSQ_YSJE: obj.FYSQ_YSJE,
      FYSQ_FYLB: obj.FYSQ_FYLB,
      FYSQ_JQWS: obj.FYSQ_JQWS,
      FYSQ_QZFS: obj.FYSQ_QZFS,
      FYSQ_YSSL: obj.FYSQ_YSSL,
      FYSQ_YSSE: obj.FYSQ_YSSE,
      FYSQ_YSBHS: obj.FYSQ_YSBHS,
      FYSQ_TZSM: obj.FYSQ_TZSM,
      FYSQ_ZY: obj.FYSQ_ZY,
    },
  });
}

//费用调整修改
export function updateFeeCollectionApi(obj, FeeObj) {
  return request({
    url: "/ZL/ChargeManagement/updateFeeCollection.do",
    method: "post",
    data: {
      dbName: FeeObj.dbName,
      GLCID: FeeObj.GLCID,
      YXDID: FeeObj.YXDID,
      FYSQ_KHDAWJ: FeeObj.FYSQ_KHDAWJ,
      FYSQ_HTWJ: FeeObj.FYSQ_HTWJ,
      FYSQ_FJDAWJ: FeeObj.FYSQ_FJDAWJ,
      FYSQ_SFXMMC: obj.FYSQ_SFXMMC,
      FYSQ_SFXMWJ: obj.FYSQ_SFXMWJ,
      FYSQ_SSNY: obj.FYSQ_SSNY,
      FYSQ_YSJE: obj.FYSQ_YSJE,
      FYSQ_FYLB: obj.FYSQ_FYLB,
      FYSQ_JQWS: obj.FYSQ_JQWS,
      FYSQ_QZFS: obj.FYSQ_QZFS,
      FYSQ_YSSL: obj.FYSQ_YSSL,
      FYSQ_YSSE: obj.FYSQ_YSSE,
      FYSQ_YSBHS: obj.FYSQ_YSBHS,
      FYSQ_TZSM: obj.FYSQ_TZSM,
      FYSQ_ZY: obj.FYSQ_ZY,
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}

//费用调整删除
export function deleteFeeCollectionApi(obj) {
  return request({
    url: "/ZL/ChargeManagement/deleteFeeCollection.do",
    method: "post",
    data: {
      dbName: obj.dbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FYSQ_ZJ: obj.FYSQ_ZJ,
    },
  });
}
