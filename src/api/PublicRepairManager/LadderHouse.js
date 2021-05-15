//梯户
import request from "@/utils/Request";

//2.7.1.1.	梯户关系树形查询
export function queryLadderTree() {
  return request({
    url: "/ladderRelationship/queryLadderTree.do",
    method: "post",
    data: {},
  });
}

//2.7.1.2.	大楼下的梯列表查询
export function queryLadder(obj) {
  return request({
    url: "/ladderRelationship/queryLadder.do",
    method: "post",
    data: {
      TB_DLWJ: obj.TB_DLWJ,
      TB_ZJ: obj.TB_ZJ,
    },
  });
}

//2.7.1.3.	梯对应户列表查询
export function queryPerson(obj) {
  return request({
    url: "/ladderRelationship/queryPerson.do",
    method: "post",
    data: {
      TFGX_TWJ: obj.TFGX_TWJ,
    },
  });
}

//2.7.1.4.	梯户关系设定时的树形查询（不包含梯）
export function queryLadderTreeWithoutLadder() {
  return request({
    url: "/ladderRelationship/queryLadderTreeWithoutLadder.do",
    method: "post",
    data: {},
  });
}

//2.7.1.5.	梯下拉框列表查询
export function queryLadderDropDownBox(obj) {
  return request({
    url: "/ladderRelationship/queryLadderDropDownBox.do",
    method: "post",
    data: {
      TB_GLQWJ: obj.TB_GLQWJ != undefined ? obj.TB_GLQWJ : "",
      TB_DLWJ: obj.TB_DLWJ != undefined ? obj.TB_DLWJ : "",
      TB_ZJ: obj.TB_ZJ != undefined ? obj.TB_ZJ : "",
    },
  });
}

//2.7.1.6.	梯户关系待选区列表查询
export function queryPendingResource(obj) {
  return request({
    url: "/ladderRelationship/queryPendingResource.do",
    method: "post",
    data: {
      HZ_GLQWJ: obj.HZ_GLQWJ,
      HZ_DLWJ: obj.HZ_DLWJ,
      TFGX_TWJ: obj.TFGX_TWJ,
    },
  });
}

//2.7.1.7.	梯户关系已选区列表查询
export function querySelectedResource(obj) {
  return request({
    url: "/ladderRelationship/querySelectedResource.do",
    method: "post",
    data: {
      TFGX_TWJ: obj.TFGX_TWJ,
    },
  });
}

//2.7.1.8.	梯户关系点击确定
export function ladderRelationshipBinding(obj) {
  return request({
    url: "/ladderRelationship/ladderRelationshipBinding.do",
    method: "post",
    data: {
      flag: obj.flag,
      list: JSON.stringify(obj.list),
    },
  });
}

//2.7.1.9.	新增梯（手动登记）
export function addLadder(obj) {
  return request({
    url: "/ladderRelationship/addLadder.do",
    method: "post",
    data: {
      TB_GLQWJ: obj.TB_GLQWJ != undefined ? obj.TB_GLQWJ : "",
      TB_TBH: obj.TB_TBH,
      TB_TMC: obj.TB_TMC != undefined ? obj.TB_TMC : "",
      TB_TWZ: obj.TB_TWZ != undefined ? obj.TB_TWZ : "",
      TB_BZ: obj.TB_BZ,
      FCDM_ZJ: obj.FCDM_ZJ,
      FCDM_ID: obj.FCDM_ID,
      FCDM_GLQID: obj.FCDM_GLQID,
      FCDM_GLQZJ: obj.FCDM_GLQZJ,
      FCDM_FGLX: obj.FCDM_FGLX,
    },
  });
}

//2.7.1.10.	新增梯自动生成
export function addLadderAutomatic(obj) {
  return request({
    url: "/ladderRelationship/addLadderAutomatic.do",
    method: "post",
    data: {
      QZDM: obj.QZDM,
      DYH_SELECTED: obj.DYH_SELECTED,
      DYWS: obj.DYWS,
      DYH_LOW: obj.DYH_LOW,
      DYH_HIGH: obj.DYH_HIGH,
      BMWS: obj.BMWS,
      TBM_LOW: obj.TBM_LOW,
      TBM_HIGH: obj.TBM_HIGH,
      FCDM_ZJ: obj.FCDM_ZJ,
      FCDM_ID: obj.FCDM_ID,
      FCDM_GLQID: obj.FCDM_GLQID,
      FCDM_GLQZJ: obj.FCDM_GLQZJ,
      FCDM_FGLX: obj.FCDM_FGLX,
    },
  });
}

//2.7.1.11.	梯修改
export function updateLadder(obj) {
  return request({
    url: "/ladderRelationship/updateLadder.do",
    method: "post",
    data: {
      TB_TBH: obj.TB_TBH,
      TB_TMC: obj.TB_TMC != undefined ? obj.TB_TMC : "",
      TB_TWZ: obj.TB_TWZ,
      TB_BZ: obj.TB_BZ,
      TB_ZJ: obj.TB_ZJ != undefined ? obj.TB_ZJ : "",
    },
  });
}

//2.7.1.12.	梯删除
export function deleteLadder(obj) {
  return request({
    url: "/ladderRelationship/deleteLadder.do",
    method: "post",
    data: {
      TB_ZJ: obj.TB_ZJ,
    },
  });
}
