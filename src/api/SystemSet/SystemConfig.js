//系统配置
import request from "@/utils/Request";
// 新增
export function sysInsert(obj) {
  return request({
    url: "/manage/manage_sysInsert.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      paramId: obj.paramId,
      param: obj.param,
      paramType: obj.paramType,
      sort: obj.sort,
      remark: obj.remark,
    },
  });
}
// 修改
export function sysModify(obj) {
  return request({
    url: "/manage/manage_sysModify.doAdmin",
    method: "post",
    data: {
      sysId: obj.sysId,
      paramId: obj.paramId,
      param: obj.param,
      paramType: obj.paramType,
      sort: obj.sort,
      remark: obj.remark,
    },
  });
}
// 查询列表
export function sysConfigByPage(obj) {
  return request({
    url: "/manage/manage_sysConfigByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
    },
  });
}
