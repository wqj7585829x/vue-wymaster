// 客户档案

import request from "@/utils/Request";

// 3.1.1.1.	客户档案导航树查询
export function getTree() {
  return request({
    url: "/customerProfile/queryCustomerProfileTree.do",
    method: "post",
    data: {},
  });
}

// 3.2.1.1.	查询客户档案
export function getCustomerProfile(obj) {
  return request({
    url: "/customerProfile/getCustomerProfile.do",
    method: "post",
    data: {
      FKGX_ZT: obj.FKGX_ZT != undefined ? obj.FKGX_ZT : "",
      FKGX_LX: obj.FKGX_LX != undefined ? obj.FKGX_LX : "",
      FJDA_DLWJ: obj.FJDA_DLWJ != undefined ? obj.FJDA_DLWJ : "",
      FKGX_FJWJ: obj.FKGX_FJWJ != undefined ? obj.FKGX_FJWJ : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
      FJDA_FJMC: obj.FJDA_FJMC != undefined ? obj.FJDA_FJMC : "",
      KHDA_KHMC: obj.KHDA_KHMC != undefined ? obj.KHDA_KHMC : "",
      KHDA_KHID: obj.KHDA_KHID != undefined ? obj.KHDA_KHID : "",
      KHDA_SJ: obj.KHDA_SJ != undefined ? obj.KHDA_SJ : "",
      GLQDA_ZJ: obj.GLQDA_ZJ != undefined ? obj.GLQDA_ZJ : "",
    },
  });
}

