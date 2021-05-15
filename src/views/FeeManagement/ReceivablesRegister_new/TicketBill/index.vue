<template>
  <div class="TicketBill">
    <!-- 搜索框begin -->
    <div class="Resource_wrap" ref="elResourece">
      <section class="content_wrap">
        <span class="current_resource"
          >当前资源：<span class="TextColor">{{ resourceName }}</span></span
        >
        <span class="current_client"
          >当前客户：<span class="TextColor">{{
            tableParameter.KHDA_KHMC
          }}</span></span
        >
      </section>
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: 250px">
            <el-form-item label="票据号：" label-width="70px">
              <el-input
                auto-complete="off"
                v-model="tableParameter.PJLYMX_PJH"
                clearable
                class="input_common"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="票据状态:" label-width="70px">
              <el-select
                v-model="tableParameter.PJLYMX_PJZT"
                class="input_common"
                clearable
              >
                <el-option value="正常" label="正常"></el-option>
                <el-option value="作废" label="作废"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="开票类型:" label-width="70px">
              <el-select
                v-model="tableParameter.invoiceType"
                class="input_common"
                clearable
              >
                <el-option :value="1" label="已交款申请开票"></el-option>
                <el-option :value="2" label="先票后款"></el-option>
                <el-option :value="3" label="未收款确认收入"></el-option>
                <el-option :value="4" label="已交款开票"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="票据分类:" label-width="70px">
              <el-select
                v-model="tableParameter.PJLYMX_PJFL"
                class="input_common"
                clearable
              >
                <el-option value="发票" label="发票"></el-option>
                <el-option value="收据" label="收据"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="票据类型:" label-width="70px">
              <el-select
                v-model="tableParameter.PJLY_PJLX"
                class="input_common"
                clearable
              >
                <el-option :value="1" label="纸质"></el-option>
                <el-option :value="2" label="电子"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="收清状态:" label-width="70px">
              <el-select
                v-model="tableParameter.ZFZT"
                class="input_common"
                clearable
              >
                <el-option value="1" label="已收清"></el-option>
                <el-option value="0" label="未收清"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 250px">
            <el-form-item label="开始日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.QSNY"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 250px">
            <el-form-item label="结束日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.JZNY"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 250px">
            <el-form-item label="收款方式:" label-width="70px">
              <el-select v-model="tableParameter.SFKM_SKFS" clearable>
                <el-option
                  v-for="item in PayWayData"
                  :key="item.SFKM_ZJ"
                  :value="item.SFKM_SKFS"
                  :label="item.SFKM_SKFS"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 250px">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="submit()"
                v-has="'ReceiTicketBillQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮区域start -->
    <section class="buttonBox" ref="elbuttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="danger"
            :title="ObsoleteTitle"
            :disabled="disabledApplyObs"
            @click="ApplyInvalid"
            >申请作废
          </el-button>
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disabledObsolete"
            :title="ObsoleteTitle"
            v-has="'ReceiTicketBillObsolete_has'"
            >作废</el-button
          >
          <el-button
            type="primary"
            @click="Billreuse"
            :disabled="disabledReuse"
            :title="ReuseTitle"
            v-has="'ReceiTicketBillReuse_has'"
            >票据号重用</el-button
          >
          <el-button
            type="primary"
            @click="BillPrint"
            :disabled="disabledPrint"
            v-has="'ReceiTicketBillPrint_has'"
            >打印预览
          </el-button>
          <!-- <el-button type="primary" @click="BillCoverPrint" :disabled="disabledCoverPrint">收据套打</el-button> -->
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
        :max-height="250"
        class="commonTable"
        @row-click="rowClick"
        :cell-class-name="cellStyle"
        use-virtual
        :row-height="30"
      >
        <u-table-column label="选择" width="50" fixed>
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </u-table-column>
        <u-table-column
          prop="PJLYMX_PJZT"
          label="票据状态"
          width="120"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          prop="PJLYMX_PJH"
          label="票据号"
          width="200"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column prop="PJLYMX_KCY" label="已重用" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.PJLYMX_KCY" disabled></el-checkbox>
          </template>
        </u-table-column>
        <u-table-column label="收清状态" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.ZFZT == 1 ? "已收清" : ""
            }}{{ scope.row.ZFZT == 0 ? "未收清" : "" }}
          </template>
        </u-table-column>
        <u-table-column label="金额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJLYMX_JE) }}
          </template>
        </u-table-column>
        <u-table-column
          prop="invoiceType"
          label="开票类型"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.invoiceType == 1 ? "已交款申请开票" : ""
            }}{{ scope.row.invoiceType == 2 ? "先票后款" : ""
            }}{{ scope.row.invoiceType == 3 ? "未收款确认收入" : ""
            }}{{ scope.row.invoiceType == 4 ? "已交款开票" : "" }}
          </template>
        </u-table-column>
        <u-table-column
          prop="PJLYMX_KHMC"
          label="客户名称"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          prop="PJLYMX_JKR"
          label="交款人"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="票据类型" prop="PJMX_LX" width="150">
          <template slot-scope="scope">
            {{ scope.row.PJMX_LX == 101 ? "纸质发票" : "" }}
            {{ scope.row.PJMX_LX == 102 ? "电子发票" : ""
            }}{{ scope.row.PJMX_LX == 201 ? "纸质收据" : ""
            }}{{ scope.row.PJMX_LX == 202 ? "电子收据" : "" }}
          </template>
        </u-table-column>
        <u-table-column
          prop="PJLYMX_SKRQ"
          label="开票日期"
          width="200"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          prop="PJLYMX_SKR"
          label="开票人"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="是否开票" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.PJLYMX_SFKP == 0 ? "未开票" : "" }}
            {{ scope.row.PJLYMX_SFKP == 1 ? "已开票" : "" }}
            {{ scope.row.PJLYMX_SFKP == 2 ? "开票成功" : "" }}
            {{ scope.row.PJLYMX_SFKP == 3 ? "开票失败" : "" }}
            {{ scope.row.PJLYMX_SFKP == 5 ? "等待开票结果" : "" }}
          </template>
        </u-table-column>
        <u-table-column label="审核状态" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.status == 0 ? "审核中" : ""
            }}{{ scope.row.status == 1 ? "审核通过" : ""
            }}{{ scope.row.status == 2 ? "审核不通过" : "" }}
          </template>
        </u-table-column>
        <u-table-column
          label="不通过理由"
          prop="remark"
          width="200"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="作废信息" prop="SKPZ_SKBS" width="120">
          <template slot-scope="scope">
            <span
              class="spanBlcok"
              @click="obsoletefunc(scope.row)"
              size="small"
              >查看</span
            >
          </template>
        </u-table-column>
        <u-table-column label="增值税信息" prop="SKPZ_SKBS">
          <template slot-scope="scope">
            <span class="spanBlcok" @click="vatfunc(scope.row)" size="small"
              >查看</span
            >
          </template>
        </u-table-column>
      </u-table>
      <billobsolete
        :obsoleteShow.sync="obsoleteShow"
        ref="obsoleteChildren"
        :clickTreeObjVal="clickTreeObjVal"
        @RefreshItem="obsoleteRefreshList"
      ></billobsolete>

      <!--作废信息 start-->
      <ObsoleteInfoDialog
        :showInfo.sync="showInfo"
        ref="infoChilren"
      ></ObsoleteInfoDialog>
      <!--作废信息 end-->

      <!--增值税信息 start-->
      <vatInfoDialog
        :showVatInfo.sync="showVatInfo"
        ref="vatChildren"
      ></vatInfoDialog>
      <!--增值税信息 end-->
    </section>
    <!-- 开票明细 -->
    <section class="billBox">
      <div ref="DetailRef">
        <div class="detail_txt">开票明细</div>
        <!-- <el-button type="primary" icon="el-icon-download" @click="downloadModel" :disabled="disableDown"
        style="margin-bottom:5px;">数据导出</el-button> -->
      </div>
      <el-row>
        <!-- 表格 -->
        <u-table
          :data="DetailtableData"
          border
          style="width: 100%"
          :max-height="300"
          class="tableContent commonTable"
        >
          <u-table-column
            prop="PJMX_SFXMMC"
            label="收费项目"
            width="200"
          ></u-table-column>
          <!-- <u-table-column prop="PJMX_SFBZ" label="收费币种" width="100"></u-table-column> -->
          <u-table-column
            prop="PJMX_SKFS"
            label="收款方式"
            width="120"
          ></u-table-column>
          <u-table-column label="金额(含税)" width="120">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_SFJE) }}
            </template>
          </u-table-column>
          <!-- <u-table-column label="折算金额(含税)" width="120">
            <template slot-scope="scope">
              {{formatMoney(scope.row.PJMX_ZSJE)}}
            </template>
          </u-table-column> -->
          <u-table-column
            prop="PJMX_SL"
            label="税率(%)"
            width="80"
          ></u-table-column>
          <u-table-column label="金额(不含税)" width="120">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_BHSJE) }}
            </template>
          </u-table-column>
          <u-table-column label="税额" width="100">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_SE) }}
            </template>
          </u-table-column>
          <u-table-column prop="PJMX_ZY" label="摘要">
            <template slot-scope="scope">
              <span>{{ scope.row.PJMX_ZY }}{{ scope.row.PJMX_SFJE }}</span>
            </template>
          </u-table-column>
        </u-table>
      </el-row>
    </section>
  </div>
