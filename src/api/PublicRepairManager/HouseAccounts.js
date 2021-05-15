//账户
import request from "@/utils/Request";

//8.2.1.1.	楼栋下户帐查询
export function queryHouseholdAccountUnderBuilding(obj) {
  return request({
    url: "/householdAccount/queryHouseholdAccountUnderBuilding.do",
    method: "post",
    data: {
      FCDM_GLQZJ: obj.FCDM_GLQZJ != undefined ? obj.FCDM_GLQZJ : "",
      DLZJ: obj.DLZJ != undefined ? obj.DLZJ : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

//8.2.1.2.	房间下户帐查询
export function queryHouseholdAccount(obj) {
  return request({
    url: "/householdAccount/queryHouseholdAccount.do",
    method: "post",
    data: {
      FJZJ: obj.FJZJ,
      KHDA_ZJ: obj.KHDA_ZJ,
    },
  });
}

//8.2.1.4.	新增单个户帐
export function addHouseholdAccount(obj) {
  var value = [];
  value.push(obj);
  return request({
    url: "/householdAccount/addHouseholdAccount.do",
    method: "post",
    data: {
      data: JSON.stringify(value),
    },
  });
}

//8.2.1.5.	修改单个户帐
export function updateHouseholdAccount(obj) {
  return request({
    url: "/householdAccount/updateHouseholdAccount.do",
    method: "post",
    data: {
      HZ_ZJ: obj.HZ_ZJ,
      HZ_ZH: obj.HZ_ZH,
      HZ_SFMJ: obj.HZ_SFMJ,
      HZ_YE: obj.HZ_YE,
      HZ_KYJE: obj.HZ_KYJE,
      HZ_JZRQ: obj.HZ_JZRQ,
      HZ_KHMC: obj.KHDA_KHMC,
    },
  });
}

//8.2.1.6.	删除单个户帐
export function deleteHouseholdAccount(obj) {
  return request({
    url: "/householdAccount/deleteHouseholdAccount.do",
    method: "post",
    data: {
      HZ_ZJ: obj.HZ_ZJ,
    },
  });
}

//8.2.1.4.	获取新增户帐的参数
export function getAddHouseholdAccountParameter(obj) {
  return request({
    url: "/householdAccount/getAddHouseholdAccountParameter.do",
    method: "post",
    data: {
      KHDA_ZJ: obj.KHDA_ZJ,
      FJDA_FJID: obj.FJDA_FJID,
    },
  });
}

//8.2.1.8.	选中小区、分区、楼栋查询户帐列表
export function queryHouseholdAccountList(obj) {
  return request({
    url: "/householdAccount/queryHouseholdAccountList.do",
    method: "post",
    data: {
      FCDM_GLQZJ: obj.FCDM_GLQZJ,
      DLZJ: obj.DLZJ,
      FJDA_FJID: obj.FJDA_FJID != undefined ? obj.FJDA_FJID : "",
    },
  });
}

//8.2.1.9.	房间下的客户查询
export function queryClientUnderRoom(obj) {
  return request({
    url: "/householdAccount/queryClientUnderRoom.do",
    method: "post",
    data: {
      data: JSON.stringify(obj),
    },
  });
}

//8.2.1.10.	批量建帐
export function addHouseholdAccounts(obj) {
  return request({
    url: "/householdAccount/addHouseholdAccount.do",
    method: "post",
    data: {
      data: JSON.stringify(obj),
    },
  });
}
