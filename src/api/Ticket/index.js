// 开票公共js
import request from "@/utils/Request";

//纸质发票预览
export function TicketShowApi(PJLYMX_ZJ, token) {
  return request({
    url:
      "/invoiceMode/paperInvoicePrintData.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ,
    method: "get",
    data: {},
  });
}

//纸质套打打印
export function ReceiptCoverApi(PJLYMX_ZJ, token) {
  return request({
    url:
      "/paymentRegistrationBill/chromatographyPrint.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ,
    method: "get",
    data: {},
  });
}

//纸质发票开具完回写数据到服务器
export function successWriteBackDataApi(
  PJLYMX_ZJ,
  token,
  RetCode,
  InfoKind,
  infotypecode,
  infonumber
) {
  return request({
    // ?X_Token='+token+"&PJLYMX_ZJ="+PJLYMX_ZJ+"&RetCode="+RetCode+"&PJLYMX_ZZSFPFL="+encodeURIComponent(encodeURIComponent(InfoKind))+"&PJLYMX_FPDM="+infotypecode+"&PJLYMX_FPHM="+infonumber
    url: "/invoiceMode/successWriteBackData.do",
    method: "post",
    data: {
      X_Token: token,
      PJLYMX_ZJ: PJLYMX_ZJ,
      RetCode: RetCode,
      PJLYMX_ZZSFPFL: InfoKind,
      PJLYMX_FPDM: infotypecode,
      PJLYMX_FPHM: infonumber,
    },
  });
}
// 纸质发票开具接口
export function invoiceSubmit(order, option) {
  return request({
    baseURL: "http://localhost:8091",
    url: "/api/invoice",
    method: "post",
    data: {
      order: order,
      option: option,
    },
  });
}

//电子收据发送邮箱
export function sendEmailApi(imgurl, toEmail) {
  return request({
    url: "/invoiceMode/sendReceiptEmail.do",
    method: "post",
    data: {
      base64: imgurl,
      toEmail: toEmail,
    },
  });
}

//纸质收据带表格预览---三明城发(通用纸质收据模板)
export function ReceiptChargingVoucherSmcfApi(PJLYMX_ZJ, token) {
  return request({
    url:
      "/special/specialBillRequirements/haveReadingNumberPrint.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ,
    method: "get",
    data: {},
  });
}

//纸质收据套打打印--唐人物业
export function TangrenReceiptCoverApi(PJLYMX_ZJ, token) {
  return request({
    url:
      "/special/specialBillRequirements/TangrenReceiptTemp.do?X_Token=" +
      token +
      "&PJLYMX_ZJ=" +
      PJLYMX_ZJ,
    method: "get",
    data: {},
  });
}
