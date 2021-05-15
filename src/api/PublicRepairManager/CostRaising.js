//公维金管理 筹集
import request from "@/utils/Request";

//大项目查询
export function queryBigProject(obj) {
  return request({
    url: "/raiseCosts/queryBigProject.do",
    method: "post",
    data: {
      beginDate: obj.beginDate,
      endDate: obj.endDate,
      likeCondition: obj.likeCondition,
      ZT: obj.ZT,
    },
  });
}
//小项目查询
export function querySmallProject(obj) {
  return request({
    url: "/raiseCosts/querySmallProject.do",
    method: "post",
    data: {
      beginDate: obj.beginDate,
      endDate: obj.endDate,
      likeCondition: obj.likeCondition,
      ZT: obj.ZT,
    },
  });
}
//预算分摊查询
export function queryBudgetDistribution(obj) {
  return request({
    url: "/raiseCosts/queryBudgetDistribution.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ ? obj.WXFA_ZJ : null,
      WXDJ_ZJ: obj.WXDJ_ZJ ? obj.WXDJ_ZJ : null,
    },
  });
}

//预算不足用户查询
export function queryUnderbudgetUser(obj) {
  return request({
    url: "/raiseCosts/queryUnderbudgetUser.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ ? obj.WXFA_ZJ : null,
      WXDJ_ZJ: obj.WXDJ_ZJ ? obj.WXDJ_ZJ : null,
    },
  });
}

//大项目是否可以预算分摊
export function isBudgetDistributionForBigProject(obj) {
  return request({
    url: "/raiseCosts/isBudgetDistributionForBigProject.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ ? obj.WXFA_ZJ : null,
    },
  });
}

//小项目预算设置
export function budgetSettingForSmallProject(obj) {
  return request({
    url: "/raiseCosts/budgetSettingForSmallProject.do",
    method: "post",
    data: {
      WXDJ_YSFY: obj.WXDJ_YSFY,
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//大项目预算分摊
export function budgetDistributionForBigProject(obj) {
  return request({
    url: "/raiseCosts/budgetDistributionForBigProject.do",
    method: "post",
    data: {
      XMMC: obj.XMMC,
      FTLX: 0,
      WXFA_ZJ: obj.WXFA_ZJ,
    },
  });
}

//小项目预算分摊
export function budgetDistributionForSmallProject(obj) {
  return request({
    url: "/raiseCosts/budgetDistributionForSmallProject.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      FTJE: obj.FTJE,
      FTLX: 0,
      XMMC: obj.XMMC,
    },
  });
}
