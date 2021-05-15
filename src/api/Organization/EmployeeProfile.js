//员工档案
import request from "@/utils/Request";
import md5 from "js-md5"; // md5加密

//入职
export function AddEntry(obj) {
  return request({
    url: "/organ/organ_InsertUser.doAdmin",
    method: "post",
    data: {
      account: obj.account,
      password: obj.password != null ? md5(obj.password).toUpperCase() : null,
      empName: obj.empName,
      sex: obj.sex,
      birthday: obj.birthday,
      birthplace: obj.birthplace,
      mailbox: obj.mailbox,
      IDNumber: obj.IDNumber,
      contactWay: obj.contactWay,
      status: obj.status,
      remark: obj.remark,
      belongClique: obj.belongClique,
      belongComp: obj.belongComp,
      belongPlot: obj.belongPlot,
      belongDep: obj.belongDep,
      empJob: obj.empJob,
      empPost: obj.empPost,
      entryDate: obj.entryDate,
      agencyType: obj.agencyType,
    },
  });
}

//修改
export function UpdateEntry(obj) {
  return request({
    url: "/organ/organ_ModifyUser.doAdmin",
    method: "post",
    data: {
      uid: obj.uid,
      account: obj.account,
      password: obj.password != null ? md5(obj.password).toUpperCase() : null,
      empName: obj.empName,
      sex: obj.sex,
      birthday: obj.birthday,
      birthplace: obj.birthplace,
      mailbox: obj.mailbox,
      IDNumber: obj.IDNumber,
      contactWay: obj.contactWay,
      status: obj.status,
      remark: obj.remark,
      belongClique: obj.belongClique,
      belongComp: obj.belongComp,
      belongPlot: obj.belongPlot,
      belongDep: obj.belongDep,
      empJob: obj.empJob,
      empPost: obj.empPost,
      entryDate: obj.entryDate,
    },
  });
}

//离职
export function Resignation(obj) {
  return request({
    url: "/organ/organ_EmpResignation.doAdmin",
    method: "post",
    data: {
      uid: obj.uid,
      resignationWay: obj.resignationWay,
      resignationDate: obj.resignationDate,
      resignationEexplain: obj.resignationEexplain,
    },
  });
}

//获取树
export function getTree() {
  return request({
    url: "/organ/organ_FindTree.doAdmin",
    method: "post",
    data: {},
  });
}

//获取职位
export function getJob(obj) {
  return request({
    url: "/organ/organ_FindPosition.doAdmin",
    method: "post",
    data: {
      depId: obj.depId,
    },
  });
}

//获取列表数据
export function getEmployee(obj) {
  return request({
    url: "/organ/organ_QueryUserByPage.doAdmin",
    method: "post",
    data: {
      startRownumber: obj.startRownumber,
      pageSize: obj.pageSize,
      orgId: obj.orgId,
      agencyType: obj.agencyType,
      empName: obj.empName,
      account: obj.account,
      contactWay: obj.contactWay,
      status: obj.status,
      job: obj.job,
      resignationWay: obj.resignationWay,
    },
  });
}
