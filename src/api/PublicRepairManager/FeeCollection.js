//费用
import request from "@/utils/Request";

//8.1.	费用传递方式查询
export function queryCostTransferPattern(obj) {
  return request({
    url: "/costreceive/queryCostTransferPattern.do",
    method: "post",
    data: {},
  });
}

//8.2.	费用领取列表查询
export function queryCostReceive(obj) {
  return request({
    url: "/costreceive/queryCostReceive.do",
    method: "post",
    data: {
      state: obj.state,
      KSRQ: obj.KSRQ,
      JSRQ: obj.JSRQ,
      context: obj.context != undefined ? obj.context : "",
    },
  });
}

//8.3.	费用分摊列表查询
export function queryCostAllocationList(obj) {
  return request({
    url: "/costreceive/queryCostAllocationList.do",
    method: "post",
    data: {
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}

//8.4.	费用支出列表查询
export function queryExpenditureList(obj) {
  return request({
    url: "/costreceive/queryExpenditureList.do",
    method: "post",
    data: {
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}

//8.5.	余额不足用户列表查询
export function queryInsufficientFunds(obj) {
  return request({
    url: "/costreceive/queryInsufficientFunds.do",
    method: "post",
    data: {
      YFPZ_ZJ: obj.YFPZ_ZJ,
    },
  });
}

//8.6.	预支列表查询
export function queryAdvanceList(obj) {
  return request({
    url: "/costreceive/queryAdvanceList.do",
    method: "post",
    data: {
      KSRQ: obj.KSRQ,
      JSRQ: obj.JSRQ,
      context: obj.context != undefined ? obj.context : "",
    },
  });
}

//8.7.	预支列表详情查询
export function queryAdvanceMessage(obj) {
  return request({
    url: "/costreceive/queryAdvanceMessage.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ,
    },
  });
}

//8.8.	费用公摊
export function queryCostAllocation(obj) {
  return request({
    url: "/costreceive/queryCostAllocation.do",
    method: "post",
    data: {
      YFPZ_WXFAWJ: obj.YFPZ_WXFAWJ,
      YFPZ_XMLX: obj.YFPZ_XMLX,
      YFPZ_WXDJZJC: obj.YFPZ_WXDJZJC,
      YFPZ_XMMC: obj.YFPZ_XMMC,
      YFPZ_YFJE: obj.YFPZ_YFJE,
    },
  });
}

//8.9.	费用判断
export function queryJudgementBalance(obj) {
  return request({
    url: "/costreceive/queryJudgementBalance.do",
    method: "post",
    data: {
      YFPZ_ZJ: obj.YFPZ_ZJ,
      YFPZ_YFJE: obj.YFPZ_YFJE,
      YFPZ_YZJE: obj.YFPZ_YZJE,
    },
  });
}

//8.10.	费用支出
export function queryCostExpenditure(obj) {
  return request({
    url: "/costreceive/queryCostExpenditure.do",
    method: "post",
    data: {
      YFPZ_WXFAWJ: obj.YFPZ_WXFAWJ,
      YFPZ_XMLX: obj.YFPZ_XMLX,
      YFPZ_WXDJZJC: obj.YFPZ_WXDJZJC,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      FYZC_ZCJE: obj.FYZC_ZCJE,
      YFPZ_YFJE: obj.YFPZ_YFJE,
      YFPZ_YZJE: obj.YFPZ_YZJE,
      FYZC_CNR: obj.FYZC_CNR,
      FYZC_XMMC: obj.FYZC_XMMC,
      FYZC_LQR: obj.FYZC_LQR,
      FYZC_ZCRQ: obj.FYZC_ZCRQ,
    },
  });
}

//8.11.	费用传递
export function queryCostTransfer(obj) {
  return request({
    url: "/costreceive/queryCostTransfer.do",
    method: "post",
    data: {
      YFPZ_WXFAWJ: obj.YFPZ_WXFAWJ,
      YFPZ_XMLX: obj.YFPZ_XMLX,
      YFPZ_WXDJZJC: obj.YFPZ_WXDJZJC,
      YFPZ_ZJ: obj.YFPZ_ZJ,
      FYZC_ZJ: obj.FYZC_ZJ,
      YFPZ_YFJE: obj.YFPZ_YFJE,
    },
  });
}

//8.12.	点击预支
export function checkCostAdvance(obj) {
  return request({
    url: "/costreceive/checkCostAdvance.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ,
      WXFA_YZFY: obj.WXFA_YZFY,
      WXFA_YYZJE: obj.WXFA_YYZJE,
    },
  });
}

//8.13.	点击保存
export function costAdvance(obj) {
  return request({
    url: "/costreceive/costAdvance.do",
    method: "post",
    data: {
      WXFA_ZJ: obj.WXFA_ZJ,
      WXFA_YZFY: obj.WXFA_YZFY,
      WXFA_YYZJE: obj.WXFA_YYZJE,
      FYZC_ZCJE: obj.FYZC_ZCJE,
      FYZC_CNR: obj.FYZC_CNR,
      FYZC_XMMC: obj.FYZC_XMMC,
      FYZC_LQR: obj.FYZC_LQR,
      FYZC_ZCRQ: obj.FYZC_ZCRQ,
      FYZC_ZCLX: obj.FYZC_ZCLX,
    },
  });
}
