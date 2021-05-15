//栏位配置API
import request from "@/utils/Request";
//栏位配置查询
export function queryDynamicFieldConfigurationApi() {
  return request({
    url: "/dynamicFieldConfig/queryDynamicFieldConfiguration.do",
    method: "post",
    data: {},
  });
}

//栏位配置保存
export function setDynamicFieldConfigApi(content, code) {
  return request({
    url: "/dynamicFieldConfig/setDynamicFieldConfig.do",
    method: "post",
    data: {
      content: JSON.stringify(content),
      code: code,
    },
  });
}
