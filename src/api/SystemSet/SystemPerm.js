//权限管理
import request from "@/utils/Request";
//获取树
export function getTree() {
  return request({
    url: "/manage/manage_FindPostByTree.doAdmin",
    method: "post",
    data: {},
  });
}

//功能权限查询
export function getFeaturesPerm(obj) {
  return request({
    url: "/manage/manage_GetUpdateUserMenuButton.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
    },
  });
}

//修改权限功能
export function upadateFeaturesPerm(obj) {
  return request({
    url: "/manage/manage_insertAndModifyFunctionCompetence.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      menuButtonid: obj.menuButtonid,
    },
  });
}

//区域权限查询
export function getAreaPerm(obj) {
  return request({
    url: "/manage/manage_getUpdateUserAreaCompetence.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
    },
  });
}

//修改区域权限
export function updateAreaPerm(obj) {
  return request({
    url: "/manage/manage_addAndModifyAreaCompetence.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      areaid: obj.areaid,
    },
  });
}

//报表权限查询
export function getReportPerm(empJob) {
  return request({
    url: "/report/Report_SelectRoleReport.doAdmin",
    method: "post",
    data: {
      empJob: empJob,
    },
  });
}

//修改报表权限查询
export function updateReportPerm(obj) {
  return request({
    url: "/report/Report_modifyRoleReport.doAdmin",
    method: "post",
    data: {
      empJob: obj.sysId,
      reportID: obj.reportID,
    },
  });
}
