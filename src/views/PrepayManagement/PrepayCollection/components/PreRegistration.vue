<template>
  <div class="PreRegistration">
    <div class="title message">
      当前客户：<span class="value">{{ FCDM_MC }}</span> 预交金额：<span
        class="value"
        >{{ Balance.YJYE_YJKYE }}</span
      >
      可用金额：<span class="value">{{ Balance.YJYE_kYJE }}</span>
    </div>
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="prepayFun"
        :disabled="KHMes.KHDA_ZJ == ''"
        :title="KHMes.payer"
        v-has="'PCprepay_has'"
      >
        预交收款</el-button
      >
    </div>
    <!-- 按钮end -->
    <div class="PrepaySchemesubject">
      <el-table
        ref="singleTable"
        height="200"
        :data="tableData"
        @row-click="rowclick"
        highlight-current-row
      >
        <el-table-column prop="KHDA_KHMC" label="客户名称" width="130">
        </el-table-column>
        <el-table-column prop="YJFA_FAMC" label="预交方案名称" width="180">
        </el-table-column>
        <el-table-column prop="YJYE_QCYE" label="预交初期余额" width="180">
        </el-table-column>
        <el-table-column prop="YJYE_YJKYE" label="预交余额" width="120">
        </el-table-column>
        <el-table-column prop="YJYE_DJJE" label="冻结余额" width="120">
        </el-table-column>
        <el-table-column prop="YJYE_CDSX" label="冲抵级别" width="120">
        </el-table-column>
        <el-table-column
          prop="YJYE_ZDFJIDC"
          label="冲抵指定资源列表"
          min-width="130"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="YJYE_ZDFJIDC"
              @click.stop="CDZYclick(scope.row)"
              >{{ scope.row.YJYE_ZDFJIDC }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="PrepaySchemedetail">
      <div class="title">预交记录</div>
      <div class="button buttonBox">
        <el-button
          type="primary"
          :disabled="radio == null"
          @click="refundFun"
          v-has="'PCrefund_has'"
        >
          退款</el-button
        >
        <el-button
          type="primary"
          :disabled="radio == null"
          @click="feeezeFun"
          v-has="'PCfeeeze_has'"
        >
          冻结/解冻</el-button
        >
      </div>
      <el-table
        ref="singleTable1"
        height="200"
        :data="tableData1"
        @row-click="rowclick1"
      >
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="YJPZ_TZRQ" label="交款日期" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_BH" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_YJJE" label="预交金额(含税)" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_SL" label="税率" width="80">
        </el-table-column>
        <el-table-column prop="YJMX_BHSJE" label="预交金额(不含税)" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_SE" label="税额" width="80">
        </el-table-column>
        <el-table-column prop="YJMX_DJJE" label="冻结金额" width="100">
        </el-table-column>
        <el-table-column prop="YJMX_DQYE" label="可用余额" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_YJFS" label="预交方式" width="100">
        </el-table-column>
        <el-table-column
          prop="YJMX_ZY"
          label="摘要"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="YJPZ_JKR" label="交款人" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_SKR" label="收款人" width="100">
        </el-table-column>
        <el-table-column
          prop="YJMX_YJBZ"
          label="备注"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="YJMX_CDQSNY" label="冲抵起始年月" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_CDJZNY" label="冲抵截止年月" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="PrepaySchemedetail">
      <div class="title">退款记录</div>
      <el-table ref="singleTable2" max-height="200" :data="tableData2">
        <el-table-column prop="YJPZ_TZRQ" label="交款日期" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_BH" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_YJJE" label="预交金额(含税)" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_SL" label="税率" width="80">
        </el-table-column>
        <el-table-column prop="YJMX_BHSJE" label="预交金额(不含税)" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_SE" label="税额" width="80">
        </el-table-column>
        <el-table-column
          prop="YJMX_ZY"
          label="摘要"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="YJPZ_JKR" label="交款人" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_SKR" label="收款人" width="100">
        </el-table-column>
        <el-table-column
          prop="YJMX_YJBZ"
          label="备注"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <freezeDialog
      :show.sync="show"
      ref="freezeDialog"
      @RefreshItem="getTableData"
    ></freezeDialog>
    <refundDialog
      :rshow.sync="rshow"
      ref="refundDialog"
      @RefreshItem="getTableData"
    ></refundDialog>
    <PrepaymentDialog
      :pshow.sync="pshow"
      ref="PrepaymentDialog"
    ></PrepaymentDialog>
    <BreakdownDetailsDialog
      :bshow.sync="bshow"
      ref="BreakdownDetailsDialog"
      @RefreshItem="getTableDatas"
    >
    </BreakdownDetailsDialog>
  </div>
</template>
<script>
import freezeDialog from "./freezeDialog";
import refundDialog from "./refundDialog";
import PrepaymentDialog from "./PrepaymentDialog";
import BreakdownDetailsDialog from "./BreakdownDetailsDialog";
import { formatMoney } from "@/utils/global.js";
import {
  getBalanceInformation,
  queryPrepaymentRegister,
  queryPrepayRecord,
} from "@/api/PrepayManagement/PrepayCollection";
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      show: false,
      pshow: false,
      rshow: false,
      bshow: false,
      Balance: {
        YJYE_YJKYE: 0.0,
        YJYE_DJJE: 0.0,
        YJYE_kYJE: 0.0,
      },
      FKGX_ZJ: "",
      FCDM_MC: "",
      radio: null,
      tableRow: {},
      tableRow1: {},
      KHMes: {
        KHDA_ZJ: "",
        FKGX_ZJ: "",
        payer: "",
      },
    };
  },
  components: {
    freezeDialog,
    PrepaymentDialog,
    refundDialog,
    BreakdownDetailsDialog,
  },
  methods: {
    CDZYclick(row) {
      //冲抵明细编辑
      this.$refs.BreakdownDetailsDialog.getReportData(row);
      this.bshow = true;
    },
    setKHMes(KHDA_ZJ, FKGX_ZJ, payer) {
      //获取选中客户信息
      this.KHMes = {
        KHDA_ZJ: KHDA_ZJ,
        FKGX_ZJ: FKGX_ZJ,
        payer: payer,
      };
    },
    BalanceMes(FKGX_ZJ, FCDM_MC) {
      //预交信息
      this.FKGX_ZJ = FKGX_ZJ;
      this.FCDM_MC = FCDM_MC;
      this.radio = null;
      getBalanceInformation({
        //余额查询
        FKGX_ZJ: FKGX_ZJ,
      }).then((response) => {
        this.Balance = {
          YJYE_YJKYE: formatMoney(
            parseFloat(response.data[0].YJYE_YJKYE),
            true
          ),
          YJYE_DJJE: formatMoney(parseFloat(response.data[0].YJYE_DJJE), true),
          YJYE_kYJE: formatMoney(
            parseFloat(response.data[0].YJYE_YJKYE) -
              parseFloat(response.data[0].YJYE_DJJE),
            true
          ),
        };
      });
      queryPrepaymentRegister({
        //查询预交登记
        FKGX_ZJ: FKGX_ZJ,
      }).then((response) => {
        this.tableData = response.data;
      });
      this.tableData1 = [];
      this.tableData2 = [];
    },
    clearMes() {
      //清除信息
      this.FKGX_ZJ = "";
      this.FCDM_MC = "";
      this.radio = null;
      this.Balance = {
        YJYE_YJKYE: 0.0,
        YJYE_DJJE: 0.0,
        YJYE_kYJE: 0.0,
      };
      this.tableData = [];
      this.tableData1 = [];
      this.tableData2 = [];
    },
    rowclick(row) {
      //预交列表点击事件
      this.tableRow = row;
      queryPrepayRecord({
        //预交记录
        FKGX_ZJ: row.YJYE_FKGXWJ,
        YJYE_YJFAWJ: row.YJYE_YJFAWJ,
        YJPZ_PZLX: 0,
      }).then((response) => {
        this.tableData1 = response.data;
      });
      queryPrepayRecord({
        //退款记录
        FKGX_ZJ: row.YJYE_FKGXWJ,
        YJYE_YJFAWJ: row.YJYE_YJFAWJ,
        YJPZ_PZLX: 1,
      }).then((response) => {
        this.tableData2 = response.data;
      });
    },
    rowclick1(row) {
      //预交明细点击事件
      this.tableRow1 = row;
      this.radio = this.tableData1.indexOf(row); //单行点击单选按钮选中
    },
    feeezeFun() {
      //冻结解冻
      this.$refs.freezeDialog.getReportData(
        this.tableRow.YJYE_ZJ,
        this.tableRow1
      );
      this.show = true;
    },
    refundFun() {
      //退款
      this.$refs.refundDialog.getReportData(this.tableRow, this.tableRow1);
      this.rshow = true;
    },
    prepayFun() {
      //预交收款
      this.$refs.PrepaymentDialog.getReportData(this.KHMes);
      this.pshow = true;
    },
    getTableData() {
      getBalanceInformation({
        //余额查询
        FKGX_ZJ: this.FKGX_ZJ,
      }).then((response) => {
        this.Balance = {
          YJYE_YJKYE: formatMoney(
            parseFloat(response.data[0].YJYE_YJKYE),
            true
          ),
          YJYE_DJJE: formatMoney(parseFloat(response.data[0].YJYE_DJJE), true),
          YJYE_kYJE: formatMoney(
            parseFloat(response.data[0].YJYE_YJKYE) -
              parseFloat(response.data[0].YJYE_DJJE),
            true
          ),
        };
      });
      queryPrepaymentRegister({
        //查询预交登记
        FKGX_ZJ: this.FKGX_ZJ,
      }).then((response) => {
        this.tableData = response.data;
      });
      queryPrepayRecord({
        //预交记录
        FKGX_ZJ: this.tableRow.YJYE_FKGXWJ,
        YJYE_YJFAWJ: this.tableRow.YJYE_YJFAWJ,
        YJPZ_PZLX: 0,
      }).then((response) => {
        this.tableData1 = response.data;
        this.radio = null;
      });
      queryPrepayRecord({
        //退款记录
        FKGX_ZJ: this.tableRow.YJYE_FKGXWJ,
        YJYE_YJFAWJ: this.tableRow.YJYE_YJFAWJ,
        YJPZ_PZLX: 1,
      }).then((response) => {
        this.tableData2 = response.data;
      });
    },
    getTableDatas() {
      queryPrepaymentRegister({
        //查询预交登记
        FKGX_ZJ: this.FKGX_ZJ,
      }).then((response) => {
        this.tableData = response.data;
        this.tableData1 = [];
        this.tableData2 = [];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.PreRegistration {
  padding: 15px;
  overflow: auto;
}

.PreRegistration .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}
.PreRegistration .message {
  font-size: 15px;
  color: #808080;
  font-family: Microsoft YaHei;
  .value {
    color: #2e2b2e;
    margin-right: 15px;
  }
}

.PreRegistration .YJYE_ZDFJIDC {
  text-decoration: underline;
}
</style>
