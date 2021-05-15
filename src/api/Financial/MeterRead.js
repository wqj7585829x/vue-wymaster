// 抄表录入
import request from "@/utils/Request";

// 获取树
export function getTree(obj) {
  return request({
    url: "/basic/FindCusResourceTree.doAdmin",
    method: "post",
    data: {},
  });
}

// 收费项目查询条件
export function ChargingProjects(obj) {
  return request({
    url: "/financial/financial_findItem.doAdmin",
    method: "post",
    data: {
      type: 2, //1：常规类，2：走表类
      plotId: obj, //小区
    },
  });
}

// 走表录入查询
export function entryQueryByPage(obj) {
  return request({
    url: "/entry/entry_queryByPage.doAdmin",
    method: "post",
    data: {
      roomId: obj.roomId == "" ? null : obj.roomId,
      buildId: obj.buildId == "" ? null : obj.buildId,
      roomNo: obj.roomNo == "" ? null : obj.roomNo,
      expId: obj.expId == "" ? null : obj.expId,
    },
  });
}

// 走表录入批量录入日期
export function BatchEntry(obj) {
  var ArrayObj = [];
  for (var i = 0; i < obj.length; i++) {
    var data = {};
    data.id = obj[i].id;
    data.type = obj[i].type;
    data.entryDate = obj[i].entryDate;
    data.plotId = obj[i].plotId;
    data.tabId = obj[i].tabId;
    data.beginDate = obj[i].beginDate;
    data.endDate = obj[i].endDate;
    ArrayObj.push(data);
  }
  return request({
    url: "/entry/entry_batchEntry.doAdmin",
    method: "post",
    data: ArrayObj,
  });
}

//走表录入修改
export function entryModify(obj) {
  return request({
    url: "/entry/entry_modify.doAdmin",
    method: "post",
    data: {
      readId: obj.readId,
      tabId: obj.tabId,
      currentRead: obj.currentRead == "" ? 0 : obj.currentRead,
      lastRead: obj.lastRead == "" ? 0 : obj.lastRead,
      //degree:obj.degree==''?0:obj.degree,
      entryDate: obj.entryDate,
      plotId: obj.plotId,
      beginDate: obj.beginDate,
      endDate: obj.endDate,
    },
  });
}
