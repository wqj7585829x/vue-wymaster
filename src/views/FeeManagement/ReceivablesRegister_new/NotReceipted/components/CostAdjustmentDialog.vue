<template>
  <el-dialog
    v-dialogDrag
    title="费用调整"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-treble CostAdjustmentDialog"
  >
    <!-- 客户信息   -->
    <el-form label-width="85px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="交款人：">
            <span class="TextColor">{{ paymentPle }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资源代码：">
            <span class="TextColor">{{ resourceID }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮区域start -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24" style="text-align: left">
          <el-button type="primary" title="新增" @click="add">新增</el-button>
          <el-button
            type="danger"
            :title="detelteTitle()"
            :disabled="disabledelete"
            @click="del"
            >删除</el-button
          >
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="danger" @click="cancelForm">取消</el-button>
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <!-- 表格列表start -->
    <section>
      <!-- 空一行间距start -->
      <el-row></el-row>
      <!-- 空一行间距end -->
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            width="100%"
            height="350"
            ref="singleTable"
            border
            highlight-current-row
            @row-click="rowClick"
          >
            <el-table-column label="选择" width="50" fixed>
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column label="调整类型" width="150">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.cost_adjustment_id"
                  @click.stop.native
                >
                  <el-option
                    v-for="item in adjustData"
                    :key="item.costAdjustmentId"
                    :value="item.costAdjustmentId"
                    :label="item.adjustmentType"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="所属年月" width="150" prop="apply_year">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.apply_year"
                  type="month"
                  value-format="yyyy-MM"
                  format="yyyy-MM"
                  placeholder="所属账期"
                  @click.stop.native
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="费用区间" width="200">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.apply_cost_range"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="收费项目" width="150">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.apply_sfxmmc"
                  @change="changeEXP(scope.row)"
                  @click.stop.native
                >
                  <el-option
                    v-for="item in expIdArray"
                    :key="item.SFXM_SFXMMC"
                    :value="item.SFXM_SFXMMC"
                    :label="item.SFXM_SFXMMC"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="调整金额（含税）" width="150">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.adjusted_amount"
                  v-on:change="inputMouseblur(scope.row)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="税率(%)"
              prop="tax_rate"
              width="100"
            ></el-table-column>
            <el-table-column label="金额(不含税)" prop="FYSQ_YSBHS" width="100">
              <template slot-scope="scope">
                <span>{{
                  (scope.row.adjusted_amount -
                    (scope.row.adjusted_amount -
                      scope.row.adjusted_amount /
                        (1 + scope.row.tax_rate / 100)))
                    | rounding(scope.row.FYSQ_QZFS, scope.row.FYSQ_JQWS)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="调整说明"
              prop="adjustment_description"
              width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.FYSQ_TZSM"
                  :rows="2"
                  @click.stop.native
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="status" width="100">
              <template slot-scope="scope">
                {{ scope.row.status == 0 ? "未审核" : ""
                }}{{ scope.row.status == 1 ? "审核通过" : ""
                }}{{ scope.row.status == 2 ? "审核不通过" : ""
                }}{{ scope.row.status == 3 ? "审核中" : "" }}
              </template>
            </el-table-column>
            <el-table-column
              label="审核人"
              prop="review_staff"
              width="100"
            ></el-table-column>
            <el-table-column
              label="不通过理由"
              prop="fail_reason"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="审核日期"
              prop="review_date"
              width="100"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </section>
    <!-- 表格列表end -->
  </el-dialog>
</template>
<script>
import {
  queryCostAdjustment,
  queryChargeItem,
  addCostAdjustment,
  delCostAdjustment,
  queryGuestData,
  defaultYSNY,
  queryCostAdjustmentDefinitionApi,
} from "@/api/FeeManagement/NotReceipted_new"; //未收清款项-收清选中Api
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { roundings } from "@/utils/global.js";
export default {
  props: ["showdialogCost", "FKGX_ZJ"],
  data() {
    return {
      disabledelete: true,
      dialogFormVisible: this.showdialogCost,
      CostInfoArray: [], //费用调整信息
      tableData: [],
      multipleSelection: [],
      expIdArray: [], //收费项目数组
      addObject: {},
      radio: "",
      tableRow: {},
      resourceID: "", //资源代码
      paymentPle: "", //客户名称
      queryObj: {},
      selectType: 1, //1 按资源 2按客户,
      theWayTable: 1, //按年月  2按收费项目
      isSave: false, //判断是否有新增保存  如果为true 则点击取消按钮时回调刷新  否则不刷新
      adjustData: [], //调整类型数据
    };
  },
  watch: {
    showdialogCost() {
      this.dialogFormVisible = this.showdialogCost;
      if (this.dialogFormVisible) {
        queryChargeItem().then((response) => {
          //查询费用项目
          this.expIdArray = response;
        });
        this.getGuestData(); //获取客户资料  资源代码
        this.queryFeeAdjust(this.FKGX_ZJ); //列表查询
        this.queryCostAdjustDefinition(); //调整类型查询
      }
    },
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "" && this.tableRow.adjustment_apply_id) {
        if (this.tableRow.status != 2) {
          this.disabledelete = false;
        } else {
          this.disabledelete = true;
        }
      } else {
        this.disabledelete = true;
      }
    },
  },
  methods: {
    getData(obj, type, theWayTable) {
      this.queryObj = obj;
      this.selectType = type;
      this.theWayTable = theWayTable;
      this.isSave = false;
    },
    rowClick(row, ev, column) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    getGuestData() {
      //获取客户资料  资源代码
      queryGuestData(this.FKGX_ZJ).then((response) => {
        this.resourceID = response.FKGX_FJID;
        this.paymentPle = response.KHDA_KHMC;
      });
    },
    inputMouseblur(val) {
      //鼠标离开事件
      var reg = /^(-?\d+)(\.\d{1,2})?$/; //小数点保留两位小数
      if (val.apply_sfxmmc == "" || val.apply_sfxmmc == null) {
        this.$message({ message: "请选择收费项目", type: "warning" });
        return false;
      }
      if (!Number(val.adjusted_amount) && !val.adjusted_amount == 0) {
        this.$message({
          message: "" + val.adjusted_amount + "不是有效的数字类型",
          type: "warning",
        });
        val.adjusted_amount = "";
        return false;
      }
      if (!reg.test(val.adjusted_amount)) {
        this.$message({
          message: "调整金额(含税)最多只能保留两位小数",
          type: "warning",
        });
        val.adjusted_amount = 0;
        return false;
      }
      val.adjusted_amount = roundings(
        parseFloat(val.adjusted_amount),
        val.FYSQ_QZFS,
        val.FYSQ_JQWS
      );
    },
    queryFeeAdjust(id) {
      //费用调整查询
      queryCostAdjustment(id).then((response) => {
        this.tableData = response.data;
      });
    },
    queryCostAdjustDefinition() {
      //调整类型查询
      queryCostAdjustmentDefinitionApi().then((response) => {
        this.adjustData = response.data;
      });
    },
    changeEXP(val) {
      //收费项目选择事件
      this.expIdArray.forEach(function (item) {
        if (item.SFXM_SFXMMC == val.apply_sfxmmc) {
          val.apply_sfxmwj = item.SFXM_ZJ;
          val.tax_rate = item.SFXM_SL;
          val.FYSQ_JQWS = item.SFXM_JQWS;
          val.FYSQ_QZFS = item.SFXM_QZFS;
        }
      });
    },
    add() {
      //新增
      let addObject = {
        adjustment_description: "",
        apply_fkgxid: "",
        adjusted_amount: "",
        apply_sfxmmc: "",
        apply_sfxmwj: "",
        apply_year: "",
        tax_rate: "",
        FYSQ_YSBHS: "",
        apply_cost_range: "",
        status: 0,
      };
      this.tableData.push(addObject);
      defaultYSNY().then((response) => {
        //查询默认应收年月
        addObject.FYSQ_YSRQ = response.YSRQ;
      });
      queryDateType().then((response) => {
        //所属年月查询
        addObject.FYSQ_SSNY = response.data.yearAndMonth.yearAndMonth;
      });
    },
    del() {
      //删除选中
      //删除选中表格数据
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delCostAdjustment(this.tableRow.adjustment_apply_id).then(
              (response) => {
                this.isSave = true;
                //this.queryFeeAdjust(this.FKGX_ZJ);
                this.tableData.forEach((item, index) => {
                  if (item.FYSQ_ZJ == this.tableRow.FYSQ_ZJ) {
                    this.tableData.splice(index, 1);
                  }
                });
                this.radio = ""; //清空选中
              }
            );
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    submit() {
      //确定保存修改
      var list = [];
      for (var i = 0; i < this.tableData.length; i++) {
        var data = {};
        if (this.tableData[i].status == 0) {
          data.adjustment_apply_id = this.tableData[i].adjustment_apply_id
            ? this.tableData[i].adjustment_apply_id
            : ""; //费用调整审核主键
          data.adjustment_description = this.tableData[i].FYSQ_TZSM; //调整说明
          data.apply_fkgxid = this.FKGX_ZJ;

          data.apply_sfxmmc = this.tableData[i].apply_sfxmmc; //收费项目名称
          if (!data.apply_sfxmmc) {
            this.$message({
              message: "请选择收费项目",
              type: "warning",
            });
            return false;
          }
          data.apply_sfxmwj = this.tableData[i].apply_sfxmwj; //收费项目外键
          data.apply_year = this.tableData[i].apply_year; //所属年月
          data.adjusted_amount = this.tableData[i].adjusted_amount; //调整金额(含税)
          if (
            data.adjusted_amount == "" ||
            data.adjusted_amount == null ||
            Number(data.adjusted_amount) == 0
          ) {
            this.$message({
              message: "请输入调整金额(含税)",
              type: "warning",
            });
            return false;
          }
          data.tax_rate = this.tableData[i].tax_rate + ""; //税率
          data.FYSQ_YSBHS = this.tableData[i].FYSQ_YSBHS + ""; //不含税金额
          data.apply_cost_range = this.tableData[i].apply_cost_range; //费用区间
          data.cost_adjustment_id = this.tableData[i].cost_adjustment_id; //调整类型主键
          list.push(data);
        }
      }

      addCostAdjustment(list).then((response) => {
        //保存修改确定按钮
        if (response.returnStatus == "SUCCESS") {
          this.queryFeeAdjust(this.FKGX_ZJ);
          this.isSave = true;
          this.clearTab(); //保存后清空选中数据
        }
      });
    },
    detelteTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    cancelForm() {
      //取消关闭
      this.clearTab();
      if (this.isSave) {
        this.$emit(
          "RefreshItem",
          this.queryObj,
          this.selectType,
          this.theWayTable
        );
      }
      this.$emit("update:showdialogCost", false);
    },
    clearTab() {
      //清空选中
      this.radio = "";
      this.tableRow = {};
    },
  },
  filters: {
    //过滤器
    rounding(value, roundWay, preciseDigit) {
      if (roundWay == undefined) {
        return value.toFixed(2);
      }
      // 取整方式1:四舍五入,精确位数
      if (roundWay == "四舍五入" && preciseDigit == 0) {
        return value.toFixed(0);
      }
      if (roundWay == "四舍五入" && preciseDigit == 1) {
        return value.toFixed(1);
      }
      if (roundWay == "四舍五入" && preciseDigit == 2) {
        return value.toFixed(2);
      }
      if (roundWay == "四舍五入" && preciseDigit == 3) {
        return value.toFixed(3);
      }
      if (roundWay == "四舍五入" && preciseDigit == 4) {
        return value.toFixed(4);
      }
      if (roundWay == "四舍五入" && preciseDigit == 5) {
        var valueT = String(value);
        var str = "";
        if (valueT.indexOf(".") > -1) {
          str = valueT.split(".")[0];
        } else {
          str = valueT.split("");
        }
        var last = str[str.length - 1];
        if (last < 5) {
          valueT = valueT - last;
        }
        if (last == 5) {
          valueT = Number(valueT) + 5;
        }
        if (last == 6) {
          valueT = Number(valueT) + 4;
        }
        if (last == 7) {
          valueT = Number(valueT) + 3;
        }
        if (last == 8) {
          valueT = Number(valueT) + 2;
        }
        if (last == 9) {
          valueT = Number(valueT) + 1;
        }
        if (String(valueT).indexOf(".") > -1) {
          valueT = String(valueT).split(".")[0];
        }
        return valueT;
      }

      // 取整方式2:舍弃尾数,精确位数
      if (roundWay == "舍弃尾数" && preciseDigit == 0) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点0位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(0);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 1) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点1位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(1);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 2) {
        var num = (parseInt(value * 100) / 100).toFixed(2); //小数点2位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(1);
          num = Number(num) - Number(str) / 100;
        }
        return num.toFixed(2);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 3) {
        var num = (parseInt(value * 1000) / 1000).toFixed(3); //小数点3位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(2);
          num = Number(num) - Number(str) / 1000;
        }
        return num.toFixed(3);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 4) {
        var num = (parseInt(value * 10000) / 10000).toFixed(4); //小数点4位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(3);
          num = Number(num) - Number(str) / 10000;
        }
        return num.toFixed(4);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 5) {
        var num = value;
        if (String(num).indexOf(".") > -1) {
          var str = String(num).split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
          num = num.toFixed(0);
        }
        var lastnum = String(num).slice(-1);
        num = Number(num) - Number(lastnum);
        return num.toFixed(0);
      }
    },
  },
};
</script>
<style lang="scss">
.CostAdjustmentDialog {
  .el-row {
    padding: 0 20px;
  }
  .el-input {
    width: 100% !important;
  }
  .el-input__suffix {
    top: 6px;
  }
  .el-input__suffix .el-input__icon {
    line-height: 0 !important;
    height: auto !important;
  }
  .el-input__prefix .el-input__icon {
    line-height: 30px !important;
  }
}
</style>
