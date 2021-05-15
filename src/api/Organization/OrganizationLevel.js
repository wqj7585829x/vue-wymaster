//职位体系
import request from "@/utils/Request";
// 新增机构级别
export function addOrgLevel(obj) {
  return request({
    url: "/institutionalLevel/addInstitutionalLevel.do",
    method: "post",
    data: {
      JGJB_BH: obj.JGJB_BH,
      JGJB_JBH: obj.JGJB_JBH,
      JGJB_MC: obj.JGJB_MC,
      JGJB_MS: obj.JGJB_MS,
      JGJB_YS: obj.JGJB_YS,
    },
  });
}

// 修改机构级别
export function updateOrgLevel(obj) {
  return request({
    url: "/institutionalLevel/updateInstitutionalLevel.do",
    method: "post",
    data: {
      JGJB_ZJ: obj.JGJB_ZJ,
      JGJB_BH: obj.JGJB_BH,
      JGJB_JBH: obj.JGJB_JBH,
      JGJB_MC: obj.JGJB_MC,
      JGJB_MS: obj.JGJB_MS,
      JGJB_YS: obj.JGJB_YS,
    },
  });
}

// 查询机构级别
export function queryOrgLevel(obj) {
  return request({
    url: "/institutionalLevel/queryInstitutionalLevel.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//删除
export function DeleteOrgLevel(obj) {
  return request({
    url: "/institutionalLevel/deleteInstitutionalLevel.do",
    method: "post",
    data: {
      JGJB_ZJ: obj.JGJB_ZJ,
    },
  });
}
