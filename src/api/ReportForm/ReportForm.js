// 报表管理

import request from "@/utils/Request";

//报表管理列表
export function Report_selectByPage(data) {
  return request({
    url: "/report/Report_selectByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: data.startRownumber,
      pageSize: data.pageSize,
      reportName: data.reportName == "" ? null : data.reportName,
      reportType: data.reportType == "" ? null : data.reportType,
      status: data.status,
    },
  });
}

//报表-新增接口
export function Report_add(data) {
  return request({
    url: "/report/Report_add.doAdmin",
    method: "post",
    data: {
      reportName: data.reportName,
      reportType: data.reportType,
      status: data.status,
      remark: data.remark == "" ? null : data.remark,
    },
  });
}

//报表-修改接口
export function Report_modify(data) {
  return request({
    url: "/report/Report_modify.doAdmin",
    method: "post",
    data: {
      reportID: data.reportID,
      reportName: data.reportName,
      reportType: data.reportType,
      status: data.status,
      remark: data.remark == "" ? null : data.remark,
    },
  });
}

//报表类型下拉列表
export function Report_SelectType() {
  return request({
    url: "/report/Report_SelectType.doAdmin",
    method: "post",
    data: {},
  });
}

//报表设计文件-上传文件接口
export function ReportFile_MainFile(data) {
  return request({
    url: "/report/ReportFile_MainFile.doAdmin",
    method: "post",
    data: data,
    upload_type: true,
  });
}

//报表设计附件-上传文件接口
export function ReportFile_Add(data) {
  return request({
    url: "/report/ReportFile_Add.doAdmin",
    method: "post",
    data: data,
    upload_type: true,
  });
}

//报表设计附件-删除接口
export function ReportFile_delete(data) {
  return request({
    url: "/report/ReportFile_delete.doAdmin",
    method: "post",
    data: data,
  });
}

//依报表主键ID查询报表设计附件
export function Report_SelectReportFile(data) {
  return request({
    url: "/report/Report_SelectReportFile.doAdmin",
    method: "post",
    data: data,
  });
}

//依报表主键ID查询报表查询条件
export function Report_SelectCondition(data) {
  return request({
    url: "/report/Report_SelectCondition.doAdmin",
    method: "post",
    data: data,
  });
}

//报表查询条件-新增接口
export function ReportCondition_add(data) {
  return request({
    url: "/report/ReportCondition_add.doAdmin",
    method: "post",
    data: {
      reportID: data.reportID,
      queryName: data.queryName,
      sortNo: data.sortNo,
      queryType: data.queryType,
      dropDownBox: data.queryType == 2 ? data.dropDownBox : null,
      orgType: data.queryType == 6 ? data.orgType : null,
      check: data.check,
    },
  });
}

//报表查询条件-修改接口
export function ReportCondition_modify(data) {
  return request({
    url: "/report/ReportCondition_modify.doAdmin",
    method: "post",
    data: {
      reportConditionID: data.reportConditionID,
      reportID: data.reportID,
      queryName: data.queryName,
      sortNo: data.sortNo,
      queryType: data.queryType,
      dropDownBox: data.queryType == 2 ? data.dropDownBox : null,
      orgType: data.queryType == 6 ? data.orgType : null,
      check: data.check,
    },
  });
}

//报表查询条件-删除接口
export function ReportCondition_delete(data) {
  return request({
    url: "/report/ReportCondition_delete.doAdmin",
    method: "post",
    data: {
      reportConditionID: data.reportConditionID,
      reportID: data.reportID,
    },
  });
}

//报表列表-接口
export function Report_Select(data) {
  return request({
    url: "/report/Report_Select.doAdmin",
    method: "post",
  });
}

//根据小区查询分区
export function findPartition(data) {
  return request({
    url: "/basic/basic_findPartition.doAdmin",
    method: "post",
    data: data,
  });
}

//根据分区查询楼栋
export function findBuilding(data) {
  return request({
    url: "/basic/basic_findBuilding.doAdmin",
    method: "post",
    data: data,
  });
}
//根据楼栋查询房间
export function findRoom(data) {
  return request({
    url: "/basic/basic_findRoom.doAdmin",
    method: "post",
    data: data,
  });
}
//报表查询
export function Report_user(data) {
  return request({
    url: "report/Report_user.doAdmin",
    method: "post",
    data: {},
  });
}
