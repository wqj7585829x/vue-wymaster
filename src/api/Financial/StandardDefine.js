import request from "@/utils/Request";
//获取集团
export function getCliq(obj) {
  return request({
    url: "/financial/financial_findClique.doAdmin",
    method: "post",
    data: {},
  });
}

//获取物业
export function getProperty(cliqId) {
  return request({
    url: "/financial/financial_findTen.doAdmin",
    method: "post",
    data: {
      cliqId: cliqId,
    },
  });
}

//获取小区
export function getPlot(tenId) {
  return request({
    url: "/financial/financial_findPlot.doAdmin",
    method: "post",
    data: {
      tenId: tenId,
    },
  });
}

//获取树
export function getTreeFn(obj) {
  return request({
    url: "/financial/financial_queryStandardTree.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliid,
      tenId: obj.tenid,
      plotId: obj.plotid,
    },
  });
}

//获取费用项目
export function getExpenseItem(keyid) {
  return request({
    url: "/financial/financial_findExpenseItem.doAdmin",
    method: "post",
    data: {
      id: keyid,
    },
  });
}

//获取费用标准
export function getCostsItem(keyid, type, way) {
  return request({
    url: "/financial/financial_findStandard.doAdmin",
    method: "post",
    data: {
      id: keyid,
      expenseType: type,
      pricingWay: way,
    },
  });
}

//新增费用项目
export function addExpense(obj) {
  return request({
    url: "/financial/financial_insertExpenseItem.doAdmin",
    method: "post",
    data: {
      cliqId: obj.cliqId,
      tenId: obj.tenId,
      plotId: obj.plotId,
      expName: obj.expName,
      expenseType: obj.expenseType,
      roundWay: obj.roundWay,
      preciseDigit: obj.preciseDigit,
      taxRate: obj.taxRate ? obj.taxRate : 0,
      status: obj.status,
      remark: obj.remark,
    },
  });
}
//修改费用项目
export function updateExpense(obj) {
  return request({
    url: "/financial/financial_modifyExpenseItem.doAdmin",
    method: "post",
    data: {
      expId: obj.expId,
      expName: obj.expName,
      expenseType: obj.expenseType,
      roundWay: obj.roundWay,
      preciseDigit: obj.preciseDigit,
      taxRate: obj.taxRate ? obj.taxRate : 0,
      status: obj.status,
      remark: obj.remark,
    },
  });
}

//新增费用标准
export function addCosts(obj) {
  return request({
    url: "/financial/financial_insertStandard.doAdmin",
    method: "post",
    data: {
      expId: obj.expId,
      expenseType: obj.expenseType,
      plotId: obj.plotId,
      standardName: obj.standardName,
      pricingWay: obj.pricingWay,
      setAmount: obj.setAmount,
      calParam: obj.calParam,
      calPrice: obj.calPrice,
      calMultiple: obj.calMultiple,
      dosageItem: obj.dosageItem,
      ratio: obj.ratio,
      price: obj.price,
      cycle: obj.cycle,
      start: obj.start,
      customize: obj.customize,
      calWay: obj.calWay,
      cardinalNum: obj.cardinalNum,
      multiplePower: obj.multiplePower,
      standardPrice: obj.standardPrice,
      meterUnit: obj.meterUnit,
      peopleNum: obj.peopleNum,
      base: obj.base,
      dosage1: obj.dosage1 ? obj.dosage1 : null,
      dosage2: obj.dosage2 ? obj.dosage2 : null,
      dosage3: obj.dosage3 ? obj.dosage3 : null,
      price1: obj.price1 ? obj.price1 : null,
      price2: obj.price2 ? obj.price2 : null,
      price3: obj.price3 ? obj.price3 : null,
      month: obj.month,
      day: obj.day,
    },
  });
}
// 修改费用标准
export function updateCosts(obj) {
  return request({
    url: "/financial/financial_modifyStandard.doAdmin",
    method: "post",
    data: {
      id: obj.costId,
      standardName: obj.standardName,
      pricingWay: obj.pricingWay,
      setAmount: obj.setAmount,
      calParam: obj.calParam,
      calPrice: obj.calPrice,
      calMultiple: obj.calMultiple,
      dosageItem: obj.dosageItem,
      ratio: obj.ratio,
      price: obj.price,
      cycle: obj.cycle,
      start: obj.start,
      customize: obj.customize,
      calWay: obj.calWay,
      cardinalNum: obj.cardinalNum,
      multiplePower: obj.multiplePower,
      standardPrice: obj.standardPrice,
      meterUnit: obj.meterUnit,
      peopleNum: obj.peopleNum,
      base: obj.base,
      dosage1: obj.dosage1 ? obj.dosage1 : null,
      dosage2: obj.dosage2 ? obj.dosage2 : null,
      dosage3: obj.dosage3 ? obj.dosage3 : null,
      price1: obj.price1 ? obj.price1 : null,
      price2: obj.price2 ? obj.price2 : null,
      price3: obj.price3 ? obj.price3 : null,
      month: obj.month,
      day: obj.day,
    },
  });
}
//标准定义查询其他费用的用量、依附其他费用的金额
export function getDosageItem(type) {
  return request({
    url: "/financial/financial_findDosageItem.doAdmin",
    method: "post",
    data: {
      type: type,
    },
  });
}

//删除费用项目
export function deleteExpense(expId) {
  return request({
    url: "/financial/financial_deleteExpenseItem.doAdmin",
    method: "post",
    data: {
      expId: expId,
    },
  });
}

//删除费用标准
export function deleteCosts(id) {
  return request({
    url: "/financial/financial_delStandard.doAdmin",
    method: "post",
    data: {
      id: id,
    },
  });
}
