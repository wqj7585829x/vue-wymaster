//标准选用
import request from "@/utils/Request";

//导航树查询
export function getTree() {
  return request({
    url: "/util/orgTree.do",
    method: "post",
    data: {},
  });
}

//查询收费项目下拉框
export function queryChargeItem(SFXM_FYLB) {
  return request({
    url: "/util/queryChargeProject.do",
    method: "post",
    data: {
      SFXM_FYLB: SFXM_FYLB,
      SFXM_SFYX: 1,
    },
  });
}

//查询常规费用列表
export function queryCommonList(obj) {
  return request({
    url: "/standardDefinition/queryStandardDefinitionInRoutine.do",
    method: "post",
    data: {
      CGJS_DLWJ: obj.CGJS_DLWJ,
      CGJS_FJWJ: obj.CGJS_FJWJ,
      CGJS_SFXMWJ: obj.CGJS_SFXMWJ,
    },
  });
}

//查询走表费用列表
export function queryWalkList(obj) {
  return request({
    url: "/standardDefinition/queryStandardDefinitionInWalkingTable.do",
    method: "post",
    data: {
      ZBJS_DLWJ: obj.ZBJS_DLWJ,
      ZBJS_FJWJ: obj.ZBJS_FJWJ,
      ZBJS_SFXMWJ: obj.ZBJS_SFXMWJ,
    },
  });
}

//常规费用标准定价方式查询
export function queryCommonPricing(cgbz_bzmc, CGBZ_ZJ) {
  return request({
    url: "/standardDefinition/getPricingMode.do",
    method: "post",
    data: {
      cgbz_bzmc: cgbz_bzmc,
      CGBZ_ZJ: CGBZ_ZJ,
    },
  });
}

//标准查询
export function queryWalkStands(obj) {
  return request({
    url: "/util/queryCostProject.do",
    method: "post",
    data: {
      cgbz_sfxmwj: obj.CGJS_SFXMWJ,
      zbbz_sfxmwj: obj.ZBJS_SFXMWJ,
    },
  });
}

//修改保存
export function saveCommonStands(obj) {
  return request({
    url: "/standardDefinition/updateStandardCite.do",
    method: "post",
    data: {
      CGJS_CGBZMC: obj.CGJS_CGBZMC,
      CGJS_CGBZWJ: obj.CGJS_CGBZWJ,
      CGJS_DJFS: obj.CGJS_DJFS,
      CGJS_ZJ: obj.CGJS_ZJ,
      ZBJS_ZBBZMC: obj.ZBJS_ZBBZMC,
      ZBJS_ZBBZWJ: obj.ZBJS_ZBBZWJ,
      ZBJS_BDM: obj.ZBJS_BDM,
      ZBJS_BMC: obj.ZBJS_BMC,
      ZBJS_YJBDRQ: "",
      ZBJS_BZ: "",
      ZBJS_ZJ: obj.ZBJS_ZJ,
      FKGX_ZJ: obj.ZBJS_FKGXWJ, //房客关系外键
      ZBJS_SFXMMC: obj.ZBJS_SFXMMC,
      ZBJS_SFXMWJ: obj.ZBJS_SFXMWJ,
    },
  });
}
//批量
export function bathStands(obj) {
  return request({
    url: "/standardDefinition/updateStandardCiteForAll.do",
    method: "post",
    data: {
      GLQDA_ZJ: obj.GLQDA_ZJ,
      DLDA_DLID: obj.DLDA_ZJ,
      SFXMWJ: obj.SFXM_ID,
      CGJS_CGBZWJ: obj.CGJS_CGBZWJ != null ? obj.CGJS_CGBZWJ : null,
      ZBJS_ZBBZWJ: obj.ZBJS_ZBBZWJ != null ? obj.ZBJS_ZBBZWJ : null,
      CHOOSE: obj.ctype,
    },
  });
}
//删除
export function deleteGoWatchApi(obj) {
  return request({
    url: "/standardDefinition/deleteGoWatch.do",
    method: "post",
    data: {
      ZBJS_ZJ: obj.ZBJS_ZJ,
    },
  });
}

//新增走表
export function addStandTable(obj) {
  return request({
    url: "/standardDefinition/addWalkingTable.do",
    method: "post",
    data: {
      ZBJS_BMC: obj.ZBJS_BMC, //表名称
      ZBJS_BDM: obj.ZBJS_BDM, //表代码
      SFXMWJ: obj.ZBJS_SFXMWJ, //收费项目外键
      FKGX_ZJ: obj.ZBJS_FKGXWJ, //房客关系外键
      ZBJS_ZBBZWJ: obj.ZBJS_ZBBZWJ, //走表标准外键
      ZBJS_ZBBZMC: obj.ZBJS_ZBBZMC,
      ZBJS_SFXMMC: obj.ZBJS_SFXMMC,
      ZBJS_SFXMWJ: obj.ZBJS_SFXMWJ,
    },
  });
}

//按钮刷新
export function refreshTableBtn() {
  return request({
    url: "/standardDefinition/refreshTable.do",
    method: "post",
    data: {},
  });
}

//获取是否开启集团审核
export function getChargingStandardApprovedApi() {
  return request({
    url: "/standardDefinition/getChargingStandardApproved.do",
    method: "post",
    data: {},
  });
}

//取消审核申请
export function CancelApplicationApi(obj) {
  return request({
    url: "/standardDefinition/revokeStandardApplication.do",
    method: "post",
    data: {
      CGJS_ZJ: obj.CGJS_ZJ,
      ZBJS_ZJ: obj.ZBJS_ZJ,
    },
  });
}
