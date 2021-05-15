// 分摊组户关系

import request from "@/utils/Request";

// 获取树
export function getTree() {
  return request({
    url: "/basic/FindResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

// 分摊组列表
export function selectByPage(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroup_selectByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      belongPlot: obj.belongPlot,
      partid: obj.partid,
      buildid: obj.buildid,
    },
  });
}

// 分摊组对应户列表
export function selectByPage_h(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroupR_selectByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      groupID: obj.groupID,
    },
  });
}

// 新增分摊组
export function add(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroup_add.doAdmin",
    method: "post",
    data: {
      belongPlot: obj.belongPlot,
      partid: obj.partid == null ? 0 : obj.partid,
      buildid: obj.buildid == null ? 0 : obj.buildid,
      groupName: obj.groupName,
      groupCaption: obj.groupCaption ? obj.groupCaption : null,
      remark: obj.remark ? obj.remark : null,
    },
  });
}

// 修改分摊组
export function modify(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroup_modify.doAdmin",
    method: "post",
    data: {
      groupID: obj.groupID,
      groupName: obj.groupName,
      groupCaption: obj.groupCaption ? obj.groupCaption : null,
      remark: obj.remark ? obj.remark : null,
    },
  });
}

// 删除分摊组
export function PubRepFundGroup_delete(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroup_delete.doAdmin",
    method: "post",
    data: {
      groupID: obj.groupID,
    },
  });
}

// 设置户 的资源树
export function FindTreeByPlotPartBuildid(obj) {
  return request({
    url: "/basic/FindTree_ByPlotPartBuildid.doAdmin",
    method: "post",
    data: {
      plotid: obj.plotid,
      partid: obj.partid,
      buildid: obj.buildid,
    },
  });
}

// 设置户 的 待选户 列表
export function beSelect(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroupR_beSelect.doAdmin",
    method: "post",
    data: {
      groupID: obj.groupID,
      buildid: obj.buildid,
      value: obj.value ? obj.value : null,
    },
  });
}

// 设置户 的 已选户 列表
export function selected(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroupR_selectByPage.doAdmin",
    method: "post",
    data: {
      groupID: obj.groupID,
    },
  });
}

// 对应户 批量新增
export function PubRepFundGroupR_add(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroupR_add.doAdmin",
    method: "post",
    data: {
      groupID: obj.groupID,
      TenantRelationID: obj.TenantRelationID,
    },
  });
}

// 分摊组 删除
export function PubRepFundGroupR_delete(obj) {
  return request({
    url: "/pubRepFund/PubRepFundGroupR_delete.doAdmin",
    method: "post",
    data: obj,
  });
}
