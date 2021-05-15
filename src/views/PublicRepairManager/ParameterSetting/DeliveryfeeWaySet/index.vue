<template>
  <div class="DeliveryfeeWaySet">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button
        type="primary"
        @click="subForm"
        v-has="'ParameDeliveryfeeWaySetSave_has'"
        >确定</el-button
      >
    </div>
    <!-- 按钮end -->
    <div class="content">
      <el-form label-width="85px" ref="tableForm">
        <el-row class="el-month">
          <el-card>
            <div class="el-card-title">传递费用方式:</div>
            <el-radio-group
              v-model="formList.WXJXTCS_XZBZ"
              @change="typeChange"
            >
              <el-radio class="el-radio-top" :label="1">自动传递</el-radio>
              <el-radio class="el-radio-top manual" :label="2"
                >手动传递</el-radio
              >
            </el-radio-group>
          </el-card>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  queryCostWay,
  updateCostWay,
} from "@/api/PublicRepairManager/ParameterSetting";
export default {
  name: "DeliveryfeeWaySet",
  data() {
    return {
      formList: {},
    };
  },
  methods: {
    getRowTable() {
      this.getDateObj();
    },
    getDateObj() {
      //获取列表数据
      queryCostWay().then((response) => {
        this.formList = response.TransmitCostWay[0];
      });
    },
    typeChange(val) {
      this.formList.WXJXTCS_XZBZ = val;
    },
    subForm() {
      updateCostWay(this.formList).then((response) => {
        this.getDateObj();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.DeliveryfeeWaySet {
  float: right;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 30px 30px 0 30px;
  .el-card-title {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    height: 16px;
    line-height: 16px;
    width: 100px;
  }
  .el-radio {
    margin-right: 10px !important;
  }
  .manual {
    margin-left: 50px;
  }
  .content {
    margin-top: 50px;
  }
}
</style>
