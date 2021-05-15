<template>
  <div class="PrePaidCertificate">
    <!-- 按钮begin -->
    <el-form label-width="105px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 320px">
          <el-form-item label="起始收款日期:">
            <el-date-picker
              type="date"
              placeholder=""
              value-format="yyyy-MM-dd"
              v-model="TableForm.YJPZ_TZRQ_START"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 320px">
          <el-form-item label="截止收款日期:">
            <el-date-picker
              type="date"
              placeholder=""
              value-format="yyyy-MM-dd"
              v-model="TableForm.YJPZ_TZRQ_END"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 320px">
          <el-form-item label="收款人:">
            <el-input clearable v-model="TableForm.YJPZ_JKR"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="success" @click="gettable" v-has="'PCsearchhas'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->
    <div class="PrepaySchemedetail">
      <div class="button buttonBox">
        <el-button
          type="primary"
          :disabled="invaliddisabled"
          @click="invalidFun"
          v-has="'PCinvalid_has'"
        >
          作废</el-button
        >
        <el-button
          type="primary"
          :disabled="billdisabled"
          @click="TicketDialog"
          v-has="'PCTicket_has'"
        >
          开票</el-button
        >
      </div>
      <el-table
        ref="singleTable1"
        height="200"
        :data="tableData"
        @row-click="rowclick"
      >
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="FKGX_FJID" label="资源代码" width="120">
        </el-table-column>
        <el-table-column prop="YJPZ_PZLX" label="凭证类型" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.YJPZ_PZLX == 0">预交收款</div>
            <div v-if="scope.row.YJPZ_PZLX == 1">预交退款</div>
          </template>
        </el-table-column>
        <el-table-column prop="FKGX_ZT" label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="!scope.row.YJPZ_YXPZ">无效</div>
            <div v-if="scope.row.YJPZ_YXPZ">有效</div>
          </template>
        </el-table-column>
        <el-table-column prop="YJPZ_SSNY" label="收款年月" width="150">
        </el-table-column>
        <el-table-column prop="YJPZ_TZRQ" label="填制日期" width="150">
        </el-table-column>
        <el-table-column prop="YJPZ_YJFS" label="预交方式" width="120">
        </el-table-column>
        <el-table-column prop="YJPZ_JKR" label="交款人" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_SKR" label="收款人" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_JKBS" label="笔数" width="80">
        </el-table-column>
        <el-table-column prop="YJPZ_ZFR" label="作废人" width="100">
        </el-table-column>
        <el-table-column prop="YJPZ_ZFSJ" label="作废时间" width="150">
        </el-table-column>
        <el-table-column
          prop="YJPZ_ZFYY"
          label="作废原因"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="YJPZ_RZSJ" label="入账时间" width="150">
        </el-table-column>
        <el-table-column prop="FKGX_FJID" label="资源代码" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="PrepaySchemedetail">
      <div class="title">凭证明细</div>
      <el-table ref="singleTable1" max-height="200" :data="tableData1">
        <el-table-column prop="YJMX_BH" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_PJH" label="票据号" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_YJJE" label="预交金额(含税)" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_ZSJE" label="折算金额(含税)" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_SL" label="税率" width="80">
        </el-table-column>
        <el-table-column prop="YJMX_BHSJE" label="预交金额(不含税)" width="150">
        </el-table-column>
        <el-table-column prop="YJMX_SE" label="税额" width="80">
        </el-table-column>
        <el-table-column prop="YJMX_DQYE" label="当前余额" width="100">
        </el-table-column>
        <el-table-column prop="YJMX_DJJE" label="冻结金额" width="100">
        </el-table-column>
        <el-table-column prop="YJMX_CDQSNY" label="冲抵起始日期" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_CDJZNY" label="冲抵截止日期" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_QSRQ" label="起始日期" width="120">
        </el-table-column>
        <el-table-column prop="YJMX_ZZRQ" label="终止日期" width="120">
        </el-table-column>
        <el-table-column prop="YJFA_FAMC" label="方案名称" width="120">
        </el-table-column>
      </el-table>
    </div>

    <CancellationDialog
      :showdialog.sync="showdialog"
      @PopCancelEmit="gettable"
      ref="cancellChildren"
    >
    </CancellationDialog>
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="gettables()"
      ref="ticketChilren"
    >
    </TicketDialog>
  </div>
