import request from "@/utils/Request";
//门禁审核列表
export function queryEntranceGuardKeyApi(obj) {
  return request({
    url: "/accessControl/queryEntranceGuardKey.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      RYMJQX_ZT: obj.RYMJQX_ZT == 3 ? "" : obj.RYMJQX_ZT,
      RYMJQX_XM: obj.RYMJQX_XM,
      RYMJQX_SJH: obj.RYMJQX_SJH,
      RYMJQX_SFZH: obj.RYMJQX_SFZH,
    },
  });
}

//审批通过和审批不通过
export function updateEntranceGuardKeyApi(obj, ZT) {
  return request({
    url: "/accessControl/updateEntranceGuardKey.do",
    method: "post",
    data: {
      RYMJQX_ID: obj.RYMJQX_ID,
      RYMJQX_ZT: ZT,
      RYMJQX_SHYJ: obj.RYMJQX_SHYJ,
    },
  });
}

//通行证审核列表
export function elqueryEntranceGuardKeyApi(obj) {
  return request({
    url: "/pass/ElectronicPC/pass/queryEntranceGuardKey.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      RYMJQX_ZT: obj.RYMJQX_ZT == 3 ? "" : obj.RYMJQX_ZT,
      RYMJQX_XM: obj.RYMJQX_XM,
      RYMJQX_SJH: obj.RYMJQX_SJH,
      RYMJQX_SFZH: obj.RYMJQX_SFZH,
    },
  });
}

//通行证审批通过和审批不通过
export function elupdateEntranceGuardKeyApi(obj, ZT) {
  return request({
    url: "/pass/ElectronicPC/pass/updateEntranceGuardKey.do",
    method: "post",
    data: {
      RYMJQX_ID: obj.RYMJQX_ID,
      RYMJQX_ZT: ZT,
      RYMJQX_SHYJ: obj.RYMJQX_SHYJ,
    },
  });
}

//撤销
export function deleteEntranceGuardKeyApi(obj, ZT) {
  return request({
    url: "/accessControl/deleteEntranceGuardKey.do",
    method: "post",
    data: {
      RYMJQX_ID: obj.RYMJQX_ID,
      RYMJQX_XQWJ: obj.RYMJQX_XQWJ,
      RYMJQX_RYLX: obj.RYMJQX_RYLX,
      RYMJQX_RYWJ: obj.RYMJQX_RYWJ,
      RYMJQX_RLURL: obj.RYMJQX_RLURL,
      state: ZT,
    },
  });
}
