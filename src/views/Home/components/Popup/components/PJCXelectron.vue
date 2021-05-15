<!-- 暂时不用 -->
<template>
  <div class="PJCX" ref="PJCX" id="PJCXelectron">
    <!-- 按钮begin -->
    <el-form label-width="75px" :model="pjcxForm" :rules="rules" ref="pjcxForm">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 400px">
          <el-form-item label="资源名称：" prop="FJDA_ZJ">
            <el-select v-model="pjcxForm.FJDA_ZJ" filterable clearable>
              <el-option
                v-for="item in zydata"
                :key="item.FJDA_FJMC"
                :label="item.FJDA_FJMC"
                :value="item.FJDA_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="票据号码：">
            <el-input v-model="pjcxForm.PJLYMX_PJH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="交款人：">
            <el-input v-model="pjcxForm.PJLYMX_JKR" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="票据状态：">
            <el-select v-model="pjcxForm.PJLYMX_PJZT" clearable>
              <el-option label="已用" value="已用"></el-option>
              <el-option label="作废" value="作废"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="票据类型：">
            <el-select
              v-model="pjcxForm.PJMX_LX"
              clearable
              multiple
              collapse-tags
            >
              <el-option label="纸质发票" value="101"></el-option>
              <el-option label="电子发票" value="102"></el-option>
              <el-option label="纸质收据" value="201"></el-option>
              <el-option label="电子收据" value="202"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="开始日期:">
            <el-date-picker
              v-model="pjcxForm.startTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="结束日期:">
            <el-date-picker
              v-model="pjcxForm.endTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col
          :span="4"
          :style="`padding-right:0;padding-top:2px;width:${colwidth}px`"
        >
          <el-button
            type="primary"
            @click="handleCurrentChange(1)"
            style="float: left"
            >查询</el-button
          >
          <el-button type="success" @click="downloData" style="float: right"
            >导出excel</el-button
          >
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disabledObsolete"
            :title="ObsoleteTitle"
            v-has="'ReceiTicketBillObsolete_has'"
            style="float: right"
            >作废</el-button
          >
          <el-button
            type="primary"
            @click="Billreuse"
            :disabled="disabledReuse"
            :title="ReuseTitle"
            v-has="'ReceiTicketBillReuse_has'"
            style="float: right"
            >票据号重用</el-button
          >
          <el-button
            type="primary"
            @click="BillPrint"
            :disabled="disabledPrint"
            style="float: right"
            >打印预览
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!--  表begin -->
    <div class="resoureTable">
      <el-table
        ref="tipleTable"
        :data="tableData"
        height="300"
        border
        @row-click="rowclick"
        :cell-class-name="cellStyle"
        v-loading="loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        empty-text="　"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_PJH" label="票据号" width="80">
        </el-table-column>
        <el-table-column prop="PJLYMX_PJZT" label="票据状态" width="80">
        </el-table-column>
        <el-table-column prop="PJLYMX_KCY" label="已重用" width="80">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.PJLYMX_KCY"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_JE" label="金额" width="90">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJLYMX_JE) }}
          </template>
        </el-table-column>
        <el-table-column prop="FJDA_FJMC" label="资源名称" width="150">
        </el-table-column>
        <el-table-column prop="PJLYMX_JKR" label="交款人" width="85">
        </el-table-column>
        <el-table-column prop="PJLYMX_SKR" label="收款人" width="85">
        </el-table-column>
        <el-table-column prop="PJLYMX_KPR" label="开票人" width="85">
        </el-table-column>
        <el-table-column prop="PJLYMX_SKRQ" label="开票日期" width="150">
        </el-table-column>
        <el-table-column prop="PJLYMX_SKNY" label="单据账期" width="85">
        </el-table-column>
        <el-table-column prop="PJMX_LX" label="票据类型" width="80">
          <template slot-scope="scope">
            {{ scope.row.PJMX_LX == 101 ? "纸质发票" : "" }}
            {{ scope.row.PJMX_LX == 102 ? "电子发票" : ""
            }}{{ scope.row.PJMX_LX == 201 ? "纸质收据" : ""
            }}{{ scope.row.PJMX_LX == 202 ? "电子收据" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_ZFR" label="作废人" width="85">
        </el-table-column>
        <el-table-column prop="PJLYMX_ZFSJ" label="作废时间" width="110">
        </el-table-column>
        <el-table-column prop="PJLYMX_ZFYY" label="作废原因" width="150">
        </el-table-column>
        <el-table-column prop="PJLYMX_FJID" label="资源代码"> </el-table-column>
      </el-table>
    </div>
    <!--  表 end -->

    <!-- 分页begin -->
    <div class="block" ref="current">
      <div class="block_left"></div>
      <div class="block_right">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pjcxForm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="returnTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 分页end -->

    <!--  表begin -->
    <div class="resoureTable">
      <el-table ref="multipleTable" :data="detailData" border :height="height">
        <el-table-column prop="PJMX_SFXMMC" label="费用项目" width="120">
        </el-table-column>
        <el-table-column prop="PJMX_SKFS" label="收款方式" width="100">
        </el-table-column>
        <el-table-column prop="PJMX_SFJE" label="收款金额（含税）" width="130">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJMX_SFJE) }}
          </template>
        </el-table-column>
        <el-table-column prop="PJMX_SL" label="税率" width="80">
        </el-table-column>
        <el-table-column prop="PJMX_BHSJE" label="不含税金额" width="130">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJMX_BHSJE) }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="150">
          </el-table-column> -->
        <el-table-column prop="PJMX_SE" label="税额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJMX_SE) }}
          </template>
        </el-table-column>
        <el-table-column prop="PJMX_ZY" label="费用期间" width="200">
        </el-table-column>
        <el-table-column prop="PJMX_BZ" label="备注"> </el-table-column>
      </el-table>
    </div>
    <!--  表 end -->

    <billobsolete
      :obsoleteShow.sync="obsoleteShow"
      ref="obsoleteChildren"
      @RefreshItem="obsoleteRefreshList"
    >
    </billobsolete>
  </div>
