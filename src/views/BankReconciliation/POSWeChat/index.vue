<template>
  <div class="container POSWeChat">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.accounting_date_start"
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
              v-model="searchList.accounting_date_end"
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
              v-model="searchList.import_date_start"
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
              v-model="searchList.import_date_end"
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
              v-has="'POSWeChatSearch_has'"
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
        v-has="'POSWeChatARRegister_has'"
      >
        认账登记</el-button
      >
      <el-button
        type="primary"
        @click="posdo2"
        :disabled="multipleSelection.length === 0 || statustype2"
        v-has="'POSWeChatARSure_has'"
      >
        认账确认</el-button
      >
      <el-button
        type="primary"
        @click="posdo3"
        :disabled="multipleSelection.length === 0 || statustype3"
        v-has="'POSWeChatARRevoke_has'"
      >
        认账撤销</el-button
      >
      <el-button
        type="success"
        @click="downloData()"
        v-has="'POSWeChatExcel_has'"
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
        highlight-current-row
        @current-change="rowClick"
        :tree-props="{ children: 'list' }"
        row-key="subscribe_detail_id"
        :cell-class-name="checkbox"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ getindex(scope) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="clear_date" label="清算日期" width="150">
        </el-table-column>
        <el-table-column prop="tran_date" label="交易日期" width="120">
        </el-table-column>
        <el-table-column prop="tran_time" label="交易时间" width="150">
        </el-table-column>
        <el-table-column prop="accounting_date" label="到账日期" width="150">
        </el-table-column>
        <el-table-column prop="import_date" label="导入日期" width="150">
        </el-table-column>
        <el-table-column prop="terminal_num" label="终端号" width="120">
        </el-table-column>
        <el-table-column prop="tran_amount" label="交易金额" width="120">
        </el-table-column>
        <el-table-column prop="clear_amount" label="清算金额" width="120">
        </el-table-column>
        <el-table-column prop="tran_fee" label="手续费" width="120">
        </el-table-column>
        <el-table-column prop="payment_method" label="支付方式" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.payment_method == 1">pos刷卡</div>
            <div v-if="scope.row.payment_method == 2">POS支付宝</div>
            <div v-if="scope.row.payment_method == 3">pos微信</div>
            <div v-if="scope.row.payment_method == 4">微信支付</div>
            <div v-if="scope.row.payment_method == 5">APP对账</div>
            <div v-if="scope.row.payment_method == 6">转账</div>
            <div v-if="scope.row.payment_method == 7">扫码盒子</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="认账状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">未认账</div>
            <div v-if="scope.row.status == 1">已认账</div>
            <div v-if="scope.row.status == 2">认账中</div>
            <div v-if="scope.row.status == 3">认账撤销</div>
            <div v-if="scope.row.status == 4">审核中</div>
          </template>
        </el-table-column>
        <el-table-column prop="bank" label="到账银行" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_type" label="认账方式" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.appreciator_type == 1">自动认账</div>
            <div v-if="scope.row.appreciator_type == 2">手动认账</div>
            <div v-if="scope.row.appreciator_type == 3">其他</div>
          </template>
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_date" label="认账日期" width="120">
        </el-table-column>
      </el-table>
      <div class="totalmoney">
        <div class="span1" :style="`left:${200 + leftwidth}px`">
          交易金额:{{
            totalmoney.tran_amount ? totalmoney.tran_amount.toFixed(2) : ""
          }}
        </div>
        <div class="span2" :style="`left:${320 + leftwidth}px`">
          清算金额:{{
            totalmoney.clear_amount ? totalmoney.clear_amount.toFixed(2) : ""
          }}
        </div>
        <div class="span3" :style="`left:${440 + leftwidth}px`">
          手续费:{{ totalmoney.tran_fee ? totalmoney.tran_fee.toFixed(2) : "" }}
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
        @current-change="CurrentChange"
      >
        <el-table-column prop="FKGX_FJID" label="资源代码"> </el-table-column>
        <el-table-column prop="SKPZ_JKR" label="交款人"> </el-table-column>
        <el-table-column prop="SKPZ_SKR" label="收款人"> </el-table-column>
        <el-table-column prop="SKPZ_SKJE" label="收款金额"> </el-table-column>
        <el-table-column prop="SKPZ_RZSJ" label="入账时间"> </el-table-column>
        <el-table-column prop="SKPZ_TZRQ" label="填制日期"> </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称"> </el-table-column>
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
        <el-table-column prop="SKMX_SKFS" label="收款方式" width="120">
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
  queryAlipayAndWeChatCheck,
  getAlipayAndWeChatCheckSum,
  confirmCheck,
  cancelCheck,
  queryPayingVoucher,
  queryPayingProveDetails,
  queryImportDate,
  exportReconciliationList,
} from "@/api/BankReconciliation/POSWeChat";
import { queryBankPulldownSelect } from "@/api/BankReconciliation/POSPayCard";
import Reconciliation from "./components/Reconciliation";
export default {
  name: "POSWeChat",
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      searchList: {},
      tableRow: {}, //修改数据
      options: [],
      multipleSelection: [],
      totalmoney: {},
      Reconciliationshow: false,
      statustype1: true,
      statustype2: true,
      statustype3: true,
      timeoptions: [],
      leftwidth: 0,
    };
  },
  components: {
    Reconciliation,
  },
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
      accounting_date_start: `${year}-${month}-01`,
      accounting_date_end: `${year}-${month}-${day}`,
    };

    queryBankPulldownSelect().then((response) => {
      this.options = response;
    });
    this.getTableData();
  },
  methods: {
    downloData() {
      exportReconciliationList(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `POS支付宝/微信列表.xls`;
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
      var subscribe_detail_id = [];
      for (var i in data) {
        subscribe_detail_id.push(data[i].subscribe_detail_id);
      }
      this.$confirm("是否对已选择数据进行认账确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          confirmCheck({
            subscribe_detail_id: subscribe_detail_id.join(","),
          }).then((response) => {
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    posdo3() {
      var data = this.multipleSelection;
      var subscribe_detail_id = [];
      for (var i in data) {
        subscribe_detail_id.push(data[i].subscribe_detail_id);
      }
      this.$confirm("是否对已选择数据进行认账撤销？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelCheck({
            subscribe_detail_id: subscribe_detail_id.join(","),
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
    getdetail(data1) {
      queryPayingVoucher(data1).then((response) => {
        this.tableData1 = response.data;
        var data = response.data;
        if (data.length > 0) {
          this.$refs.singleTable1.setCurrentRow(data[0]);
          queryPayingProveDetails({
            SKPZ_ZJ: data[0].SKPZ_ZJ,
            flag: data[0].flag,
          }).then((response) => {
            this.tableData2 = response.data;
          });
        }
      });
    },
    CurrentChange(val) {
      queryPayingProveDetails({
        SKPZ_ZJ: val.SKPZ_ZJ,
        flag: val.flag,
      }).then((response) => {
        this.tableData2 = response.data;
      });
    },
    getTableData() {
      queryAlipayAndWeChatCheck(this.searchList).then((response) => {
        var data = response.data;
        var key = 0;
        for (var i in data) {
          data[i].tableid = key;
          key++;
          if (data[i].list) {
            var datalist = data[i].list;
            for (var j in datalist) {
              data[i].list[j].tableid = key;
              key++;
            }
          }
        }

        this.tableData = data;
        this.returnTotal = response.total;
        this.$refs.multipleTable.setCurrentRow();
      });
      getAlipayAndWeChatCheckSum(this.searchList).then((response) => {
        this.totalmoney = response.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      var data = this.multipleSelection;
      var statuslist = [];
      var accounting_date = [];
      var j = 0;
      for (var i in data) {
        if (statuslist.indexOf(data[i].status) == -1) {
          statuslist.push(data[i].status);
        }
        if (data[i].status === 0 || data[i].status === 3) {
          j++;
        }
        if (accounting_date.indexOf(data[i].accounting_date) == -1) {
          accounting_date.push(data[i].accounting_date);
        }
      }
      var check = statuslist.length === 1;

      this.statustype1 = true;
      this.statustype2 = true;
      this.statustype3 = true;

      this.statustype1 =
        j === val.length && accounting_date.length === 1 ? false : true;
      if (check) {
        this.statustype2 = statuslist[0] === 2 ? false : true;
        this.statustype3 = statuslist[0] === 1 ? false : true;
      }
    },
    rowClick(row) {
      this.tableData2 = [];
      this.getdetail({ subscribe_detail_id: row.subscribe_detail_id });
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
.POSWeChat .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.POSWeChat {
  .mycell .el-checkbox__input {
    display: none !important;
  }
  .mycell .tableindex {
    display: none !important;
  }
}

.POSWeChat .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}

.POSWeChat .el-date-editor {
  width: 100% !important;
}

.POSWeChat .totalmoney {
  border-left: 1px solid #d5d6db;
  border-right: 1px solid #d5d6db;
  border-bottom: 1px solid #d5d6db;
  height: 30px;
  line-height: 30px;
  text-align: left;
  position: relative;
  .span1 {
    position: absolute;
  }
  .span2 {
    position: absolute;
  }
  .span3 {
    position: absolute;
  }
}
</style>
