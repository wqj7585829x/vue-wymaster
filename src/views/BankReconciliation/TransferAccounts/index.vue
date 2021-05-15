<template>
  <div class="container TransferAccounts">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="记账开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.keepDateStart"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="记账截止日期：">
            <el-date-picker
              type="date"
              v-model="searchList.keepDateEnd"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="导入开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.importStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="导入结束日期：">
            <el-date-picker
              type="date"
              v-model="searchList.importEndDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账时间：">
            <el-date-picker
              type="date"
              v-model="searchList.tran_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账银行：">
            <el-select v-model="searchList.bank" placeholder="请选择" clearable>
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.bank"
                :value="item.bank"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="认账状态：">
            <el-select
              v-model="searchList.status"
              placeholder="请选择"
              clearable
            >
              <el-option label="未认账" :value="0"></el-option>
              <el-option label="已认账" :value="1"></el-option>
              <el-option label="认账中" :value="2"></el-option>
              <el-option label="认账核销" :value="3"></el-option>
              <el-option label="审核中" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="primary" @click="getdata()" v-has="'TASearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <!-- <el-button type="primary" @click="posdo1" :disabled="multipleSelection.length===0||statustype1"
        v-has="'TAARRegister_has'">
        认账登记</el-button> -->
      <el-button
        type="primary"
        @click="posdo2"
        :disabled="multipleSelection.length === 0 || statustype2"
        v-has="'TAARSure_has'"
      >
        认账确认</el-button
      >
      <el-button
        type="primary"
        @click="posdo3"
        :disabled="multipleSelection.length === 0 || statustype3"
        v-has="'TAARRevoke_has'"
      >
        认账撤销</el-button
      >
      <el-button type="success" @click="downloData()" v-has="'TAARExcel_has'"
        >导出excel</el-button
      >
      <div class="arrears">
        已勾选金额: <span>{{ arrears }}</span>
      </div>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="multipleTable"
        height="200"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="currentClick"
        :tree-props="{ children: 'children' }"
        row-key="subscribe_bill_id"
        :cell-class-name="checkbox"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ getindex(scope) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="keep_date" label="记账日期" width="120">
        </el-table-column>
        <el-table-column prop="tran_date" label="交易时间" width="150">
        </el-table-column>
        <el-table-column prop="credit_amount" label="贷方发生额" width="120">
        </el-table-column>
        <el-table-column prop="other_name" label="对方户名" width="120">
        </el-table-column>
        <el-table-column prop="summary" label="摘要" width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="120">
        </el-table-column>
        <el-table-column prop="import_date" label="导入时间" width="120">
        </el-table-column>
        <el-table-column prop="bill_type" label="银行进账类型" width="120">
        </el-table-column>
        <el-table-column prop="bank" label="银行" width="120">
        </el-table-column>
        <el-table-column prop="payment_method" label="收款方式" width="120">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="120">
        </el-table-column>
        <el-table-column prop="status" label="认账状态" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_type" label="认账方式" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.appreciator_type == 1">自动认账</div>
            <div v-if="scope.row.appreciator_type == 2">手动认账</div>
            <div v-if="scope.row.appreciator_type == 3">其他</div>
          </template>
        </el-table-column>
        <el-table-column prop="appreciator_date" label="认账时间" width="120">
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
      </el-table>
    </div>

    <div class="customedetail">
      <div class="title">收款凭证</div>
      <el-table
        ref="singleTable1"
        height="150"
        :data="tableData1"
        border
        highlight-current-row
        @current-change="CurrentChange"
      >
        <el-table-column prop="GLCName" label="管理处"> </el-table-column>
        <el-table-column prop="FKGX_FJID" label="房间代码"> </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称"> </el-table-column>
        <el-table-column prop="SKPZ_JKR" label="交款人"> </el-table-column>
        <el-table-column prop="SKPZ_RZSJ" label="入账时间"> </el-table-column>
        <el-table-column prop="SKPZ_TZRQ" label="填制日期"> </el-table-column>
        <el-table-column prop="SKPZ_SKJE" label="收款金额"> </el-table-column>
        <el-table-column prop="SKPZ_SKR" label="收款人"> </el-table-column>
      </el-table>
    </div>
    <div class="customedetail">
      <div class="title">凭证明细</div>
      <el-table ref="singleTable2" height="150" :data="tableData2" border>
        <el-table-column prop="SKMX_SKFYMC" label="收费项目名称" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SSNY" label="收款年月" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SKJE" label="收款金额" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SL" label="税率" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_BHSJE" label="不含税金额" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_KPJE" label="开票金额" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_PJH" label="票据号" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SKZY" label="收款摘要" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_BZ" label="备注"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  querySubscribeBillByPlot,
  queryChargingVoucherByPlot,
  queryChargingVoucherDetailsByPlot,
  subscriptionConfirmation,
  subscriptionCancellation,
  getMaxImportDate,
  exportSubscribeBillByPlot,
} from "@/api/BankReconciliation/TransferAccounts";
import { queryBankPulldownSelect } from "@/api/BankReconciliation/POSPayCard";
export default {
  name: "TransferAccounts",
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      searchList: {},
      tableRow: {}, //修改数据
      options: [],
      multipleSelection: [],
      statustype1: true,
      statustype2: true,
      statustype3: true,
      Reconciliationshow: false,
      timeoptions: [],
      arrears: 0,
    };
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
    this.searchList = {
      keepDateStart: `${year}-${month}-01`,
      keepDateEnd: `${year}-${month}-${day}`,
    };
    this.getTableData();
    queryBankPulldownSelect().then((response) => {
      this.options = response;
    });
  },
  methods: {
    downloData() {
      exportSubscribeBillByPlot(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `转账列表.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    getindex(scope) {
      return this.tableData.indexOf(scope.row) + 1;
    },
    posdo1() {
      this.Reconciliationshow = true;
      this.$refs.Reconciliation.getReportData(this.multipleSelection);
    },
    posdo2() {
      var data = this.multipleSelection;
      var subscribe_bill_ids = [];
      for (var i in data) {
        subscribe_bill_ids.push(data[i].subscribe_bill_id);
      }
      this.$confirm("是否对已选择数据进行认账确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          subscriptionConfirmation({
            subscribe_bill_ids: subscribe_bill_ids.join(","),
          }).then((response) => {
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    posdo3() {
      var data = this.multipleSelection;
      var subscribe_bill_ids = [];
      for (var i in data) {
        subscribe_bill_ids.push(data[i].subscribe_bill_id);
      }
      this.$confirm("是否对已选择数据进行认账撤销？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          subscriptionCancellation({
            subscribe_bill_ids: subscribe_bill_ids.join(","),
          }).then((response) => {
            this.getTableData();
            this.tableData1 = [];
            this.tableData2 = [];
          });
        })
        .catch(() => {});
    },
    getdata() {
      this.getTableData();
      this.tableData1 = [];
      this.tableData2 = [];
    },
    getTableData() {
      querySubscribeBillByPlot(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.$refs.multipleTable.setCurrentRow();
      });
    },
    getdetail(data1) {
      this.tableData2 = [];
      queryChargingVoucherByPlot(data1).then((response) => {
        this.tableData1 = response.data;
        var data = response.data;
        if (data.length === 0) return;
        if (data) {
          this.$refs.singleTable1.setCurrentRow(data[0]);
          queryChargingVoucherDetailsByPlot({
            SKPZ_ZJ: data[0].SKPZ_ZJ,
            type: data[0].type,
          }).then((response) => {
            this.tableData2 = response.data;
          });
        }
      });
    },
    CurrentChange(val) {
      queryChargingVoucherDetailsByPlot({
        SKPZ_ZJ: val.SKPZ_ZJ,
        type: val.type,
      }).then((response) => {
        this.tableData2 = response.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      var count = 0;
      for (var j in val) {
        count += val[j].credit_amount;
      }
      this.arrears = count.toFixed(2);

      var data = this.multipleSelection;
      var statuslist = [];
      var tran_date = [];
      var other_name = [];
      for (var i in data) {
        if (statuslist.indexOf(data[i].status) == -1) {
          statuslist.push(data[i].status);
        }
        if (tran_date.indexOf(data[i].tran_date) == -1) {
          tran_date.push(data[i].tran_date);
        }
        if (other_name.indexOf(data[i].other_name) == -1) {
          other_name.push(data[i].other_name);
        }
      }
      var check = statuslist.length === 1;

      this.statustype1 = true;
      this.statustype2 = true;
      this.statustype3 = true;
      if (check) {
        this.statustype1 =
          (statuslist[0] === "未认账" || statuslist[0] === "认账撤销") &&
          tran_date.length === 1 &&
          other_name.length === 1
            ? false
            : true;
        this.statustype2 = statuslist[0] === "认账中" ? false : true;
        this.statustype3 = statuslist[0] === "已认账" ? false : true;
      }
    },
    currentClick(row) {
      var list = [];
      var subscribe_bill_id;
      if (row.children) {
        var data = row.children;
        for (var i in data) {
          list.push(data[i].subscribe_bill_id);
        }
        subscribe_bill_id = list.join(",");
      } else {
        subscribe_bill_id = row.subscribe_bill_id;
      }
      this.getdetail({ subscribe_bill_id: subscribe_bill_id });
    },
    checkbox(row) {
      if (row.row.isChildren === 1) {
        return "mycell";
      }
    },
  },
};
</script>
<style lang="scss">
.TransferAccounts .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.TransferAccounts .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}

.TransferAccounts .el-input {
  width: 100% !important;
}

.TransferAccounts {
  .mycell .el-checkbox__input {
    display: none !important;
  }
  .mycell .tableindex {
    display: none !important;
  }
}

.TransferAccounts .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.TransferAccounts .arrears {
  float: right;
  font-size: 16px;
  padding: 5px 15px;
  span {
    font-weight: 700;
  }
}
</style>
