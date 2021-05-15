import request from "@/utils/Request";
//月结提示
export function monthMessageApi() {
  return request({
    url: "/monthlyChargeSettlement/checkMonthlyTime.do",
    method: "post",
    data: {},
  });
}
