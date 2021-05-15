import request from "@/utils/Request";
//导航树查询
export function getTree() {
  return request({
    url: "/util/orgTree.do",
    method: "post",
    data: {},
  });
}

//分摊总表级别查询
export function queryApportionmentDetailsApi(obj) {
  return request({
    url: "/newSharedExpenses/queryApportionmentDetails.do",
    method: "post",
    data: {
      ZBFT_FJWJ: obj.FCDM_ZJ,
      ZBFT_DLWJ: obj.DLZJ,
      ZBFT_SFXMWJ: obj.ZBFT_SFXMWJ,
      ZBFT_SJBZJ: obj.ZBFT_SJBZJ,
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//总表设置分摊项目、系数项目名称下拉列表查询
export function queryApportionedProjectNameApi(obj) {
  return request({
    url: "/util/queryApportionedProjectName.do",
    method: "post",
    data: {},
  });
}

//	关系设定总表查询下拉框
export function queryTotalTableNameAndZJApi(obj) {
  return request({
    url: "/totalTableSettings/queryTotalTableNameAndZJ.do",
    method: "post",
    data: {},
  });
}

export function reportTablePageApi(data) {
  return request({
    url: "/newSharedExpenses/exportApportionmentDetails.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
