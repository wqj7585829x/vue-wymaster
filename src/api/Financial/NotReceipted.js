// 未收清款项
import request from "@/utils/Request";

// 点击资源房间查询资源信息与客户信息
export function FindCusAndResource(obj) {
  return request({
    url: "/receipt/receipt_findCusAndResource.doAdmin",
    method: "post",
    data: {
      roomId: obj, //客户搜索条件
    },
  });
}
// 点击客户信息下拉修改查询收费项目下拉数据
export function GuestexpitemData(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: obj == "" ? null : obj,
    },
  });
}
// 查询未收清款项表格分页
export function NotRecequeryData(obj) {
  return request({
    url: "/receipt/receipt_queryByPage.doAdmin",
    method: "post",
    data: {
      // startRownumber: obj.startRownumber,
      // pageSize: obj.pageSize,
      status: obj.status,
      cusId: obj.cusId == "" ? null : obj.cusId,
      expId: obj.expId == "" ? null : obj.expId,
      roomId: obj.roomId == "" ? null : obj.roomId,
    },
  });
}
// 查询收款方式下拉列表
export function FindReceiptWay(obj) {
  return request({
    url: "/receipt/receipt_findReceiptWay.doAdmin",
    method: "post",
    data: {
      plotId: obj,
      type: 1, //1收取
    },
  });
}
// 收清选中 确定收清
export function ReceiptVoucher(obj) {
  var ArrayObj = [];
  for (var i = 0; i < obj.length; i++) {
    var data = {};
    data.cenId = obj[i].cenId;
    data.cliqId = obj[i].cliqId;
    data.tenId = obj[i].tenId;
    data.plotId = obj[i].plotId;
    data.partid = obj[i].partid;
    data.buildid = obj[i].buildid;
    data.roomid = obj[i].roomid;
    data.cusId = obj[i].cusId;
    data.tabulation = obj[i].tabulation;
    data.tabulationPle = obj[i].tabulationPle;
    data.entryAccount = obj[i].entryAccount;
    data.paymentPle = obj[i].paymentPle;
    data.expId = obj[i].expId;
    data.expName = obj[i].expName;
    data.ownYears = obj[i].ownYears;
    data.receiptWay = obj[i].receiptWay;
    data.receiptAmount = obj[i].receiptAmount;
    data.taxRate = obj[i].taxRate;
    data.receiptSummary = obj[i].receiptSummary;
    data.beginDate = obj[i].beginDate;
    data.endDate = obj[i].endDate;
    data.remark = obj[i].remark;
    data.roundWay = obj[i].roundWay;
    data.preciseDigit = obj[i].preciseDigit;
    data.deductAmount = obj[i].deductAmount == "" ? null : obj[i].deductAmount;
    data.dueDate = obj[i].dueDate;
    ArrayObj.push(data);
  }
  return request({
    url: "/receipt/receipt_Voucher.doAdmin",
    method: "post",
    data: ArrayObj,
  });
}

