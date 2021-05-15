//费用生成
import request from "@/utils/Request";

//树查询
export function getTree() {
  return request({
    url: "/util/orgCostTree.do",
    method: "post",
    data: {},
  });
}

//收费项目下收费标准
export function queryCaluTree() {
  return request({
    url: "/cost/orgTreeCost.do",
    method: "post",
    data: {},
  });
}

//收费项目下收费标准
export function generateCosts(obj) {
  return request({
    url: "/cost/produceCost.do",
    method: "post",
    data: {
      FCDM_GLQ_ZJ: obj.FCDM_GLQ_ZJ,
      FCDM_DL_ZJ: obj.FCDM_DL_ZJ,
      FCDM_ZJ: obj.FCDM_ZJ,
      FYXM: obj.FYXM,
      CGBZ: obj.CGBZ,
      ZBBZ: obj.ZBBZ,
      QSFYNY: obj.QSFYNY,
      JZFYNY: obj.JZFYNY,
      YSRQ: obj.YSRQ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//生成、删除费用
export function delCosts(obj) {
  return request({
    url: "/cost/deleteCost.do",
    method: "post",
    data: {
      FCDM_GLQ_ZJ: obj.FCDM_GLQ_ZJ,
      FCDM_DL_ZJ: obj.FCDM_DL_ZJ,
      FCDM_ZJ: obj.FCDM_ZJ,
      FYXM: obj.FYXM,
      CGBZ: obj.CGBZ,
      ZBBZ: obj.ZBBZ,
      QSFYNY: obj.QSFYNY,
      JZFYNY: obj.JZFYNY,
      YSRQ: obj.YSRQ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}
