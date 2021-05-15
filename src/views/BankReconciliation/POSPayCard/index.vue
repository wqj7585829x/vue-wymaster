<template>
  <div class="container POSPayCard">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.accountingStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账结束日期：">
            <el-date-picker
              type="date"
              v-model="searchList.accountingEndDate"
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
          <el-form-item label="到账银行：">
            <el-select
              v-model="searchList.issuerCard"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.bank"
                :label="item.bank"
                :value="item.bank"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="清算日期：">
            <el-date-picker
              type="date"
              v-model="searchList.tranDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
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
            <el-button
              type="primary"
              @click="getdata()"
              v-has="'POSPayCardSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="posdo1"
        :disabled="multipleSelection.length === 0 || statustype1"
        v-has="'POSPayCardARRegister_has'"
      >
        认账登记</el-button
      >
      <el-button
        type="primary"
        @click="posdo2"
        :disabled="multipleSelection.length === 0 || statustype2"
        v-has="'POSPayCardARSure_has'"
      >
        认账确认</el-button
      >
      <el-button
        type="primary"
        @click="posdo3"
        :disabled="multipleSelection.length === 0 || statustype3"
        v-has="'POSPayCardARRevoke_has'"
      >
        认账撤销</el-button
      >
      <el-button
        type="success"
        @click="downloData()"
        v-has="'POSPayCardExcel_has'"
        >导出excel</el-button
      >
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
        @current-change="rowClick"
        :tree-props="{ children: 'children' }"
        row-key="subscribeDetailId"
        highlight-current-row
        :cell-class-name="checkbox"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ getindex(scope) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="clearDate" label="清算日期" width="150">
        </el-table-column>
        <el-table-column prop="accountingDate" label="到账日期" width="150">
        </el-table-column>
        <el-table-column prop="tranDate" label="交易日期" width="120">
        </el-table-column>
        <el-table-column prop="tranTime" label="交易时间" width="120">
        </el-table-column>
        <el-table-column prop="importDate" label="导入日期" width="120">
        </el-table-column>
        <el-table-column prop="terminalNum" label="终端号" width="120">
        </el-table-column>
        <el-table-column prop="tranAmount" label="交易金额" width="120">
        </el-table-column>
        <el-table-column prop="clearAmount" label="清算金额" width="120">
        </el-table-column>
        <el-table-column prop="tranFee" label="手续费" width="120">
        </el-table-column>
        <el-table-column prop="tranSerialNum" label="流水号" width="120">
        </el-table-column>
        <el-table-column prop="tranType" label="交易类型" width="120">
        </el-table-column>
        <el-table-column prop="cardNum" label="卡号" width="200">
        </el-table-column>
        <el-table-column prop="cardType" label="卡类型" width="120">
        </el-table-column>
        <el-table-column prop="clearAccmount" label="结算账号" width="200">
        </el-table-column>
        <el-table-column prop="systemNum" label="系统参考号" width="120">
        </el-table-column>
        <el-table-column prop="issuerCard" label="发卡行" width="120">
        </el-table-column>
        <el-table-column prop="status" label="认账状态" width="120">
        </el-table-column>
        <el-table-column prop="bank" label="到账银行" width="120">
        </el-table-column>
        <el-table-column prop="appreciatorType" label="认账方式" width="120">
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
        <el-table-column prop="appreciatorDate" label="认账时间" width="120">
        </el-table-column>
      </el-table>
      <div class="totalmoney">
        <div class="span1" :style="`left:${200 + leftwidth}px`">
          交易金额:{{
            totalmoney.tranAmount ? totalmoney.tranAmount.toFixed(2) : ""
          }}
        </div>
        <div class="span2" :style="`left:${320 + leftwidth}px`">
          清算金额:{{
            totalmoney.clearAmount ? totalmoney.clearAmount.toFixed(2) : ""
          }}
        </div>
        <div class="span3" :style="`left:${440 + leftwidth}px`">
          手续费:{{ totalmoney.tranFee ? totalmoney.tranFee.toFixed(2) : "" }}
        </div>
      </div>
    </div>

    <div class="customedetail">
      <div class="title">收款凭证</div>
      <el-table
        ref="singleTable1"
        height="150"
        :data="tableData1"
        border
        highlight-current-row
        @current-change="singleCurrentChange"
      >
        <el-table-column prop="FKGX_FJID" label="资源代码" width="120">
        </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称"> </el-table-column>
        <el-table-column prop="SKPZ_JKR" label="交款人"> </el-table-column>
        <el-table-column prop="SKPZ_TZRQ" label="收清日期" width="120">
        </el-table-column>
        <el-table-column prop="SKPZ_RZSJ" label="到账时间"> </el-table-column>
        <el-table-column prop="SKPZ_SKJE" label="收款金额" width="120">
        </el-table-column>
        <el-table-column prop="SKPZ_SKR" label="收款人"> </el-table-column>
      </el-table>
    </div>
    <div class="customedetail">
      <div class="title">凭证明细</div>
      <el-table ref="singleTable2" height="150" :data="tableData2" border>
        <el-table-column prop="SKMX_SKFYMC" label="收款费用" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SSNY" label="所属年月" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SKFS" label="收款方式" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SKJE" label="收款金额" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SL" label="税率" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_BHSJE" label="金额（不含税）" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_KPJE" label="开票金额" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_PJH" label="票据号" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_NYMC" label="费用期间" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_BZ" label="备注"> </el-table-column>
      </el-table>
    </div>

    <Reconciliation
      :Reconciliationshow.sync="Reconciliationshow"
      ref="Reconciliation"
      @RefreshItem="getTableData()"
    >
    </Reconciliation>
  </div>
