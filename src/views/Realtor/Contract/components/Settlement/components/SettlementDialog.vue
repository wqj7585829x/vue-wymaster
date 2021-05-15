<template>
  <div class="SettlementDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="printbody" ref="capture">
        <div class="buttonBox">未收清费用</div>
        <el-table ref="multipleTable" :data="tableData1" border>
          <el-table-column
            prop="FYSQ_SSNY"
            label="所属年月"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="FJDA_FJID"
            label="房间代码"
            width="105"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_SFXMMC"
            label="收费项目"
            width="70"
          ></el-table-column>
          <el-table-column prop="FYSQ_ZY" label="摘要"></el-table-column>
          <el-table-column
            prop="FYSQ_QSJE"
            label="欠收金额"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_YSJE"
            label="应收金额"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_SSJE"
            label="实收金额"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_YSRQ"
            label="应收日期"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_TZNY"
            label="调整年月"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_TZR"
            label="调整人"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_TZSM"
            label="调整说明"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_FYJE"
            label="费用金额"
            width="75"
          ></el-table-column>
          <el-table-column
            prop="FYSQ_JMJE"
            label="减免金额"
            width="75"
          ></el-table-column>
        </el-table>
        <div class="totalamount">未收清费用合计：¥{{ money1 }}</div>
        <div class="buttonBox">移交清单验收</div>
        <div class="Ftitle Ftitle_1">房屋装修状况</div>
        <el-table ref="multipleTable" :data="tableData4" border>
          <el-table-column
            prop="roomName"
            label="房间名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="120"
          ></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column
            prop="houseDeductMoney"
            label="扣款金额"
            width="120"
          ></el-table-column>
        </el-table>
        <div class="Ftitle">交接当天各项表显示</div>
        <el-table ref="multipleTable" :data="tableData5" border>
          <el-table-column prop="roomName" label="房间名称"></el-table-column>
          <el-table-column prop="meterName" label="仪表名称"></el-table-column>
          <el-table-column
            prop="checkInDate"
            label="入住抄表日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="checkInReading"
            label="入住抄表读数"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="leasebackDate"
            label="退租抄表日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="leasebackReading"
            label="退租抄表读数"
            width="120"
          ></el-table-column>
        </el-table>
        <div class="Ftitle">设施设备交接验收明细表</div>
        <el-table ref="multipleTable" :data="tableData6" border height="100">
          <el-table-column prop="rooName" label="房间名称"></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="model"
            label="型号"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="checkInStatus"
            label="入住状况"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="leasebackStatus"
            label="退租状况"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="deviceDeductMoney"
            label="扣款"
            width="120"
          ></el-table-column>
        </el-table>
        <div class="totalamount">移交清单费用合计：¥{{ money2 + money3 }}</div>
        <div class="buttonBox">押金/保证金</div>
        <el-table ref="multipleTable" :data="tableData2" border>
          <el-table-column
            prop="FJDA_FJID"
            label="资源代码"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="YCXSF_SFXMMC"
            label="收费项目"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="YCXSF_SFJE"
            label="金额"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="YCXSF_TKYE"
            label="余额"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="YCXSF_SFRQ"
            label="交款日期"
            width="120"
          ></el-table-column>
          <el-table-column prop="YCXSF_BZ" label="备注"></el-table-column>
        </el-table>
        <div class="totalamount">押金/保证金费用合计：¥{{ money4 }}</div>
        <div class="buttonBox">
          违约扣款
          <el-button
            type="primary"
            v-if="buttonshow && !SettlementForm.status"
            @click="addFalsify"
            style="margin-left: 15px"
            v-has="'ContractSettlementPaymentAdd_has'"
            >新增</el-button
          >
          <el-button
            type="primary"
            v-if="buttonshow && !SettlementForm.status"
            :disabled="radio === null"
            @click="editFalsify"
            v-has="'ContractSettlementPaymentEdit_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            v-if="buttonshow && !SettlementForm.status"
            :disabled="radio === null"
            @click="deteleFalsify"
            v-has="'ContractSettlementPaymentDelete_has'"
            >删除</el-button
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          @row-click="rowClick"
        >
          <el-table-column fixed label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="penaltyName"
            label="条款名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="penaltyEvent"
            label="条款内容"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="penaltyMoney"
            label="扣款金额"
          ></el-table-column>
        </el-table>
        <div class="totalamount">违约扣款合计：¥{{ money5 }}</div>
        <div class="buttonBox">总计</div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 60%"
        >
          <el-table-column prop="payable" label="应交"></el-table-column>
          <el-table-column prop="refundableTax" label="应退"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sure"
          :disabled="SettlementForm.status"
          >结 算</el-button
        >
        <el-button @click="generatorImage">预览打印</el-button>
      </div>
    </el-dialog>

    <PaymentDialog
      :showPayment.sync="showPayment"
      ref="PopPaymentChildren"
      @RefreshItem="RefreshList"
    ></PaymentDialog>
    <DetailsDialog
      :Detailshow.sync="Detailshow"
      ref="DetailsDialog"
      @RefreshItem="RefreshItem"
    ></DetailsDialog>
  </div>
</template>

