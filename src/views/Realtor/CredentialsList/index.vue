<template>
  <!--收款凭证-->
  <div class="CredentialsList">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
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
            <el-col :span="6" style="width: 300px">
              <el-form-item label="资源名称:" label-width="70px">
                <el-select v-model="tableParameter.FJDA_FJMC" clearable>
                  <el-option
                    v-for="(item, index) in resourceData"
                    :key="index"
                    :value="item.FJDA_FJMC"
                    :label="item.FJDA_FJMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="交款人:" label-width="70px">
                <el-input
                  v-model="tableParameter.SKPZ_JKR"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="来源查询:" label-width="70px">
                <el-select v-model="tableParameter.SKPZ_LY" clearable>
                  <el-option label="微信端" :value="0"></el-option>
                  <el-option label="pc端" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'CredentialsListQuery_has'"
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
              :disabled="disabledTicket"
              @click="TicketDialog"
              v-has="'CredentialsListTicket_has'"
              >开票</el-button
            >
            <el-button type="primary" title="开发中" disabled
              >批量电子开票</el-button
            >
            <el-button
              type="danger"
              :disabled="disabledCancel"
              @click="CancellationDialog"
              v-has="'CredentialsListCanle_has'"
              >作废</el-button
            >
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
          highlight-current-row
          style="width: 100%"
          max-height="300"
          class="tableContent commonTable"
          @selection-change="changeFun"
          @row-click="rowClick"
          use-virtual
          :row-height="30"
          ref="credenChidren"
        >
          <u-table-column
            label="选择"
            type="selection"
            @selection-change="changeFun"
            fixed
          >
          </u-table-column>
          <u-table-column
            label="资源代码"
            prop="FJDA_FJID"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="资源名称"
            prop="FJDA_FJMC"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="实收账期"
            prop="SKPZ_SKNY"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="制单日期"
            prop="SKPZ_TZRQ"
            width="200"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="交款人"
            prop="SKPZ_JKR"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="金额"
            prop="SKPZ_SKJE"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="收款人"
            prop="SKPZ_SKR"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column label="来源" prop="SKPZ_LY">
            <template slot-scope="scope">
              {{
                scope.row.SKPZ_LY == 1
                  ? "pc端"
                  : scope.row.SKPZ_LY == 2
                  ? "微信端"
                  : "其它"
              }}
            </template>
          </u-table-column>
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
        <!-- 收款凭证明细start-->
        <section class="footer_bottomDetail">
          <el-button
            type="success"
            icon="el-icon-download"
            @click="downloadModel"
            :disabled="disableDown"
            style="margin-bottom: 5px"
            v-has="'CredentialsListDownExe_has'"
            >导出excel
          </el-button>
          <el-table
            :data="tableDataDetail"
            border
            style="width: 100%"
            max-height="300"
            class="tableContent commonTable"
          >
            <el-table-column
              label="费用项目"
              prop="SKMX_SKFYMC"
              width="150"
              fixed
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="所属年月"
              prop="SKMX_SSNY"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="收款方式"
              prop="SKMX_SKFS"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="收款金额（含税）"
              prop="SKMX_SKJE"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="税率（%）"
              prop="SKMX_SL"
              width="100"
            ></el-table-column>
            <el-table-column
              label="金额（不含税）"
              prop="SKMX_BHSJE"
              width="200"
            ></el-table-column>
            <el-table-column
              label="税额"
              prop="SKMX_SE"
              width="200"
            ></el-table-column>
            <el-table-column
              label="费用期间"
              prop="SKMX_SKZY"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </section>
        <!-- 收款凭证明细end -->
      </section>
    </div>
    <!-- 作废与开票弹窗start -->
    <CancellationDialog
      :showdialog.sync="showdialog"
      @PopCancelEmit="PopCancelEmit"
      ref="cancellChildren"
    >
    </CancellationDialog>
    <!-- 作废与开票弹窗end -->

    <!-- 作废与开票弹窗start -->
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="PopCancelEmit"
      ref="ticketChilren"
    ></TicketDialog>
    <!-- 作废与开票弹窗end -->
  </div>
