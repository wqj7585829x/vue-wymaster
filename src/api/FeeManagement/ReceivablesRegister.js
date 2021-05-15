//收款登记
import request from "@/utils/Request";

//树查询
export function getTree(seachKey) {
  return request({
    url: "/util/orgTree.do",
    method: "post",
    data: {
      seachKey: seachKey,
    },
  });
}

//按资源查询客户列表
export function queryResourceClient(FJDA_ZJ, status) {
  return request({
    url: "util/queryClientUnderRoom.do",
    method: "post",
    data: {
      FJDA_ZJ: FJDA_ZJ,
      ZT: status,
    },
  });
}

//按客户查询客户
export function queryGuestClient(seachKey, arrears) {
  return request({
    url: "util/queryClientList.do",
    method: "post",
    data: {
      seachKey: seachKey,
      arrears: arrears,
    },
  });
}

//按客户查询资源
export function queryGuestResource(FKGX_KHWJ, status) {
  return request({
    url: "util/queryRoomByClient.do",
    method: "post",
    data: {
      FKGX_KHWJ: FKGX_KHWJ,
      ZT: status,
    },
  });
}

//是否延迟加载配置
export function queryIsLazyLoadApi() {
  return request({
    url: "/util/queryIsLazyLoad.do",
    method: "post",
    data: {},
  });
}
