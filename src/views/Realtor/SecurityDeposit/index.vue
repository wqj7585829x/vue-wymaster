<template>
  <!--押金/保证金-->
  <div class="SecurityDeposit">
    <!-- 搜索框begin -->
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
            <el-form-item label="合同编号:" label-width="70px">
              <el-select
                v-model="tableParameter.YCXSF_HTWJ"
                @change="contractChange"
                clearable
              >
                <el-option
                  v-for="item in proChargeData"
                  :key="item.contract_id"
                  :value="item.contract_id"
                  :label="item.contract_num"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="房间名称:" label-width="70px">
              <el-select
                v-model="tableParameter.FJDA_FJID"
                @change="fjChange"
                clearable
              >
                <el-option
                  v-for="item in resourceData"
                  :key="item.FJDA_FJID"
                  :value="item.FJDA_FJID"
                  :label="item.FJDA_FJMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="客户名称:" label-width="70px">
              <el-select v-model="tableParameter.KHDA_KHMC" clearable>
                <el-option
                  v-for="item in clientData"
                  :key="item.KHDA_ZJ"
                  :value="item.KHDA_KHMC"
                  :label="item.KHDA_KHMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="费用项目:" label-width="70px">
              <el-select v-model="tableParameter.YCXSF_SFXMMC" clearable>
                <el-option
                  v-for="item in projectData"
                  :key="item.SFXM_SFXMMC"
                  :value="item.SFXM_SFXMMC"
                  :label="item.SFXM_SFXMMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 0">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="submit()"
                v-has="'SecurityDepositQuery_has'"
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
            @click="paymentAction"
            v-has="'SecurityDepositPyament_has'"
          >
            交款</el-button
          >
          <el-button
            type="primary"
            @click="refundAction"
            :disabled="disabledRefund"
            v-has="'SecurityDepositRefund_has'"
            >退款
          </el-button>
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disablecancel"
            v-has="'SecurityDepositCancel_has'"
          >
            作废
          </el-button>
          <el-button
            type="primary"
            @click="openTicketAction"
            :disabled="disabledTicket"
            v-has="'SecurityDepositTicket_has'"
          >
            开票</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <div class="standardTable">
      <el-table
        ref="multipleTable"
        style="width: 100%"
        max-height="300"
        :data="tableData"
        border
        @row-click="rowclick"
        class="commonTable"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_ZFBZ" label="已作废" width="110">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.YCXSF_ZFBZ" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_QRSK" label="确认收款" width="110">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.YCXSF_QRSK" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_SFXMMC" label="收费项目" width="200">
        </el-table-column>
        <el-table-column prop="YCXSF_PJH" label="票据号" width="200">
        </el-table-column>
        <el-table-column prop="YCXSF_SKFS" label="收款方式" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_JKR" label="交款人" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_JFJSR" label="交款经手人" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_SFBZ" label="币种" width="150">
        </el-table-column>

        <el-table-column prop="YCXSF_SL" label="税率(%)" width="150">
        </el-table-column>

        <el-table-column prop="YCXSF_SFRQ" label="收费日期" width="150">
        </el-table-column>

        <el-table-column prop="YCXSF_TKYE" label="余额" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFSJ" label="作废时间" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFR" label="作废人" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFYY" label="作废原因" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_PJLX" label="票据类型" width="100">
        </el-table-column>
        <el-table-column prop="YCXSF_TKFS" label="退款方式" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_TKRQ" label="退款日期" width="200">
        </el-table-column>
        <el-table-column prop="YCXSF_TFJSR" label="退款经手人" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_RZSJ" label="入帐时间" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_BZ" label="备注"> </el-table-column>
      </el-table>
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
    </div>
    <!-- 表 end -->

    <!-- 退款明细 -->
    <section class="refundBox">
      <div class="detail_wrap">
        <div class="detail_txt">退款明细</div>
        <el-button
          type="danger"
          @click="refundBillObsolete"
          :disabled="disabledObsolete"
          v-has="'SecurityDepositMxCancel_has'"
          >作废</el-button
        >
      </div>
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="detailTableData"
          border
          highlight-current-row
          style="width: 100%"
          max-height="300"
          @row-click="refundBoxClick"
          ref="detailTable"
          class="commonTable"
        >
          <el-table-column
            prop="YCXSFTKMX_TKFS"
            label="退款方式"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="YCXSFTKMX_TKRQ"
            label="退款日期"
            width="200"
          ></el-table-column>
          <el-table-column label="退款余额" width="200">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.YCXSFTKMX_TKYE) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="YCXSFTKMX_BZ"
            label="备注"
            width="300"
          ></el-table-column>
          <el-table-column prop="YCXSFTKMX_ZFBZ" label="作废">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.YCXSFTKMX_ZFBZ"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </section>

    <!-- 交款 弹框 begin -->
    <PaymentDialog
      :showPayment.sync="showPayment"
      ref="PopPaymentChildren"
      @RefreshItem="RefreshList"
    ></PaymentDialog>
    <!-- 交款 弹框 end -->

    <!-- 作废 弹框 begin -->
    <billobsolete
      :obsoleteShow.sync="obsoleteShow"
      ref="obsoleteChildren"
      @RefreshItem="RefreshList"
    ></billobsolete>
    <!-- 作废 弹框 end -->

    <!-- 退款 弹框 begin -->
    <RefundDialog
      :showRefund.sync="showRefund"
      ref="PopRefundChildren"
      @RefreshItem="RefreshList"
    ></RefundDialog>
    <!-- 退款 弹框 end -->

    <!-- 开票 弹框 begin -->
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="RefreshList"
      ref="ticketChilren"
    ></TicketDialog>
    <!-- 开票 弹框 end -->
  </div>
