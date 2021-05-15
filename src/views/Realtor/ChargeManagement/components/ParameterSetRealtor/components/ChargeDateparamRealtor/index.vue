<template>
  <div class="ChargeDateparamRealtor">
    <div class="content">
      <el-form
        label-width="125px"
        ref="tableForm"
        :model="formList"
        :rules="sureRules"
      >
        <el-row>
          <el-card>
            <div class="el-card-date">系统收费年月:</div>
            <el-form-item
              label="当前收费所属年月："
              label-width="150px"
              prop="yearAndMonth"
            >
              <el-date-picker
                type="month"
                v-model="formList.yearAndMonth"
                placeholder="所属年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
                :disabled="disabledTime"
              >
              </el-date-picker>
            </el-form-item>
          </el-card>
        </el-row>
        <el-row class="el-month">
          <el-card>
            <div class="el-card-title">每月收费月结方式:</div>
            <el-radio-group
              v-model="formList.methodType"
              @change="monthTypeChange"
            >
              <el-radio :label="1">当前月底</el-radio><br />
              <div class="curr_month">
                <el-radio class="el-radio-top" :label="2">当月</el-radio>
                <el-input-number
                  v-model="formList.date1"
                  :disabled="disableDate1"
                  controls-position="right"
                  :min="1"
                  :max="31"
                  size="mini"
                ></el-input-number>
                <span class="Remarks">日</span>
              </div>
              <div class="next_month">
                <el-radio class="el-radio-top" :label="3">下月月底</el-radio>
              </div>
              <el-radio class="el-radio-top" :label="4">下月</el-radio>
              <el-input-number
                v-model="formList.date2"
                :disabled="disableDate2"
                controls-position="right"
                :min="1"
                :max="31"
                size="mini"
              ></el-input-number>
              <span class="Remarks">日</span>
            </el-radio-group>
          </el-card>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="subForm" v-has="'ParameChargeSave_has'"
        >确定</el-button
      >
    </div>
    <!-- 按钮end -->
  </div>
</template>
<script>
import {
  queryDateType,
  AddDateType,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  name: "ChargeDateparamRealtor",
  data() {
    return {
      disableDate1: true, //默认当月输入框不可输入
      disableDate2: true, //默认下月输入框不可输入
      disabledTime: true, //默认收费所属年月不可修改
      formList: {
        date1: 1,
        date2: 1,
        methodType: 1,
        yearAndMonth: null,
        methodTypeId: null,
        dateId: null,
      },
      paramObj: {},
      sureRules: {
        yearAndMonth: [
          {
            required: true,
            message: "请选择收费所属年月",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    paramObj() {
      if (this.paramObj.yearAndMonth.SFCS_LJX == "true") {
        this.disabledTime = false;
      } else {
        this.disabledTime = true;
      }
    },
  },
  methods: {
    getRowTable() {
      this.getDateObj();
    },
    getDateObj() {
      //获取列表数据
      queryDateType().then((response) => {
        this.paramObj = response.data;
        this.formList.methodType = response.data.methodType.methodType;
        if (this.formList.methodType == 2) {
          this.disableDate1 = false;
          this.formList.dateId = this.paramObj.date1.dateId;
        } else if (this.formList.methodType == 4) {
          this.disableDate2 = false;
          this.formList.dateId = this.paramObj.date2.dateId;
        }
        this.formList.date1 = response.data.date1.date1;
        this.formList.date2 = response.data.date2.date2;
        this.formList.yearAndMonth = response.data.yearAndMonth.yearAndMonth;
        this.formList.methodTypeId = response.data.methodType.methodTypeId;
      });
    },
    monthTypeChange(val) {
      switch (
        val //每月收费结算方式
      ) {
        case 1 || 3:
          this.formList.dateId = null;
          // this.formList.date1 = null;
          // this.formList.date2 = null;
          this.disableDate1 = true;
          this.disableDate2 = true;
          break;
        case 2:
          this.formList.dateId = this.paramObj.date1.dateId;
          this.disableDate1 = false;
          this.disableDate2 = true;
          break;
        case 4:
          this.formList.dateId = this.paramObj.date2.dateId;
          this.disableDate1 = true;
          this.disableDate2 = false;
          break;
      }
    },
    subForm() {
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          AddDateType(this.formList).then((response) => {
            this.getDateObj();
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.ChargeDateparamRealtor {
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
    margin-top: 30px;
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
  .buttonBox {
    margin-top: 20px;
  }
}
</style>
