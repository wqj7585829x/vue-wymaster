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

//查询冲抵预交方案
export function queryAcceptingThePlanApi() {
  return request({
    url: "/ys/acceptingTheOffset/queryAcceptingThePlan.do",
    method: "post",
    data: {},
  });
}

//预交冲抵
export function acceptingTheOffsetApi(obj) {
  return request({
    url: "/ys/acceptingTheOffset/acceptingTheOffset.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
      QSNY: obj.QSNY,
      ZZNY: obj.ZZNY,
      YJFA_ZJ: obj.YJFA_ZJ,
      YJFYXM_ZJ: obj.YJFYXM_ZJ,
      TZRQ: obj.TZRQ,
    },
  });
}