// 3.2.1.2.	修改客户档案
export function updateCustomerProfile(obj) {
  return request({
    url: "/customerProfile/updateCustomerProfile.do",
    method: "post",
    data: {
      KHDA_ZJ: obj.KHDA_ZJ != undefined ? obj.KHDA_ZJ : "",
      KHDA_KHID: obj.KHDA_KHID != undefined ? obj.KHDA_KHID : "",
      KHDA_KHMC: obj.KHDA_KHMC != undefined ? obj.KHDA_KHMC : "",
      KHDA_KHFL: obj.KHDA_KHFL != undefined ? obj.KHDA_KHFL : "",
      KHDA_KHLX: obj.KHDA_KHLX != undefined ? obj.KHDA_KHLX : "",
      KHDA_LXR: obj.KHDA_LXR != undefined ? obj.KHDA_LXR : "",
      KHDA_LXDH: obj.KHDA_LXDH != undefined ? obj.KHDA_LXDH : "",
      KHDA_SJ: obj.KHDA_SJ != undefined ? obj.KHDA_SJ : "",
      KHDA_JTDH: obj.KHDA_JTDH != undefined ? obj.KHDA_JTDH : "",
      KHDA_CYMC: obj.KHDA_CYMC != undefined ? obj.KHDA_CYMC : "",
      KHDA_BZ: obj.KHDA_BZ != undefined ? obj.KHDA_BZ : "",
      KHDA_ZJMC: obj.KHDA_ZJMC != undefined ? obj.KHDA_ZJMC : "",
      KHDA_ZJHM: obj.KHDA_ZJHM != undefined ? obj.KHDA_ZJHM : "",
      KHDA_TQTXTS: obj.KHDA_TQTXTS != undefined ? obj.KHDA_TQTXTS : "",
      KHDA_RKS: obj.KHDA_RKS != undefined ? obj.KHDA_RKS : "",
      KHDA_DZYX: obj.KHDA_DZYX != undefined ? obj.KHDA_DZYX : "",
      KHDA_DWMC: obj.KHDA_DWMC != undefined ? obj.KHDA_DWMC : "",
      KHDA_SDBZ: obj.KHDA_SDBZ != undefined ? obj.KHDA_SDBZ : "",
      KHDA_NSRMC: obj.KHDA_NSRMC != undefined ? obj.KHDA_NSRMC : "",
      KHDA_NSRSBH: obj.KHDA_NSRSBH != undefined ? obj.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: obj.KHDA_NSRDZDH != undefined ? obj.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: obj.KHDA_KHHJZH != undefined ? obj.KHDA_KHHJZH : "",
      KHDA_ZZSFPFL: obj.KHDA_ZZSFPFL != undefined ? obj.KHDA_ZZSFPFL : "",
      FKGX_SFKZ: obj.FKGX_SFKZ ? 1 : 0,
      FKGX_SFSFDX: obj.FKGX_SFSFDX ? 1 : 0,
      FKGX_ZJ: obj.FKGX_ZJ != undefined ? obj.FKGX_ZJ : "",
      FJDA_ZJ: obj.FJDA_ZJ != undefined ? obj.FJDA_ZJ : "",

      FKGX_KSSFRQ: obj.FKGX_KSSFRQ != undefined ? obj.FKGX_KSSFRQ : "",
      FKGX_ZZSFRQ: obj.FKGX_ZZSFRQ != undefined ? obj.FKGX_ZZSFRQ : "",
      FKGX_FPDX: obj.FKGX_FPDX != undefined ? obj.FKGX_FPDX : "",
      FKGX_RZRQ: obj.FKGX_RZRQ != undefined ? obj.FKGX_RZRQ : "",
      FKGX_HTDQRQ: obj.FKGX_HTDQRQ != undefined ? obj.FKGX_HTDQRQ : "",
      FKGX_LX: obj.FKGX_LX != undefined ? obj.FKGX_LX : "",
    },
  });
}
// 3.2.1.3.	增加客户档案
export function addCustomerProfile(obj) {
  return request({
    url: "/customerProfile/addCustomerProfile.do",
    method: "post",
    data: {
      KHDA_KHID: obj.KHDA_KHID != undefined ? obj.KHDA_KHID : "",
      KHDA_KHMC: obj.KHDA_KHMC != undefined ? obj.KHDA_KHMC : "",
      KHDA_KHFL: obj.KHDA_KHFL != undefined ? obj.KHDA_KHFL : "",
      KHDA_KHLX: obj.KHDA_KHLX != undefined ? obj.KHDA_KHLX : "",
      KHDA_LXR: obj.KHDA_LXR != undefined ? obj.KHDA_LXR : "",
      KHDA_LXDH: obj.KHDA_LXDH != undefined ? obj.KHDA_LXDH : "",
      KHDA_SJ: obj.KHDA_SJ != undefined ? obj.KHDA_SJ : "",
      KHDA_JTDH: obj.KHDA_JTDH != undefined ? obj.KHDA_JTDH : "",
      KHDA_CYMC: obj.KHDA_CYMC != undefined ? obj.KHDA_CYMC : "",
      KHDA_BZ: obj.KHDA_BZ != undefined ? obj.KHDA_BZ : "",
      KHDA_ZJMC: obj.KHDA_ZJMC != undefined ? obj.KHDA_ZJMC : "",
      KHDA_ZJHM: obj.KHDA_ZJHM != undefined ? obj.KHDA_ZJHM : "",
      KHDA_TQTXTS: obj.KHDA_TQTXTS != undefined ? obj.KHDA_TQTXTS : "",
      KHDA_RKS: obj.KHDA_RKS != undefined ? obj.KHDA_RKS : "",
      KHDA_DZYX: obj.KHDA_DZYX != undefined ? obj.KHDA_DZYX : "",
      KHDA_DWMC: obj.KHDA_DWMC != undefined ? obj.KHDA_DWMC : "",
      KHDA_SDBZ: obj.KHDA_SDBZ != undefined ? obj.KHDA_SDBZ : "",
      KHDA_NSRMC: obj.KHDA_NSRMC != undefined ? obj.KHDA_NSRMC : "",
      KHDA_NSRSBH: obj.KHDA_NSRSBH != undefined ? obj.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: obj.KHDA_NSRDZDH != undefined ? obj.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: obj.KHDA_KHHJZH != undefined ? obj.KHDA_KHHJZH : "",
      KHDA_ZZSFPFL: obj.KHDA_ZZSFPFL != undefined ? obj.KHDA_ZZSFPFL : "",
      FKGX_SFKZ: obj.FKGX_SFKZ ? 1 : 0,
      FKGX_SFSFDX: obj.FKGX_SFSFDX ? 1 : 0,
      FJDA_ZJ: obj.FCDM_ZJ != undefined ? obj.FCDM_ZJ : "",
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
      FKGX_LX: obj.FKGX_LX,
      FCDM_ZJ: obj.FCDM_ZJ,

      FKGX_KSSFRQ: obj.FKGX_KSSFRQ != undefined ? obj.FKGX_KSSFRQ : "",
      FKGX_ZZSFRQ: obj.FKGX_ZZSFRQ != undefined ? obj.FKGX_ZZSFRQ : "",
      FKGX_FPDX: obj.FKGX_FPDX != undefined ? obj.FKGX_FPDX : "",
      FKGX_RZRQ: obj.FKGX_RZRQ != undefined ? obj.FKGX_RZRQ : "",
      FKGX_HTDQRQ: obj.FKGX_HTDQRQ != undefined ? obj.FKGX_HTDQRQ : "",
      FKGX_LX: obj.FKGX_LX != undefined ? obj.FKGX_LX : "",
    },
  });
}

