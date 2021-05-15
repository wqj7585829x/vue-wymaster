<template>
  <div class="ChargeControl">
    <div class="content">
      <el-form label-width="85px" ref="tableForm">
        <el-row class="el-month">
          <div class="el-card-title">系统收费控制:</div>
          <el-checkbox
            v-model="formList.isRelatedCharge"
            @change="relatedChange"
            >是否强制连续收费</el-checkbox
          >
        </el-row>
        <el-row class="pos-control">
          <div class="el-card-title">微信/pos收费控制:</div>
          <el-radio-group
            v-model="formList.chargeCycle"
            @change="chargeCycleChange"
          >
            <el-radio :label="1">按月(默认)</el-radio>
            <el-radio :label="2">按季度</el-radio>
            <el-radio :label="3">按半年</el-radio>
            <el-radio :label="4">按年</el-radio>
          </el-radio-group>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  queryChargeControlMessageApi,
  updateSystemChargeControlApi,
  updateWeChatChargeControlApi,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  name: "ChargeControl",
  data() {
    return {
      formList: {
        isRelatedCharge: 0,
        chargeCycle: 1,
      },
    };
  },
  methods: {
    getRowTable() {
      this.qChargeControlMessageQuery();
    },
    qChargeControlMessageQuery() {
      queryChargeControlMessageApi().then((response) => {
        this.formList.chargeCycle = response[0].chargeCycle;
        this.formList.isRelatedCharge =
          response[0].isRelatedCharge == 1 ? true : false;
      });
    },
    relatedChange() {
      //系统收费控制改变事件
      updateSystemChargeControlApi(
        this.formList.isRelatedCharge
      ).then((response) => {});
    },
    chargeCycleChange() {
      //微信/pos收费控制 改变事件
      updateWeChatChargeControlApi(
        this.formList.chargeCycle
      ).then((response) => {});
    },
  },
};
</script>
<style lang="scss">
.ChargeControl {
  float: right;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 40px 30px 0 30px;
  .el-card-title {
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  .el-radio {
    margin-right: 15px !important;
  }
  .el-radio-group,
  .el-checkbox {
    margin: 20px 0 15px 15px;
  }
  .pos-control {
    margin-top: 30px;
  }
  .el-checkbox__inner {
    border-radius: 100% !important;
  }
}
</style>
