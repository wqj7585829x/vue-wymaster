import request from "@/utils/Request";

export function queryTotalTableLevel(obj) {
  return request({
    url: "/newSharedExpenses/queryTotalTableLevel.do",
    method: "post",
    data: obj,
  });
}

export function queryTotalTable(obj) {
  return request({
    url: "/newSharedExpenses/queryTotalTable.do",
    method: "post",
    data: obj,
  });
}

export function addTotalTable(obj) {
  return request({
    url: "/newSharedExpenses/addTotalTable.do",
    method: "post",
    data: obj,
  });
}

export function updTotalTable(obj) {
  return request({
    url: "/newSharedExpenses/updTotalTable.do",
    method: "post",
    data: obj,
  });
}

export function delTotalTable(obj) {
  return request({
    url: "/newSharedExpenses/delTotalTable.do",
    method: "post",
    data: obj,
  });
}
