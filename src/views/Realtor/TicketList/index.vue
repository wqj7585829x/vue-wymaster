<template>
  <!--票据列表-->
  <div class="TicketList">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 270px">
              <el-form-item label="项目名称:" label-width="70px">
                <el-select v-model="tableParameter.name" @change="PlotChange">
                  <el-option
                    v-for="(item, index) in userPlot"
                    :key="index"
                    :value="item.GLCNAME"
                    :label="item.GLCNAME"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="资源名称:" label-width="70px">
                <el-select v-model="tableParameter.FJDA_ZJ" clearable>
                  <el-option
                    v-for="item in ResourceData"
                    :key="item.FJDA_ZJ"
                    :value="item.FJDA_ZJ"
                    :label="item.FJDA_FJMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="票据号:" label-width="70px">
                <el-input
                  v-model="tableParameter.PJLYMX_PJH"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="交款人:" label-width="70px">
                <el-input
                  v-model="tableParameter.PJLYMX_JKR"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="票据状态:" label-width="70px">
                <el-select v-model="tableParameter.PJLYMX_PJZT" clearable>
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="作废" value="作废"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="票据类型:" label-width="70px">
                <el-select v-model="tableParameter.PJLY_PJLX" clearable>
                  <el-option label="收据" value="收据"></el-option>
                  <el-option label="发票" value="发票"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 270px">
              <el-form-item label="开始日期:" label-width="70px">
                <el-date-picker
                  v-model="tableParameter.PJLYMX_SKRQ1"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 270px">
              <el-form-item label="结束日期:" label-width="70px">
                <el-date-picker
                  v-model="tableParameter.PJLYMX_SKRQ2"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'TicketListQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="BillPrint"
              :disabled="disabledPrint"
              v-has="'TicketListPrint_has'"
              >打印
            </el-button>
            <el-button
              type="danger"
              :disabled="disabledObsolete"
              @click="BillObsoleteClik"
              v-has="'TicketListObsolete_has'"
              >作废</el-button
            >
            <el-button
              type="primary"
              :disabled="disabledReuse"
              @click="Billreuse"
              v-has="'TicketListReuse_has'"
              >票号重用
            </el-button>
            <!-- <el-button type="warning" title="开发中" disabled>栏位配置</el-button>
            <el-button type="success" title="开发中" disabled>导出Excel</el-button> -->
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
      <!-- 表格列表start -->
      <section>
        <u-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="300"
          class="tableContent commonTable"
          @row-click="rowClick"
          use-virtual
          :row-height="30"
          ref="TicketChildref"
        >
          <u-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </u-table-column>
          <u-table-column
            prop="PJLYMX_PJH"
            label="票号"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_PJZT"
            label="票据状态"
            width="120"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_JE"
            label="金额"
            width="100"
          ></u-table-column>
          <u-table-column
            prop="FJDA_FJMC"
            label="资源名称"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_JKR"
            label="交款人"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_SKR"
            label="收款人"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_SKR"
            label="开票人"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_SKRQ"
            label="开票日期"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_SKNY"
            label="单据账期"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLY_PJLX"
            label="票据类型"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_ZFR"
            label="作废人"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_ZFSJ"
            label="作废时间"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            prop="PJLYMX_ZFYY"
            label="作废原因"
            show-overflow-tooltip
          ></u-table-column>
        </u-table>
        <!-- 分页 -->
        <el-row>
          <div class="el-paginationR" v-if="returnTotal">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="tableParameter.pageSize"
              layout="total,prev, pager, next, jumper"
              :total="returnTotal"
            >
            </el-pagination>
          </div>
        </el-row>
        <!-- 表格列表end -->
        <!-- 开票明细 -->
        <section class="billBox">
          <!-- <el-button type="primary" icon="el-icon-download" @click="downloadModel" :disabled="disableDown" style="margin-bottom:5px;">数据导出
          </el-button> -->
          <el-row>
            <!-- 表格 -->
            <el-table
              :data="DetailtableData"
              border
              style="width: 100%"
              max-height="300"
              class="tableContent commonTable"
            >
              <el-table-column
                prop="PJMX_SFXMMC"
                label="费用项目"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="PJMX_SKFS"
                label="收款方式"
                width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="PJMX_SFJE"
                label="收费金额(含税)"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="PJMX_SL"
                label="税率(%)"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="PJMX_BHSJE"
                label="金额(不含税)"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="PJMX_SE"
                label="税额"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="PJMX_ZY"
                label="费用区间"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </el-row>
        </section>
      </section>
    </div>
    <billobsolete
      :obsoleteShow.sync="obsoleteShow"
      ref="obsoleteChildren"
      @RefreshItem="RefreshList"
    ></billobsolete>
  </div>
