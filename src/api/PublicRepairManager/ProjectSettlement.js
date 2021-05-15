//公维金管理 工程结算
import request from "@/utils/Request";

//工程结算-大项目列表查询
export function queryBigProject(obj) {
  return request({
    url: "/projectSettlement/queryBigProject.do",
    method: "post",
    data: {
      WXFA_QSRQ: obj.WXFA_QSRQ,
      WXFA_JSRQ: obj.WXFA_JSRQ,
      PRM: obj.PRM,
      CONDITION: obj.CONDITION,
      state: obj.state,
    },
  });
}

//工程结算-小项目列表查询
export function querySmallProject(obj) {
  return request({
    url: "/projectSettlement/querySmallProject.do",
    method: "post",
    data: {
      WXFA_QSRQ: obj.WXFA_QSRQ,
      WXFA_JSRQ: obj.WXFA_JSRQ,
      PRM: obj.PRM,
      CONDITION: obj.CONDITION,
      state: obj.state,
    },
  });
}

//工程结算进度查询
export function queryProjectProgress(obj) {
  return request({
    url: "/projectSettlement/queryProjectProgress.do",
    method: "post",
    data: {
      SSGC_WXWJ: obj.SSGC_WXWJ,
      CHECK: obj.CHECK,
    },
  });
}

//生成应付凭证
export function insertDealWithCertificates(obj) {
  return request({
    url: "/projectSettlement/insertDealWithCertificates.do",
    method: "post",
    data: {
      YGXM: obj.YGXM,
      YFPZ_XMMC: obj.SSGC_XMMC,
      YFPZ_PZBH: obj.YFPZ_PZBH,
      YFPZ_YSFY: obj.WXFA_YSFY,
      YFPZ_SJFY: obj.SSGC_ZJQ,
      YFPZ_ZKL: obj.YFPZ_ZKL,
      YFPZ_JMJE: obj.YFPZ_JMJE,
      YFPZ_YFJE: obj.YFPZ_YFJE,
      YFPZ_LKZRR: obj.YFPZ_LKZRR,
      YFPZ_TBRQ: obj.YFPZ_TBRQ,
      YFPZ_YZJE: obj.WXFA_YYZJE,
      WXFA_ZJ: obj.WXFA_ZJ,
      YFPZ_YZFY: obj.YFPZ_YZFY,
      WXDJ_ZJ: obj.WXDJ_ZJ,
      YFPZ_XMLX: obj.WXDJ_XMLX,
    },
  });
}

//修改应付凭证
export function updateDealWithCertificates(obj) {
  return request({
    url: "/projectSettlement/updateDealWithCertificates.do",
    method: "post",
    data: {
      YGXM: obj.YGXM,
      YFPZ_XMMC: obj.SSGC_XMMC,
      YFPZ_PZBH: obj.YFPZ_PZBH,
      YFPZ_YSFY: obj.WXFA_YSFY,
      YFPZ_SJFY: obj.SSGC_ZJQ,
      YFPZ_ZKL: obj.YFPZ_ZKL ? obj.YFPZ_ZKL : 0,
      YFPZ_JMJE: obj.YFPZ_JMJE,
      YFPZ_YFJE: obj.YFPZ_YFJE,
      YFPZ_LKZRR: obj.YFPZ_LKZRR,
      YFPZ_TBRQ: obj.YFPZ_TBRQ,
      YFPZ_YZJE: obj.WXFA_YSFY,
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}

//生成时查询大/小项目 应付凭证数据
export function queryDealWithCertificatesData(obj) {
  return request({
    url: "/projectSettlement/queryDealWithCertificatesData.do",
    method: "post",
    data: {
      SSGC_WXWJ: obj.SSGC_WXWJ,
      state: obj.state,
    },
  });
}

//修改时时查询大/小项目 应付凭证数据
export function queryUpdateDealWithCertificatesData(obj) {
  return request({
    url: "/projectSettlement/queryYFPZ.do",
    method: "post",
    data: {
      YFPZ_WXWJ: obj.YFPZ_WXWJ,
      state: obj.state,
    },
  });
}

//获取凭证编号
export function getGenNumber() {
  return request({
    url: "/numberGeneration/dealWithCertificatesNumberGeneration.do",
    method: "post",
    data: {},
  });
}