// 3.2.1.5.	查询收费对象
export function getChargeObject(data) {
  return request({
    url: "/customerProfile/getChargeObject.do",
    method: "post",
    data: {
      FJDA_DLWJ: data.FJDA_DLWJ != undefined ? data.FJDA_DLWJ : "",
      FKGX_FJWJ: data.FKGX_FJWJ != undefined ? data.FKGX_FJWJ : "",
    },
  });
}

// 3.2.1.5.	查询客户名称是否存在
export function customerNameIsExist(obj) {
  return request({
    url: "/customerProfile/customerNameIsExist.do",
    method: "post",
    data: {
      KHDA_KHMC: obj.KHDA_KHMC,
      KHDA_ZJ: obj.KHDA_ZJ,
    },
  });
}

// 3.2.1.6.	查询收费对象
export function updateChargeObject(obj) {
  return request({
    url: "/customerProfile/updateChargeObject.do",
    method: "post",
    data: {
      FKGX_SFSFDX: obj.FKGX_SFSFDX,
      FKGX_KSSFRQ: obj.FKGX_KSSFRQ,
      FKGX_ZZSFRQ: obj.FKGX_ZZSFRQ,
      FKGX_FPDX: obj.FKGX_FPDX,
      FKGX_RZRQ: obj.FKGX_RZRQ,
      FKGX_ZJ: obj.FKGX_ZJ,
      FKGX_HTDQRQ: obj.FKGX_HTDQRQ,
    },
  });
}

// 3.3.1.1.	查询现有客户
export function queryExistingCustomer(obj) {
  return request({
    url: "/customer/queryExistingCustomer.do",
    method: "post",
    data: {
      GLCID: obj.GLCID != undefined ? obj.GLCID : "",
      YXDID: obj.YXDID != undefined ? obj.YXDID : "",
      KHDA_ZT: "1",
      FKGX_FJWJ: obj.FKGX_FJWJ != undefined ? obj.FKGX_FJWJ : "",
      FKGX_ZT: "1",
      KHDA_KHMC: obj.KHDA_KHMC != undefined ? obj.KHDA_KHMC : "",
      FCDM_LXID: obj.FCDM_LXID != undefined ? obj.FCDM_LXID : "",
      pageIndex: obj.pageIndex,
      pageSize: obj.pageSize,
    },
  });
}

// 3.3.1.3.	链接现有客户
export function linkExistingCustomer(obj) {
  return request({
    url: "/customer/linkExistingCustomer.do",
    method: "post",
    data: {
      FKGX_LX: obj.FKGX_LX != undefined ? obj.FKGX_LX : "",
      FKGX_ZT: obj.FKGX_ZT != undefined ? obj.FKGX_ZT : "",
      FKGX_SFSFDX: obj.FKGX_SFSFDX != undefined ? obj.FKGX_SFSFDX : "",
      FKGX_FJWJ: obj.FKGX_FJWJ != undefined ? obj.FKGX_FJWJ : "",
      FKGX_KHWJ: obj.FKGX_KHWJ != undefined ? obj.FKGX_KHWJ : "",
      GLCID: obj.GLCID,
      YXDID: obj.YXDID,
    },
  });
}

