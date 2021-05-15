//原始数据导入
import request from "@/utils/Request";

//数据文件上传接口
export function fileUpload(obj, YXDID) {
  return request({
    url: "/primitiveDataImport/excelFileUpload.do?YXDID=" + YXDID,
    method: "post",
    data: obj,
    upload_type: true,
  });
}

//数据检查
export function checkData(itemId) {
  return request({
    url: "/primitiveDataImport/checkData.do",
    method: "post",
    data: {
      itemId: itemId,
    },
  });
}

//数据导入
export function importData(itemId) {
  return request({
    url: "/primitiveDataImport/importData.do",
    method: "post",
    data: {
      itemId: itemId,
    },
  });
}

//数据查询
export function queryImportData() {
  return request({
    url: "/primitiveDataImport/queryMiddle.do",
    method: "post",
    data: {},
  });
}

//下载模板
export function exportTemplate() {
  return request({
    url: "/primitiveDataImport/exportTemplate.do",
    method: "post",
    responseType: "blob",
    data: {},
  });
}