<script>
import {
  queryContractingResources,
  squerySecurityDepositList,
  squeryBreachClause,
  queryStayOver,
  queryContractMeter,
  queryContractDevice,
  settleAccounts,
  updateLiquidatedDamages,
  deleteLiquidatedDamages,
  calculationAmount,
} from "@/api/Realtor/Contract";
import { queryRoom } from "@/api/Home/Home";
import html2canvas from "html2canvas";
import PaymentDialog from "./PaymentDialog"; //交款
import DetailsDialog from "./DetailsDialog";
export default {
  data() {
    return {
      visible: this.Settlementshow,
      title: "结算", //标题
      categoryList: "",
      rules: {},
      SettlementForm: {},
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      money1: 0,
      money2: 0,
      money3: 0,
      money4: 0,
      money5: 0,
      buttonshow: true,
      showPayment: false,
      tableRow: {}, //修改数据
      radio: null, //单选按钮
      Detailshow: false,
      total: 0,
      backtotal: 0,
    };
  },
  props: {
    Settlementshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Settlementshow() {
      this.visible = this.Settlementshow;
    },
  },
  mounted() {},
  methods: {
    RefreshList() {
      squeryBreachClause(this.SettlementForm).then((response) => {
        this.tableData3 = response.data.list;
        this.money5 = response.data.penalSum;
        this.tableRow = this.tableData3[this.radio];
      });

      calculationAmount(this.SettlementForm).then((response) => {
        this.tableData = [];
        this.tableData.push(response);
      });
    },
    rowClick(row) {
      this.tableRow = row;
      this.radio = this.tableData3.indexOf(row); //单行点击单选按钮选中
    },
    addFalsify() {
      this.showPayment = true;
      this.$refs.PopPaymentChildren.getData(this.SettlementForm, 0);
    },
    editFalsify() {
      this.showPayment = true;
      this.$refs.PopPaymentChildren.getData(this.tableRow, 1);
    },
    deteleFalsify() {
      var _this = this;
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteLiquidatedDamages(_this.tableRow).then((response) => {
            _this.radio = null;
            _this.RefreshList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    generatorImage() {
      const loading = this.$loading({
        lock: true,
        text: "内容生成中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      this.buttonshow = false;
      this.$nextTick(() => {
        html2canvas(this.$refs.capture).then((canvas) => {
          this.buttonshow = true;
          sessionStorage.setItem("settleprint", canvas.toDataURL());
          var routeData = this.$router.resolve({
            path: "settleprint",
            name: "结算清单预览打印",
          });
          window.open(routeData.href);
          setTimeout(() => {
            loading.close();
          }, 1000);
        });
      });
    },
    gettable() {
      queryContractingResources(this.SettlementForm).then((response) => {
        this.tableData1 = response.data.list;
        this.money1 = response.data.uncollectedCharge;
      });
      squerySecurityDepositList(this.SettlementForm).then((response) => {
        this.tableData2 = response.data.list;
        this.money4 = response.data.depositMoney;
      });
      squeryBreachClause(this.SettlementForm).then((response) => {
        this.tableData3 = response.data.list;
        this.money5 = response.data.penalSum;
      });
      queryStayOver(this.SettlementForm).then((response) => {
        this.tableData4 = response.data.list;
        this.money2 = response.data.AcceptanceOfTheRoom;
      });
      queryContractMeter(this.SettlementForm).then((response) => {
        this.tableData5 = response.data;
      });
      queryContractDevice(this.SettlementForm).then((response) => {
        this.tableData6 = response.data.list;
        this.money3 = response.data.AcceptanceOfTheRoom;
      });
      calculationAmount(this.SettlementForm).then((response) => {
        this.tableData = [];
        this.tableData.push(response);
        this.total = response.payable;
        this.backtotal = response.refundableTax;
      });
    },
    //   判断新增，修改
    getReportData(data) {
      this.SettlementForm = {
        dbName: data.db_name,
        GLCID: data.GLCID,
        YXDID: data.YXDID,
        contractId: data.contract_id,
        roomId: data.roomId,
        status: data.state == 0 && data.status != 29 ? false : true,
      };

      this.tableData1 = [];
      this.tableData2 = [];
      this.tableData3 = [];
      this.tableData4 = [];
      this.tableData5 = [];
      this.tableData6 = [];

      this.gettable();
    },
    RefreshItem() {
      this.$emit("RefreshItem", 0);
      this.cancle();
    },
    //   新增/修改分区
    sure() {
      if (this.total < this.backtotal) {
        this.SettlementForm.type = 2;
        settleAccounts(this.SettlementForm).then((response) => {
          this.$emit("RefreshItem", 0);
          this.cancle();
        });
      }
      if (this.total == this.backtotal) {
        this.SettlementForm.type = 0;
        settleAccounts(this.SettlementForm).then((response) => {
          this.$emit("RefreshItem", 0);
          this.cancle();
        });
      }
      if (this.total > this.backtotal) {
        this.Detailshow = true;
        this.$refs.DetailsDialog.getPartitionData(this.SettlementForm);
      }
    },
    cancle() {
      this.$emit("update:Settlementshow", false);
    },
  },
  components: {
    PaymentDialog,
    DetailsDialog,
  },
};
</script>

<style lang="scss">
.SettlementDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.SettlementDialog .el-input-number {
  width: 100%;
}

.SettlementDialog .el-input-number input {
  text-align: left;
}

.SettlementDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}

.SettlementDialog .edit {
  position: absolute;
  right: 180px;
  top: 0;
}

.SettlementDialog .edit1 {
  position: absolute;
  right: 90px;
  top: 0;
}

.SettlementDialog .edit2 {
  position: absolute;
  right: 0px;
  top: 0;
}

.SettlementDialog .printbody {
  padding: 0 20px 30px 20px;
}

.SettlementDialog .el-dialog-treble .el-row {
  padding: 0;
  margin: 0 -15px !important;
}

.SettlementDialog .el-dialog__body {
  height: 700px;
  overflow: auto;
}

.SettlementDialog .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding: 0 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(44, 138, 216, 1);
}

.SettlementDialog {
  .Ftitle {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(77, 77, 77, 1);
    padding: 20px 0 10px;
  }
  .Ftitle_1 {
    padding-top: 0px;
  }
  .el-dialog__footer {
    text-align: right;
  }
}

.SettlementDialog .el-carousel img {
  height: 100%;
}
</style>
