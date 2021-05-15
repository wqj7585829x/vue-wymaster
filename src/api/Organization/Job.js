//职位体系
import request from "@/utils/Request";
// 新增
export function organInsertPost(obj) {
  return request({
    url: "/organ/organ_insertPost.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      depId: obj.depId,
      jobTitle: obj.jobTitle,
      status: obj.status,
      jobDescription: obj.jobDescription,
      agencyType: obj.agencyType,
    },
  });
}
// 修改
export function organModifyPost(obj) {
  return request({
    url: "/organ/organ_modifyPost.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      depId: obj.depId,
      jobTitle: obj.jobTitle,
      status: obj.status,
      jobDescription: obj.jobDescription,
      agencyType: obj.agencyType,
    },
  });
}
//获取组织机构数
export function organFindTree() {
  return request({
    url: "/organ/organ_FindTree.doAdmin",
    method: "post",
    data: {},
  });
}
// 查询列表
export function queryPageApi(obj) {
  return request({
    url: "/organ/organ_queryPostByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      orgId: obj.orgId,
      agencyType: obj.agencyType,
    },
  });
}
// 列表删除
export function JobDelete(obj) {
  return request({
    url: "/organ/organ_deletePost.doAdmin",
    method: "post",
    data: {
      sysIds: obj.sysId,
    },
  });
}
