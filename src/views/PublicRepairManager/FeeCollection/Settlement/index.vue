<template>
  <div class="container BillBook">
    <!-- 内容区域 -->
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select v-model="SettleForm.state">
                  <el-option label="当前" value="0"></el-option>
                  <el-option label="历史" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-input v-model="SettleForm.context"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5" style="width: 400px">
              <el-form-item label="" label-width="0">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="timeChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="getTableData()"
                  v-has="'FeeSettlement_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->

      <!-- 按钮begin -->
      <div class="button buttonBox">
        <el-button
          type="primary"
          @click="CostAllocation"
          :disabled="disableddo1 || SettleForm.state == 1"
          v-has="'FeeSettlementAllocation_has'"
          >费用公摊</el-button
        >
        <el-button
          type="primary"
          @click="JudgementBalance"
          :disabled="disableddo2 || SettleForm.state == 1"
          v-has="'FeeSettlementJudgement_has'"
          >费用支出</el-button
        >
        <el-button
          type="primary"
          @click="CostTransfer"
          :disabled="disableddo3"
          v-if="disableset"
          v-has="'FeeSettlementTransfer_has'"
          >费用传递</el-button
        >
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          max-height="500"
          border
          style="width: 100%"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="YFPZ_PZBH" label="凭证编号" width="250">
          </el-table-column>
          <el-table-column prop="YFPZ_SJFY" label="实际费用" width="150">
          </el-table-column>
          <el-table-column prop="YFPZ_YFJE" label="应付金额" width="150">
          </el-table-column>
          <el-table-column prop="YFPZ_JMJE" label="减免金额" width="150">
          </el-table-column>
          <el-table-column prop="YFPZ_YZJE" label="已支出" width="150">
          </el-table-column>
          <el-table-column prop="YFPZ_LKZRR" label="领款责任人" width="150">
          </el-table-column>
          <el-table-column
            prop=""
            fixed="right"
            label="费用分摊"
            width="100"
            v-if="FeeCostAllocationListSearch_has()"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 1)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            fixed="right"
            label="费用支出"
            width="100"
            v-if="FeeExpenditureListSearch_has()"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 2)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            fixed="right"
            label="费用不足用户"
            width="120"
            v-if="FeeInsufficientFundsSearch_has()"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 3)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <registerDialog
      :show.sync="show"
      ref="registerDialog"
      @RefreshItem="RefreshList"
    ></registerDialog>

    <LadderDetail :Lshow.sync="Lshow" ref="LadderDetail"></LadderDetail>
    <HouseholdDetail
      :Hshow.sync="Hshow"
      ref="HouseholdDetail"
    ></HouseholdDetail>
    <RegisterDetail :Rshow.sync="Rshow" ref="RegisterDetail"></RegisterDetail>
  </div>