</template>
<script>
import {
  queryposCreditCheck,
  queryposCreditCheckTotal,
  recogniseConfirmation,
  stoneToCancel,
  queryVoucherDetail,
  queryDetail,
  queryBankPulldownSelect,
  queryImportDate,
  exportPosCreditCheck,
} from "@/api/BankReconciliation/POSPayCard";
import Reconciliation from "./components/Reconciliation";
export default {
  name: "POSPayCard",
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      searchList: {
        importDate: "",
      },
      tableRow: {}, //修改数据
      options: [],
      multipleSelection: [],
      totalmoney: {},
      Reconciliationshow: false,
      rcheck: true,
      statustype1: true,
      statustype2: true,
      statustype3: true,
      timeoptions: [],
      leftwidth: 0,
    };
  },
  watch: {},
  created() {
    var leftwidth = window.screen.width > 1025 ? 300 : 0;
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
    this.searchList = {
      accountingStartDate: `${year}-${month}-01`,
      accountingEndDate: `${year}-${month}-${day}`,
      GLCNAME: this.currentPlot,
    };
    queryBankPulldownSelect().then((response) => {
      this.options = response;
    });
    this.getTableData();
  },
  components: {
    Reconciliation,
  },
  methods: {
    downloData() {
      exportPosCreditCheck(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `POS刷卡列表.xls`;
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
      var data = this.multipleSelection;
      var subscribeDetailId = [];
      var subscribeBillId = [];
      for (var i in data) {
        subscribeDetailId.push(data[i].subscribeDetailId);
        subscribeBillId.push(data[i].subscribeBillId);
      }
      this.$refs.Reconciliation.getReportData(
        this.multipleSelection,
        subscribeDetailId.join(","),
        subscribeBillId.join(",")
      );
    },
    posdo2() {
      var data = this.multipleSelection;
      var subscribeDetailId = [];
      for (var i in data) {
        subscribeDetailId.push(data[i].subscribeDetailId);
      }
      this.$confirm("是否对已选择数据进行认账确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          recogniseConfirmation({
            subscribeDetailId: subscribeDetailId.join(","),
          }).then((response) => {
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    posdo3() {
      var data = this.multipleSelection;
      var subscribeDetailId = [];
      for (var i in data) {
        subscribeDetailId.push(data[i].subscribeDetailId);
      }
      this.$confirm("是否对已选择数据进行认账撤销？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          stoneToCancel({
            subscribeDetailId: subscribeDetailId.join(","),
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
      queryposCreditCheck(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.$refs.multipleTable.setCurrentRow();
      });
      queryposCreditCheckTotal(this.searchList).then((response) => {
        this.totalmoney = response;
      });
    },
    singleCurrentChange(val) {
      queryDetail({
        SKPZ_ZJ: val.SKPZ_ZJ,
        code: val.code,
      }).then((response) => {
        this.tableData2 = response.data;
      });
    },
    getdetail(data) {
      queryVoucherDetail(data).then((response) => {
        this.tableData1 = response.data;
        if (response.data) {
          this.$refs.singleTable1.setCurrentRow(response.data[0]);
          queryDetail({
            SKPZ_ZJ: response.data[0].SKPZ_ZJ,
            code: response.data[0].code,
          }).then((responses) => {
            this.tableData2 = responses.data;
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      var data = this.multipleSelection;
      var subscribeDetailId = [];
      var tranDatelist = [];
      for (var i in data) {
        subscribeDetailId.push(data[i].subscribeDetailId);
      }

      var statuslist = [];
      var tranDateList = [];
      var accountingDate = [];
      var j = 0;
      for (var i in data) {
        if (statuslist.indexOf(data[i].status) == -1) {
          statuslist.push(data[i].status);
        }
        if (tranDateList.indexOf(data[i].tranDate) == -1) {
          tranDateList.push(data[i].tranDate);
        }
        if (accountingDate.indexOf(data[i].accountingDate) == -1) {
          accountingDate.push(data[i].accountingDate);
        }
        if (data[i].status === "认账撤销" || data[i].status === "未认账") {
          j++;
        }
      }
      var check = statuslist.length === 1;

      this.statustype1 = true;
      this.statustype2 = true;
      this.statustype3 = true;

      this.statustype1 =
        j === val.length &&
        tranDateList.length === 1 &&
        accountingDate.length === 1
          ? false
          : true;

      if (check) {
        this.statustype2 = statuslist[0] === "认账中" ? false : true;
        this.statustype3 = statuslist[0] === "已认账" ? false : true;
      }
    },
    rowClick(row) {
      this.tableData2 = [];
      this.getdetail({ subscribeDetailId: row.subscribeDetailId });
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
.POSPayCard .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.POSPayCard {
  .mycell .el-checkbox__input {
    display: none !important;
  }
  .mycell .tableindex {
    display: none !important;
  }
}

.POSPayCard .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}

.POSPayCard .el-date-editor {
  width: 100% !important;
}

.POSPayCard .totalmoney {
  border-left: 1px solid #d5d6db;
  border-right: 1px solid #d5d6db;
  border-bottom: 1px solid #d5d6db;
  height: 30px;
  line-height: 30px;
  text-align: left;
  position: relative;
  .span1 {
    position: absolute;
    left: 540px;
  }
  .span2 {
    position: absolute;
    left: 660px;
  }
  .span3 {
    position: absolute;
    left: 780px;
  }
}
</style>
