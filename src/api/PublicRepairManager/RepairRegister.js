//维修登记
import request from "@/utils/Request";

//2.1.	维修项目查询
export function queryProject(obj) {
  return request({
    url: "/maintenanCeregister/queryProject.do",
    method: "post",
    data: {},
  });
}

//2.2.	维修项目新增
export function addProject(obj) {
  return request({
    url: "/maintenanCeregister/addProject.do",
    method: "post",
    data: {
      SSXM_MC: obj.SSXM_MC,
      SSXM_XMLX: obj.SSXM_XMLX,
      SSXM_WXLB: obj.SSXM_WXLB,
      SSXM_DZ: obj.SSXM_DZ != undefined ? obj.SSXM_DZ : "",
    },
  });
}

//2.3.	维修项目修改
export function updateProject(obj) {
  return request({
    url: "/maintenanCeregister/updateProject.do",
    method: "post",
    data: {
      SSXM_MC: obj.SSXM_MC,
      SSXM_XMLX: obj.SSXM_XMLX,
      SSXM_WXLB: obj.SSXM_WXLB,
      SSXM_DZ: obj.SSXM_DZ != undefined ? obj.SSXM_DZ : "",
      SSXM_ZJ: obj.SSXM_ZJ,
    },
  });
}

//2.4.	维修项目删除
export function deleteProject(obj) {
  return request({
    url: "/maintenanCeregister/deleteProject.do",
    method: "post",
    data: {
      SSXM_ZJ: obj.SSXM_ZJ,
    },
  });
}

//2.5.	梯户关系树形查询
export function queryLadderTree(obj) {
  return request({
    url: "/ladderRelationship/queryLadderTree.do",
    method: "post",
    data: {},
  });
}

//2.6.	所属梯查询（维修项目）
export function queryLadder(obj) {
  return request({
    url: "/maintenanCeregister/queryLadder.do",
    method: "post",
    data: {
      SSXM_ZJ: obj.SSXM_ZJ,
    },
  });
}

//2.7.	所属户查询（维修项目）
export function queryDoor(obj) {
  return request({
    url: "/maintenanCeregister/queryDoor.do",
    method: "post",
    data: {
      SSXM_ZJ: obj.SSXM_ZJ,
    },
  });
}

//2.8.	所有所属梯查询
export function queryLadderForAll(obj) {
  return request({
    url: "/maintenanCeregister/queryLadderForAll.do",
    method: "post",
    data: {
      PRM: obj.PRM != undefined ? obj.PRM : "",
      TB_DLWJ: obj.TB_DLWJ != undefined ? obj.TB_DLWJ : "",
      TB_ZJ: obj.TB_ZJ != undefined ? obj.TB_ZJ : "",
      TB_GLQWJ: obj.TB_GLQWJ != undefined ? obj.TB_GLQWJ : "",
    },
  });
}

//2.9.	所有所属户查询
export function queryDoorForAll(obj) {
  return request({
    url: "/maintenanCeregister/queryDoorForAll.do",
    method: "post",
    data: {
      PRM: obj.PRM != undefined ? obj.PRM : "",
      ALLTWJ: obj.ALLTWJ,
    },
  });
}

//2.10.	维修登记查询
export function queryCeregister(obj) {
  return request({
    url: "/maintenanCeregister/queryCeregister.do",
    method: "post",
    data: {
      WXDJ_QSRQ: obj.WXDJ_QSRQ,
      WXDJ_JSRQ: obj.WXDJ_JSRQ,
      WXDJ_WXJD: obj.WXDJ_WXJD,
      WXDJ_CXTJ: obj.WXDJ_CXTJ != undefined ? obj.WXDJ_CXTJ : "",
    },
  });
}

