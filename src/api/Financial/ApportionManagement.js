// 分摊

import request from "@/utils/Request";

// 分摊类别
export function findSysConfig(data) {
  return request({
    url: "/manage/manage_findSysConfig.doAdmin",
    method: "post",
    data: {
      type: data,
    },
  });
}

// 获取树
export function FindApportionTree(data) {
  return request({
    url: "/basic/FindApportionTree.doAdmin",
    method: "post",
    data: data,
  });
}

// 获取树(完整))
export function basic_apportionTree(data) {
  return request({
    url: "basic/basic_apportionTree.doAdmin",
    method: "post",
    data: data,
  });
}

// 获取集团
export function findClique(data) {
  return request({
    url: "financial/financial_findClique.doAdmin",
    method: "post",
    data: {},
  });
}

// 获取物业公司
export function findTen(data) {
  return request({
    url: "financial/financial_findTen.doAdmin",
    method: "post",
    data: data,
  });
}

// 获取小区
export function findPlot(data) {
  return request({
    url: "financial/financial_findPlot.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表树结构查询
export function shareMeter_select(data) {
  return request({
    url: "shareMeter/shareMeter_select.doAdmin",
    method: "post",
    data: data,
  });
}

//标准选用查询项目
export function financial_findItem(data) {
  return request({
    url: "financial/financial_findItem.doAdmin",
    method: "post",
    data: data,
  });
}

//根据费用项目查询费用标准
export function financial_findStandardByExp(data) {
  return request({
    url: "financial/financial_findStandardByExp.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表新增接口
export function shareMeter_add(data) {
  return request({
    url: "shareMeter/shareMeter_add.doAdmin",
    method: "post",
    data: {
      belongClique: data.belongClique == "" ? null : data.belongClique,
      belongComp: data.belongComp == "" ? null : data.belongComp,
      belongPlot: data.belongPlot == "" ? null : data.belongPlot,
      ShareMeterName: data.ShareMeterName == "" ? null : data.ShareMeterName,
      level: data.level == "" ? null : data.level,
      supShareMeterID: data.supShareMeterID,
      type: data.type == "" ? null : data.type,
      mode: data.mode == "" ? null : data.mode,
      differenceStatus: data.differenceStatus,
      showExpId: data.showExpId == "" ? null : data.showExpId,
      costId: data.costId == "" ? null : data.costId,
      calExpId: data.calExpId == "" ? null : data.calExpId,
      calCostId: data.calCostId == "" ? null : data.calCostId,
      shareRatio: data.shareRatio == "" ? null : data.shareRatio,
      addDegree: data.addDegree == "" ? null : data.addDegree,
      changeNum: data.changeNum == "" ? null : data.changeNum,
      shareAllMoney: data.shareAllMoney == "" ? null : data.shareAllMoney,
      startFloor: data.startFloor == "" ? null : data.startFloor,
      subFloorNum: data.subFloorNum == "" ? null : data.subFloorNum,
      subIncrementRatio:
        data.subIncrementRatio == "" ? null : data.subIncrementRatio,
      eachDegree: data.eachDegree == "" ? null : data.eachDegree,
    },
  });
}

//分摊表详情查询接口
export function shareMeter_detail(data) {
  return request({
    url: "shareMeter/shareMeter_detail.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表删除接口
export function shareMeter_delete(data) {
  return request({
    url: "shareMeter/shareMeter_delete.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表详情修改接口
export function shareMeter_modify(data) {
  return request({
    url: "shareMeter/shareMeter_modify.doAdmin",
    method: "post",
    data: {
      ShareMeterID: data.ShareMeterID,
      ShareMeterName: data.ShareMeterName == "" ? null : data.ShareMeterName,
      differenceStatus: data.differenceStatus,
      showExpId: data.showExpId == "" ? null : data.showExpId,
      costId: data.costId == "" ? null : data.costId,
      shareRatio: data.shareRatio === "" ? null : data.shareRatio,
      addDegree: data.addDegree === "" ? null : data.addDegree,
      changeNum: data.changeNum === "" ? null : data.changeNum,
      shareAllMoney: data.shareAllMoney == "" ? null : data.shareAllMoney,
      startFloor: data.startFloor == "" ? null : data.startFloor,
      subFloorNum: data.subFloorNum == "" ? null : data.subFloorNum,
      subIncrementRatio:
        data.subIncrementRatio == "" ? null : data.subIncrementRatio,
      eachDegree: data.eachDegree == "" ? null : data.eachDegree,
    },
  });
}

//分摊关系中分摊表下拉列表接口
export function ShareRelationship_selectMeter(data) {
  return request({
    url: "shareMeter/ShareRelationship_selectMeter.doAdmin",
    method: "post",
    data: data,
  });
}

//待选分摊关系记录
export function ShareRelationship_beSelect(data) {
  return request({
    url: "shareMeter/ShareRelationship_beSelect.doAdmin",
    method: "post",
    data: data,
  });
}

//已选分摊关系记录
export function ShareRelationship_selected(data) {
  return request({
    url: "shareMeter/ShareRelationship_selected.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊关系－批量新增接口
export function ShareRelationship_add(data) {
  return request({
    url: "shareMeter/ShareRelationship_add.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊关系－批量删除接口
export function ShareRelationship_delete(data) {
  return request({
    url: "shareMeter/ShareRelationship_delete.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊关系－自定义分摊比例接口
export function ShareRelationship_customShareRatio(data) {
  return request({
    url: "shareMeter/ShareRelationship_customShareRatio.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表读数录入中分摊表下拉列表接口
export function ShareMeterReading_selectMeter(data) {
  return request({
    url: "shareMeter/ShareMeterReading_selectMeter.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表读数录入列表接口
export function ShareMeterReading_select(data) {
  return request({
    url: "shareMeter/ShareMeterReading_select.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表读数录入接口
export function ShareMeterReading_modify(data) {
  return request({
    url: "shareMeter/ShareMeterReading_modify.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊表读数录入-批量设置抄表日期接口
export function ShareMeterReading_modifyReadingDate(data) {
  return request({
    url: "shareMeter/ShareMeterReading_modifyReadingDate.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊计算
export function ShareCalculation_Calculation(data) {
  return request({
    url: "shareMeter/ShareCalculation_Calculation.doAdmin",
    method: "post",
    data: data,
  });
}

//分摊查询列表
export function ShareCalculation_selectByPage(data) {
  return request({
    url: "shareMeter/ShareCalculation_selectByPage.doAdmin",
    method: "post",
    data: data,
  });
}
