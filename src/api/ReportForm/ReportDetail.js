import request from "@/utils/Request";

//报表查询-接口
export function Report_Query(data) {
  return request({
    url: "/report/Report_Query.doAdmin",
    method: "post",
    data: data,
  });
}

//报表导出-接口
export function Report_Export(data) {
  return request({
    url: "/report/Report_Export.doAdmin",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
