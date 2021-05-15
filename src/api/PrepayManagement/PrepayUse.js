//预交使用
import request from "@/utils/Request";

//树查询
export function getTree() {
  return request({
    url: "/util/queryOrgTreeHaveClient.do",
    method: "post",
    data: {},
  });
}

//预交使用列表查询
export function queryAcceptingTheUseApi(FKGX_ZJ) {
  return request({
    url: "/ys/acceptingTheUse/queryAcceptingTheUse.do",
    method: "post",
    data: {
      FKGX_ZJ: FKGX_ZJ,
    },
  });
}
//查询合计使用金额
export function queryTotalAmountUsedApi(FKGX_ZJ) {
  return request({
    url: "/ys/acceptingTheUse/queryTotalAmountUsed.do",
    method: "post",
    data: {
      FKGX_ZJ: FKGX_ZJ,
    },
  });
}

//查询合计预交余额
export function queryAddUpTheAdvanceBalanceApi(FKGX_ZJ) {
  return request({
    url: "/ys/acceptingTheUse/queryAddUpTheAdvanceBalance.do",
    method: "post",
    data: {
      FKGX_ZJ: FKGX_ZJ,
    },
  });
}