// 3.3.1.4.	客户是否欠费
export function isOweForCustomer(obj) {
  return request({
    url: "/customer/isOweForCustomer.do",
    method: "post",
    data: {
      FYSQ_FKGXWJ: obj.FYSQ_FKGXWJ != undefined ? obj.FYSQ_FKGXWJ : "",
      FYSQ_CGBZ: "0",
    },
  });
}

// 3.3.1.5.	客户退伙退租
export function customerRetreatLease(obj) {
  return request({
    url: "/customer/customerRetreatLease.do",
    method: "post",
    data: {
      FKGX_TZRQ: obj.FKGX_TZRQ != undefined ? obj.FKGX_TZRQ : "",
      FKGX_ZJ: obj.FKGX_ZJ != undefined ? obj.FKGX_ZJ : "",
      YXDID: obj.YXDID != undefined ? obj.YXDID : "",
      GLCID: obj.GLCID != undefined ? obj.GLCID : "",
      KHSJ_FJWJ: obj.KHSJ_FJWJ != undefined ? obj.KHSJ_FJWJ : "",
      KHSJ_SJLX: "退伙",
      KHSJ_SJSJ: obj.KHSJ_SJSJ != undefined ? obj.KHSJ_SJSJ : "",
      KHSJ_SJXQ: obj.KHSJ_SJXQ != undefined ? obj.KHSJ_SJXQ : "",
      KHSJ_CLJG: "",
      KHSJ_SFXT: 1,
      KHDA_SFKHWJ: obj.KHDA_SFKHWJ != undefined ? obj.KHDA_SFKHWJ : "",
      KHDA_ZJ: obj.KHDA_ZJ != undefined ? obj.KHDA_ZJ : "",
    },
  });
}

// 3.4.1.1.	是否存在继承参数
export function isExistInheritParameter(obj) {
  return request({
    url: "/inheritParameter/isExistInheritParameter.do",
    method: "post",
    data: {
      GLCID: obj.GLCID,
      YXDID: obj.GLCID,
      FKGX_FJWJ: obj.FKGX_FJWJ,
      FKGX_ZJ: obj.FKGX_ZJ,
    },
  });
}

// 3.4.1.2.	查询继承业主
export function queryInheritOwner(obj) {
  return request({
    url: "/inheritParameter/queryInheritOwner.do",
    method: "post",
    data: {
      FKGX_FJWJ: obj.FKGX_FJWJ,
      FKGX_ZJ: obj.FKGX_ZJ,
    },
  });
}

// 3.4.1.3.	查询继承收费和分摊关系
export function queryInheritChargeAndSharing(obj) {
  return request({
    url: "/inheritParameter/queryInheritChargeAndSharing.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
    },
  });
}

// 3.4.1.4.	继承收费项目
export function inheritChargeItem(obj) {
  return request({
    url: "/inheritParameter/inheritChargeItem.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
      NEW_FKGX_ZJ: obj.NEW_FKGX_ZJ,
      SFXMWJ: obj.SFXMWJ,
      NewKHMC: obj.NewKHMC,
    },
  });
}

// 3.4.1.5.	查询历史欠费完全继承记录
export function queryHistoricalOweFullyInherit(obj) {
  return request({
    url: "/inheritParameter/queryHistoricalOweFullyInherit.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
      FYSQ_SFXMMC: obj.FYSQ_SFXMMC,
      FYSQ_XSNY: obj.FYSQ_XSNY,
    },
  });
}

// 3.4.1.6.	旧业主的所有欠费继承给新业主
export function inheritAllOwe(obj) {
  return request({
    url: "/inheritParameter/inheritAllOwe.do",
    method: "post",
    data: {
      data: JSON.stringify(obj),
    },
  });
}

