// 交款申请

import request from "@/utils/Request";

// 获取收费项目
export function findReviewTree() {
  return request({
    url: "/basic/basic_findReviewTree.doAdmin",
    method: "post",
    data: {},
  });
}

// 获取收款员
export function findCashier(obj) {
  return request({
    url: "/review/review_findCashier.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
    },
  });
}

// 查询收付方式
export function findWayByPlot(obj) {
  return request({
    url: "/review/review_findWayByPlot.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
    },
  });
}

// 预览
export function preview(obj, payeeData, receiptTypeData) {
  var receiptType = "";
  var payeeId = "";
  if (obj.receiptType == "") {
    receiptTypeData.forEach((item, index) => {
      if (index == receiptTypeData.length - 1) {
        receiptType += item.receiptType;
      } else {
        receiptType += item.receiptType + ",";
      }
    });
  }
  if (obj.payeeId == "") {
    payeeData.forEach((item, index) => {
      if (index == payeeData.length - 1) {
        payeeId += item.payId;
      } else {
        payeeId += item.payId + ",";
      }
    });
  }
  return request({
    url: "/review/review_preview.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
      type: obj.type,
      receiptType: obj.receiptType == "" ? receiptType : obj.receiptType,
      payeeId: obj.payeeId == "" ? payeeId : obj.payeeId,
    },
  });
}

// 查询上次交款时间
export function findLastTime(obj) {
  return request({
    url: "/review/review_findLastTime.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
    },
  });
}

// 交款申请提交
export function subReview(obj, payeeData, receiptTypeData) {
  var receiptType = "";
  var payeeId = "";
  var payee = "";
  if (obj.receiptType == "") {
    receiptTypeData.forEach((item, index) => {
      if (index == receiptTypeData.length - 1) {
        receiptType += item.receiptType;
      } else {
        receiptType += item.receiptType + ",";
      }
    });
  }
  if (obj.payeeId == "") {
    payeeData.forEach((item, index) => {
      if (index == payeeData.length - 1) {
        payeeId += item.payId;
        payee += item.payee;
      } else {
        payeeId += item.payId + ",";
        payee += item.payee + ",";
      }
    });
  }
  return request({
    url: "/review/review_subReview.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      type: obj.type,
      receiptType: obj.receiptType == "" ? receiptType : obj.receiptType,
      lastTime: obj.lastTime,
      thisTime: obj.thisTime,
      payee: obj.payee == null ? payee : obj.payee,
      payeeId: obj.payeeId == "" ? payeeId : obj.payeeId,
      orderTime: obj.orderTime,
      remark: obj.remark ? obj.remark : null,
    },
  });
}

// 查询分页
export function queryByPage(obj) {
  return request({
    url: "/review/review_queryByPage.doAdmin",
    method: "post",
    data: {
      plotId: obj.plotId,
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      ownYears: obj.ownYears ? obj.ownYears : null,
      beginTime: obj.beginTime ? obj.beginTime : null,
      endTime: obj.endTime ? obj.endTime : null,
    },
  });
}

// 费用明细
export function findDetail(obj) {
  return request({
    url: "/review/review_findDetail.doAdmin",
    method: "post",
    data: {
      payId: obj,
    },
  });
}

// 通过审核
export function Approved(obj) {
  return request({
    url: "/review/review_Approved.doAdmin",
    method: "post",
    data: {
      payId: obj,
    },
  });
}

// 作废
export function invalid(obj) {
  return request({
    url: "/review/review_invalid.doAdmin",
    method: "post",
    data: {
      payId: obj.payId,
      invalidTime: obj.invalidTime,
      invalidReason: obj.invalidReason,
    },
  });
}

// 删除
export function review_delete(obj) {
  return request({
    url: "/review/review_delete.doAdmin",
    method: "post",
    data: {
      payId: obj,
    },
  });
}
