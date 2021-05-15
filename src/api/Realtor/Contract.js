import request from "@/utils/Request";

export function orgTree(data) {
  return request({
    url: "/util/orgTree.do",
    method: "post",
    data: data,
  });
}

export function queryZLClientList(data) {
  return request({
    url: "/util/queryZLClientList.do",
    method: "post",
    data: data,
  });
}

export function addContractMessage(data) {
  return request({
    url: "/zl/contractManagement/addContractMessage.do",
    method: "post",
    data: {
      contract_name: data.contract_name ? data.contract_name : "",
      contract_num: data.contract_num ? data.contract_num : "",
      plot_id: data.plot_id ? data.plot_id : "",
      KHDA_ZJ: data.KHDA_ZJ ? data.KHDA_ZJ : "",
      lessor_id: data.lessor_id ? data.lessor_id : "",
      manager: data.manager ? data.manager : "",
      signing_date: data.signing_date ? data.signing_date : "",
      contract_start: data.contract_start ? data.contract_start : "",
      contract_end: data.contract_end ? data.contract_end : "",
      lease_cycle: data.lease_cycle ? data.lease_cycle : "",
      rent_free_period: data.rent_free_period ? data.rent_free_period : "",
      rent_free_unit: data.rent_free_unit ? data.rent_free_unit : "",
      fee_start: data.fee_start ? data.fee_start : "",
      fee_end: data.fee_end ? data.fee_end : "",
      rental_area: data.rental_area ? data.rental_area : "",
      total_amount: data.total_amount ? data.total_amount : "",
      down_payment: data.down_payment ? data.down_payment : "",
      deposit_total: data.deposit_total ? data.deposit_total : "",
      pay_method: data.pay_method ? data.pay_method : "",
      contract_type: data.contract_type ? data.contract_type : "",
      contract_description: data.contract_description
        ? data.contract_description
        : "",

      pay_cycle: data.pay_cycle ? data.pay_cycle : "",
      pay_cycle_detail: data.pay_cycle_detail ? data.pay_cycle_detail : "",
      warning_days: data.warning_days ? data.warning_days : "",
      decorate_start: data.decorate_start ? data.decorate_start : "",
      decorate_end: data.decorate_end ? data.decorate_end : "",
    },
  });
}

export function queryContractMessage(data) {
  return request({
    url: "/zl/contractManagement/queryContractMessage.do",
    method: "post",
    data: data,
  });
}

export function queryContractChangeMessage(data) {
  return request({
    url: "/zl/contractChange/queryContractChangeMessage.do",
    method: "post",
    data: data,
  });
}

export function queryLeaseContract(data) {
  return request({
    url: "/zl/stayOver/queryLeaseContract.do",
    method: "post",
    data: data,
  });
}

export function updateContractMessage(data) {
  return request({
    url: "/zl/contractManagement/updateContractMessage.do",
    method: "post",
    data: {
      contract_name: data.contract_name ? data.contract_name : "",
      contract_num: data.contract_num ? data.contract_num : "",
      plot_id: data.plot_id ? data.plot_id : "",
      KHDA_ZJ: data.KHDA_ZJ ? data.KHDA_ZJ : "",
      lessor_id: data.lessor_id ? data.lessor_id : "",
      manager: data.manager ? data.manager : "",
      signing_date: data.signing_date ? data.signing_date : "",
      contract_start: data.contract_start ? data.contract_start : "",
      contract_end: data.contract_end ? data.contract_end : "",
      lease_cycle: data.lease_cycle ? data.lease_cycle : "",
      rent_free_period: data.rent_free_period ? data.rent_free_period : "",
      rent_free_unit: data.rent_free_unit ? data.rent_free_unit : "",
      fee_start: data.fee_start ? data.fee_start : "",
      fee_end: data.fee_end ? data.fee_end : "",
      rental_area: data.rental_area ? data.rental_area : "",
      total_amount: data.total_amount ? data.total_amount : "",
      down_payment: data.down_payment ? data.down_payment : "",
      deposit_total: data.deposit_total ? data.deposit_total : "",
      pay_method: data.pay_method ? data.pay_method : "",
      contract_type: data.contract_type ? data.contract_type : "",
      contract_description: data.contract_description
        ? data.contract_description
        : "",
      contract_id: data.contract_id ? data.contract_id : "",
      pay_cycle: data.pay_cycle ? data.pay_cycle : "",
      pay_cycle_detail: data.pay_cycle_detail ? data.pay_cycle_detail : "",
      warning_days: data.warning_days ? data.warning_days : "",
      decorate_start: data.decorate_start ? data.decorate_start : "",
      decorate_end: data.decorate_end ? data.decorate_end : "",
    },
  });
}

