<template>
  <div class="container bills">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 300px">
          <el-form-item label="票据号" label-width="70px">
            <el-input v-model="searchList.PJLYMX_PJH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="票据状态:" label-width="70px">
            <el-select v-model="searchList.PJLYMX_PJZT" filterable clearable>
              <el-option label="已用" :value="'已用'"></el-option>
              <el-option label="作废" :value="'作废'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="开票类型:" label-width="70px">
            <el-select v-model="searchList.invoiceType" filterable clearable>
              <el-option label="已交款申请开票" :value="1"></el-option>
              <el-option label="先票后款" :value="2"></el-option>
              <el-option label="未收款确认收入" :value="3"></el-option>
              <el-option label="已交款开票" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="票据分类:" label-width="70px">
            <el-select v-model="searchList.PJLYMX_PJFL" filterable clearable>
              <el-option label="发票" :value="'发票'"></el-option>
              <el-option label="收据" :value="'收据'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="票据类型:" label-width="70px">
            <el-select v-model="searchList.PJLX" filterable clearable>
              <el-option label="纸质" :value="1"></el-option>
              <el-option label="电子" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="开票起始:" label-width="70px">
            <el-date-picker
              type="date"
              placeholder=""
              v-model="searchList.startDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="开票截止:" label-width="70px">
            <el-date-picker
              type="date"
              placeholder=""
              v-model="searchList.endDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="收款状态:" label-width="70px">
            <el-select v-model="searchList.ZFZT" filterable clearable>
              <el-option label="已收清" :value="1"></el-option>
              <el-option label="未收清" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata"
              v-has="'FirstBillSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="CollectionShow"
        :disabled="disablebutton"
        v-has="'FirstBillCollection_has'"
        >收款
      </el-button>
      <el-button
        type="danger"
        @click="docanle"
        :disabled="disablebuttoncanle"
        v-has="'FirstBillVoid_has'"
      >
        作废
      </el-button>
      <el-button
        type="primary"
        @click="BillPrint"
        :disabled="disabledPrint"
        v-has="'FirstBillPrint_has'"
        >打印预览
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        height="300"
        :data="tableData"
        border
        @row-click="rowclick"
        :cell-class-name="cellStyle"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_PJZT" label="票据状态" width="100">
        </el-table-column>
        <el-table-column prop="PJLYMX_PJH" label="票据号" width="150">
        </el-table-column>
        <el-table-column prop="ZFZT" label="收款状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.ZFZT === 1">已收清</span>
            <span v-if="scope.row.ZFZT === 0">未收清</span>
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_JE" label="金额" width="100">
        </el-table-column>
        <el-table-column prop="invoiceType" label="开票类型" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.invoiceType === 1">已交款申请开票</span>
            <span v-if="scope.row.invoiceType === 2">先票后款</span>
            <span v-if="scope.row.invoiceType === 3">未收款确认收入</span>
            <span v-if="scope.row.invoiceType === 4">已交款开票</span>
          </template>
        </el-table-column>
        <el-table-column prop="PJMX_LX" label="票据类型" width="120">
          <template slot-scope="scope">
            {{ scope.row.PJMX_LX == 101 ? "纸质发票" : "" }}
            {{ scope.row.PJMX_LX == 102 ? "电子发票" : ""
            }}{{ scope.row.PJMX_LX == 201 ? "纸质收据" : ""
            }}{{ scope.row.PJMX_LX == 202 ? "电子收据" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_SKRQ" label="开票日期" width="200">
        </el-table-column>
        <el-table-column prop="PJLYMX_SKR" label="开票人" width="200">
        </el-table-column>
        <el-table-column prop="PJLYMX_KHMC" label="客户名称" width="150">
        </el-table-column>
        <el-table-column prop="PJLYMX_JKR" label="交款人" width="200">
        </el-table-column>
        <el-table-column label="作废信息" prop="SKPZ_SKBS" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.stop="detailsfunc(scope.row)"
              size="small"
              :disabled="scope.row.PJLYMX_PJZT == '已用'"
            >
              查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="增值税信息" prop="SKPZ_SKBS" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.stop="taxfunc(scope.row)"
              size="small"
            >
              查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > searchList.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="searchList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <div class="customedetail">
      <div class="billtitle">开票明细</div>
      <el-table ref="singleTable1" height="200" :data="tableData1" border>
        <el-table-column prop="PJMX_SFXMMC" label="收费项目" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_SKFS" label="收款方式" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SFBZ" label="收费币种" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SFJE" label="金额（含税）" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_SL" label="税率" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_BHSJE" label="金额(不含税)" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_SE" label="税额" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_ZY" label="摘要"> </el-table-column>
      </el-table>
    </div>

    <CollectionDialog
      :show.sync="show"
      ref="CollectionDialog"
      @RefreshItem="getTableData"
    ></CollectionDialog>
    <ObsoleteInfoDialog
      :showInfo.sync="showInfo"
      ref="infoChilren"
    ></ObsoleteInfoDialog>
    <taxInfoDialog :taxshow.sync="taxshow" ref="taxInfoDialog"></taxInfoDialog>

    <el-dialog
      v-dialogDrag
      title="作废原因"
      class="el-dialog-single"
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" ref="ruleForm">
        <el-row>
          <el-col>
            <el-form-item label="请输入作废原因：">
              <el-input type="textarea" v-model="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancellation">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryInvoices,
  queryInvoiceDetails,
  confirmCancellation,
} from "@/api/TicketPayment/Bill";
import {
  getPrintType,
  queryBillPrintTypeApi,
} from "@/api/FeeManagement/TicketBill"; //票据
import CollectionDialog from "./components/CollectionDialog";
import taxInfoDialog from "./components/taxInfoDialog";
import ObsoleteInfoDialog from "./components/ObsoleteInfoDialog"; //作废信息
import { queryInvoiceResultsApi } from "@/api/FeeManagement/CollectionCredentials";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/Auth"; // 验权
export default {
  name: "bills",
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchList: {
        pageIndex: 0,
        pageSize: 100,
        startDate: "",
        endDate: "",
        PJLYMX_PJH: "",
        invoiceType: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      multipleSelection: [],
      show: false,
      disablebutton: true,
      disablebuttoncanle: true,
      textarea: "",
      dialogVisible: false,
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      showInfo: false,
      taxshow: false,
      disabledPrint: true,
    };
  },
  components: {
    CollectionDialog,
    ObsoleteInfoDialog,
    taxInfoDialog,
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  mounted() {
    this.getTableData();
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.tableRow.PJLYMX_PJZT == "作废") {
          this.disabledPrint = true;
        } else {
          if (this.tableRow.PJLYMX_SFKP == 5) {
            //PJLYMX_SFKP 是否开票 5代表等待结果不可以开票
            this.disabledPrint = true;
          } else {
            if (this.tableRow.PJMX_LX == 101) {
              //纸质发票判断
              if (this.tableRow.PJLYMX_SFGXJSP) {
                //如果为true可以打印预览--PJLYMX_SFGXJSP是否勾选金税盘，如果勾选就可以开票
                this.disabledPrint = false; //----
              } else {
                this.disabledPrint = true;
              }
            } else {
              //如果不是纸质发票正常判断
              this.disabledPrint = false; //----
            }
          }
        }
      } else {
        this.disabledPrint = true;
      }
    },
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //  console.log(row)
      if (row.PJLYMX_PJZT == "作废") {
        //作废背景红色
        return "tabelBGRED";
      }
    },
    docanle() {
      this.dialogVisible = true;
      this.textarea = "";
    },
    BillPrint() {
      //101纸质发票，102电子发票，201纸质收据，202电子收据
      var routeData;
      if (this.tableRow.PJMX_LX == 101) {
        routeData = this.$router.resolve({
          path: "Ticket",
          name: "开票预览",
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.tableRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      } else if (this.tableRow.PJMX_LX == 102) {
        if (this.tableRow.PJLYMX_SFKP == 2) {
          window.open(`http://${this.tableRow.PJLYMX_DZFPURL}`);
        } else {
          this.queryInvoiceRequest();
        }
      } else if (this.tableRow.PJMX_LX == 201) {
        getPrintType().then((response) => {
          if (response.orgPrintType) {
            this.BillCoverPrint();
          } else {
            this.getBillTypeRequest(); //获取纸质收据billPrintType
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "elReceipt",
          name: "收据预览",
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.tableRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      }
    },
    queryInvoiceRequest() {
      //查询电子发票
      var that = this;
      queryInvoiceResultsApi(this.tableRow.PJLYMX_ZJ).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          clearTimeout(that.timer);
          window.open(`http://${response.data[0].invoiceImageUrl}`);
        } else {
          if (that.count >= 12) {
            clearTimeout(that.timer);
          } else {
            that.timer = setTimeout(function () {
              that.count++;
              that.queryInvoiceRequest();
            }, 5000);
          }
        }
      });
    },
    BillCoverPrint() {
      //收据套打
      var routeData;
      routeData = this.$router.resolve({
        path: "ReceiptPrint/pwy_test_jjshequ_com",
        name: "收据套打",
        //query: this.formList.delId
        //params:{id:params.id}
      });
      window.open(
        routeData.href +
          "?PJLYMX_ZJ=" +
          this.tableRow.PJLYMX_ZJ +
          "&X_Token=" +
          getToken(),
        "_blank"
      ); //新窗口打开页面
    },
    getBillTypeRequest() {
      //获取billPrintType
      var routeData;
      queryBillPrintTypeApi(this.tableRow.PJLYMX_ZJ).then((response) => {
        this.tableRow.billPrintType = response.billPrintType;
        if (this.tableRow.billPrintType == "CommonReceiptTemp") {
          //三明城发纸质收据带表格--根据域名hostname判断（修改根据billPrintType等于1通用三明城发模板）
          routeData = this.$router.resolve({
            path: "/ReceiptPrint/smctwy",
            name: "收据预览",
          });
          window.open(
            routeData.href +
              "?PJLYMX_ZJ=" +
              this.tableRow.PJLYMX_ZJ +
              "&X_Token=" +
              getToken(),
            "_blank"
          ); //新窗口打开页面
        } else if (response.billPrintType == "jindiReceiptTemp") {
          //金帝物业纸质收据带表格
          routeData = this.$router.resolve({
            path: "/ReceiptPrint/jindiwy",
            name: "收据预览",
          });
          window.open(
            routeData.href +
              "?PJLYMX_ZJ=" +
              this.tableRow.PJLYMX_ZJ +
              "&X_Token=" +
              getToken(),
            "_blank"
          ); //新窗口打开页面
        } else if (this.formList.billPrintType == "TangrenReceiptTemp") {
          //唐人物业纸质收据不带表格
          routeData = this.$router.resolve({
            path: "/ReceiptPrint/tangren",
            name: "收据预览",
          });
          window.open(
            routeData.href +
              "?PJLYMX_ZJ=" +
              this.formList.PJLYMX_ZJ +
              "&X_Token=" +
              getToken(),
            "_blank"
          ); //新窗口打开页面
        } else {
          routeData = this.$router.resolve({
            path: "Receipt",
            name: "收据预览",
          });
          window.open(
            routeData.href +
              "?PJLYMX_ZJ=" +
              this.tableRow.PJLYMX_ZJ +
              "&X_Token=" +
              getToken(),
            "_blank"
          ); //新窗口打开页面
        }
      });
    },
    detailsfunc(row) {
      this.showInfo = true;
      this.$refs.infoChilren.getData(row);
    },
    taxfunc(row) {
      this.taxshow = true;
      this.$refs.taxInfoDialog.getData(row);
    },
    cancellation() {
      confirmCancellation({
        PJLYMX_ZJ: this.tableRow.PJLYMX_ZJ,
        ZFYY: this.textarea,
        ZFR: this.userName,
      }).then((response) => {
        this.getTableData(); //获取表格数据
        this.disablebuttoncanle = true;
        this.disablebutton = true;
        this.radio = "";
        this.tableRow = [];
        this.dialogVisible = false;
      });
    },
    CollectionShow() {
      this.show = true;
      this.$refs.CollectionDialog.getReportData(this.tableRow);
    },
    getdata() {
      this.handleCurrentChange(1);
      this.tableData1 = [];
    },
    rowclick(row) {
      this.tableRow = row;
      this.disablebutton =
        row.ZFZT === 0 && row.PJLYMX_PJZT === "已用" ? false : true;
      this.disablebuttoncanle = row.PJLYMX_PJZT === "已用" ? false : true;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中

      this.tableData1 = [];
      queryInvoiceDetails({
        PJLYMX_ZJ: row.PJLYMX_ZJ,
      }).then((response) => {
        this.tableData1 = response.data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = "";
      this.tableRow = []; //选择后清空选中表格数据
    },

    getTableData() {
      queryInvoices(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;

        this.$nextTick(() => {
          this.$refs.singleTable.doLayout();
        });

        if (response.data.length > 0) {
          queryInvoiceDetails({
            PJLYMX_ZJ: response.data[0].PJLYMX_ZJ,
          }).then((responses) => {
            this.tableData1 = responses.data;
          });
        } else {
          this.tableData1 = [];
        }
      });
    },
  },
};
</script>
<style lang="scss">
.tabelBGRED {
  background: #e36a6a !important;
}
.bills .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.bills .el-input {
  width: 100% !important;
}

.bills .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.bills .el-select {
  width: 100%;
}

.bills .billtitle {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 36px;
}
</style>
