//标准选用
import request from "@/utils/Request";

//查询所有小区
export function PlotLisApi() {
  return request({
    url: "/feedbackPlatform/queryPlotDbList.do",
    method: "post",
    data: {},
  });
}
//查询下拉类别
export function categoryNameOptionsApi() {
  return request({
    url: "/util/queryFeedbackCategory.do",
    method: "post",
    data: {},
  });
}
//根据下拉类别查询下拉类型
export function typeArryApi(id) {
  return request({
    url: "/util/queryFeedbackType.do",
    method: "post",
    data: {
      category_id: id,
    },
  });
}

//反馈列表新增
export function addFeedListApi(obj) {
  return request({
    url: "/feedbackPlatform/insertFeedbackList.do",
    method: "post",
    data: {
      plot_id: obj.BMJG_ZJ,
      db_name: obj.db_name,
      feedback_title: obj.feedback_title,
      feedback_content: obj.feedback_content,
      owner_mobile: obj.owner_mobile,
      category_id: obj.category_id,
      type_id: obj.type_id,
      repair_address: obj.is_repair == 1 ? obj.repair_address : "",
      repair_person: obj.is_repair == 1 ? obj.repair_person : "",
      repair_mobile: obj.is_repair == 1 ? obj.repair_mobile : "",
      room_no: obj.room_no,
      org_id: obj.JT_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      file: obj.file,
      category_name: obj.category_name,
    },
  });
}

//反馈列表 查询分页
export function queryFeedTypeApi(obj) {
  return request({
    url: "/feedbackPlatform/queryFeedbackList.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      plot_id: obj.BMJG_ZJ,
      feedback_title: obj.feedback_title,
      owner_mobile: obj.owner_mobile,
      category_id: obj.category_id,
      type_id: obj.type_id,
      status: obj.status,
      urgent_level: obj.urgent_level,
      create_time_start: obj.create_time_start,
      create_time_end: obj.create_time_end,
      process_finish_time_start: obj.process_finish_time_start,
      process_finish_time_end: obj.process_finish_time_end,
      close_time_start: obj.close_time_start,
      close_time_end: obj.close_time_end,
    },
  });
}

//反馈列表 查询分页并导出
export function exportFeedExcelApi(obj) {
  return request({
    url: "/feedbackPlatform/downloadExcel.do",
    method: "post",
    responseType: "blob",
    data: {
      plot_id: obj.BMJG_ZJ,
      feedback_title: obj.feedback_title,
      owner_mobile: obj.owner_mobile,
      category_id: obj.category_id,
      type_id: obj.type_id,
      status: obj.status,
      urgent_level: obj.urgent_level,
      create_time_start: obj.create_time_start,
      create_time_end: obj.create_time_end,
      process_finish_time_start: obj.process_finish_time_start,
      process_finish_time_end: obj.process_finish_time_end,
      close_time_start: obj.close_time_start,
      close_time_end: obj.close_time_end,
    },
  });
}
//反馈列表弹窗分类确定
export function FeedFlOkApi(obj) {
  return request({
    url: "/feedbackPlatform/updateClassify.do",
    method: "post",
    data: {
      feedback_id: obj.feedback_id,
      category_id: obj.category_id,
      type_id: obj.type_id,
      org_id: obj.org_id,
      repair_address: obj.is_repair == 1 ? obj.repair_address : "",
      repair_person: obj.is_repair == 1 ? obj.repair_person : "",
      repair_mobile: obj.is_repair == 1 ? obj.repair_mobile : "",
    },
  });
}
//反馈列表弹窗派单查询处理人员
export function engineerListApi(obj) {
  return request({
    url: "/feedbackPlatform/queryAssignedPersonnel.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
      org_id: obj.org_id,
    },
  });
}
//反馈列表弹窗派单确定
export function FeedPDOkApi(obj) {
  return request({
    url: "/feedbackPlatform/updateSendOrders.do",
    method: "post",
    data: {
      feedback_id: obj.feedback_id,
      engineer_id: obj.engineer_id,
      attention: obj.attention,
      urgent_level: obj.urgent_level,
      org_id: obj.org_id,
    },
  });
}

//反馈列表弹窗关单确定
export function FeedCloseOkApi(obj) {
  return request({
    url: "/feedbackPlatform/updateCloseTheSingle.do",
    method: "post",
    data: {
      feedback_id: obj.feedback_id,
      status: obj.closestatus,
      close_remark: obj.close_remark,
      org_id: obj.org_id,
    },
  });
}
//反馈列表弹窗查询记录
export function RecordListApi(obj) {
  return request({
    url: "/feedbackPlatform/queryProcessingRecord.do",
    method: "post",
    data: {
      feedback_id: obj.feedback_id,
    },
  });
}