// 3.4.1.10.	查询一次性费用完全继承
export function queryOneTimeCostFullyInherit(obj) {
  return request({
    url: "/inheritParameter/queryOneTimeCostFullyInherit.do",
    method: "post",
    data: {
      FKGX_ZJ: obj.FKGX_ZJ,
    },
  });
}

// 3.4.1.11.	旧业主的一次性费用继承给新业主
export function inheritOneTimeCost(obj) {
  return request({
    url: "/inheritParameter/inheritOneTimeCost.do",
    method: "post",
    data: {
      data: JSON.stringify(obj),
    },
  });
}

// 3.2.1.9.	家庭成员查询
export function queryFamilyMembers(obj) {
  return request({
    url: "/customerProfile/queryFamilyMembers.do",
    method: "post",
    data: {
      JTCY_KHWJ: obj.JTCY_KHWJ,
    },
  });
}

// 3.2.1.10.	添加家庭成员
export function addFamilyMembers(obj) {
  return request({
    url: "/customerProfile/addFamilyMembers.do",
    method: "post",
    data: {
      JTCY_XM: obj.JTCY_XM,
      JTCY_YHZGX: obj.JTCY_YHZGX != undefined ? obj.JTCY_YHZGX : "",
      JTCY_ZJMC: obj.JTCY_ZJMC != undefined ? obj.JTCY_ZJMC : "",
      JTCY_ZJHM: obj.JTCY_ZJHM != undefined ? obj.JTCY_ZJHM : "",
      JTCY_XB: obj.JTCY_XB != undefined ? obj.JTCY_XB : "",
      JTCY_GJ: obj.JTCY_GJ != undefined ? obj.JTCY_GJ : "",
      JTCY_JG: obj.JTCY_JG != undefined ? obj.JTCY_JG : "",
      JTCY_HKSZD: obj.JTCY_HKSZD != undefined ? obj.JTCY_HKSZD : "",
      JTCY_WHCD: obj.JTCY_WHCD != undefined ? obj.JTCY_WHCD : "",
      JTCY_GZDW: obj.JTCY_GZDW != undefined ? obj.JTCY_GZDW : "",
      JTCY_ZY: obj.JTCY_ZY != undefined ? obj.JTCY_ZY : "",
      JTCY_KHWJ: obj.JTCY_KHWJ,
      JTCY_BZ: obj.JTCY_BZ != undefined ? obj.JTCY_BZ : "",
      JTCY_TQTXTS: obj.JTCY_TQTXTS,
      JTCY_YDDH: obj.JTCY_YDDH != undefined ? obj.JTCY_YDDH : "",
      JTCY_XQAH: obj.JTCY_XQAH != undefined ? obj.JTCY_XQAH : "",
      JTCY_CSNY: obj.JTCY_CSNY != undefined ? obj.JTCY_CSNY : "",
      JTCY_DZYX: obj.JTCY_DZYX != undefined ? obj.JTCY_DZYX : "",
    },
  });
}

// 3.2.1.11.	修改家庭成员
export function updateFamilyMembers(obj) {
  return request({
    url: "/customerProfile/updateFamilyMembers.do",
    method: "post",
    data: {
      JTCY_XM: obj.JTCY_XM,
      JTCY_YHZGX: obj.JTCY_YHZGX != undefined ? obj.JTCY_YHZGX : "",
      JTCY_ZJMC: obj.JTCY_ZJMC != undefined ? obj.JTCY_ZJMC : "",
      JTCY_ZJHM: obj.JTCY_ZJHM != undefined ? obj.JTCY_ZJHM : "",
      JTCY_XB: obj.JTCY_XB != undefined ? obj.JTCY_XB : "",
      JTCY_GJ: obj.JTCY_GJ != undefined ? obj.JTCY_GJ : "",
      JTCY_JG: obj.JTCY_JG != undefined ? obj.JTCY_JG : "",
      JTCY_HKSZD: obj.JTCY_HKSZD != undefined ? obj.JTCY_HKSZD : "",
      JTCY_WHCD: obj.JTCY_WHCD != undefined ? obj.JTCY_WHCD : "",
      JTCY_GZDW: obj.JTCY_GZDW != undefined ? obj.JTCY_GZDW : "",
      JTCY_ZY: obj.JTCY_ZY != undefined ? obj.JTCY_ZY : "",
      JTCY_ZJ: obj.JTCY_ZJ,
      JTCY_BZ: obj.JTCY_BZ != undefined ? obj.JTCY_BZ : "",
      JTCY_TQTXTS: obj.JTCY_TQTXTS,
      JTCY_YDDH: obj.JTCY_YDDH != undefined ? obj.JTCY_YDDH : "",
      JTCY_XQAH: obj.JTCY_XQAH != undefined ? obj.JTCY_XQAH : "",
      JTCY_CSNY: obj.JTCY_CSNY != undefined ? obj.JTCY_CSNY : "",
      JTCY_DZYX: obj.JTCY_DZYX != undefined ? obj.JTCY_DZYX : "",
    },
  });
}