// 费用调整根据房间roomid查询
export function QueryFeeAdjust(obj) {
  return request({
    url: "/receipt/receipt_queryFeeAdjust.doAdmin",
    method: "post",
    data: {
      roomid: obj, //客户搜索条件
    },
  });
}
// 点击资源房间查询收费项目
export function FindExpByCus(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: null,
      roomId: obj, //客户搜索条件
    },
  });
}
//根据收费项目查询税率
export function TaxRateByExp(obj) {
  return request({
    url: "/receipt/receipt_findTaxRateByExp.doAdmin",
    method: "post",
    data: {
      expId: obj, //费用项目id
    },
  });
}
//费用调整保存修改确定
export function addFeeAdjust(obj) {
  var ArrayObj = [];
  for (var i = 0; i < obj.length; i++) {
    var data = {};
    data.cenId = obj[i].cenId == "" ? null : obj[i].cenId;
    data.cliqueid = obj[i].cliqueid;
    data.tenid = obj[i].tenid;
    data.plotid = obj[i].plotid;
    data.partid = obj[i].partid;
    data.buildid = obj[i].buildid;
    data.roomid = obj[i].roomid;
    data.cusId = obj[i].cusId;
    data.accountPeriod = obj[i].accountPeriod;
    data.expId = obj[i].expId;
    data.rceivableTax = obj[i].rceivableTax;
    data.paidAmount = obj[i].paidAmount;
    data.taxRate = obj[i].taxRate;
    data.dueDate = obj[i].dueDate;
    data.beginDate = obj[i].beginDate;
    data.endDate = obj[i].endDate;
    data.description = obj[i].description;
    ArrayObj.push(data);
  }
  return request({
    url: "/receipt/receipt_addFeeAdjust.doAdmin",
    method: "post",
    data: ArrayObj,
  });
}
//费用调整删除
export function DelFeeAdjust(obj) {
  return request({
    url: "/receipt/receipt_delFeeAdjust.doAdmin",
    method: "post",
    data: obj,
  });
}
//优惠减免保存修改确定
export function DiscountReduction(obj) {
  var ArrayObj = [];
  for (var i = 0; i < obj.length; i++) {
    var data = {};
    data.cenId = obj[i].cenId == "" ? null : obj[i].cenId;
    data.expId = obj[i].expId;
    data.plotId = obj[i].plotId;
    data.expName = obj[i].expName;
    data.accountPeriod = obj[i].accountPeriod;
    data.paymentWay = obj[i].paymentWay;
    data.receivable = obj[i].receivable;
    data.reductionTax = obj[i].reductionTax;
    data.reductionNotTax = obj[i].reductionNotTax;
    data.taxRate = obj[i].taxRate;
    data.tabulation = obj[i].tabulation;
    data.summary = obj[i].summary;
    data.reductionReason = obj[i].reductionReason;
    ArrayObj.push(data);
  }
  return request({
    url: "/receipt/receipt_discountReduction.doAdmin",
    method: "post",
    data: ArrayObj,
  });
}

//单个计算 费用项目树
export function QuerySingleTree(plotid) {
  return request({
    url: "/basic/FindTree_byPlotId.doAdmin",
    method: "post",
    data: {
      plotId: plotid,
    },
  });
}
//单个计算 生成费用
export function addCalculationCost(obj) {
  return request({
    url: "/receipt/CalculationCost.doAdmin",
    method: "post",
    data: {
      plotid: obj.plotid,
      roomid: obj.roomid,
      startdate: obj.startdate,
      enddate: obj.enddate,
      costId: obj.costId,
    },
  });
}

//单个计算 生成费用费用删除
export function deleteCalculationCost(obj) {
  return request({
    url: "/receipt/CalculationCostDelete.doAdmin",
    method: "post",
    data: {
      plotid: obj.plotid,
      roomid: obj.roomid,
      startdate: obj.startdate,
      enddate: obj.enddate,
      costId: obj.costId,
    },
  });
}

//单个计算，费用生成查询所属年月
export function findAccountPeriod(plotId) {
  return request({
    url: "/receipt/receipt_findAccountPeriod.doAdmin",
    method: "post",
    data: {
      plotId: plotId,
    },
  });
}

// 收清选中 确定收清并开票
export function CollectVoucher(obj) {
  var ArrayObj = [];
  for (var i = 0; i < obj.length; i++) {
    var data = {};
    data.cenId = obj[i].cenId;
    data.cliqId = obj[i].cliqId;
    data.tenId = obj[i].tenId;
    data.plotId = obj[i].plotId;
    data.partid = obj[i].partid;
    data.buildid = obj[i].buildid;
    data.roomid = obj[i].roomid;
    data.cusId = obj[i].cusId;
    data.tabulation = obj[i].tabulation;
    data.tabulationPle = obj[i].tabulationPle;
    data.entryAccount = obj[i].entryAccount;
    data.paymentPle = obj[i].paymentPle;
    data.expId = obj[i].expId;
    data.expName = obj[i].expName;
    data.ownYears = obj[i].ownYears;
    data.receiptWay = obj[i].receiptWay;
    data.receiptAmount = obj[i].receiptAmount;
    data.taxRate = obj[i].taxRate;
    data.receiptSummary = obj[i].receiptSummary;
    data.beginDate = obj[i].beginDate;
    data.endDate = obj[i].endDate;
    data.remark = obj[i].remark;
    data.roundWay = obj[i].roundWay;
    data.preciseDigit = obj[i].preciseDigit;
    data.deductAmount = obj[i].deductAmount == "" ? null : obj[i].deductAmount;
    data.dueDate = obj[i].dueDate;
    ArrayObj.push(data);
  }
  return request({
    url: "/receipt/receipt_CollectVoucher.doAdmin",
    method: "post",
    data: ArrayObj,
  });
}
