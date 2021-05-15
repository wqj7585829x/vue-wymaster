// 路由接口

import request from "@/utils/Request";

// 查询路由
export function menuRouter() {
  return request({
    url: "/organ/organ_FindMenuTree.doAdmin",
    method: "post",
    data: {},
  });
}
