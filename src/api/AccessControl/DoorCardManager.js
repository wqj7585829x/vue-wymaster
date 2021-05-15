//门禁卡管理
import request from "@/utils/Request";
//门禁卡列表
export function queryAccessControlCardApi(obj) {
  return request({
    url: "/accessControl/queryAccessControlCard.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//新增
export function insertAccessControlCardApi(obj) {
  return request({
    url: "/accessControl/insertAccessControlCard.do",
    method: "post",
    data: {
      MJK_KH: obj.MJK_KH,
      MJK_MJSBWJ: obj.MJK_MJSBWJ,
      MJK_SYRMC: obj.MJK_SYRMC,
      MJK_XQWJ: obj.MJK_XQWJ,
      MJK_LDWJ: obj.MJK_LDWJ,
      MJK_KMC: obj.MJK_KMC,
      MJK_YXQKSSJ: obj.MJK_YXQKSSJ,
      MJK_YXQJSSJ: obj.MJK_YXQJSSJ,
      MJK_BZ: obj.MJK_BZ,
    },
  });
}

//修改
export function updateAccessControlCardApi(obj) {
  return request({
    url: "/accessControl/updateAccessControlCard.do",
    method: "post",
    data: {
      MJK_XQWJ: obj.MJK_XQWJ,
      MJK_LDWJ: obj.MJK_LDWJ,
      MJK_KMC: obj.MJK_KMC,
      MJK_ZT: obj.MJK_ZT,
      MJK_YXQKSSJ: obj.MJK_YXQKSSJ,
      MJK_YXQJSSJ: obj.MJK_YXQJSSJ,
      MJK_BZ: obj.MJK_BZ,
      MJK_ZJ: obj.MJK_ZJ,
      MJK_KH: obj.MJK_KH,
      MJK_MJSBWJ: obj.MJK_MJSBWJ,
      MJK_SYRMC: obj.MJK_SYRMC,
      MJK_CJSJ: obj.MJK_CJSJ,
      MJK_CJR: obj.MJK_CJR,
    },
  });
}

//删除
export function deleteAccessControlCardApi(MJK_ZJ) {
  return request({
    url: "/accessControl/deleteAccessControlCard.do",
    method: "post",
    data: {
      MJK_ZJ: MJK_ZJ,
    },
  });
}
//门禁设备
export function queryAccessControlAllApi() {
  return request({
    url: "/accessControl/queryAccessControlAll.do",
    method: "post",
    data: {},
  });
}