</template>
<script>
import {
  queryRoomNameApi,
  queryReceiptVoucherApi,
  queryReceiptVoucherDetailsApi,
  isExistBillForReceiptVoucherApi,
  isCanMakeBillForReceiptVoucherApi,
  exportExcelApi,
} from "@/api/Realtor/CredentialsList"; //房屋租凭凭证列表api
import CancellationDialog from "./components/CancellationDialog"; //作废弹窗
import TicketDialog from "../components/TicketDialog"; //开票弹窗
import { mapGetters } from "vuex";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "CredentialsList",
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  components: {
    CancellationDialog,
    TicketDialog,
    UTable,
    UTableColumn,
  },
  data() {
    return {
      currentPage: 1, //当前页
      returnTotal: null, //总共条数\
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 10,
        SKPZ_JKR: "",
        SKPZ_LY: "",
        FJDA_FJMC: "",
        dbName: "",
        GLCID: "",
        YXDID: "",
      },
      tableData: [], //列表数据
      tableDataDetail: [], //明细数据
      multipleSelection: [], //选中的列表数据
      resourceData: [],
      detailRow: {},
      disabledCancel: true, //作废按钮默认启用
      disabledTicket: true, //开票按钮默认禁用
      showdialog: false, //作废弹窗默认隐藏
      showTicket: false, //开票弹窗默认隐藏
      disableDown: true,
    };
  },
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length > 1) {
        //只能单笔凭证作废
        this.disabledCancel = true;
        this.disabledTicket = true;
      } else {
        if (this.multipleSelection.length <= 0) {
          this.disabledCancel = true;
          this.disabledTicket = true;
        } else {
          //判断作废按钮是否可点击
          if (this.multipleSelection[0].SKPZ_YXPZ) {
            this.disabledCancel = false;
            this.getisCanBill(this.multipleSelection[0]);
          } else {
            this.disabledCancel = true;
            this.disabledTicket = true;
          }
        }
      }
    },
    currentPlot() {
      //监听当前选中的小区
      this.tableParameter.name = this.currentPlot;
    },
    userPlot() {
      //监听小区列表数据
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryResoureceRequest();
            this.getTableList();
          });
        }
      });
    },
    tableDataDetail() {
      //监听如果明细数据没空 下载按钮不可点击
      if (this.tableDataDetail.length > 0) {
        this.disableDown = false;
      } else {
        this.disableDown = true;
      }
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
          this.queryResoureceRequest();
          this.getTableList();
        });
      }
    });
  },
  methods: {
    getTableList() {
      //列表数据查询
      queryReceiptVoucherApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    getDetailList() {
      //明细数据查询
      queryReceiptVoucherDetailsApi(this.detailRow).then((response) => {
        this.tableDataDetail = response;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryRoomNameApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableList();
    },
    changeFun(val) {
      //表格选择选
      this.multipleSelection = val;
      this.detailRow = this.multipleSelection[0];
      if (this.detailRow) {
        this.getDetailList(); //查询明细
      }
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.FJDA_FJMC = "";
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
        this.tableParameter.dbName = "";
        this.tableParameter.GLCID = "";
        this.tableParameter.YXDID = "";
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryResoureceRequest();
    },
    rowClick(row) {
      // this.detailRow = row;
      this.$refs.credenChidren.toggleRowSelection(row); //单击表格复选框选中
    },
    CancellationDialog() {
      //作废
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "只能单条凭证作废?",
          type: "warning",
        });
      } else {
        //判断凭证是否有开票
        isExistBillForReceiptVoucherApi(this.multipleSelection[0]).then(
          (response) => {
            if (response.length > 0) {
              this.$confirm("作废凭证会同时将票据号作废, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.showdialog = true;
                  this.$refs.cancellChildren.getData(
                    this.multipleSelection[0],
                    response
                  );
                })
                .catch(() => {});
            } else {
              //为空表示没有开票
              this.showdialog = true;
              this.$refs.cancellChildren.getData(
                this.multipleSelection[0],
                response
              );
            }
          }
        );
      }
    },
    TicketDialog() {
      //开票
      this.showTicket = true;
      this.$refs.ticketChilren.getData(this.detailRow, 2);
    },
    getisCanBill(val) {
      //判断是否可开票
      isCanMakeBillForReceiptVoucherApi(val).then((response) => {
        if (response.isCan == "true") {
          //true 可开票
          this.disabledTicket = false;
        } else {
          this.disabledTicket = true;
        }
      });
    },
    PopCancelEmit() {
      this.getTableList();
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.tableDataDetail = [];
      this.getTableList();
    },
    downloadModel() {
      //下载模板
      exportExcelApi(this.tableDataDetail).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `房屋租赁凭证明细.xls`;
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
  },
};
</script>
<style lang="scss">
.CredentialsList {
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .footer_bottomDetail {
    margin-top: 20px;
  }
  .el-form-item {
    margin-bottom: 10px !important;
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
}
</style>