//2.11.	原登记梯查询
export function queryOriginalLadder(obj) {
  return request({
    url: "/maintenanCeregister/queryOriginalLadder.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.12.	原登记户查询
export function queryOriginalDoor(obj) {
  return request({
    url: "/maintenanCeregister/queryOriginalDoor.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.13.	登记事件查询
export function queryOriginalEvents(obj) {
  return request({
    url: "/maintenanCeregister/queryOriginalEvents.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.14.	报修部门下拉框
export function queryRepairDepartment(obj) {
  return request({
    url: "/maintenanCeregister/queryRepairDepartment.do",
    method: "post",
    data: {},
  });
}

//2.15.	分摊标准下拉框
export function queryshare(obj) {
  return request({
    url: "/maintenanCeregister/queryshare.do",
    method: "post",
    data: {},
  });
}

//2.16.	维修类别下拉框
export function queryCategory(obj) {
  return request({
    url: "/maintenanCeregister/queryCategory.do",
    method: "post",
    data: {},
  });
}

//2.17.	项目类型下拉框
export function queryProjectType(obj) {
  return request({
    url: "/maintenanCeregister/queryProjectType.do",
    method: "post",
    data: {},
  });
}

//2.18.	维修登记新增
export function addCeregister(obj) {
  return request({
    url: "/maintenanCeregister/addCeregister.do",
    method: "post",
    data: {
      WXDJ_NO: obj.WXDJ_NO,
      WXDJ_BXBM: obj.WXDJ_BXBM != undefined ? obj.WXDJ_BXBM : "",
      WXDJ_BXRQ: obj.WXDJ_BXRQ != undefined ? obj.WXDJ_BXRQ : "",
      WXDJ_BXDZ: obj.WXDJ_BXDZ != undefined ? obj.WXDJ_BXDZ : "",
      WXDJ_XMMC: obj.WXDJ_XMMC,
      WXDJ_WXLB: obj.WXDJ_WXLB,
      WXDJ_XMLX: obj.WXDJ_XMLX,
      WXDJ_GLCCKJL: obj.WXDJ_GLCCKJL,
      WXDJ_JLR: obj.WXDJ_JLR != undefined ? obj.WXDJ_JLR : "",
      WXDJ_GLCYJ: obj.WXDJ_GLCYJ,
      WXDJ_FTBZ: obj.WXDJ_FTBZ != undefined ? obj.WXDJ_FTBZ : "",
      WXDJ_KGSJ: obj.WXDJ_KGSJ != undefined ? obj.WXDJ_KGSJ : "",
      WXDJ_WGSJ: obj.WXDJ_WGSJ != undefined ? obj.WXDJ_WGSJ : "",
      WXDJ_WXJYE: obj.WXDJ_WXJYE != undefined ? obj.WXDJ_WXJYE : "",
      WXDJ_SSXMWJ: obj.WXDJ_SSXMWJ != undefined ? obj.WXDJ_SSXMWJ : "",
    },
  });
}

//2.19.	维修登记修改
export function updateCeregister(obj) {
  return request({
    url: "/maintenanCeregister/updateCeregister.do",
    method: "post",
    data: {
      WXDJ_NO: obj.WXDJ_NO,
      WXDJ_BXBM: obj.WXDJ_BXBM != undefined ? obj.WXDJ_BXBM : "",
      WXDJ_BXRQ: obj.WXDJ_BXRQ != undefined ? obj.WXDJ_BXRQ : "",
      WXDJ_BXDZ: obj.WXDJ_BXDZ != undefined ? obj.WXDJ_BXDZ : "",
      WXDJ_XMMC: obj.WXDJ_XMMC,
      WXDJ_WXLB: obj.WXDJ_WXLB,
      WXDJ_XMLX: obj.WXDJ_XMLX,
      WXDJ_GLCCKJL: obj.WXDJ_GLCCKJL,
      WXDJ_JLR: obj.WXDJ_JLR != undefined ? obj.WXDJ_JLR : "",
      WXDJ_GLCYJ: obj.WXDJ_GLCYJ,
      WXDJ_FTBZ: obj.WXDJ_FTBZ != undefined ? obj.WXDJ_FTBZ : "",
      WXDJ_KGSJ: obj.WXDJ_KGSJ != undefined ? obj.WXDJ_KGSJ : "",
      WXDJ_WGSJ: obj.WXDJ_WGSJ != undefined ? obj.WXDJ_WGSJ : "",
      WXDJ_WXJYE: obj.WXDJ_WXJYE != undefined ? obj.WXDJ_WXJYE : "",
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.20.	维修登记删除
export function deleteCeregister(obj) {
  return request({
    url: "/maintenanCeregister/deleteCeregister.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.22.	判断是否可以设置所属
export function checkOriginalEvents(obj) {
  return request({
    url: "/maintenanCeregister/checkOriginalEvents.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
    },
  });
}

//2.24.	维修项目所属设置
export function projectOwnership(obj) {
  return request({
    url: "/maintenanCeregister/projectOwnership.do",
    method: "post",
    data: {
      SSXM_ZJ: obj.SSXM_ZJ,
      sst: obj.TB_ZJ,
      ssh: obj.HZ_ZJ,
    },
  });
}

//2.22.	维修登记所属设置
export function registeredOwnership(obj) {
  return request({
    url: "/maintenanCeregister/registeredOwnership.do",
    method: "post",
    data: {
      WXDJ_ZJ: obj.WXDJ_ZJ,
      sst: obj.TB_ZJ,
      ssh: obj.HZ_ZJ,
    },
  });
}

//2.18.	维修登记编号获取
export function maintenanceRegisterNumberGeneration(obj) {
  return request({
    url: "/numberGeneration/maintenanceRegisterNumberGeneration.do",
    method: "post",
    data: {},
  });
}
