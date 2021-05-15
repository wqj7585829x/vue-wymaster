<template>
  <div class="Initialize">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="subForm" v-has="'ParameChargeSave_has'"
        >初始化</el-button
      >
    </div>
    <!-- 按钮end -->
  </div>
</template>
<script>
import { chargeParameterInit } from "@/api/FeeManagement/ParameterSettings";
export default {
  name: "Initialize",
  data() {
    return {};
  },
  methods: {
    getRowTable() {},
    subForm() {
      chargeParameterInit().then((response) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.Initialize {
  float: right;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 30px 30px 0 30px;
  .el-card-date {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    height: 16px;
    line-height: 16px;
    width: 96px;
  }
  .el-card-title {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    height: 16px;
    line-height: 16px;
    width: 120px;
  }
  .el-input-moneydiv {
    width: 62px;
    margin: 0 10px;
  }
  .Remarks {
    color: #666666;
    font-size: 14px;
    text-align: left;
  }
  .el-input-number--mini {
    width: 80px;
  }
  .curr_month {
    margin: 10px 0;
  }
  .next_month {
    margin: 10px 0;
  }
  .el-radio {
    margin-right: 10px !important;
  }
  .el-month {
    margin-top: 50px;
  }
  .content {
    display: block;
    margin-top: 50px;
  }
}
</style>
