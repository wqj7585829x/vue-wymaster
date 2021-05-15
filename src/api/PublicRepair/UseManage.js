// 公维金使用管理

import request from "@/utils/Request";

// 新增
export function add(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_add.doAdmin",
    method: "post",
    data: {
      pubProjectName: obj.pubProjectName,
      pubProjectMoney: obj.pubProjectMoney,
      shareStandard: obj.shareStandard,
      type: obj.type ? obj.type : null,
      progress: obj.progress ? obj.progress : null,
      repairType: obj.repairType ? obj.repairType : null,
      belongClique: obj.belongClique,
      belongComp: obj.belongComp,
      belongPlot: obj.belongPlot,
      repairDepartment: obj.repairDepartment ? obj.repairDepartment : null,
      processer: obj.processer ? obj.processer : null,
      repairCompany: obj.repairCompany ? obj.repairCompany : null,
      repairAddress: obj.repairAddress ? obj.repairAddress : null,
      repairDate: obj.repairDate ? obj.repairDate : null,
      startDate: obj.startDate ? obj.startDate : null,
      endDate: obj.endDate ? obj.endDate : null,
      explain: obj.explain ? obj.explain : null,
      remark: obj.remark ? obj.remark : null,
      groupID: obj.groupID,
    },
  });
}

// 修改
export function modify(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_modify.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
      pubProjectName: obj.pubProjectName,
      pubProjectMoney: obj.pubProjectMoney,
      shareStandard: obj.shareStandard,
      type: obj.type ? obj.type : null,
      progress: obj.progress ? obj.progress : null,
      repairType: obj.repairType ? obj.repairType : null,
      repairDepartment: obj.repairDepartment ? obj.repairDepartment : null,
      processer: obj.processer ? obj.processer : null,
      repairCompany: obj.repairCompany ? obj.repairCompany : null,
      repairAddress: obj.repairAddress ? obj.repairAddress : null,
      repairDate: obj.repairDate ? obj.repairDate : null,
      startDate: obj.startDate ? obj.startDate : null,
      endDate: obj.endDate ? obj.endDate : null,
      explain: obj.explain ? obj.explain : null,
      remark: obj.remark ? obj.remark : null,
      groupID: obj.groupID,
    },
  });
}

// 获取集团
export function findClique() {
  return request({
    url: "financial/financial_findClique.doAdmin",
    method: "post",
    data: {},
  });
}

// 获取物业公司
export function findTen(obj) {
  return request({
    url: "financial/financial_findTen.doAdmin",
    method: "post",
    data: {
      cliqId: obj.belongClique,
    },
  });
}

// 获取小区
export function findPlot(obj) {
  return request({
    url: "financial/financial_findPlot.doAdmin",
    method: "post",
    data: {
      tenId: obj.belongComp,
    },
  });
}

// 公维金维修项目对应分摊组及对应户
export function PubRepFundProject_selectGroupR(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_selectGroupR.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
      groupID: obj.groupID,
    },
  });
}

// 设置分摊组户-分摊组列表
export function PubRepFundGroup_selectByProject(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroup_selectByProject.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
      belongPlot: obj.belongPlot,
    },
  });
}

// 维修项目 表 查询
export function PubRepFundProject_selectByPage(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_selectByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      pubProjectName: obj.pubProjectName ? obj.pubProjectName : null,
      belongClique: obj.belongClique ? obj.belongClique : null,
      belongComp: obj.belongComp ? obj.belongComp : null,
      approvalStatus: obj.approvalStatus ? obj.approvalStatus : null,
      share: obj.share ? obj.share : null,
    },
  });
}

// 删除
export function PubRepFundProject_delete(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_delete.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
    },
  });
}

// 提交审批
export function subApproval(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_subApproval.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
    },
  });
}

// 审批
export function approval(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_approval.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
      approvalStatus: obj.approvalStatus,
      reason: obj.approvalStatus == 3 ? obj.reason : null,
    },
  });
}

// 执行分摊
export function share(obj) {
  return request({
    url: "/pubRepFund/PubRepFundProject_share.doAdmin",
    method: "post",
    data: {
      pubProjectID: obj.pubProjectID,
    },
  });
}