export function deleteContractMessage(data) {
  return request({
    url: "/zl/contractManagement/deleteContractMessage.do",
    method: "post",
    data: data,
  });
}

export function updateContractStatusSuccess(data) {
  return request({
    url: "/zl/contractManagement/updateContractStatusSuccess.do",
    method: "post",
    data: data,
  });
}

export function updateContractStatusFail(data) {
  return request({
    url: "/zl/contractManagement/updateContractStatusFail.do",
    method: "post",
    data: data,
  });
}

export function queryZLCustomer(data) {
  return request({
    url: "/util/queryZLCustomer.do",
    method: "post",
    data: data,
  });
}

export function queryZLLessor(data) {
  return request({
    url: "/util/queryZLLessor.do",
    method: "post",
    data: data,
  });
}

export function queryContractCostList(data) {
  return request({
    url: "/zl/contractManagement/queryContractCostList.do",
    method: "post",
    data: data,
  });
}

export function createCostList(data) {
  return request({
    url: "/zl/contractManagement/createCostList.do",
    method: "post",
    data: data,
  });
}

export function optionsApi1(data) {
  return request({
    url: "/ZL/contractingResources/queryPlot.do",
    method: "post",
    data: data,
  });
}

export function optionsApi2(data) {
  return request({
    url: data.changetype
      ? "zl/contractChange/queryPartition.do"
      : "/ZL/contractingResources/queryPartition.do",
    method: "post",
    data: data,
  });
}

export function optionsApi3(data) {
  return request({
    url: data.changetype
      ? "zl/contractChange/queryBuilding.do"
      : "/ZL/contractingResources/queryBuilding.do",
    method: "post",
    data: data,
  });
}

export function optionsApi4(data) {
  return request({
    url: data.changetype
      ? "zl/contractChange/queryRoom.do"
      : "/ZL/contractingResources/queryRoom.do",
    method: "post",
    data: data,
  });
}

export function optionsApi5(data) {
  return request({
    url: "/ZL/contractingResources/queryExpenseItem.do",
    method: "post",
    data: data,
  });
}

export function optionsApi6(data) {
  return request({
    url: "/ZL/contractingResources/queryPrice.do",
    method: "post",
    data: data,
  });
}

export function optionsApi7(data) {
  return request({
    url: "/ZL/contractingResources/queryPriceUnit.do",
    method: "post",
    data: data,
  });
}

export function optionsApi8(data) {
  return request({
    url: "/ZL/contractingResources/queryPriceType.do",
    method: "post",
    data: data,
  });
}

export function getClauseAPi(data) {
  return request({
    url: "/ZL/contractingResources/query.do",
    method: "post",
    data: data,
  });
}

export function addClauseAPi(data) {
  return request({
    url: "/ZL/contractingResources/add.do",
    method: "post",
    data: data,
  });
}

export function deleteClauseAPi(data) {
  return request({
    url: "/ZL/contractingResources/delete.do",
    method: "post",
    data: data,
  });
}

export function queryZLPlot(data) {
  return request({
    url: "/util/queryZLPlot.do",
    method: "post",
    data: data,
  });
}

export function insertSecurityDeposit(data) {
  return request({
    url: "/ZL/securityDeposit/insertSecurityDeposit.do",
    method: "post",
    data: data,
  });
}

export function updateSecurityDeposit(data) {
  return request({
    url: "/ZL/securityDeposit/updateSecurityDeposit.do",
    method: "post",
    data: data,
  });
}

export function deleteSecurityDeposit(data) {
  return request({
    url: "/ZL/securityDeposit/deleteSecurityDeposit.do",
    method: "post",
    data: data,
  });
}

export function querySecurityDepositList(data) {
  return request({
    url: "/ZL/securityDeposit/querySecurityDepositList.do",
    method: "post",
    data: data,
  });
}

export function depositAPi1(data) {
  return request({
    url: "/ZL/securityDeposit/queryOneTimeFee.do",
    method: "post",
    data: data,
  });
}

export function depositAPi2(data) {
  return request({
    url: "/ZL/securityDeposit/queryContractedResources.do",
    method: "post",
    data: data,
  });
}

export function depositAPi3(data) {
  return request({
    url: "/util/queryPaymentMethod.do",
    method: "post",
    data: data,
  });
}

export function submitContract(data) {
  return request({
    url: "/zl/contractManagement/submitContract.do",
    method: "post",
    data: data,
  });
}

export function queryContractCostAmount(data) {
  return request({
    url: "/zl/contractManagement/queryContractCostAmount.do",
    method: "post",
    data: data,
  });
}