</template>
<script>
import {
  orgTreeBill,
  orgTreeBillDetail,
  IsMayCancellation,
  confirmCancellation,
  reuseOfTicketNumber,
  cancelinv,
  submitInvoice,
  getPrintType,
  exportExcelApi,
  queryBillPrintTypeApi,
  querytPayWay,
  invalidApplicationApi,
} from "@/api/FeeManagement/TicketBill_new"; //票据
import { queryInvoiceResultsApi } from "@/api/FeeManagement/CollectionCredentials";
import billobsolete from "./components/BillObsoleteDialog"; //票据作废
import ObsoleteInfoDialog from "./components/ObsoleteInfoDialog"; //作废信息
import vatInfoDialog from "./components/vatInfoDialog"; //增值税信息
import { getToken } from "@/utils/Auth"; // 验权
import { getLastYearYestdy, currDate, formatMoney } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "TicketBill",
  props: ["clickTreeObjVal", "resourceName"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  data() {
    return {
      tabulationBeginEnd: "", //开票日期
      radio: "",
      tableData: [], //票据表格数据
      DetailtableData: [], //开票明细表格数据
      tableParameter: {
        //搜索列表参数
        QSNY: null,
        JZNY: null,
      },
      detailRow: {}, //选中票据data
      obsoleteShow: false, //票据号作废弹窗  默认隐藏
      disabledObsolete: true, //作废按钮默认隐藏
      disabledApplyObs: true, //作废申请按钮默认隐藏
      disabledPrint: true, //打印默认隐藏
      disabledCoverPrint: true, //套打默认隐藏
      ObsoleteTitle: "", //作废按钮标题提示
      disabledReuse: true, //重用按钮默认隐藏
      ReuseTitle: "", //作废按钮标题提示
      selectType: 1, //1按资源 2按客户
      showVatInfo: false, //增值税信息默认隐藏
      showInfo: false, //作废信息默认隐藏
      formList: {},
      count: 0, //定时统计
      time: "", //定时
      GLCID: "",
      YXDID: "",
      disableDown: true, //数据导出默认不可点击
      PayWayData: [], //收款方式数据
      ZFR: "", //作废人
    };
  },
  watch: {
    radio() {
      if (this.radio == "") {
        this.disabledReuse = true;
        this.disabledObsolete = true;
        this.disabledApplyObs = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
    detailRow() {
      if (Object.keys(this.detailRow).length != 0) {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledPrint = true;
          this.disabledCoverPrint = true;
          if (this.detailRow.PJLYMX_KCY) {
            //判断该票据是否已重用
            this.disabledReuse = true;
          } else {
            this.disabledReuse = false;
          }
        } else {
          if (this.detailRow.PJLYMX_SFKP == 5) {
            //PJLYMX_SFKP 是否开票 5代表等待结果不可以开票
            this.disabledPrint = true;
          } else {
            if (this.detailRow.PJMX_LX == 101) {
              //纸质发票判断
              if (this.detailRow.PJLYMX_SFGXJSP) {
                //如果为true可以打印预览--PJLYMX_SFGXJSP是否勾选金税盘，如果勾选就可以开票
                this.disabledPrint = false;
              } else {
                this.disabledPrint = true;
              }
            } else {
              //如果不是纸质发票正常判断
              this.disabledPrint = false;
            }
          }
          if (this.detailRow.PJMX_LX == 201) {
            this.disabledCoverPrint = false;
          } else {
            this.disabledCoverPrint = true;
          }
          this.disabledReuse = true;
        }
      }
    },
  },
  methods: {
    formatMoney(data) {
      if (data) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      } else {
        return data;
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //  console.log(row)
      if (row.PJLYMX_PJZT == "作废") {
        //作废背景红色
        return "tabelBGRED";
      }
    },
    rowClick(row) {
      this.detailRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.getBillDetailList();
      if (this.detailRow.PJLYMX_PJZT == "作废") {
        this.disabledObsolete = true; //已经作废的数据不可再作废
        this.disabledApplyObs = true;
      } else {
        this.getIsMayCance();
      }
    },
    RecequeryByPage(obj, type) {
      this.time = [];
      this.selectType = type;
      if (obj) {
        this.tableParameter.FKGX_ZJ = obj.FKGX_ZJ;
        this.tableParameter.KHDA_KHMC = obj.KHDA_KHMC;
        if (type == 2) {
          //如果是按客户  获取客户列表的管理处id
          this.GLCID = obj.GLCID;
          this.YXDID = obj.YXDID;
        }
      }
      /**每次切换不重置 日期 start*/
      if (
        sessionStorage.getItem("ticketbill_QSNY") &&
        sessionStorage.getItem("ticketbill_QSNY") !== "null"
      ) {
        this.tableParameter.QSNY = sessionStorage.getItem("ticketbill_QSNY");
      } else {
        this.tableParameter.QSNY = getLastYearYestdy(new Date(), true); //当前日期的前一年
      }
      if (
        sessionStorage.getItem("ticketbill_JZNY") &&
        sessionStorage.getItem("ticketbill_JZNY") !== "null"
      ) {
        this.tableParameter.JZNY = sessionStorage.getItem("ticketbill_JZNY");
      } else {
        this.tableParameter.JZNY = currDate(true); //当前日期
      }
      /**每次切换不重置 日期 end*/
      this.clearTable();
      //票据表格列表
      this.getQueryTicketBillList(); //列表查询
      this.getPayWay(); //收款方式查询
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        if (obj.data.FCDM_LX != "房间") {
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = []; //清空列表数据
        }
      }
    },
    submit() {
      //保存开始/结束日期   每次切换不重置
      sessionStorage.setItem("ticketbill_QSNY", this.tableParameter.QSNY);
      sessionStorage.setItem("ticketbill_JZNY", this.tableParameter.JZNY);

      this.clearTable();
      this.getQueryTicketBillList(); //查询
    },
    getQueryTicketBillList(val) {
      orgTreeBill(this.tableParameter).then((response) => {
        this.tableData = response;
        if (val == 2) {
          this.tableData.forEach((item) => {
            if (item.PJLYMX_ZJ == this.detailRow.PJLYMX_ZJ) {
              this.detailRow = item;
            }
          });
        }
      });
    },
    getPayWay() {
      //收款方式
      querytPayWay().then((response) => {
        this.PayWayData = response;
      });
    },
    getBillDetailList() {
      //获取票据本明细列表数据
      orgTreeBillDetail(this.detailRow).then((response) => {
        this.DetailtableData = response;
      });
    },
    getIsMayCance() {
      //判断票据是否可作废
      IsMayCancellation(this.detailRow).then((response) => {
        this.disabledObsolete = !response.data.isCanCancellation;
        this.disabledApplyObs = !response.data.isCanApply;
        this.ZFR = response.data.YGDA_SYSID;
      });
    },
    BillObsolete() {
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
          this.obsoleteShow = true;
          this.$refs.obsoleteChildren.getObjsoleteRow(
            this.detailRow,
            this.ZFR,
            this.GLCID,
            this.YXDID,
            this.selectType
          );
        })
        .catch(() => {});
    },
    ApplyInvalid() {
      //申请作废
      this.$confirm("是否继续此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          invalidApplicationApi(this.detailRow.PJLYMX_ZJ).then(() => {
            this.getQueryTicketBillList(2);
          });
        })
        .catch(() => {});
    },
    obsoleteRefreshList() {
      //作废刷新
      this.getQueryTicketBillList(2);
      this.disabledObsolete = true;
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
            this.getQueryTicketBillList(2);
          });
        })
        .catch(() => {});
    },
    clearTable() {
      this.DetailtableData = []; //清空票据本明细
      this.detailRow = {};
      this.radio = "";
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
    getBillTypeRequest() {
      //获取billPrintType
      var routeData;
      queryBillPrintTypeApi(this.detailRow.PJLYMX_ZJ).then((response) => {
        this.detailRow.billPrintType = response.billPrintType;
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
      });
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
            this.getBillTypeRequest(); //获取纸质收据billPrintType
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
    obsoletefunc(row) {
      this.showInfo = true;
      this.$refs.infoChilren.getData(row);
    },
    vatfunc(row) {
      this.showVatInfo = true;
      this.$refs.vatChildren.getData(row);
    },
    downloadModel() {
      //下载模板
      exportExcelApi(this.DetailtableData).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `票据明细.xls`;
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
  components: {
    billobsolete,
    ObsoleteInfoDialog,
    vatInfoDialog,
    UTable,
    UTableColumn,
  },
};
</script>
<style lang="scss">
.tabelBGRED {
  background: #e36a6a !important;
}
.TicketBill {
  margin: 10px 20px 10px;
  .Resource_wrap {
    .content_wrap {
      padding: 10px 0;
      .current_resource {
        color: #666;
        font-size: 14px;
      }
      .current_client {
        margin-left: 10px;
        color: #666;
        font-size: 14px;
      }
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 170px;
    }
    .el-input {
      width: 170px;
    }
  }
  .billBox {
    margin-top: 10px;
    .detail_txt {
      color: #666;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      margin: 0;
      padding: 0;
      border-top: 4px solid #eff0f0;
      padding: 5px 0;
    }
  }
  @media screen and (max-height: 900px) {
    .billBox {
      h2 {
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
  .spanBlcok {
    display: block;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
