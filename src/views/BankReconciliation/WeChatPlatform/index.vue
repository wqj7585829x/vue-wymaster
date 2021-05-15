<template>
  <div class="container WeChatPlatform">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="记账开始日期：">
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
          <el-form-item label="记账结束日期：">
            <el-date-picker
              type="date"
              v-model="searchList.tranDateEndDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="清算日期：">
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
              v-has="'POSWeChatARRegister_has'"
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
        @click="posdo2"
        :disabled="multipleSelection.length === 0 || statustype1"
        v-has="'WeChatPlatformARSure_has'"
      >
        认账确认</el-button
      >
      <el-button
        type="primary"
        @click="posdo3"
        :disabled="multipleSelection.length === 0 || statustype2"
        v-has="'WeChatPlatformARRevoke_has'"
      >
        认账撤销</el-button
      >
      <el-button
        type="success"
        @click="downloData()"
        v-has="'WeChatPlatformExcel_has'"
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
        highlight-current-row
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tran_date" label="交易日期" width="120">
        </el-table-column>
        <el-table-column prop="branch_name" label="分店名称"> </el-table-column>
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
        <el-table-column prop="appreciator_type" label="认账方式" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.appreciator_type == 1">自动认账</div>
            <div v-if="scope.row.appreciator_type == 2">手动认账</div>
            <div v-if="scope.row.appreciator_type == 3">其他</div>
          </template>
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_date" label="认账时间" width="120">
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
        <el-table-column prop="SKPZ_ZYDM" label="资源代码"> </el-table-column>
        <el-table-column prop="SKPZ_JKR" label="交款人"> </el-table-column>
        <el-table-column prop="SKPZ_SKR" label="收款人"> </el-table-column>
        <el-table-column prop="SKPZ_SKJE" label="收款金额"> </el-table-column>
        <el-table-column prop="SKPZ_RZSJ" label="入账时间"> </el-table-column>
        <el-table-column prop="SKPZ_TZRQ" label="填制日期"> </el-table-column>
        <el-table-column prop="SKPZ_KHMC" label="客户名称"> </el-table-column>
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
  queryPlotSubscribeBill,
  queryPlotVoucher,
  queryPlotVoucherDetaile,
  updateSubscribeDetailTOConfirm,
  updateSubscribeDetailTOExamine,
  getMaxImportDate,
  exportPlotSubscribeBill,
} from "@/api/BankReconciliation/WeChatPlatform";
import { queryBankPulldownSelect } from "@/api/BankReconciliation/POSPayCard";
export default {
  name: "WeChatPlatform",
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
      timeoptions: [],
    };
  },
  watch: {},
  mounted() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
    this.searchList = {
      importStartDate: `${year}-${month}-01`,
      tranDateEndDate: `${year}-${month}-${day}`,
      bill_type: "",
      status: "",
    };
    this.getTableData();

    queryBankPulldownSelect().then((response) => {
      this.options = response;
    });
  },
  methods: {
    downloData() {
      exportPlotSubscribeBill(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `微信平台列表.xls`;
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
          updateSubscribeDetailTOConfirm({
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
          updateSubscribeDetailTOExamine({
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
      this.tableData1 = [];
      this.tableData2 = [];
      this.getTableData();
    },
    getTableData() {
      queryPlotSubscribeBill(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.$refs.multipleTable.setCurrentRow();
        if (response.data.length > 0) {
          this.$refs.multipleTable.setCurrentRow(response.data[0]);
          this.getdetail({
            subscribe_bill_id: response.data[0].subscribe_bill_id,
          });
        }
      });
    },
    getdetail(data) {
      queryPlotVoucher(data).then((response) => {
        this.tableData1 = response;

        if (response.length > 0) {
          this.$refs.singleTable1.setCurrentRow(response[0]);
          queryPlotVoucherDetaile({
            SKPZ_ZJ: response[0].SKPZ_ZJ,
          }).then((response) => {
            this.tableData2 = response;
          });
        }
      });
    },
    CurrentChange(val) {
      if (val) {
        queryPlotVoucherDetaile({
          SKPZ_ZJ: val.SKPZ_ZJ,
        }).then((response) => {
          this.tableData2 = response;
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      var data = this.multipleSelection;
      var statuslist = [];
      for (var i in data) {
        if (statuslist.indexOf(data[i].status) == -1) {
          statuslist.push(data[i].status);
        }
      }
      var check = statuslist.length === 1;

      this.statustype1 = true;
      this.statustype2 = true;
      if (check) {
        this.statustype1 = statuslist[0] === 2 ? false : true;
        this.statustype2 = statuslist[0] === 1 ? false : true;
      }
    },
    rowClick(row) {
      if (row) {
        this.tableData2 = [];
        this.getdetail({ subscribe_bill_id: row.subscribe_bill_id });
      }
    },
  },
};
</script>
<style lang="scss">
.WeChatPlatform .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.WeChatPlatform .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}

.WeChatPlatform .el-input {
  width: 100% !important;
}

.WeChatPlatform .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}
</style>
