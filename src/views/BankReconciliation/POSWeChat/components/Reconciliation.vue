<template>
  <div class="Reconciliation">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-fourfold"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="房间名称:" label-width="80px">
              <el-select
                v-model="searchList.FJDA_ZJ"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :label="item.FJDA_FJMC"
                  :value="item.FJDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="客户名称:" label-width="80px">
              <el-select
                v-model="searchList.SKPZ_KHMC"
                placeholder="请选择"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :label="item.KHDA_KHMC"
                  :value="item.KHDA_KHMC"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="交款人:" label-width="80px">
              <el-input v-model="searchList.SKPZ_JKR" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收款人:" label-width="80px">
              <el-input v-model="searchList.SKPZ_SKR" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="起始日期:" label-width="80px">
              <el-date-picker
                type="date"
                v-model="searchList.date_start"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="截止日期:" label-width="80px">
              <el-date-picker
                type="date"
                v-model="searchList.date_end"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收款方式:" label-width="80px">
              <el-select
                v-model="searchList.SKMX_SKFS"
                placeholder="请选择"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="" label-width="0">
              <el-button type="success" @click="gettable">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="dialogtable">
        <div class="customedetail">
          <div class="title">
            收款凭证
            <div class="money">
              待认账金额<span class="money1">{{ totalmoney }}</span>
              勾选金额<span class="money2">{{ choosemoney }}</span> 差额<span
                class="money3"
                >{{ surplusmoney }}</span
              >
            </div>
          </div>
          <pl-table
            ref="multipleTable"
            height="250"
            :data="tableData1"
            border
            highlight-current-row
            @selection-change="handleSelectionChange"
            @current-change="rowClick"
          >
            <pl-table-column type="selection" width="55"> </pl-table-column>
            <pl-table-column prop="FKGX_FJID" label="资源代码" width="120">
            </pl-table-column>
            <pl-table-column prop="KHDA_KHMC" label="客户名称">
            </pl-table-column>
            <pl-table-column prop="SKPZ_JKR" label="交款人" width="120">
            </pl-table-column>
            <pl-table-column prop="SKPZ_TZRQ" label="收款日期" width="120">
            </pl-table-column>
            <pl-table-column prop="SKPZ_RZSJ" label="入账时间" width="150">
            </pl-table-column>
            <pl-table-column prop="SKPZ_SKJE" label="金额" width="120">
            </pl-table-column>
            <pl-table-column prop="SKPZ_SKR" label="收款人" width="120">
            </pl-table-column>
          </pl-table>
        </div>
        <div class="customedetail">
          <div class="title">凭证明细</div>
          <pl-table ref="singleTable" height="250" :data="tableData2" border>
            <pl-table-column
              prop="SKMX_SKFYMC"
              label="收费项目名称"
              width="120"
            >
            </pl-table-column>
            <pl-table-column prop="SKMX_SSNY" label="收款年月" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_SKJE" label="收款金额" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_SKFS" label="收款方式" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_SL" label="税率" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_BHSJE" label="不含税金额" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_KPJE" label="开票金额" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_PJH" label="票据号" width="120">
            </pl-table-column>
            <pl-table-column prop="SKMX_SKZY" label="收款摘要" width="200">
            </pl-table-column>
            <pl-table-column prop="SKMX_BZ" label="备注"> </pl-table-column>
          </pl-table>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sure"
          :disabled="multipleSelection.length === 0"
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryPayingProveDetails,
  queryUnmatchPayingVoucher,
  register,
} from "@/api/BankReconciliation/POSWeChat";
import {
  queryPaymentMethod,
  queryRoomMessage,
  queryClientForRoom,
} from "@/api/BankReconciliation/POSPayCard";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
export default {
  data() {
    return {
      visible: this.Reconciliationshow,
      title: "对账确认", //标题
      tableData1: [],
      tableData2: [],
      subscribeDetailId: "",
      multipleSelection: [],
      data: [],
      SKPZ_ZJ: "",
      SKPZ_SKJE: "",
      options: [],
      options1: [],
      options2: [],
      searchList: {},
      totalmoney: 0,
      choosemoney: 0,
      surplusmoney: 0,
      flag: "",
    };
  },
  components: {
    PlTable,
    PlTableColumn,
  },
  props: {
    Reconciliationshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Reconciliationshow() {
      this.visible = this.Reconciliationshow;
    },
  },
  mounted() {
    queryPaymentMethod().then((response) => {
      this.options = response;
    });
    queryRoomMessage().then((response) => {
      this.options1 = response;
    });
    queryClientForRoom().then((response) => {
      this.options2 = response;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;

      var data = this.multipleSelection;
      var SKPZ_ZJ = [];
      var SKPZ_SKJE = [];
      var flag = [];
      this.choosemoney = 0;

      for (var i in data) {
        SKPZ_ZJ.push(data[i].SKPZ_ZJ);
        SKPZ_SKJE.push(data[i].SKPZ_SKJE);
        flag.push(data[i].flag);
        this.choosemoney += data[i].SKPZ_SKJE;
      }
      this.surplusmoney = (this.totalmoney - this.choosemoney).toFixed(2);
      this.choosemoney = this.choosemoney.toFixed(2);

      this.SKPZ_ZJ = SKPZ_ZJ.join(",");
      this.SKPZ_SKJE = SKPZ_SKJE.join(",");
      this.flag = flag.join(",");
    },
    getdetail(data) {
      queryPayingProveDetails(data).then((response) => {
        this.tableData2 = response.data;
      });
    },
    rowClick(row) {
      this.getdetail({ SKPZ_ZJ: row.SKPZ_ZJ, flag: row.flag });
    },
    tabclick() {},
    getReportData(data) {
      var date = new Date();
      var year = date.getFullYear(); //获取完整的年份(4位)
      var month =
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
      var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
      this.searchList = {
        date_start: `${year}-${month}-01`,
        date_end: `${year}-${month}-${day}`,
      };

      this.totalmoney = 0;
      this.choosemoney = 0;
      this.surplusmoney = 0;
      for (var i in data) {
        this.totalmoney += data[i].tran_amount;
      }
      this.totalmoney = parseFloat(this.totalmoney.toFixed(2));

      this.data = data;
      this.tableData1 = [];
      this.tableData2 = [];

      this.multipleSelection = [];
    },
    gettable() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.SKMX_SKFS = data.SKMX_SKFS ? data.SKMX_SKFS.join(",") : "";
      queryUnmatchPayingVoucher(data).then((response) => {
        this.tableData1 = response.data;
      });
    },
    sure() {
      var data = this.data;
      var subscribe_bill_id = [];
      var subscribe_detail_id = [];
      var clear_date = data[0].clear_date;
      var tran_date = data[0].tran_date;
      var tran_time = `${data[0].tran_time}`;
      var terminal_num = data[0].terminal_num;
      var tran_amount = 0;
      var clear_amount = 0;
      var tran_fee = 0;
      var appreciator_type = data[0].appreciator_type;
      var payment_method = data[0].payment_method;
      var status = data[0].status;
      var import_date = data[0].import_date;
      var branch_name = data[0].branch_name;
      var accounting_date = data[0].accounting_date;
      var bank = data[0].bank;

      for (var i in data) {
        subscribe_bill_id.push(data[i].subscribe_bill_id);
        subscribe_detail_id.push(data[i].subscribe_detail_id);
        tran_amount += data[i].tran_amount;
        clear_amount += data[i].clear_amount;
        tran_fee += data[i].tran_fee;
      }
      register({
        subscribe_bill_id: subscribe_bill_id.join(","),
        subscribe_detail_id: subscribe_detail_id.join(","),
        clear_date: clear_date,
        tran_date: tran_date,
        tran_time: tran_time,
        terminal_num: terminal_num,
        tran_amount: tran_amount,
        clear_amount: clear_amount,
        tran_fee: tran_fee,
        appreciator_type: appreciator_type,
        payment_method: payment_method,
        status: status,
        SKPZ_ZJ: this.SKPZ_ZJ,
        SKPZ_SKJE: this.SKPZ_SKJE,
        flag: this.flag,
        import_date: import_date,
        branch_name: branch_name,
        accounting_date: accounting_date,
        bank: bank,
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    cancle() {
      this.$emit("update:Reconciliationshow", false);
    },
  },
};
</script>

<style lang="scss">
.Reconciliation .el-tabs {
  padding: 0 33px;
}

.Reconciliation .el-tabs__nav {
  background: #ffffff;
  border-top-right-radius: 10px !important;
}

.Reconciliation .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
  border-bottom: none;
  color: #4d4d4d;
  background: #ffffff;
  font-weight: bold;
  border-top-right-radius: 10px !important;
  border-right: 1px solid #e4e7ed;
  width: 100px;
}

.Reconciliation .el-tabs__item.is-active {
  background: #2e8ad7 !important;
  color: #ffffff !important;
  border-top-right-radius: 10px;
}

.Reconciliation .el-tabs__header {
  margin-bottom: 0;
}

.Reconciliation .chooseroom {
  width: 100%;
  height: 80px;
  padding: 0 33px;
  .room {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(217, 217, 215, 1);
    border-radius: 8px;
    text-align: left;
    padding: 10px 20px 0 20px;
  }
}
.Reconciliation .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding: 0 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(44, 138, 216, 1);
}

.Reconciliation .buttonBox {
  padding-left: 33px;
  text-align: left;
  padding-bottom: 7px;
}

.Reconciliation .el-carousel img {
  height: 100%;
}

.Reconciliation .dialogtable {
  padding: 10px;
}

.Reconciliation .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #262626;
  line-height: 32px;
  position: relative;
  .money {
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 100;
    font-size: 14px;
    .money1 {
      font-weight: bold;
      margin-left: 5px;
      margin-right: 15px;
    }
    .money2 {
      font-weight: bold;
      margin-left: 5px;
      margin-right: 15px;
    }
    .money3 {
      font-weight: bold;
      margin-left: 5px;
      margin-right: 15px;
    }
  }
}
</style>
