import request from "@/utils/Request";

export function posPrintPreviewPrint(data) {
  return request({
    url: "/posBillPrint/posPrintPreviewPrint.do",
    method: "post",
    data: data,
  });
}