export function queryContractEvent(data) {
  return request({
    url: "/zl/contractManagement/queryContractEvent.do",
    method: "post",
    data: data,
  });
}

export function queryBreachClause(data) {
  return request({
    url: "/zl/breachClause/queryBreachClause.do",
    method: "post",
    data: data,
  });
}

export function updateBreachClause(data) {
  return request({
    url: "/zl/breachClause/updateBreachClause.do",
    method: "post",
    data: data,
  });
}

export function addBreachClause(data) {
  return request({
    url: "/zl/breachClause/addBreachClause.do",
    method: "post",
    data: data,
  });
}

export function deleteBreachClause(data) {
  return request({
    url: "/zl/breachClause/deleteBreachClause.do",
    method: "post",
    data: data,
  });
}

export function uploadContractAccessory(obj) {
  return request({
    url: "/ZL/ContractAccessory/uploadContractAccessory.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}

export function queryContractAccessory(data) {
  return request({
    url: "/ZL/ContractAccessory/queryContractAccessory.do",
    method: "post",
    data: data,
  });
}

export function deleteContractAccessory(data) {
  return request({
    url: "/ZL/ContractAccessory/deleteContractAccessory.do",
    method: "post",
    data: data,
  });
}

export function updateAPI(data) {
  return request({
    url: "/ZL/contractingResources/update.do",
    method: "post",
    data: data,
  });
}

export function exportExpensesDetailedList(data) {
  return request({
    url: "/zl/contractManagement/exportExpensesDetailedList.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}

export function queryZLEarlyWarning(data) {
  return request({
    url: "/util/queryZLEarlyWarning.do",
    method: "post",
    data: data,
  });
}

export function queryRoomName(data) {
  return request({
    url: "/zl/stayOver/queryRoomName.do",
    method: "post",
    data: data,
  });
}

export function queryHomeConditionPulldown() {
  return request({
    url: "/zl/stayOver/queryHomeConditionPulldown.do",
    method: "post",
    data: {},
  });
}

export function queryMeterPulldown() {
  return request({
    url: "/zl/stayOver/queryMeterPulldown.do",
    method: "post",
    data: {},
  });
}

export function queryHomeCondition(data) {
  return request({
    url: "/zl/stayOver/queryHomeCondition.do",
    method: "post",
    data: data,
  });
}

export function queryMeter(data) {
  return request({
    url: "/zl/stayOver/queryMeter.do",
    method: "post",
    data: data,
  });
}

export function queryDeviceDetail(data) {
  return request({
    url: "/zl/stayOver/queryDeviceDetail.do",
    method: "post",
    data: data,
  });
}

export function deleteHomeCondition(data) {
  return request({
    url: "/zl/stayOver/deleteHomeCondition.do",
    method: "post",
    data: data,
  });
}

export function deleteMeter(data) {
  return request({
    url: "/zl/stayOver/deleteMeter.do",
    method: "post",
    data: data,
  });
}

export function deleteDeviceDetail(data) {
  return request({
    url: "/zl/stayOver/deleteDeviceDetail.do",
    method: "post",
    data: data,
  });
}

export function addHomeCondition(data) {
  return request({
    url: "/zl/stayOver/addHomeCondition.do",
    method: "post",
    data: data,
  });
}

export function addMeter(data) {
  return request({
    url: "/zl/stayOver/addMeter.do",
    method: "post",
    data: data,
  });
}

export function addDeviceDetail(data) {
  return request({
    url: "/zl/stayOver/addDeviceDetail.do",
    method: "post",
    data: data,
  });
}

export function updateHomeCondition(data) {
  return request({
    url: "/zl/stayOver/updateHomeCondition.do",
    method: "post",
    data: data,
  });
}

export function updateMeter(data) {
  return request({
    url: "/zl/stayOver/updateMeter.do",
    method: "post",
    data: data,
  });
}

export function updateDeviceDetail(data) {
  return request({
    url: "/zl/stayOver/updateDeviceDetail.do",
    method: "post",
    data: data,
  });
}

export function roomCheckAndAccept(data) {
  return request({
    url: "/zl/stayOver/roomCheckAndAccept.do",
    method: "post",
    data: data,
  });
}

export function keepingLiveIn(data) {
  return request({
    url: "/zl/stayOver/keepingLiveIn.do",
    method: "post",
    data: data,
  });
}
//  退租begin
export function rentqueryContractMessage(data) {
  return request({
    url: "/ZL/surrenderOfTenanc/queryContractMessage.do",
    method: "post",
    data: data,
  });
}

export function queryUncollectedFeeByRoom(data) {
  return request({
    url: "/ZL/earlyLease/queryUncollectedFeeByRoom.do",
    method: "post",
    data: data,
  });
}

export function queryClearedFeeByRoom(data) {
  return request({
    url: "/ZL/earlyLease/queryClearedFeeByRoom.do",
    method: "post",
    data: data,
  });
}

export function queryDepositPayment(data) {
  return request({
    url: "/ZL/earlyLease/queryDepositPayment.do",
    method: "post",
    data: data,
  });
}

export function queryHouseMessage(data) {
  return request({
    url: "/ZL/earlyLease/queryHouseMessage.do",
    method: "post",
    data: data,
  });
}

export function queryContractClause(data) {
  return request({
    url: "/ZL/earlyLease/queryContractClause.do",
    method: "post",
    data: data,
  });
}

export function queryRoomByContract(data) {
  return request({
    url: "/ZL/earlyLease/queryRoomByContract.do",
    method: "post",
    data: data,
  });
}

export function feeWithdrawal(data) {
  return request({
    url: "/ZL/earlyLease/feeWithdrawal.do",
    method: "post",
    data: data,
  });
}

export function earlyLease(data) {
  return request({
    url: "/ZL/earlyLease/earlyLease.do",
    method: "post",
    data: data,
  });
}

export function updateContractState(data) {
  return request({
    url: "/ZL/surrenderOfTenanc/updateContractState.do",
    method: "post",
    data: data,
  });
}
// 退租end

// 变更begin
export function addContractChangeMessage(data) {
  return request({
    url: "/zl/contractChange/addContractChangeMessage.do",
    method: "post",
    data: data,
  });
}

export function queryRoom(data) {
  return request({
    url: "/zl/contractChange/queryRoom.do",
    method: "post",
    data: data,
  });
}
// 变更end

// 结算清单begin
export function SqueryContractMessage(data) {
  return request({
    url: "/ZL/settlementList/queryContractMessage.do",
    method: "post",
    data: data,
  });
}

export function queryContractingResources(data) {
  return request({
    url: "/ZL/settlementList/queryContractingResources.do",
    method: "post",
    data: data,
  });
}

export function squerySecurityDepositList(data) {
  return request({
    url: "/ZL/settlementList/querySecurityDepositList.do",
    method: "post",
    data: data,
  });
}

export function squeryBreachClause(data) {
  return request({
    url: "/ZL/settlementList/queryBreachClause.do",
    method: "post",
    data: data,
  });
}

export function queryStayOver(data) {
  return request({
    url: "/ZL/settlementList/queryStayOver.do",
    method: "post",
    data: data,
  });
}

export function queryContractMeter(data) {
  return request({
    url: "/ZL/settlementList/queryContractMeter.do",
    method: "post",
    data: data,
  });
}

export function queryContractDevice(data) {
  return request({
    url: "/ZL/settlementList/queryContractDevice.do",
    method: "post",
    data: data,
  });
}

export function updateLiquidatedDamages(data) {
  return request({
    url: "/ZL/liquidateDamages/updateLiquidatedDamages.do",
    method: "post",
    data: data,
  });
}

export function deleteLiquidatedDamages(data) {
  return request({
    url: "/ZL/liquidateDamages/deleteLiquidatedDamages.do",
    method: "post",
    data: data,
  });
}

export function gatheringMessage(data) {
  return request({
    url: "/ZL/settlementList/gatheringMessage.do",
    method: "post",
    data: data,
  });
}

export function settleAccounts(data) {
  return request({
    url: "/ZL/settlementList/settleAccounts.do",
    method: "post",
    data: data,
  });
}

export function calculationAmount(data) {
  return request({
    url: "/ZL/settlementList/calculationAmount.do",
    method: "post",
    data: data,
  });
}

export function getUncollectedFeeTotalMoney(data) {
  return request({
    url: "/ZL/earlyLease/getUncollectedFeeTotalMoney.do",
    method: "post",
    data: data,
  });
}

export function queryLeaseContractOfCheckRoom(data) {
  return request({
    url: "/zl/stayOver/queryLeaseContractOfCheckRoom.do",
    method: "post",
    data: data,
  });
}
// 结算清单end

export function download(data) {
  return request({
    url: "/ZL/contractTemplate/download.do",
    method: "post",
    responseType: "blob",
    data: data,
  });
}
//导入模板
export function importContractExcelTemplateData(obj) {
  return request({
    url: "/zl/contractManagement/importContractMessage.do",
    method: "post",
    responseType: "blob",
    data: obj,
    upload_type: true,
  });
}