</template>
<script>
import {
  queryZLRoomApi,
  queryBillApi,
  queryPaperSubsidiaryApi,
  reuseOfTicketNumberApi,
  queryIsMayCancellationApi,
  queryInvoiceResultsApi,
  exportExcelApi,
} from "@/api/Realtor/TicketList"; //房屋租凭票据列表api
import { getPrintType } from "@/api/FeeManagement/TicketBill"; //票据
import billobsolete from "./components/BillObsoleteDialog"; //票据作废
import { getToken } from "@/utils/Auth"; // 验权
import { mapGetters } from "vuex";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "TicketList",
  components: {
    billobsolete,
    UTable,
    UTableColumn,
  },
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 10,
        FJDA_ZJ: "",
        PJLYMX_SKRQ1: "",
        PJLYMX_SKRQ2: "",
        PJLYMX_PJH: "",
        PJLYMX_JKR: "",
        PJLYMX_PJZT: "",
        PJLY_PJLX: "",
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        plotId: "",
      },
      tableData: [],
      DetailtableData: [],
      ResourceData: [], //资源名称列表
      disabledObsolete: true, //作废按钮默认隐藏
      radio: "",
      multipleSelection: [],
      detailRow: {},
      obsoleteShow: false, //作废弹窗默认隐藏
      disabledPrint: true, //打印按钮默认隐藏
      disabledReuse: true, //重用按钮默认隐藏
      plotData: [], //项目名称数据
      count: 0, //定时统计
      time: "", //定时
      disableDown: true,
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledPrint = true;
          if (this.detailRow.PJLYMX_KCY) {
            //判断该票据是否已重用
            this.disabledReuse = true;
          } else {
            this.disabledReuse = false;
          }
        } else {
          this.disabledReuse = true;
          if (this.detailRow.PJLYMX_SFKP == 5) {
            this.disabledPrint = true;
          } else {
            if (this.detailRow.PJMX_LX == 101) {
              //纸质发票判断
              if (this.detailRow.PJLYMX_SFGXJSP) {
                //如果为true可以打印预览
                this.disabledPrint = false;
              } else {
                this.disabledPrint = true;
              }
            } else {
              this.disabledPrint = false;
            }
          }
        }
      } else {
        this.disabledObsolete = true;
        this.disabledPrint = true;
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
          this.disabledObsolete = false;
          this.disabledReuse = true;
        }
      } else {
        this.disabledObsolete = true;
        this.disabledReuse = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.getResourceList(); //查询资源名称
            this.getTableList(1);
          });
        }
      });
    },
  },
  mounted() {
    if (sessionStorage.getItem("GLCNAME")) {
      this.tableParameter.name = sessionStorage.getItem("GLCNAME"); //当前选中的小区
    } else {
      this.tableParameter.name = this.currentPlot; //当前选中的小区
    }
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.tableParameter.name) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.getResourceList(); //查询资源名称
          this.getTableList(1);
        });
      }
    });
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableList(1);
      this.radio = ""; //选择后清空选中表格按钮
      this.detailRow = {}; //选择后清空选中表格数据
    },
    getResourceList() {
      //查询资源名称
      queryZLRoomApi(this.tableParameter).then((response) => {
        this.ResourceData = response;
      });
    },
    getTableList(val) {
      //列表数据查询
      queryBillApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        if (val == 2) {
          this.tableData.forEach((item) => {
            if (item.PJLYMX_ZJ == this.detailRow.PJLYMX_ZJ) {
              this.detailRow = item;
            }
          });
        }
        this.returnTotal = response.total;
      });
    },
    getListDetail(row) {
      //查询票据明细
      queryPaperSubsidiaryApi(row).then((response) => {
        this.DetailtableData = response;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.FJDA_ZJ = "";
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.tableParameter.dbName = item.dbName;
            this.tableParameter.GLCID = item.GLCID;
            this.tableParameter.YXDID = item.YXDID;
            sessionStorage.setItem("GLCNAME", val);
          }
        });
      } else {
        this.tableParameter.YXDID = "";
        this.tableParameter.dbName = "";
        this.tableParameter.GLCID = "";
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.getResourceList(); //查询资源名称
    },
    rowClick(row) {
      //表格单行点击
      this.detailRow = row;
      if (row.PJLYMX_PJZT == "作废") {
        this.disabledObsolete = true; //已经作废的数据不可再作废
      } else {
        this.disabledObsolete = false;
      }
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.getListDetail(row); //查询选中的收款凭证票据明细
    },
    BillObsoleteClik() {
      //作废
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
          this.getIsMayCance();
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
          reuseOfTicketNumberApi(this.detailRow).then((response) => {
            this.getTableList(2);
          });
        })
        .catch(() => {});
    },
    getIsMayCance() {
      //判断票据是否可作废
      queryIsMayCancellationApi(this.detailRow).then((response) => {
        if (response.returnStatus != "FAIL") {
          this.obsoleteShow = true;
          this.$refs.obsoleteChildren.getObjsoleteRow(this.detailRow);
        }
      });
    },
    BillCoverPrint() {
      //收据套打
      var routeData;
      routeData = this.$router.resolve({
        path: "HouseReceiptPrint/pwy_test_jjshequ_com",
        name: "收据套打",
        //query: this.formList.delId
        //params:{id:params.id}
      });
      window.open(
        routeData.href +
          "?PJLYMX_ZJ=" +
          this.detailRow.PJLYMX_ZJ +
          "&dbName=" +
          this.detailRow.dbName +
          "&X_Token=" +
          getToken(),
        "_blank"
      ); //新窗口打开页面
    },
    RefreshList(val) {
      this.detailRow = val;
      this.getTableList(2);
    },
    submit() {
      this.DetailtableData = []; //清空明细
      this.detailRow = {};
      this.radio = "";
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.getTableList(1);
    },
    downloadModel() {
      //下载模板
      exportExcelApi(this.DetailtableData).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `房屋租赁票据明细.xls`;
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
    queryInvoiceRequest() {
      //查询电子发票
      var that = this;
      queryInvoiceResultsApi(this.formList.PJLYMX_ZJ).then((response) => {
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
    BillPrint() {
      //101纸质发票，102电子发票，201纸质收据，202电子收据
      var routeData;
      if (this.detailRow.PJMX_LX == 101) {
        routeData = this.$router.resolve({
          path: "HouseTicket",
          name: "开票预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.detailRow.PJLYMX_ZJ +
            "&dbName=" +
            this.detailRow.dbName +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      } else if (this.detailRow.PJMX_LX == 102) {
        if (this.detailRow.PJLYMX_SFKP == 2) {
          window.open(`http://${this.detailRow.PJLYMX_DZFPURL}`);
        } else {
          this.queryInvoiceRequest();
        }
      } else if (this.detailRow.PJMX_LX == 201) {
        getPrintType().then((response) => {
          if (response.orgPrintType) {
            this.BillCoverPrint();
          } else {
            routeData = this.$router.resolve({
              path: "HouseReceipt",
              name: "收据预览",
              //query: this.formList.delId
              //params:{id:params.id}
            });
            window.open(
              routeData.href +
                "?PJLYMX_ZJ=" +
                this.detailRow.PJLYMX_ZJ +
                "&dbName=" +
                this.detailRow.dbName +
                "&X_Token=" +
                getToken(),
              "_blank"
            ); //新窗口打开页面
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "HouseelReceipt",
          name: "收据预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.detailRow.PJLYMX_ZJ +
            "&dbName=" +
            this.detailRow.dbName +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      }
    },
  },
};
</script>
<style lang="scss">
.TicketList {
  .billBox {
    margin-top: 20px;
  }
  .commonTable .cell {
    line-height: 30px;
    height: 30px;
  }
  .commonTable td,
  .commonTable th {
    padding: 0 !important;
    height: 30px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 170px;
  }
}
</style>
