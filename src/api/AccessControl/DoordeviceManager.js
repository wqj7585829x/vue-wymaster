//门禁设备管理
import request from "@/utils/Request";
//门禁设备列表
export function queryAccessControlApi(obj) {
  return request({
    url: "/accessControl/queryAccessControl.do",
    method: "post",
    data: {
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//新增
export function insertAccessControlApi(obj) {
  return request({
    url: "/accessControl/insertAccessControl.do",
    method: "post",
    data: {
      MJSB_XQWJ: obj.MJSB_XQWJ,
      MJSB_LDWJ: obj.MJSB_LDWJ,
      MJSB_SBMC: obj.MJSB_SBMC,
      MJSB_SBJKDZ: obj.MJSB_SBJKDZ,
      MJSB_SBMY: obj.MJSB_SBMY,
      MJSB_SBXLH: obj.MJSB_SBXLH,
      MJSB_SBMAC: obj.MJSB_SBMAC,
      MJSB_SBMBM: obj.MJSB_SBMBM,
      MJSB_KSQBH: obj.MJSB_KSQBH,
      MJSB_SQMY: obj.MJSB_SQMY,
      MJSB_BZ: obj.MJSB_BZ,
    },
  });
}

//修改
export function updateAccessControlApi(obj) {
  return request({
    url: "/accessControl/updateAccessControl.do",
    method: "post",
    data: {
      MJSB_XQWJ: obj.MJSB_XQWJ,
      MJSB_LDWJ: obj.MJSB_LDWJ,
      MJSB_SBMC: obj.MJSB_SBMC,
      MJSB_ZT: obj.MJSB_ZT,
      MJSB_BZ: obj.MJSB_BZ,
      MJSB_ZJ: obj.MJSB_ZJ,
      MJSB_SBJKDZ: obj.MJSB_SBJKDZ,
      MJSB_SBMY: obj.MJSB_SBMY,
      MJSB_SBXLH: obj.MJSB_SBXLH,
      MJSB_SBMAC: obj.MJSB_SBMAC,
      MJSB_SBMBM: obj.MJSB_SBMBM,
      MJSB_KSQBH: obj.MJSB_KSQBH,
      MJSB_SQMY: obj.MJSB_SQMY,
      MJSB_CJSJ: obj.MJSB_CJSJ,
      MJSB_CJR: obj.MJSB_CJR,
    },
  });
}

//删除
export function deleteAccessControlApi(MJSB_ZJ) {
  return request({
    url: "/accessControl/deleteAccessControl.do",
    method: "post",
    data: {
      MJSB_ZJ: MJSB_ZJ,
    },
  });
}

//小区下拉框
export function queryHousingEstate() {
  return request({
    url: "/accessControl/queryHousingEstate.do",
    method: "post",
    data: {},
  });
}
//楼栋下拉框
export function queryMansion(SJZJ) {
  return request({
    url: "/accessControl/queryMansion.do",
    method: "post",
    data: {
      SJZJ: SJZJ,
    },
  });
}