</template>

<script>
import { getPrintType } from "@/api/FeeManagement/TicketBill"; //票据
import { queryInvoiceResultsApi } from "@/api/FeeManagement/CollectionCredentials";
import { getToken } from "@/utils/Auth"; // 验权
import {
  queryRoom,
  queryELBillMessage,
  queryBillDetailsMessage,
  billMessageExcel,
  queryIsMayCancellation,
  reuseOfTicketNumber,
  notePrint,
  chromatographyPrint,
  updatePrintTimes,
} from "@/api/Home/Home";
import billobsolete from "./BillObsoleteDialog"; //票据作废
import { formatMoney } from "@/utils/global.js";
export default {
  name: "PJCX",
  data() {
    return {
      title: "票据查询", //标题
      tableData: [],
      detailData: [],
      pjcxForm: {
        FJDA_ZJ: "",
        PJLYMX_PJH: "",
        PJLYMX_JKR: "",
        PJLYMX_PJZT: "",
        PJMX_LX: "",
        startTime: "",
        endTime: "",
        pageIndex: 0,
        pageSize: 6,
      },
      zydata: [],
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      time: [],
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      rules: {},
      detailRow: {}, //选中票据data
      disabledObsolete: true, //作废按钮默认隐藏
      disabledReuse: true, //重用按钮默认隐藏
      disabledPrint: true, //打印默认隐藏
      obsoleteShow: false, //票据号作废弹窗  默认隐藏
      ZFR: "",
      ObsoleteTitle: "", //作废按钮标题提示
      ReuseTitle: "", //作废按钮标题提示
      height: 150,
      loading: false,
      colspan: 16,
      colwidth: 500,
    };
  },
  components: {
    billobsolete,
  },
  mounted() {
    this.colwidth = this.$refs.PJCX.offsetWidth - 520;
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledPrint = true;
          this.disabledCoverPrint = true;
        } else {
          if (this.detailRow.PJLYMX_SFKP == 5) {
            this.disabledPrint = true;
          } else {
            this.disabledPrint = false;
          }
          if (this.detailRow.PJMX_LX == 201) {
            this.disabledCoverPrint = false;
          } else {
            this.disabledCoverPrint = true;
          }
        }
      } else {
        this.disabledReuse = true;
        this.disabledObsolete = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
    detailRow() {
      if (Object.keys(this.detailRow).length != 0) {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledObsolete = true; //已经作废的数据不可再作废
          if (this.detailRow.PJLYMX_KCY) {
            //判断该票据是否已重用
            this.disabledReuse = true;
          } else {
            this.disabledReuse = false;
          }
        } else {
          queryIsMayCancellation({
            PJLYMX_ZJ: this.detailRow.PJLYMX_ZJ,
            type: this.detailRow.type,
          }).then((response) => {
            this.ZFR = response.data.YGDA_SYSID;
            if (response.data.state) {
              this.disabledObsolete = false;
            } else {
              this.disabledObsolete = true;
            }
          });
          this.disabledReuse = true;
        }
      } else {
        this.disabledObsolete = true;
        this.disabledReuse = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //  console.log(row)
      if (row.invalidSign == 0) {
        //作废背景红色
        return "tabelBGRED";
      }
    },
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    rowclick(row) {
      this.detailRow = JSON.parse(JSON.stringify(row));
      this.detailRow.type = row.type === "el" ? 1 : 0;
      queryBillDetailsMessage({
        PJLYMX_ZJ: row.PJLYMX_ZJ,
        type: this.detailRow.type,
      }).then((response) => {
        this.detailData = response;
      });
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    BillObsolete() {
      //作废
      var _this = this;
      this.$confirm(
        "请确认是否作废票据" + this.detailRow.PJLYMX_PJH + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          _this.obsoleteShow = true;
          _this.$refs.obsoleteChildren.getObjsoleteRow(
            _this.detailRow,
            _this.ZFR,
            1
          );
        })
        .catch(() => {});
    },
    Billreuse() {
      //票据本重用
      this.$confirm("请确认是否将票据号设置为可重用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reuseOfTicketNumber(this.detailRow).then((response) => {
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    BillPrint() {
      //101纸质发票，102电子发票，201纸质收据，202电子收据
      var routeData;
      if (this.detailRow.PJMX_LX == 101) {
        routeData = this.$router.resolve({
          path: "Ticket",
          name: "开票预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.detailRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      } else if (this.detailRow.PJMX_LX == 102) {
        if (this.detailRow.PJLYMX_SFKP == 2) {
          window.open(`http://${this.detailRow.PJLYMX_DZFPURL}`);
        } else {
          this.queryInvoiceRequest();
          // submitInvoice(this.detailRow).then(response => {
          //   if (response.returnStatus == "SUCCESS") {
          //     that.queryInvoiceRequest();
          //   }
          // });
        }
      } else if (this.detailRow.PJMX_LX == 201) {
        getPrintType().then((response) => {
          if (response.orgPrintType) {
            this.BillCoverPrint();
          } else {
            if (this.detailRow.billPrintType == "CommonReceiptTemp") {
              //三明城发纸质收据带表格--根据域名hostname判断（修改根据billPrintType等于1通用三明城发模板）
              routeData = this.$router.resolve({
                path: "/ReceiptPrint/smctwy",
                name: "收据预览",
              });
              window.open(
                routeData.href +
                  "?PJLYMX_ZJ=" +
                  this.detailRow.PJLYMX_ZJ +
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
                  this.detailRow.PJLYMX_ZJ +
                  "&X_Token=" +
                  getToken(),
                "_blank"
              ); //新窗口打开页面
            } else if (this.detailRow.billPrintType == "TangrenReceiptTemp") {
              //唐人物业纸质收据不带表格
              routeData = this.$router.resolve({
                path: "/ReceiptPrint/tangren",
                name: "收据预览",
              });
              window.open(
                routeData.href +
                  "?PJLYMX_ZJ=" +
                  this.detailRow.PJLYMX_ZJ +
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
                  this.detailRow.PJLYMX_ZJ +
                  "&X_Token=" +
                  getToken(),
                "_blank"
              ); //新窗口打开页面
            }
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "elReceipt",
          name: "收据预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.detailRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      }
    },
    queryInvoiceRequest() {
      //查询电子发票
      var that = this;
      queryInvoiceResultsApi(this.formList.PJLYMX_ZJ).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          window.open(`http://${response.data[0].invoiceImageUrl}`);
        } else {
          setTimeout(function () {
            that.queryInvoiceRequest();
          }, 2000);
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
          this.detailRow.PJLYMX_ZJ +
          "&X_Token=" +
          getToken(),
        "_blank"
      ); //新窗口打开页面
    },
    timeChange(val) {
      if (val) {
        this.pjcxForm.startTime = val[0];
        this.pjcxForm.endTime = val[1];
      } else {
        this.pjcxForm.startTime = "";
        this.pjcxForm.endTime = "";
      }
    },
    obsoleteRefreshList() {
      //作废刷新
      this.pjcxForm.pageIndex = 0;
      this.getTableData();
    },
    //   判断新增，修改
    getPartitionData(data) {
      this.loading = false;
      document.getElementById("PJCXelectron").style.height =
        document.getElementById("pjcxhome").offsetHeight - 104 + "px";
      this.height =
        this.$refs.PJCX.offsetHeight -
        this.$refs.pjcxForm.$el.offsetHeight -
        this.$refs.current.offsetHeight -
        300;
      this.time = [];
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s1 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-1";
      var s2 =
        day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();

      this.time.push(s1);
      this.time.push(s2);

      this.tableData = [];
      this.detailData = [];
      this.pjcxForm = {
        FJDA_ZJ: "",
        PJLYMX_PJH: "",
        PJLYMX_JKR: "",
        PJLYMX_PJZT: "",
        PJMX_LX: "",
        startTime: s1,
        endTime: s2,
        pageIndex: 0,
        pageSize: 6,
      };
      queryRoom().then((response) => {
        var data = response;
        this.zydata = data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.pjcxForm.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      this.$refs["pjcxForm"].validate((valid) => {
        if (valid) {
          this.radio = "";
          var data = JSON.parse(JSON.stringify(this.pjcxForm));
          data.PJMX_LX = data.PJMX_LX ? data.PJMX_LX.join(",") : "";
          this.loading = true;
          queryELBillMessage(data).then((response) => {
            var data = response.data;
            this.tableData = data;
            this.returnTotal = response.total;
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    downloData() {
      var _this = this;
      this.$refs["pjcxForm"].validate((valid) => {
        if (valid) {
          _this.pjcxForm.type = 1;
          billMessageExcel(this.pjcxForm).then((response) => {
            const content = response;
            const blob = new Blob([content]);
            const fileName = `${this.title}.xls`;
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
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.PJCX {
  padding: 0;
}

.PJCX .el-dialog__body {
  padding: 5px;
  overflow: auto;
}

.PJCX .BillObsoleteDialog .el-dialog__body {
  padding: 20px 0px;
}

.PJCX .block {
  padding: 10px 0 10px 0 !important;
  overflow: auto;
  .block_left {
    float: left;
  }
  .block_right {
    float: right;
  }
}

.PJCX .el-select {
  width: 100%;
}

.PJCX .el-range-editor.el-input__inner {
  width: 100%;
}

.PJCX .tabelBGRED {
  background: #e36a6a !important;
}

.PJCX .el-dialog__body {
  padding: 20px;
  overflow: auto;
}
.PJCX .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.PJCX .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}

.PJCX .el-date-editor {
  width: 100% !important;
}
</style>
