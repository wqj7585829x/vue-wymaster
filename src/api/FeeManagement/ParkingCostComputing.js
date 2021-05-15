//车位费用生成
import request from "@/utils/Request";

//生成
export function generateCostApi(obj) {
  return request({
    url: "/parkingFee/addParkingFee.do",
    method: "post",
    data: {
      begin_NY: obj.QSFYNY,
      end_NY: obj.JZFYNY,
    },
  });
}

//删除
export function delCostApi(obj) {
  return request({
    url: "/parkingFee/deleteParkingFee.do",
    method: "post",
    data: {
      begin_NY: obj.QSFYNY,
      end_NY: obj.JZFYNY,
    },
  });
}
