<template>
  <!--预支设置-->
  <div class="AdvanceSet">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button
        type="primary"
        @click="subForm"
        v-has="'ParameAdvanceSetSave_has'"
        >确定</el-button
      >
    </div>
    <!-- 按钮end -->
    <div class="content">
      <el-form label-width="85px" ref="tableForm" :model="formList">
        <el-row class="el-month">
          <el-card>
            <div class="el-card-title">预支设置:</div>
            <el-radio-group
              v-model="formList.WXJXTCS_XZBZ"
              @change="monthTypeChange"
            >
              <el-row>
                <el-col :span="24">
                  <el-radio class="el-radio-top" :label="1"
                    >按预算金额比率&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio
                  >
                  <el-input-number
                    v-model="moneyOne"
                    :disabled="disableTypeOne"
                    controls-position="right"
                    :min="0"
                    :controls="false"
                  ></el-input-number>
                </el-col>
              </el-row>
              <div class="next_month"></div>
              <el-row>
                <el-col :span="24">
                  <el-radio class="el-radio-top" :label="2"
                    >直接设定最高预支金额</el-radio
                  >
                  <el-input-number
                    v-model="moneyTwo"
                    :disabled="disableTypeTwo"
                    controls-position="right"
                    :min="0"
                    :controls="false"
                  ></el-input-number>
                </el-col>
              </el-row>
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
  updateAdvance,
} from "@/api/PublicRepairManager/ParameterSetting";
export default {
  name: "AdvanceSet",
  data() {
    return {
      disableTypeOne: true,
      disableTypeTwo: true,
      moneyOne: 0, //按预算金额比率
      moneyTwo: 0, //直接设定最高预支金额
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
        this.formList = response.AdvancedSettings[0];
        if (this.formList.WXJXTCS_XZBZ == 1) {
          this.disableTypeOne = false;
          this.disableTypeTwo = true;
          this.moneyOne = this.formList.WXJXTCS_SZ;
        } else {
          this.disableTypeOne = true;
          this.disableTypeTwo = false;
          this.moneyTwo = this.formList.WXJXTCS_SZ;
        }
      });
    },
    monthTypeChange(val) {
      switch (
        val //每月收费结算方式
      ) {
        case 1:
          this.disableTypeOne = false;
          this.disableTypeTwo = true;
          break;
        case 2:
          this.disableTypeOne = true;
          this.disableTypeTwo = false;
          break;
      }
    },
    subForm() {
      if (this.formList.WXJXTCS_SZ == undefined) {
        this.$message({ message: "值不能为空", type: "warning" });
        return false;
      }
      if (this.formList.WXJXTCS_XZBZ == 1) {
        if (this.moneyOne == undefined) {
          this.formList.WXJXTCS_SZ = 0;
        } else {
          this.formList.WXJXTCS_SZ = this.moneyOne;
        }
      } else {
        if (this.moneyTwo == undefined) {
          this.formList.WXJXTCS_SZ = 0;
        } else {
          this.formList.WXJXTCS_SZ = this.moneyTwo;
        }
      }
      this.formList.AS_WXJXTCS_XZBZ = this.formList.WXJXTCS_XZBZ;
      this.formList.AS_WXJXTCS_ZJ = this.formList.WXJXTCS_ZJ;
      updateAdvance(this.formList).then((response) => {
        this.getDateObj();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.AdvanceSet {
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
    width: 65px;
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
<style lang="scss">
.ChargeDateparam {
  .el-card__body {
  }
  .el-card {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: inherit;
  }
  .el-input-number.is-controls-right[class*="mini"] [class*="decrease"],
  .el-input-number.is-controls-right[class*="mini"] [class*="increase"] {
    line-height: 16px;
  }
  .el-input--mini .el-input__inner {
    height: 35px !important;
    line-height: 35px !important;
  }
}
</style>
