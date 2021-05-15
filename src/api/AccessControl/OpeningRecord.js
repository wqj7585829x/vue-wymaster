import request from "@/utils/Request";

export function queryOpenDeerRecord(data) {
  return request({
    url: "/openDoorController/queryOpenDeerRecord.do",
    method: "post",
    data: data,
  });
}

export function queryBuildingMessage(data) {
  return request({
    url: "/util/queryBuildingMessage.do",
    method: "post",
    data: data,
  });
}
