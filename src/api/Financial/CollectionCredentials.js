//收款凭证API
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

// 2.1.10.7收款凭证查询分页
export function VoucherByPage(obj) {
  return request({
    url: "/receipt/receipt_voucherByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      status: obj.status,
      cusId: obj.cusId == "" ? null : obj.cusId,
      expId: obj.expId == "" ? null : obj.expId,
      roomId: obj.roomId == "" ? null : obj.roomId,
      tabulationBegin: obj.tabulationBegin == "" ? null : obj.tabulationBegin,
      tabulationEnd: obj.tabulationEnd == "" ? null : obj.tabulationEnd,
      isInvalid: obj.isInvalid == "" ? null : obj.isInvalid,
      isBilling: obj.isBilling == "" ? null : obj.isBilling,
    },
  });
}
// 点击收款凭证表格查询收款明细
export function VoucherDetail(obj) {
  return request({
    url: "/receipt/receipt_findVoucherDetail.doAdmin",
    method: "post",
    data: {
      vouId: obj,
    },
  });
}

// 收款凭证作废
export function VoucherInvalid(obj) {
  return request({
    url: "/receipt/receipt_voucherInvalid.doAdmin",
    method: "post",
    data: {
      vouId: obj.vouId,
      cenId: obj.cenId,
      invalidDay: obj.invalidDay,
      invalidReason: obj.invalidReason,
    },
  });
}
