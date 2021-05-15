//标准选用
import request from "@/utils/Request";

//2.16.1.1.	查询所有报表分类
export function queryReportType(obj) {
  return request({
    url: "/reportManagement/queryReportType.do",
    method: "post",
    data: {},
  });
}

export function queryStatementsDefine(obj) {
  return request({
    url: "/generalReport/queryStatementsDefine.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

export function insertStatementsDefine(obj) {
  return request({
    url: "/generalReport/insertStatementsDefine.do",
    method: "post",
    data: {
      report_name: obj.report_name != undefined ? obj.report_name : "",
      proc_name: obj.proc_name != undefined ? obj.proc_name : "",
      parameter_type_1:
        obj.parameter_type_1 != undefined ? obj.parameter_type_1 : "",
      parameter_must_1:
        obj.parameter_must_1 != undefined ? obj.parameter_must_1 : false,
      parameter_type_2:
        obj.parameter_type_2 != undefined ? obj.parameter_type_2 : "",
      parameter_must_2:
        obj.parameter_must_2 != undefined ? obj.parameter_must_2 : false,
      parameter_type_3:
        obj.parameter_type_3 != undefined ? obj.parameter_type_3 : "",
      parameter_must_3:
        obj.parameter_must_3 != undefined ? obj.parameter_must_3 : false,
      parameter_type_4:
        obj.parameter_type_4 != undefined ? obj.parameter_type_4 : "",
      parameter_must_4:
        obj.parameter_must_4 != undefined ? obj.parameter_must_4 : false,
      parameter_type_5:
        obj.parameter_type_5 != undefined ? obj.parameter_type_5 : "",
      parameter_must_5:
        obj.parameter_must_5 != undefined ? obj.parameter_must_5 : false,
      parameter_type_6:
        obj.parameter_type_6 != undefined ? obj.parameter_type_6 : "",
      parameter_must_6:
        obj.parameter_must_6 != undefined ? obj.parameter_must_6 : false,
      parameter_type_7:
        obj.parameter_type_7 != undefined ? obj.parameter_type_7 : "",
      parameter_must_7:
        obj.parameter_must_7 != undefined ? obj.parameter_must_7 : false,
      parameter_type_8:
        obj.parameter_type_8 != undefined ? obj.parameter_type_8 : "",
      parameter_must_8:
        obj.parameter_must_8 != undefined ? obj.parameter_must_8 : false,
      parameter_type_9:
        obj.parameter_type_9 != undefined ? obj.parameter_type_9 : "",
      parameter_must_9:
        obj.parameter_must_9 != undefined ? obj.parameter_must_9 : false,
      parameter_type_10:
        obj.parameter_type_10 != undefined ? obj.parameter_type_10 : "",
      parameter_must_10:
        obj.parameter_must_10 != undefined ? obj.parameter_must_10 : "",
      type_id: obj.type_id != undefined ? obj.type_id : "",
    },
  });
}

export function updateStatementsDefine(obj) {
  return request({
    url: "/generalReport/updateStatementsDefine.do",
    method: "post",
    data: {
      report_name: obj.report_name != undefined ? obj.report_name : "",
      proc_name: obj.proc_name != undefined ? obj.proc_name : "",
      parameter_type_1:
        obj.parameter_type_1 != undefined ? obj.parameter_type_1 : "",
      parameter_must_1:
        obj.parameter_must_1 != undefined ? obj.parameter_must_1 : false,
      parameter_type_2:
        obj.parameter_type_2 != undefined ? obj.parameter_type_2 : "",
      parameter_must_2:
        obj.parameter_must_2 != undefined ? obj.parameter_must_2 : false,
      parameter_type_3:
        obj.parameter_type_3 != undefined ? obj.parameter_type_3 : "",
      parameter_must_3:
        obj.parameter_must_3 != undefined ? obj.parameter_must_3 : false,
      parameter_type_4:
        obj.parameter_type_4 != undefined ? obj.parameter_type_4 : "",
      parameter_must_4:
        obj.parameter_must_4 != undefined ? obj.parameter_must_4 : false,
      parameter_type_5:
        obj.parameter_type_5 != undefined ? obj.parameter_type_5 : "",
      parameter_must_5:
        obj.parameter_must_5 != undefined ? obj.parameter_must_5 : false,
      parameter_type_6:
        obj.parameter_type_6 != undefined ? obj.parameter_type_6 : "",
      parameter_must_6:
        obj.parameter_must_6 != undefined ? obj.parameter_must_6 : false,
      parameter_type_7:
        obj.parameter_type_7 != undefined ? obj.parameter_type_7 : "",
      parameter_must_7:
        obj.parameter_must_7 != undefined ? obj.parameter_must_7 : false,
      parameter_type_8:
        obj.parameter_type_8 != undefined ? obj.parameter_type_8 : "",
      parameter_must_8:
        obj.parameter_must_8 != undefined ? obj.parameter_must_8 : false,
      parameter_type_9:
        obj.parameter_type_9 != undefined ? obj.parameter_type_9 : "",
      parameter_must_9:
        obj.parameter_must_9 != undefined ? obj.parameter_must_9 : false,
      type_id: obj.type_id != undefined ? obj.type_id : "",
      report_id: obj.report_id != undefined ? obj.report_id : "",
    },
  });
}

export function deleteStatementsDefine(obj) {
  return request({
    url: "/generalReport/deleteStatementsDefine.do",
    method: "post",
    data: {
      report_id: obj.report_id != undefined ? obj.report_id : "",
    },
  });
}

export function queryGeneralReportTree() {
  return request({
    url: "/generalReport/queryGeneralReportTree.do",
    method: "post",
  });
}

export function queryGeneralReportMessage(data) {
  return request({
    url: "/generalReport/queryGeneralReportMessage.do",
    method: "post",
    data: data,
  });
}

export function generalReportExcel(data) {
  return request({
    url: "/reportExport/generalReportExcel.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

//数据文件上传接口
export function fileUpload(obj) {
  return request({
    url: "/fineReportTemplate/upload.do",
    method: "post",
    data: obj,
    upload_type: true,
  });
}

export function query(data) {
  return request({
    url: "/fineReportTemplate/query.do",
    method: "post",
    data: data,
  });
}
