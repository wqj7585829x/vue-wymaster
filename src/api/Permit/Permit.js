// 授权信息

import request from "@/utils/Request";

// 查询授权文件列表
export function permitSearch() {
  return request({
    url: "/permit/permitResult_search.doAdmin",
    method: "post",
    data: {},
  });
}

// 上传授权文件
export function uploadPermit(obj) {
  return request({
    url: "/permit/permit.doAdmin",
    method: "post",
    data: obj,
    upload_type: true,
  });
}

// 是否授权提示
export function permitCheckMessage() {
  return request({
    url: "/permit/permit_checkMessage.doAdmin",
    method: "post",
    data: {},
  });
}
