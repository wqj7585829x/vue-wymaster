//公维金管理   参数设定
import request from "@/utils/Request";

//查询预支设置与传递费用方式
export function queryCostWay(obj) {
  return request({
    url: "/parameterSetting/queryAdvancedSettingsAndTransmitCostWay.do",
    method: "post",
    data: {},
  });
}

//修改预支设置
export function updateAdvance(obj) {
  return request({
    url: "/parameterSetting/updateAdvancedSettings.do",
    method: "post",
    data: {
      AS_WXJXTCS_XZBZ: obj.AS_WXJXTCS_XZBZ,
      AS_WXJXTCS_ZJ: obj.AS_WXJXTCS_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      WXJXTCS_SZ: obj.WXJXTCS_SZ,
    },
  });
}

//修改传递费用方式
export function updateCostWay(obj) {
  return request({
    url: "/parameterSetting/updateTransmitCostWay.do",
    method: "post",
    data: {
      TC_WXJXTCS_XZBZ: obj.WXJXTCS_XZBZ,
      TC_WXJXTCS_ZJ: obj.WXJXTCS_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//表单查询
export function queryForm() {
  return request({
    url: "/parameterSetting/queryForm.do",
    method: "post",
    data: {},
  });
}

//查询维修年月T
export function queryToTheYears() {
  return request({
    url: "/parameterSetting/querySubordinateToTheYears.do",
    method: "post",
    data: {},
  });
}

//新增表单
export function addForm(obj) {
  return request({
    url: "/parameterSetting/insertForm.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      WXJBDLY_BDMC: obj.WXJBDLY_BDMC,
      WXJBDLY_BDLX: obj.WXJBDLY_BDLX,
      WXJBDLY_BDBHCD: obj.WXJBDLY_BDBHCD,
      WXJBDLY_NY: obj.WXJBDLY_NY,
      WXJBDLY_BDBHQZ: obj.WXJBDLY_BDBHQZ,
      WXJBDLY_BDBHSL: obj.WXJBDLY_BDBHSL,
      WXJBDLY_BZ: obj.WXJBDLY_BZ,
    },
  });
}

//删除表单
export function delForm(WXJBDLY_ZJ) {
  return request({
    url: "/parameterSetting/deleteForm.do",
    method: "post",
    data: {
      WXJBDLY_ZJ: WXJBDLY_ZJ,
    },
  });
}

//修改表单状态（用完/核销）
export function updateState(obj) {
  return request({
    url: "/parameterSetting/updateFormState.do",
    method: "post",
    data: {
      WXJBDLY_BDZT: obj.bdStatus,
      WXJBDLY_ZJ: obj.WXJBDLY_ZJ,
    },
  });
}

//查询费用设置
export function queryCostsSet() {
  return request({
    url: "/parameterSetting/queryCostsSet.do",
    method: "post",
    data: {},
  });
}

//查询费用类别下的收费项目
export function queryCostCategory(SFXM_FYLB) {
  return request({
    url: "/util/queryProjectForCategory.do",
    method: "post",
    data: {
      SFXM_FYLB: SFXM_FYLB,
    },
  });
}

//新增费用设置
export function addCostSet(obj) {
  return request({
    url: "/parameterSetting/insertCostsSet.do",
    method: "post",
    data: {
      WXJFYCD_WXJXM: obj.WXJFYCD_WXJXM,
      WXJFYCD_FYLB: obj.WXJFYCD_FYLB,
      WXJFYCD_SFXMWJ: obj.WXJFYCD_SFXMWJ,
      WXJFYCD_BZ: obj.WXJFYCD_BZ,
    },
  });
}

//修改费用设置
export function updateCostSet(obj) {
  return request({
    url: "/parameterSetting/updateCostsSet.do",
    method: "post",
    data: {
      WXJFYCD_SFXMWJ: obj.WXJFYCD_SFXMWJ,
      WXJFYCD_BZ: obj.WXJFYCD_BZ,
      WXJFYCD_ZJ: obj.WXJFYCD_ZJ,
    },
  });
}

//删除费用设置
export function delCostSet(WXJFYCD_ZJ) {
  return request({
    url: "/parameterSetting/deleteCostsSet.do",
    method: "post",
    data: {
      WXJFYCD_ZJ: WXJFYCD_ZJ,
    },
  });
}

//初始化公维金参数
export function insertParameter() {
  return request({
    url: "/parameterSetting/insertParameter.do",
    method: "post",
    data: {},
  });
}

export function administrativeAndOperating() {
  return request({
    url: "/standardDefinitions/administrativeAndOperating.do",
    method: "post",
    data: {},
  });
}
