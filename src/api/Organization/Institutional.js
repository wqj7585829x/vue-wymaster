//组织架构
import request from "@/utils/Request";
// 组织架构新增
export function organInsert(obj) {
  return request({
    url: "/organization/addOrganization.do",
    method: "post",
    data: {
      BMJG_JGMC: obj.BMJG_JGMC,
      BMJG_JGBH: obj.BMJG_JGBH,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      BMJG_BZ: obj.BMJG_BZ,
      BMJG_JGJB: obj.BMJG_JGJB,
      BMJG_SERVER: obj.BMJG_SERVER,
      BMJG_DBNAME: obj.BMJG_DBNAME,
      BMJG_USER: obj.BMJG_USER,
      BMJG_PASS: obj.BMJG_PASS,
      BMJG_DBYXX: obj.BMJG_DBYXX,
      BMJG_BBBT: obj.BMJG_BBBT,
      BMJG_SFYX: obj.BMJG_SFYX,
      BMJG_CJRQ: obj.BMJG_CJRQ,
      BMJG_JBH: obj.BMJG_JBH,
      BMJG_MRGDMC: obj.BMJG_MRGDMC,
      BMJG_JCDL: obj.BMJG_JCDL,
      BMJG_DH: obj.BMJG_DH,
      BMJG_SJZJ: obj.BMJG_SJZJ != undefined ? obj.BMJG_SJZJ : null,
    },
  });
}
// 组织架构修改
export function organUpdate(obj) {
  return request({
    url: "/organization/updateOrganization.do",
    method: "post",
    data: {
      BMJG_JGMC: obj.BMJG_JGMC,
      BMJG_JGBH: obj.BMJG_JGBH,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      BMJG_BZ: obj.BMJG_BZ,
      BMJG_JGJB: obj.BMJG_JGJB,
      BMJG_SERVER: obj.BMJG_SERVER,
      BMJG_DBNAME: obj.BMJG_DBNAME,
      BMJG_USER: obj.BMJG_USER,
      BMJG_PASS: obj.BMJG_PASS,
      BMJG_DBYXX: obj.BMJG_DBYXX,
      BMJG_BBBT: obj.BMJG_BBBT,
      BMJG_SFYX: obj.BMJG_SFYX,
      BMJG_CJRQ: obj.BMJG_CJRQ,
      BMJG_JBH: obj.BMJG_JBH,
      BMJG_MRGDMC: obj.BMJG_MRGDMC,
      BMJG_JCDL: obj.BMJG_JCDL,
      BMJG_DH: obj.BMJG_DH,
      BMJG_ZJ: obj.BMJG_ZJ,
    },
  });
}
//组织架构树查询
export function organFindTree() {
  return request({
    url: "/organization/queryOrganization.do",
    method: "post",
    data: {},
  });
}

// 组织架构查询列表
export function QueryOrganList(obj) {
  return request({
    url: "/organization/queryOrganizationPage.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      BMJG_ZJ: obj.id,
    },
  });
}
// 查询机构级别
export function queryOrgLevel() {
  return request({
    url: "/util/institutionalLevel.do",
    method: "post",
    data: {},
  });
}

//删除
export function DeleteOrgan(obj) {
  return request({
    url: "/organization/deleteOrganization.do",
    method: "post",
    data: {
      BMJG_ZJ: obj.BMJG_ZJ,
    },
  });
}