// 3.2.1.12.	删除家庭成员
export function deleteFamilyMembers(obj) {
  return request({
    url: "/customerProfile/deleteFamilyMembers.do",
    method: "post",
    data: {
      JTCY_ZJ: obj.JTCY_ZJ,
    },
  });
}

//我的票据
export function queryInvoiceInformation(obj) {
  return request({
    url: "/xp/myInvoiceInformation/queryInvoiceInformation.do",
    method: "post",
    data: obj,
  });
}

export function insertInvoiceInformation(obj) {
  return request({
    url: "/xp/myInvoiceInformation/insertInvoiceInformation.do",
    method: "post",
    data: obj,
  });
}

export function updateInvoiceInformation(obj) {
  return request({
    url: "/xp/myInvoiceInformation/updateInvoiceInformation.do",
    method: "post",
    data: obj,
  });
}

export function deleteInvoiceInformation(obj) {
  return request({
    url: "/xp/myInvoiceInformation/deleteInvoiceInformation.do",
    method: "post",
    data: obj,
  });
}

export function uploadFile(obj) {
  return request({
    url: "/xp/myInvoiceInformation/uploadFile.do",
    method: "post",
    data: obj,
    upload_type: true,
  });
}

export function resetPassword(obj) {
  return request({
    url: "/customerProfile/resetPassword.do",
    method: "post",
    data: obj,
  });
}

export function importExcelTemplateData(obj) {
  return request({
    url: "/customerProfile/importExcelTemplateData.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

export function exportExcelData(data) {
  return request({
    url: "/customerProfile/exportExcelData.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryInheritCustomer(obj) {
  return request({
    url: "/customer/queryInheritCustomer.do",
    method: "post",
    data: obj,
  });
}

export function queryChargeAndSharing(obj) {
  return request({
    url: "/customer/queryChargeAndSharing.do",
    method: "post",
    data: obj,
  });
}

export function queryUncollectedChargesNoSplit(obj) {
  return request({
    url: "/customer/queryUncollectedChargesNoSplit.do",
    method: "post",
    data: obj,
  });
}

export function queryUncollectedChargesSplit(obj) {
  return request({
    url: "/customer/queryUncollectedChargesSplit.do",
    method: "post",
    data: obj,
  });
}

export function queryOneTimeCost(obj) {
  return request({
    url: "/customer/queryOneTimeCost.do",
    method: "post",
    data: obj,
  });
}

export function inherit(obj) {
  return request({
    url: "/customer/inherit.do",
    method: "post",
    data: obj,
  });
}

export function queryInheritCustomerInfo(obj) {
  return request({
    url: "/customer/queryInheritCustomerInfo.do",
    method: "post",
    data: obj,
  });
}

export function queryOrgTreeByPurview(obj) {
  return request({
    url: "/homePage/queryOrgTreeByPurview.do",
    method: "post",
    data: obj,
  });
}

export function isGetInvoiceData(obj) {
  return request({
    url: "/util/isGetInvoiceData.do",
    method: "post",
    data: obj,
  });
}

export function statusToCurrent(obj) {
  return request({
    url: "/customer/statusToCurrent.do",
    method: "post",
    data: obj,
  });
}
