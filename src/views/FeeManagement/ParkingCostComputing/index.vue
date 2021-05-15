<template>
  <div class="container">
    <div class="el-content">
      <!-- 按钮begin -->
      <div class="buttonBox">
        <el-button
          type="primary"
          @click="chargeGenerationAction"
          v-has="'ParkingCostComputing_has'"
          >{{ CaluTxt }}
        </el-button>
      </div>
      <!-- 按钮end -->
      <div>
        <el-form
          label-width="125px"
          :rules="sureRules"
          :model="tableData"
          ref="tableForm"
        >
          <el-row>
            <el-col>
              <el-form-item label="计算方式：">
                <el-radio-group v-model="CaluTradio1" @change="Waychange">
                  <el-radio :label="1">费用生成</el-radio>
                  <el-radio :label="0">删除费用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="费用开始年月：" prop="QSFYNY">
                <el-date-picker
                  type="month"
                  v-model="tableData.QSFYNY"
                  placeholder="开始年月"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="费用结束年月：" prop="JZFYNY">
                <el-date-picker
                  type="month"
                  v-model="tableData.JZFYNY"
                  placeholder="结束年月"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  generateCostApi,
  delCostApi,
} from "@/api/FeeManagement/ParkingCostComputing";
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { currDate } from "@/utils/global.js";
export default {
  name: "ParkingCostComputing",
  data() {
    var validateStartDate = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback(new Error("费用开始年月不能为空"));
      } else if (
        parseInt(value.split("-")[0] + value.split("-")[1]) <
        parseInt(
          this.yearAndMonth.split("-")[0] + this.yearAndMonth.split("-")[1]
        )
      ) {
        callback(new Error("费用开始年月不能小于当前年月  "));
      } else {
        callback();
      }
    };
    var validateEndDate = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback(new Error("费用结束年月不能为空"));
      } else if (
        parseInt(value.split("-")[0] + value.split("-")[1]) <
        parseInt(
          this.tableData.QSFYNY.split("-")[0] +
            this.tableData.QSFYNY.split("-")[1]
        )
      ) {
        callback(new Error("费用结束年月不能小于费用开始年月"));
      } else {
        callback();
      }
    };
    return {
      yearAndMonth: "",
      CaluTradio1: 1,
      tableData: {
        QSFYNY: "",
        JZFYNY: "",
      },
      sureRules: {
        QSFYNY: [
          { required: true, validator: validateStartDate, trigger: "blur" },
        ],
        JZFYNY: [
          { required: true, validator: validateEndDate, trigger: "blur" },
        ],
      },
      CaluTxt: "生成费用",
    };
  },
  mounted() {
    this.getDateType();
  },
  methods: {
    Waychange(val) {
      //计算方式切换
      if (val == 0) {
        this.CaluTxt = "删除费用";
      } else {
        this.CaluTxt = "生成费用";
      }
    },
    getDateType() {
      //获取收费年月
      queryDateType().then((response) => {
        this.tableData = response.data;
        this.yearAndMonth = response.data.yearAndMonth.yearAndMonth;
        this.tableData.QSFYNY = response.data.yearAndMonth.yearAndMonth;
        this.tableData.JZFYNY = response.data.yearAndMonth.yearAndMonth;
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
      });
    },
    // 生成费用
    chargeGenerationAction() {
      var data = {};
      data.QSFYNY = this.tableData.QSFYNY;
      data.JZFYNY = this.tableData.JZFYNY;
      if (this.CaluTradio1 == 1) {
        //费用生成
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            generateCostApi(data).then((response) => {});
          } else {
            return false;
          }
        });
      } else {
        //费用删除
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            delCostApi(data).then((response) => {});
          } else {
            return false;
          }
        });
      }
    },
    refresh() {
      //刷新
      this.getTreeFun();
      this.getDateType();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding-left: 300px;
}
.el-body /deep/ .el-title {
  width: 300px;
  margin-left: -300px;
}

.el-date-editor--daterange.el-input__inner {
  width: 380px;
}
.el-date-editor.el-input {
  width: 180px;
}
.el-form-item {
  margin-bottom: 20px;
}
.checkH .el-form-item {
  margin-bottom: 0;
}
.paymentTree {
  margin-top: 6px;
}
</style>
