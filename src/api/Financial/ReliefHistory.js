//减免历史API
import request from "@/utils/Request";

// 点击客户信息下拉修改查询收费项目下拉数据
export function GuestexpitemData(obj) {
  return request({
    url: "/receipt/receipt_findExpByCus.doAdmin",
    method: "post",
    data: {
      cusId: obj == "" ? null : obj,
    },
  });
}
// 优惠减免查询分页
export function queryReliefByPage(obj) {
  return request({
    url: "/receipt/receipt_queryReliefByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      status: obj.status,
      cusId: obj.cusId == "" ? null : obj.cusId,
      expId: obj.expId == "" ? null : obj.expId,
      roomid: obj.roomId == "" ? null : obj.roomId,
    },
  });
}
