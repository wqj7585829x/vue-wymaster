// 资源档案

import request from "@/utils/Request";

// 3.1.	资源档案资源树查询
export function getTree() {
  return request({
    url: "/util/queryOrgTreeNoRoom.do",
    method: "post",
    data: {},
  });
}

// 3.2.	资源档案分区查询
export function queryPartitionByPage(obj) {
  return request({
    url: "/resourceFile/queryResourceFilePartition.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      GLQDA_GLQMC: obj.GLQDA_GLQMC != undefined ? obj.GLQDA_GLQMC : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

// 3.3.	资源档案楼栋查询
export function queryBuildByPage(obj) {
  return request({
    url: "/resourceFile/queryResourceFileBuilding.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      DLDA_GLQWJ: obj.DLDA_GLQWJ,
      YXDID: obj.YXDID,
      DLDA_DLMC: obj.DLDA_DLMC != undefined ? obj.DLDA_DLMC : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

// 3.4.	资源档案房间查询
export function queryResourceByPage(obj) {
  return request({
    url: "/resourceFile/queryResourceFileRoom.do",
    method: "post",
    data: {
      DLDA_ZJ: obj.DLDA_ZJ,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FJDA_FJMC: obj.FJDA_FJMC != undefined ? obj.FJDA_FJMC : "",
      FJDA_FJID: obj.FJDA_FJID != undefined ? obj.FJDA_FJID : "",
      FJDA_CX: obj.FJDA_CX != undefined ? obj.FJDA_CX : "",
      FJDA_HX: obj.DLDA_DLMC != undefined ? obj.FJDA_HX : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

// 4.1.	资源登记新增分区
export function addResourceFilePartition(obj) {
  return request({
    url: "/resourceFile/addResourceFilePartition.do",
    method: "post",
    data: {
      GLQDA_GLQID: obj.GLQDA_GLQID != undefined ? obj.GLQDA_GLQID : "",
      GLQDA_DLWZ: obj.GLQDA_DLWZ != undefined ? obj.GLQDA_DLWZ : "",
      GLQDA_GLQMC: obj.GLQDA_GLQMC != undefined ? obj.GLQDA_GLQMC : "",
      GLQDA_JZMJ: obj.GLQDA_JZMJ != undefined ? obj.GLQDA_JZMJ : 0,
      GLQDA_LDMJ: obj.GLQDA_LDMJ != undefined ? obj.GLQDA_LDMJ : 0,
      GLQDA_SYMJ: obj.GLQDA_SYMJ != undefined ? obj.GLQDA_SYMJ : 0,
      GLQDA_SSQY: obj.GLQDA_SSQY != undefined ? obj.GLQDA_SSQY : "",
      GLQDA_ZDMJ: obj.GLQDA_ZDMJ != undefined ? obj.GLQDA_ZDMJ : 0,
      GLQDA_YDS: obj.GLQDA_YDS != undefined ? obj.GLQDA_YDS : "",
      GLQDA_JGRQ: obj.GLQDA_JGRQ != undefined ? obj.GLQDA_JGRQ : "",
      GLQDA_GJDW: obj.GLQDA_GJDW != undefined ? obj.GLQDA_GJDW : "",
      GLQDA_SBAZDW: obj.GLQDA_SBAZDW != undefined ? obj.GLQDA_SBAZDW : "",
      GLQDA_ZJ: obj.GLQDA_ZJ != undefined ? obj.GLQDA_ZJ : "",
      GLCID: obj.GLCID != undefined ? obj.GLCID : "",
      YXDID: obj.YXDID != undefined ? obj.YXDID : "",
    },
  });
}

// 4.2.	资源登记修改分区
export function updateResourceFilePartitionOther(obj) {
  return request({
    url: "/resourceFile/updateResourceFilePartitionOther.do",
    method: "post",
    data: {
      GLQDA_DLWZ: obj.GLQDA_DLWZ,
      GLQDA_GLQMC: obj.GLQDA_GLQMC,
      GLQDA_JZMJ: obj.GLQDA_JZMJ,
      GLQDA_LDMJ: obj.GLQDA_LDMJ,
      GLQDA_SYMJ: obj.GLQDA_SYMJ,
      GLQDA_SSQY: obj.GLQDA_SSQY,
      GLQDA_ZDMJ: obj.GLQDA_ZDMJ,
      GLQDA_YDS: obj.GLQDA_YDS,
      GLQDA_JGRQ: obj.GLQDA_JGRQ,
      GLQDA_GJDW: obj.GLQDA_GJDW,
      GLQDA_SBAZDW: obj.GLQDA_SBAZDW,
      GLQDA_ZJ: obj.GLQDA_ZJ,
    },
  });
}

// 4.3.	资源登记删除分区
export function deleteResourceFilePartition(obj) {
  return request({
    url: "/resourceFile/deleteResourceFilePartition.do",
    method: "post",
    data: {
      GLQDA_ZJ: obj.GLQDA_ZJ,
    },
  });
}

// 4.4.	资源登记新增楼栋
export function addResourceFileBuilding(obj) {
  return request({
    url: "/resourceFile/addResourceFileBuilding.do",
    method: "post",
    data: {
      DLDA_DLID: obj.DLDA_DLID != undefined ? obj.DLDA_DLID : "",
      DLDA_ZJ: obj.DLDA_ZJ != undefined ? obj.DLDA_ZJ : "",
      DLDA_LCS: obj.DLDA_LCS != undefined ? obj.DLDA_LCS : 1,
      DLDA_DLMC: obj.DLDA_DLMC != undefined ? obj.DLDA_DLMC : "",
      DLDA_JZMJ: obj.DLDA_JZMJ != undefined ? obj.DLDA_JZMJ : 0,
      DLDA_LG: obj.DLDA_LG != undefined ? obj.DLDA_LG : 0,
      DLDA_SGDW: obj.DLDA_SGDW != undefined ? obj.DLDA_SGDW : "",
      DLDA_SYMJ: obj.DLDA_SYMJ != undefined ? obj.DLDA_SYMJ : 0,
      DLDA_ZDMJ: obj.DLDA_ZDMJ != undefined ? obj.DLDA_ZDMJ : 0,
      DLDA_ZHS: obj.DLDA_ZHS != undefined ? obj.DLDA_ZHS : "",
      DLDA_DLLB: obj.DLDA_DLLB != undefined ? obj.DLDA_DLLB : "",
      DLDA_DTSL: obj.DLDA_DTSL != undefined ? obj.DLDA_DTSL : "",
      DLDA_DLRHSJ: obj.DLDA_DLRHSJ != undefined ? obj.DLDA_DLRHSJ : "",
      DLDA_GLQWJ: obj.DLDA_GLQWJ != undefined ? obj.DLDA_GLQWJ : "",
      GLCID: obj.GLCID != undefined ? obj.GLCID : "",
      YXDID: obj.YXDID != undefined ? obj.YXDID : "",
    },
  });
}

// 4.5.	资源登记修改楼栋
export function updateResourceFileBuildingOther(obj) {
  return request({
    url: "/resourceFile/updateResourceFileBuildingOther.do",
    method: "post",
    data: {
      DLDA_ZJ: obj.DLDA_ZJ != undefined ? obj.DLDA_ZJ : "",
      DLDA_LCS: obj.DLDA_LCS != undefined ? obj.DLDA_LCS : 1,
      DLDA_DLMC: obj.DLDA_DLMC != undefined ? obj.DLDA_DLMC : "",
      DLDA_JZMJ: obj.DLDA_JZMJ != undefined ? obj.DLDA_JZMJ : 0,
      DLDA_LG: obj.DLDA_LG != undefined ? obj.DLDA_LG : 0,
      DLDA_SGDW: obj.DLDA_SGDW != undefined ? obj.DLDA_SGDW : "",
      DLDA_SYMJ: obj.DLDA_SYMJ != undefined ? obj.DLDA_SYMJ : 0,
      DLDA_DLID: obj.DLDA_DLID != undefined ? obj.DLDA_DLID : "",
      DLDA_GLQID: obj.DLDA_GLQID ? obj.DLDA_GLQID : "",
      DLDA_DLLB: obj.DLDA_DLLB != undefined ? obj.DLDA_DLLB : "",
      DLDA_DTSL: obj.DLDA_DTSL != undefined ? obj.DLDA_DTSL : "",
      DLDA_GLQWJ: obj.DLDA_GLQWJ,
    },
  });
}

// 4.6.	资源登记删除楼栋
export function deleteResourceFileBuilding(obj) {
  return request({
    url: "/resourceFile/deleteResourceFileBuilding.do",
    method: "post",
    data: {
      DLDA_ZJ: obj.DLDA_ZJ,
    },
  });
}

// 4.7.	资源登记新增资源
export function addResourceFileRoom(obj) {
  return request({
    url: "/resourceFile/addResourceFileRoom.do",
    method: "post",
    data: {
      FJDA_CQGS: obj.FJDA_CQGS != undefined ? obj.FJDA_CQGS : "",
      FJDA_ZYLX: obj.FJDA_ZYLX != undefined ? obj.FJDA_ZYLX : "",
      FJDA_WZ: obj.FJDA_WZ != undefined ? obj.FJDA_WZ : "",
      FJDA_FJGD: obj.FJDA_FJGD != undefined ? obj.FJDA_FJGD : 0,
      FJDA_ZDCZ: obj.FJDA_ZDCZ != undefined ? obj.FJDA_ZDCZ : 0,
      FJDA_PTSS: obj.FJDA_PTSS != undefined ? obj.FJDA_PTSS : "",
      FJDA_SFMJ: obj.FJDA_SFMJ != undefined ? obj.FJDA_SFMJ : 0,
      FJDA_FJMC: obj.FJDA_FJMC != undefined ? obj.FJDA_FJMC : "",
      FJDA_ZXQK: obj.FJDA_ZXQK != undefined ? obj.FJDA_ZXQK : "",
      FJDA_SYMJ: obj.FJDA_SYMJ != undefined ? obj.FJDA_SYMJ : 0,
      FJDA_LC: obj.FJDA_LC != undefined ? obj.FJDA_LC : "",
      FJDA_JZMJ: obj.FJDA_JZMJ != undefined ? obj.FJDA_JZMJ : 0,
      FJDA_HX: obj.FJDA_HX != undefined ? obj.FJDA_HX : "",
      FJDA_FJJG: obj.FJDA_FJJG != undefined ? obj.FJDA_FJJG : "",
      FJDA_FJH: obj.FJDA_FJH != undefined ? obj.FJDA_FJH : "",
      FJDA_CX: obj.FJDA_CX != undefined ? obj.FJDA_CX : "",
      FJDA_FJSZT: obj.FJDA_FJSZT != undefined ? obj.FJDA_FJSZT : "",
      FJDA_FJCZ: obj.FJDA_FJCZ != undefined ? obj.FJDA_FJCZ : "",
      FJDA_ZLMJ: obj.FJDA_ZLMJ != undefined ? obj.FJDA_ZLMJ : 0,
      FJDA_FJID: obj.FJDA_FJID != undefined ? obj.FJDA_FJID : "",
      FJDA_DLWJ: obj.FJDA_DLWJ != undefined ? obj.FJDA_DLWJ : "",
      FJDA_GLQWJ: obj.FJDA_GLQWJ != undefined ? obj.FJDA_GLQWJ : "",
      FJDA_CZZT: obj.FJDA_CZZT != undefined ? obj.FJDA_CZZT : "",
      FJDA_LS: obj.FJDA_LS != undefined ? !obj.FJDA_LS : "",
      GLCID: obj.GLCID != undefined ? obj.GLCID : "",
      YXDID: obj.YXDID != undefined ? obj.YXDID : "",
      FJDA_ZCFL: obj.FJDA_ZCFL != undefined ? obj.FJDA_ZCFL : "",
    },
  });
}

// 4.8.	资源登记修改资源
export function updateResourceFileRoomOther(obj) {
  return request({
    url: "/resourceFile/updateResourceFileRoomOther.do",
    method: "post",
    data: {
      FJDA_ZJ: obj.FJDA_ZJ != undefined ? obj.FJDA_ZJ : "",
      FJDA_CQGS: obj.FJDA_CQGS != undefined ? obj.FJDA_CQGS : "",
      FJDA_ZYLX: obj.FJDA_ZYLX != undefined ? obj.FJDA_ZYLX : "",
      FJDA_WZ: obj.FJDA_WZ != undefined ? obj.FJDA_WZ : "",
      FJDA_FJGD: obj.FJDA_FJGD != undefined ? obj.FJDA_FJGD : 0,
      FJDA_ZDCZ: obj.FJDA_ZDCZ != undefined ? obj.FJDA_ZDCZ : 0,
      FJDA_PTSS: obj.FJDA_PTSS != undefined ? obj.FJDA_PTSS : "",
      FJDA_SFMJ: obj.FJDA_SFMJ != undefined ? obj.FJDA_SFMJ : 0,
      FJDA_FJMC: obj.FJDA_FJMC != undefined ? obj.FJDA_FJMC : "",
      FJDA_ZXQK: obj.FJDA_ZXQK != undefined ? obj.FJDA_ZXQK : "",
      FJDA_SYMJ: obj.FJDA_SYMJ != undefined ? obj.FJDA_SYMJ : 0,
      FJDA_LC: obj.FJDA_LC != undefined ? obj.FJDA_LC : "",
      FJDA_JZMJ: obj.FJDA_JZMJ != undefined ? obj.FJDA_JZMJ : 0,
      FJDA_HX: obj.FJDA_HX != undefined ? obj.FJDA_HX : "",
      FJDA_FJJG: obj.FJDA_FJJG != undefined ? obj.FJDA_FJJG : "",
      FJDA_FJH: obj.FJDA_FJH != undefined ? obj.FJDA_FJH : "",
      FJDA_CX: obj.FJDA_CX != undefined ? obj.FJDA_CX : "",
      FJDA_FJSZT: obj.FJDA_FJSZT != undefined ? obj.FJDA_FJSZT : "",
      FJDA_FJCZ: obj.FJDA_FJCZ != undefined ? obj.FJDA_FJCZ : "",
      FJDA_ZLMJ: obj.FJDA_ZLMJ != undefined ? obj.FJDA_ZLMJ : 0,
      FJDA_CZZT: obj.FJDA_CZZT != undefined ? obj.FJDA_CZZT : "",
      FJDA_FJID: obj.FJDA_FJID != undefined ? obj.FJDA_FJID : "",
      FJDA_LS: obj.FJDA_LS != undefined ? !obj.FJDA_LS : "",
      FJDA_ZCFL: obj.FJDA_ZCFL != undefined ? obj.FJDA_ZCFL : "",
      FJDA_DLWJ: obj.FJDA_DLWJ,
    },
  });
}

//4.9.	资源登记删除资源
export function deleteResourceFileRoom(obj) {
  return request({
    url: "/resourceFile/deleteResourceFileRoom.do",
    method: "post",
    data: {
      FJDA_ZJ: obj.FJDA_ZJ,
    },
  });
}

// 4.10.	获取楼栋类别下拉框
export function queryBuildingCategoryLevel() {
  return request({
    url: "/util/queryBuildingCategoryLevel.do",
    method: "post",
    data: {},
  });
}

// 4.11.	获取资源类型下拉框
export function queryResourceTypeLevel() {
  return request({
    url: "/util/queryResourceTypeLevel.do",
    method: "post",
    data: {},
  });
}

// 4.12.	获取资源结构下拉框
export function queryResourceConfigurationLevel() {
  return request({
    url: "/util/queryResourceConfigurationLevel.do",
    method: "post",
    data: {},
  });
}

// 4.13.	获取户型下拉框
export function queryHouseTypeLevel() {
  return request({
    url: "/util/queryHouseTypeLevel.do",
    method: "post",
    data: {},
  });
}

// 4.14.	获取朝向下拉框
export function queryOrientationLevel() {
  return request({
    url: "/util/queryOrientationLevel.do",
    method: "post",
    data: {},
  });
}

// 4.15.	获取出租状态下拉框
export function queryLeaseStateLevel() {
  return request({
    url: "/util/queryLeaseStateLevel.do",
    method: "post",
    data: {},
  });
}

// 4.16.	获取产权归属下拉框
export function queryPropertyOwnershipLevel() {
  return request({
    url: "/util/queryPropertyOwnershipLevel.do",
    method: "post",
    data: {},
  });
}

//4.17.	资源登记查询资源数据
export function queryGeneratedResources(DLDA_ZJ) {
  return request({
    url: "/resourceFile/queryGeneratedResources.do",
    method: "post",
    data: {
      DLDA_ZJ: DLDA_ZJ,
    },
  });
}

//4.18.	资源登记自动生成资源
export function automaticallyGeneratedResources(obj) {
  return request({
    url: "/resourceFile/automaticallyGeneratedResources.do",
    method: "post",
    data: {
      FJDA_DLWJ: obj.FJDA_DLWJ,
      FJDA_GLQWJ: obj.FJDA_GLQWJ,
      FJDA_GLQID: obj.FJDA_GLQID,
      FJDA_DLID: obj.FJDA_DLID,
      prefixCode: obj.prefixCode,
      utilNum: obj.utilNum,
      buildingNum: obj.buildingNum,
      resourceNum: obj.resourceNum,
      buildingNumType: obj.buildingNumType,
      roomNumType: obj.roomNumType,
      FJDA_ZYLX: obj.FJDA_ZYLX,
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

export function resourceFilrImport(obj) {
  return request({
    url: "/resourceFile/resourceFilrImport.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

export function exportResourceData(data) {
  return request({
    url: "/resourceFile/exportResourceData.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
