import request from "@/utils/Request";

//查询项目名称
export function queryZLPlotApi() {
  return request({
    url: "/util/queryZLPlot.do",
    method: "post",
    data: {},
  });
}

//资源名称查询
export function queryContractRoomNameApi(obj) {
  return request({
    url: "/zl/costManagementController/queryContractRoomName.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
      contract_num: obj.contract_num,
    },
  });
}

//合同编号查询
export function queryContractNumApi(obj) {
  return request({
    url: "/zl/costManagementController/queryContractNum.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
    },
  });
}
//客户名称查询
export function queryClientsApi(obj) {
  return request({
    url: "/zl/costManagementController/queryContractCustomerName.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
      room_name: obj.room_name,
    },
  });
}
//生成费用
export function createReceiptApi(obj) {
  return request({
    url: "/zl/costManagementController/createReceipt.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
      contract_num: obj.contract_num,
      room_name: obj.room_name,
      produceDate: obj.produceDate,
    },
  });
}

//删除费用
export function deleteReceiptApi(obj) {
  return request({
    url: "/zl/costManagementController/deleteReceipt.do",
    method: "post",
    data: {
      plot_id: obj.plot_id,
      contract_num: obj.contract_num,
      room_name: obj.room_name,
      produceDate: obj.produceDate,
    },
  });
}
