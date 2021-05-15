//预交使用API
import request from "@/utils/Request";

// 点击客户信息下拉修改查询收费项目下拉数据
// export function GuestexpitemData(obj) {
//   return request({
//     url: '/receipt/receipt_findExpByCus.doAdmin',
//     method: 'post',
//     data: {
//       cusId:obj==''?null:obj,
//     }
//   })
// }
// 预交使用查询分页
export function queryDeductByPage(obj) {
  return request({
    url: "/prepaid/prepaid_queryDeductByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      status: obj.status,
      cusId: obj.cusId == "" ? null : obj.cusId,
      roomId: obj.roomId == "" ? null : obj.roomId,
      beginTime: obj.beginTime == "" ? null : obj.beginTime,
      beginEnd: obj.beginEnd == "" ? null : obj.beginEnd,
    },
  });
}