</template>

<script>
import {
  queryZLRoomApi,
  queryAllChargeItemApi,
  queryClientsApi,
  queryDepositPaymentProjectApi,
  queryDepositPaymentApi,
  queryRefundDetailsApi,
  canInvoiceApi,
  refundInvalidApi,
} from "@/api/Realtor/SecurityDeposit"; //押金保证金js
import { formatMoney } from "@/utils/global.js";
import PaymentDialog from "./components/PaymentDialog"; //交款
import RefundDialog from "./components/RefundDialog"; //退款
import billobsolete from "./components/BillObsoleteDialog"; //作废
import TicketDialog from "../components/TicketDialog"; //开票弹窗
import { mapGetters } from "vuex";
export default {
  name: "SecurityDeposit",
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      disabledRefund: true, //退款
      disablecancel: true, //作废
      disableopenTicket: true, //开票
      disabledObsolete: true, //退款明细作废  默认不可点击
      tableRow: {}, //修改数据
      detailRow: {}, //明细点击数据
      radio: "", //单选按钮
      showPayment: false, //交款 弹框 显示
      showRefund: false, //退款 弹框 显示
      showTicket: false, //开票 弹框 显示
      disabledTicket: true,
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 10,
        FJDA_FJID: "",
        FJDA_ZJ: "",
        YCXSF_HTWJ: "",
        KHDA_KHMC: "",
        YCXSF_SFXMMC: "",
        dbName: "",
        GLCID: "",
        YXDID: "",
      },
      tableData: [],
      TicketlPop: "", //开票弹窗prop传值
      detailTableData: [], //退款明细
      obsoleteShow: false, //票据号作废弹窗  默认隐藏
      YCXSFTKMX_ZJ: null, //退款明细主键
      YCXSFTKMX_YCXSFWJ: null,
      resourceData: [], //资源名称数据
      projectData: [], //收费项目数据
      proChargeData: [], //合同管理主键
      clientData: [], //客户名称数据
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.tableRow.YCXSF_ZFBZ) {
          this.disablecancel = true;
          this.disabledRefund = true;
        } else {
          if (this.tableRow.YCXSF_TKJE) {
            this.disablecancel = true;
          } else {
            this.disablecancel = false;
          }
          this.disabledRefund = false;
        }
      } else {
        this.disabledTicket = true;
        this.disabledRefund = true;
        this.disablecancel = true;
      }
    },
    detailRow() {
      if (Object.keys(this.detailRow).length > 0) {
        if (this.detailRow.YCXSFTKMX_ZFBZ) {
          this.disabledObsolete = true;
        } else {
          this.disabledObsolete = false;
        }
      } else {
        this.disabledTicket = true;
        this.disabledObsolete = true;
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      console.log("userPlot:" + JSON.stringify(this.userPlot));
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryProjectRequest(); //收费项目查询
            this.queryChargeItemRequest(); //合同编号查询
            this.getTableData(); //列表数据
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
          this.queryProjectRequest(); //收费项目查询
          this.queryChargeItemRequest(); //合同编号查询
          this.getTableData(); //列表数据
        });
      }
    });
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableData();
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.detailTableData = []; //清空明细
      this.detailRow = {}; //清空明细选中数据
    },
    // 获取表数据
    getTableData(val) {
      queryDepositPaymentApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        if (this.tableData.length > 0) {
          if (val == 2) {
            if (Object.keys(this.tableRow).length > 0) {
              this.tableData.forEach((item) => {
                if (item.YCXSF_ZJ == this.tableRow.YCXSF_ZJ) {
                  this.tableRow = item;
                  this.radio = this.tableData.indexOf(this.tableRow); //单行点击单选按钮选中
                }
              });
            }
          }
        } else {
          this.detailTableData = []; //清空明细
          this.detailRow = {}; //清空明细选中数据
        }
      });
    },
    // 退款明细
    refundDetail(val) {
      queryRefundDetailsApi(this.tableRow).then((response) => {
        this.detailTableData = response.data;
        if (val == 2) {
          if (this.detailTableData.length > 0) {
            this.detailTableData.forEach((item) => {
              if (item.YCXSFTKMX_ZJ == this.detailRow.YCXSFTKMX_ZJ) {
                this.detailRow = item;
                this.$refs.detailTable.setCurrentRow(this.detailRow); //默认选中
              }
            });
          }
        }
      });
    },
    queryChargeItemRequest() {
      //合同编码查询
      queryAllChargeItemApi(this.tableParameter).then((response) => {
        this.proChargeData = response;
      });
    },
    queryProjectRequest() {
      //收费项目查询
      queryDepositPaymentProjectApi(this.tableParameter).then((response) => {
        this.projectData = response;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.tableParameter).then((response) => {
        this.clientData = response;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.FJDA_FJID = "";
      this.tableParameter.KHDA_KHMC = "";
      this.tableParameter.YCXSF_HTWJ = "";
      this.tableParameter.YCXSF_SFXMMC = "";
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
        this.resourceData = [];
        this.clientData = [];
        this.projectData = [];
        this.proChargeData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryProjectRequest(); //收费项目查询
      this.queryChargeItemRequest(); //合同编号查询
    },
    contractChange(val) {
      //合同编码改变事件
      this.tableParameter.FJDA_FJID = "";
      this.tableParameter.KHDA_KHMC = "";
      if (val) {
        this.queryResoureceRequest(); //资源名称查询
      } else {
        this.resourceData = [];
        this.clientData = [];
      }
    },
    fjChange(val) {
      //资源名称改变事件
      this.tableParameter.KHDA_KHMC = "";
      if (val) {
        var obj = this.resourceData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.FJDA_FJID === val; //筛选出匹配数据
        });
        this.tableParameter.FJDA_ZJ = obj.FJDA_ZJ;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.queryClientRequest(); //客户名称查询
      } else {
        this.clientData = [];
      }
    },
    formatMoney(data) {
      if (String(data)) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      }
    },
    // 行点击
    rowclick(row) {
      this.detailRow = {}; //清空明细选中数据
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.$nextTick(() => {
        this.isInvoice();
        this.refundDetail();
      });
    },
    refundBoxClick(row) {
      //退款明细表格点击事件
      this.detailRow = row;
      this.YCXSFTKMX_ZJ = row.YCXSFTKMX_ZJ;
    },
    refundBillObsolete() {
      //退款明细作废
      this.$confirm("是否确实要作废此笔退款明细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          refundInvalidApi(
            this.YCXSFTKMX_ZJ,
            this.detailRow,
            this.tableParameter.dbName
          ).then((response) => {
            this.getTableData(2);
            this.refundDetail(2);
          });
        })
        .catch(() => {});
    },
    BillObsolete() {
      //作废
      this.$confirm(
        "请确认是否作废票据" +
          (this.tableRow.YCXSF_PJH ? this.tableRow.YCXSF_PJH : "") +
          "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (this.detailRow.PJMX_LX == 101) {
          } else {
          }
          this.obsoleteShow = true;
          this.$refs.obsoleteChildren.getObjsoleteRow(this.tableRow);
        })
        .catch(() => {});
    },
    isInvoice() {
      //判断是否可开票
      canInvoiceApi(this.tableRow).then((response) => {
        if (response.data.canInvoice == "false") {
          this.disabledTicket = true;
        } else {
          this.disabledTicket = false;
        }
      });
    },

    submit() {
      // 查询
      this.clearTable();
      this.getTableData();
    },
    // 交款
    paymentAction() {
      this.showPayment = true;
      this.$refs.PopPaymentChildren.getData(this.tableParameter);
    },
    // 退款
    refundAction() {
      this.showRefund = true;
      this.$refs.PopRefundChildren.getData(this.tableRow);
    },
    // 刷新表
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.detailTableData = [];
      this.detailRow = {}; //清空明细选中数据
      this.getTableData();
    },
    // 开票
    openTicketAction() {
      this.showTicket = true;
      this.$refs.ticketChilren.getData(this.tableRow, 3);
    },
    // 交款 标题提示
    paymentTitle() {
      if (this.disabledPayment) {
        return "请选择房间";
      }
    },
    // 退款 标题提示
    refundTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 开票 标题提示
    openTicketTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 作废 标题提示
    cancelTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    clearTable() {
      //清空选中数据
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.detailTableData = []; //清空明细
      this.tableRow = {};
      this.radio = "";
    },
  },
  components: {
    PaymentDialog,
    billobsolete,
    RefundDialog,
    TicketDialog,
  },
};
</script>

<style lang="scss">
.SecurityDeposit {
  .refundBox {
    border-top: 4px solid #eff0f0;
    margin-top: 5px;
    .detail_wrap {
      width: 100%;
      padding: 5px 0;
      .detail_txt {
        color: #666;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        display: inline-block;
      }
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
