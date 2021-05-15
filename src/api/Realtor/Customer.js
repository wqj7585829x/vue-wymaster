import request from "@/utils/Request";

export function queryCustomerProfile(data) {
  return request({
    url: "/zl/customerManagement/queryCustomerProfile.do",
    method: "post",
    data: data,
  });
}

export function updateCustomerProfile(data) {
  return request({
    url: "/zl/customerManagement/updateCustomerProfile.do",
    method: "post",
    data: {
      KHDA_ZJ: data.KHDA_ZJ ? data.KHDA_ZJ : "",
      KHDA_KHID: data.KHDA_KHID ? data.KHDA_KHID : "",
      KHDA_KHMC: data.KHDA_KHMC ? data.KHDA_KHMC : "",
      KHDA_KHFL: data.KHDA_KHFL ? data.KHDA_KHFL : "",
      KHDA_KHLX: data.KHDA_KHLX ? data.KHDA_KHLX : "",
      KHDA_LXR: data.KHDA_LXR ? data.KHDA_LXR : "",
      KHDA_LXDH: data.KHDA_LXDH ? data.KHDA_LXDH : "",
      KHDA_SJ: data.KHDA_SJ ? data.KHDA_SJ : "",
      KHDA_JTDH: data.KHDA_JTDH ? data.KHDA_JTDH : "",
      KHDA_CYMC: data.KHDA_CYMC ? data.KHDA_CYMC : "",
      KHDA_BZ: data.KHDA_BZ ? data.KHDA_BZ : "",
      KHDA_ZJMC: data.KHDA_ZJMC ? data.KHDA_ZJMC : "",
      KHDA_ZJHM: data.KHDA_ZJHM ? data.KHDA_ZJHM : "",
      KHDA_TQTXTS: data.KHDA_TQTXTS ? data.KHDA_TQTXTS : "",
      KHDA_RKS: data.KHDA_RKS ? data.KHDA_RKS : "",
      KHDA_DZYX: data.KHDA_DZYX ? data.KHDA_DZYX : "",
      KHDA_DWMC: data.KHDA_DWMC ? data.KHDA_DWMC : "",
      KHDA_SDBZ: data.KHDA_SDBZ ? data.KHDA_SDBZ : "",
      KHDA_NSRMC: data.KHDA_NSRMC ? data.KHDA_NSRMC : "",
      KHDA_NSRSBH: data.KHDA_NSRSBH ? data.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: data.KHDA_NSRDZDH ? data.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: data.KHDA_KHHJZH ? data.KHDA_KHHJZH : "",
      KHDA_ZZSFPFL: data.KHDA_ZZSFPFL ? data.KHDA_ZZSFPFL : "",
      plotDbName: data.plotDbName ? data.plotDbName : "",
      GLCID: data.GLCID ? data.GLCID : "",
      YXDID: data.YXDID ? data.YXDID : "",
    },
  });
}

export function addCustomerProfile(data) {
  return request({
    url: "/zl/customerManagement/addCustomerProfile.do",
    method: "post",
    data: {
      KHDA_KHID: data.KHDA_KHID ? data.KHDA_KHID : "",
      KHDA_KHMC: data.KHDA_KHMC ? data.KHDA_KHMC : "",
      KHDA_KHFL: data.KHDA_KHFL ? data.KHDA_KHFL : "",
      KHDA_KHLX: data.KHDA_KHLX ? data.KHDA_KHLX : "",
      KHDA_LXR: data.KHDA_LXR ? data.KHDA_LXR : "",
      KHDA_LXDH: data.KHDA_LXDH ? data.KHDA_LXDH : "",
      KHDA_SJ: data.KHDA_SJ ? data.KHDA_SJ : "",
      KHDA_JTDH: data.KHDA_JTDH ? data.KHDA_JTDH : "",
      KHDA_CYMC: data.KHDA_CYMC ? data.KHDA_CYMC : "",
      KHDA_BZ: data.KHDA_BZ ? data.KHDA_BZ : "",
      KHDA_ZJMC: data.KHDA_ZJMC ? data.KHDA_ZJMC : "",
      KHDA_ZJHM: data.KHDA_ZJHM ? data.KHDA_ZJHM : "",
      KHDA_TQTXTS: data.KHDA_TQTXTS ? data.KHDA_TQTXTS : "",
      KHDA_RKS: data.KHDA_RKS ? data.KHDA_RKS : "",
      KHDA_DZYX: data.KHDA_DZYX ? data.KHDA_DZYX : "",
      KHDA_DWMC: data.KHDA_DWMC ? data.KHDA_DWMC : "",
      KHDA_SDBZ: data.KHDA_SDBZ ? data.KHDA_SDBZ : "",
      KHDA_NSRMC: data.KHDA_NSRMC ? data.KHDA_NSRMC : "",
      KHDA_NSRSBH: data.KHDA_NSRSBH ? data.KHDA_NSRSBH : "",
      KHDA_NSRDZDH: data.KHDA_NSRDZDH ? data.KHDA_NSRDZDH : "",
      KHDA_KHHJZH: data.KHDA_KHHJZH ? data.KHDA_KHHJZH : "",
      KHDA_ZZSFPFL: data.KHDA_ZZSFPFL ? data.KHDA_ZZSFPFL : "",
      plotDbName: data.plotDbName ? data.plotDbName : "",
      GLCID: data.GLCID ? data.GLCID : "",
      YXDID: data.YXDID ? data.YXDID : "",
    },
  });
}

export function deleteCustomerProfile(data) {
  return request({
    url: "/zl/customerManagement/deleteCustomerProfile.do",
    method: "post",
    data: data,
  });
}

export function customerNameIsExist(data) {
  return request({
    url: "/zl/customerManagement/customerNameIsExist.do",
    method: "post",
    data: {
      KHDA_KHMC: data.KHDA_KHMC,
    },
  });
}

export function queryPlotsWithAuthority(data) {
  return request({
    url: "/zl/customerManagement/queryPlotsWithAuthority.do",
    method: "post",
    data: {},
  });
}

export function queryHouseResource(data) {
  return request({
    url: "/zl/houseResource/queryHouseResource.do",
    method: "post",
    data: data,
  });
}

export function queryRoomAvailabilityFigure(data) {
  return request({
    url: "/ZL/roomAvailabilityFigure/queryRoomAvailabilityFigure.do",
    method: "post",
    data: data,
  });
}

export function queryZLPlot(data) {
  return request({
    url: "/util/queryZLPlot.do",
    method: "post",
    data: data,
  });
}

export function queryZLBuildingMessage(data) {
  return request({
    url: "/util/queryZLBuildingMessage.do",
    method: "post",
    data: data,
  });
}

export function queryZLRoom(data) {
  return request({
    url: "/util/queryZLRoom.do",
    method: "post",
    data: data,
  });
}

export function queryContractMessage(data) {
  return request({
    url: "ZL/roomAvailabilityFigure/queryContractMessage.do",
    method: "post",
    data: data,
  });
}
