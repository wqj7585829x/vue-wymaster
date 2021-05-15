import request from "@/utils/Request";

export function queryTotalTableDropDownBox(obj) {
  return request({
    url: "/newSharedExpenses/queryTotalTableDropDownBox.do",
    method: "post",
    data: obj,
  });
}

export function queryPendingResource(obj) {
  return request({
    url: "/newSharedExpenses/queryPendingResource.do",
    method: "post",
    data: obj,
  });
}

export function queryChildrenTable(obj) {
  return request({
    url: "/newSharedExpenses/queryChildrenTable.do",
    method: "post",
    data: obj,
  });
}

export function binding(obj) {
  return request({
    url: "/newSharedExpenses/binding.do",
    method: "post",
    data: obj,
  });
}

export function unBinding(obj) {
  return request({
    url: "/newSharedExpenses/unBinding.do",
    method: "post",
    data: obj,
  });
}
