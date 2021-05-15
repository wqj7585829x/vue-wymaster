//收款登记  已收清
import request from "@/utils/Request";

//查询已收清费用
export function queryClearedCharges(obj) {
  return request({
    url: "/registrationOfReceipts/clearedCharges/queryClearedCharges.do",
    method: "post",
    data: {
      nStyle: obj.nStyle,
      WJ: obj.FKGX_ZJ,
      SFBZ: obj.SFBZ,
      QSNY: obj.QSNY,
      JZNY: obj.JZNY,
    },
  });
}

//收款明细查询
export function querReceiptList(SKMX_FYSQWJ) {
  return request({
    url: "/registrationOfReceipts/clearedCharges/queryClearedChargesDetail.do",
    method: "post",
    data: {
      SKMX_FYSQWJ: SKMX_FYSQWJ,
    },
  });
}

//走表读数查询
export function querWalkList(ZBJS_FKGXWJ, ZBJS_SFXMWJ) {
  return request({
    url:
      "/registrationOfReceipts/clearedCharges/queryClearedChargesZBDSDetail.do",
    method: "post",
    data: {
      ZBJS_SFXMWJ: ZBJS_SFXMWJ,
      ZBJS_FKGXWJ: ZBJS_FKGXWJ,
    },
  });
}