</template>
<script>
import {
  queryCostTransferPattern,
  queryCostReceive,
  queryCostAllocation,
  queryJudgementBalance,
  queryCostTransfer,
} from "@/api/PublicRepairManager/FeeCollection";
import LadderDetail from "./components/LadderDetail"; //所属梯
import HouseholdDetail from "./components/HouseholdDetail"; //所属户
import RegisterDetail from "./components/RegisterDetail"; //登记事件
import registerDialog from "./components/registerDialog"; //新增总表,修改
export default {
  name: "RepairRegister",
  data() {
    return {
      labelPosition: "left",
      tableData: [], //列表参数
      disableddo1: true,
      disableddo2: true,
      disableddo3: true,
      disableset: true,
      radio: "", //单选按钮
      tableRow: {}, //选中数据
      SettleForm: {
        state: "0",
        KSRQ: "",
        JSRQ: "",
        context: "",
      },
      time: [],
      tempComponent: "",
      show: false,
      Lshow: false,
      Hshow: false,
      Rshow: false,
      Sshow: false,
      CZR: "",
    };
  },
  mounted() {
    var day = new Date();
    this.SettleForm.KSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-1";
    this.SettleForm.JSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    this.time.push(this.SettleForm.KSRQ);
    this.time.push(this.SettleForm.JSRQ);
    this.getTableData();
    this.CostTransferPattern();
  },
  methods: {
    FeeCostAllocationListSearch_has() {
      //费用分摊列表查询
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeCostAllocationListSearch_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeExpenditureListSearch_has() {
      //费用支出列表查询
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeExpenditureListSearch_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeInsufficientFundsSearch_has() {
      //余额不足用户列表查询
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeInsufficientFundsSearch_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    getRowTable() {},
    timeChange(val) {
      if (val == null) {
        this.SettleForm.KSRQ = "";
        this.SettleForm.JSRQ = "";
      } else {
        this.SettleForm.KSRQ = val[0];
        this.SettleForm.JSRQ = val[1];
      }
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.disableddo1 = row.GT ? false : true;
      this.disableddo2 =
        row.YFPZ_YFJE != row.YFPZ_YZJE && row.GT == false ? false : true;
      this.disableddo3 = row.YFPZ_YFJE == row.YFPZ_YZJE ? false : true;
    },
    detailsfunc(data, type) {
      switch (type) {
        case 1:
          this.Lshow = true;
          this.$refs.LadderDetail.getPartitionData({ YFPZ_ZJ: data.YFPZ_ZJ });
          break;
        case 2:
          this.Hshow = true;
          this.$refs.HouseholdDetail.getPartitionData({
            YFPZ_ZJ: data.YFPZ_ZJ,
          });
          break;
        case 3:
          this.Rshow = true;
          this.$refs.RegisterDetail.getPartitionData({ YFPZ_ZJ: data.YFPZ_ZJ });
          break;
      }
    },
    //费用公摊
    CostAllocation() {
      this.$confirm("您确定分摊此笔费用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          queryCostAllocation(this.tableRow).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.radio = ""; //选择后清空选中表格按钮
              this.disableddo1 = true;
              this.RefreshList({});
            }
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
          this.disableddo1 = true;
        });
    },
    //费用支出
    JudgementBalance() {
      queryJudgementBalance(this.tableRow).then((response) => {
        if (!response.data.PZ) {
          this.$message.warning("公维金对应费用项目未设置，请检查！");
        } else {
          if (!response.data.JEBZ) {
            this.$message.warning("维修金余额不足！请先筹集费用再做预支操作");
          } else {
            this.$confirm(
              `确认本次可以预支费用共计：${(
                this.tableRow.YFPZ_YFJE - this.tableRow.YFPZ_YZJE
              ).toFixed(5)}`,
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.show = true;
                this.tableRow.CZR = this.CZR;
                this.$refs.registerDialog.getPartitionData(this.tableRow);
              })
              .catch(() => {
                this.radio = ""; //清空选中
                this.disableddo2 = true;
              });
          }
        }
      });
    },
    //费用传递
    CostTransfer() {
      queryCostTransfer(this.tableRow).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.radio = ""; //选择后清空选中表格按钮
          this.disableddo3 = true;
          this.RefreshList({});
        }
      });
    },
    // 表数据
    getTableData() {
      (this.radio = ""), //单选按钮
        (this.disableddo1 = true),
        (this.disableddo2 = true),
        (this.disableddo3 = true),
        (this.tableRow = {}), //选中数据
        queryCostReceive(this.SettleForm).then((response) => {
          this.tableData = response;
        });
    },
    //费用传递方式查询
    CostTransferPattern() {
      queryCostTransferPattern().then((response) => {
        this.disableset = response.WXJXTCS_XZBZ == "自动传递" ? false : true;
        this.CZR = response.CZR;
      });
    },
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
  },
  components: {
    registerDialog,
    HouseholdDetail,
    LadderDetail,
    RegisterDetail,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.message {
  width: 450px;
  float: right;
}
</style>
<style>
.container .el-input-number {
  width: auto;
}
.BillBook .el-button--small {
  width: inherit !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