</template>
<script>
import {
  queryPrepayProve,
  queryPrepayDetail,
  isCancelPrepayProve,
  isExistBillForPrepayProve,
  isCanMakeBillForPrepayProve,
} from "@/api/PrepayManagement/PrepayCollection";
import CancellationDialog from "./CancellationDialog"; //作废弹窗
import TicketDialog from "./TicketDialog";
export default {
  name: "PrePaidCertificate",
  data() {
    return {
      tableData: [],
      tableData1: [],
      invaliddisabled: true,
      billdisabled: true,
      TableForm: {
        YJPZ_TZRQ_START: "",
        YJPZ_TZRQ_END: "",
        YJPZ_JKR: "",
        FKGX_ZJ: "",
        KHDA_ZJ: "",
      },
      radio: null,
      tableRow: {},
      showdialog: false,
      showTicket: false,
    };
  },
  components: {
    CancellationDialog,
    TicketDialog,
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.tableRow.YJPZ_YXPZ) {
          this.invaliddisabled = false;
        } else {
          this.invaliddisabled = true;
        }
        isCanMakeBillForPrepayProve({ YJPZ_ZJ: this.tableRow.YJPZ_ZJ }).then(
          (response) => {
            if (response.data.isCan == "yes" && this.tableRow.YJPZ_YXPZ) {
              this.billdisabled = false;
            } else {
              this.billdisabled = true;
            }
          }
        );
      } else {
        this.invaliddisabled = true;
        this.billdisabled = true;
      }
    },
  },
  mounted() {},
  methods: {
    clearMes() {
      //清除信息
      this.TableForm = {
        YJPZ_TZRQ_START: "",
        YJPZ_TZRQ_END: "",
        YJPZ_JKR: "",
        FKGX_ZJ: "",
        KHDA_ZJ: "",
      };
      this.tableData = [];
      this.tableData1 = [];
      this.invaliddisabled = true;
      this.billdisabled = true;
      this.radio = null;
    },
    TicketDialog() {
      this.$refs.ticketChilren.getData(this.tableRow, this.tableRow.FKGX_ZJ, 2);
      //开票弹窗
      this.showTicket = true;
    },
    voucher(FKGX_ZJ, KHDA_ZJ) {
      //获取房客关系主键客户档案主键，查询预交凭证列表
      this.TableForm.FKGX_ZJ = FKGX_ZJ;
      this.TableForm.KHDA_ZJ = KHDA_ZJ;
      this.gettable();
    },
    gettable() {
      //查询预交凭证列表
      queryPrepayProve(this.TableForm).then((response) => {
        this.tableData = response.data;
        this.tableData1 = [];
        this.radio = null;
      });
    },
    gettables() {
      //查询预交凭证列表
      queryPrepayProve(this.TableForm).then((response) => {
        this.tableData = response.data;
        this.tableData1 = [];
      });
    },
    invalidFun() {
      //作废
      isCancelPrepayProve({ YJPZ_ZJ: this.tableRow.YJPZ_ZJ }).then(
        (response) => {
          if (response.data.isCancel == "yes") {
            this.getisExisBill();
          } else {
            this.$alert("历史凭证不允许作废!", "收费管理", {
              confirmButtonText: "确定",
            });
          }
        }
      );
    },
    getisExisBill() {
      //判断凭证是否有开票
      isCanMakeBillForPrepayProve({ YJPZ_ZJ: this.tableRow.YJPZ_ZJ }).then(
        (response) => {
          if (response.length > 0) {
            var pjhStr = "";
            response.forEach((item) => {
              pjhStr += item.PJLYMX_PJH + ",";
            });
            pjhStr = pjhStr.substring(0, pjhStr.length - 1);
            this.$confirm(
              "作废凭证会同时将票据号 " + pjhStr + " 作废, 是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.showdialog = true;
                this.$refs.cancellChildren.getData(
                  this.tableRow.YJPZ_FKGXWJ,
                  this.tableRow.YJPZ_ZJ,
                  response
                );
              })
              .catch(() => {});
          } else {
            //为空表示没有开票
            this.showdialog = true;
            this.$refs.cancellChildren.getData(
              this.tableRow.YJPZ_FKGXWJ,
              this.tableRow.YJPZ_ZJ,
              response
            );
          }
        }
      );
    },
    rowclick(row) {
      //预交凭点击事件
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      queryPrepayDetail({ YJPZ_ZJ: row.YJPZ_ZJ }).then((response) => {
        this.tableData1 = response.data;
      });
    },
    feeezeFun() {},
  },
};
</script>
<style lang="scss" scoped>
.PrePaidCertificate {
  padding: 15px;
  overflow: auto;
}

.PrePaidCertificate .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}

.PrePaidCertificate .el-input {
  width: 100% !important;
}
</style>
