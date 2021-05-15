import request from "@/utils/Request";

//查询列表
export function queryPricingTermSettingApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/queryPricingTermSetting.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//查询收费项目
export function queryChargeProjectApi(obj) {
  return request({
    url: "/util/queryChargeProject.do",
    method: "post",
    data: {},
  });
}

//增加计价条款设置
export function addPricingTermSettingApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/addPricingTermSetting.do",
    method: "post",
    data: {
      charge_item: obj.charge_item,
      price: obj.price,
      price_unit: obj.price_unit,
      price_type: obj.price_type,
      pricing_cycle: obj.pricing_cycle,
      calculate_type: obj.calculate_type,
      sfxm_zj: obj.sfxm_zj,
      plotDbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      JT_ZJ: obj.JT_ZJ,
      plot_id: obj.plot_id,
    },
  });
}

//修改计价条款设置
export function updatePricingTermSettingApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/updatePricingTermSetting.do",
    method: "post",
    data: {
      plotDbName_old: obj.plotDbName_old,
      GLCID_old: obj.GLCID_old,
      YXDID_old: obj.YXDID_old,
      charge_item: obj.charge_item,
      price: obj.price,
      price_unit: obj.price_unit,
      price_type: obj.price_type,
      pricing_clause_setting_id: obj.pricing_clause_setting_id,
      sfxm_zj: obj.sfxm_zj,
      plotDbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      JT_ZJ: obj.JT_ZJ,
      plot_id: obj.plot_id,
    },
  });
}

//删除计价条款设置
export function deletePricingTermSettingApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/deletePricingTermSetting.do",
    method: "post",
    data: {
      pricing_clause_setting_id: obj.pricing_clause_setting_id,
      plotDbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      JT_ZJ: obj.JT_ZJ,
    },
  });
}

//查询收费项目下拉
export function ChargeProjectApi(obj) {
  return request({
    url: "/zl/pricingTermSetting/queryChargeProject.do",
    method: "post",
    data: {
      plotDbName: obj.plotDbName,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

//查询有权限的管理处
export function queryPlotsWithAuthorityApi() {
  return request({
    url: "/zl/pricingTermSetting/queryPlotsWithAuthority.do",
    method: "post",
    data: {},
  });
}
