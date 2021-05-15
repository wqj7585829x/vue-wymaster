import request from "@/utils/Request";

export function queryFileTypeList() {
  return request({
    url: "/util/xj/queryFileTypeList.do",
    method: "post",
    data: {},
  });
}

export function queryElectronicProFile(data) {
  return request({
    url: "/electronicProFile/queryElectronicProFile.do",
    method: "post",
    data: data,
  });
}

export function deleteElectronicProFile(data) {
  return request({
    url: "/electronicProFile/deleteElectronicProFile.do",
    method: "post",
    data: data,
  });
}

export function addElectronicProFile(data) {
  return request({
    url: "/electronicProFile/addElectronicProFile.do",
    method: "post",
    data: data,
  });
}

export function updateElectronicProFile(data) {
  return request({
    url: "/electronicProFile/updateElectronicProFile.do",
    method: "post",
    data: data,
  });
}
