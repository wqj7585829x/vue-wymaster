<template>
  <!--收款凭证模块-->
  <div class="CollectionCredentials">
    <!-- 搜索框begin -->
    <div class="Resource_wrap">
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: auto">
            <el-form-item label="" label-width="10px;">
              <span class="current_resource"
                >资源名称：<span class="TextColor">{{
                  resourceName
                }}</span></span
              >
              <span class="current_client"
                >客户名称：<span class="TextColor">{{
                  tableParameter.KHDA_KHMC
                }}</span></span
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="5" style="width: 220px">
            <el-form-item label="开始年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.QSNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 220px">
            <el-form-item label="结束年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.JZNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 250px">
            <el-form-item label="制单开始日期：" label-width="100px">
              <el-date-picker
                v-model="tableParameter.SKPZ_TZRQ_START"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 250px">
            <el-form-item label="制单结束日期：" label-width="100px">
              <el-date-picker
                v-model="tableParameter.SKPZ_TZRQ_END"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 100px">
            <el-form-item label-width="0">
              <el-button
                type="success"
                @click="submit()"
                v-has="'ReceiCollectionQuery_has'"
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
            type="danger"
            :disabled="disabledCancel"
            @click="CancellationDialog"
            v-has="'ReceiCollectionCancel_has'"
            >作废</el-button
          >
          <el-button
            type="primary"
            :disabled="disabledTicket"
            @click="TicketDialog"
            v-has="'ReceiCollectionTicket_has'"
            >开票</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <!-- 作废与开票弹窗start -->
    <CancellationDialog
      :showdialog.sync="showdialog"
      @PopCancelEmit="PopCancelEmit"
      ref="cancellChildren"
    >
    </CancellationDialog>
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="PopCancelEmit"
      ref="ticketChilren"
    ></TicketDialog>
    <ObsoleteInfoDialog
      :showInfo.sync="showInfo"
      ref="infoChilren"
    ></ObsoleteInfoDialog>
    <!-- 作废与开票弹窗end -->
    <!-- 表格列表start -->
    <div v-show="isSelect == 1">
      <u-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%"
        :max-height="300"
        class="tableContent commonTable"
        @row-click="rowClick"
        ref="singleTable"
        :cell-class-name="cellStyle"
        use-virtual
        :row-height="30"
      >
        <u-table-column label="选择" width="50" fixed>
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </u-table-column>
        <u-table-column label="状态" width="60">
          <template slot-scope="scope">
            {{ scope.row.SKPZ_YXPZ == true ? "有效" : "无效" }}
          </template>
        </u-table-column>
        <u-table-column
          label="资源代码"
          prop="FKGX_FJID"
          width="200"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="收款日期"
          prop="SKPZ_RZSJ"
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
        ></u-table-column>
        <u-table-column
          label="收款人"
          prop="SKPZ_SKR"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="到账时间"
          prop="SKPZ_DZSJ"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="到账银行"
          prop="SKPZ_DZYH"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="作废信息" prop="SKPZ_SKBS">
          <template slot-scope="scope">
            <span class="spanBlcok" @click="detailsfunc(scope.row)" size="small"
              >查看</span
            >
          </template>
        </u-table-column>
        <!-- <el-table-column label="备注" prop="SKPZ_BZ"></el-table-column> -->
      </u-table>
    </div>
    <div v-show="isSelect == 2">
      <u-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%"
        :max-height="300"
        class="tableContent commonTable"
        @selection-change="changeFun"
        @row-click="rowClick"
        ref="singleTable"
        :cell-class-name="cellStyle"
        use-virtual
        :row-height="30"
      >
        <u-table-column
          label="选择"
          type="selection"
          fixed
          @selection-change="changeFun"
        >
          <!--:selectable="IsSelectionban"-->
        </u-table-column>
        <u-table-column label="状态" width="200">
          <template slot-scope="scope">
            {{ scope.row.SKPZ_YXPZ == true ? "有效" : "无效" }}
          </template>
        </u-table-column>
        <u-table-column
          label="资源代码"
          prop="FKGX_FJID"
          width="200"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="实收账期"
          prop="SKPZ_RZSJ"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="制单日期"
          prop="SKPZ_TZRQ"
          width="120"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="交款人"
          prop="SKPZ_JKR"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="金额" width="150">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKPZ_SKJE) }}
          </template>
        </u-table-column>
        <u-table-column
          label="收款人"
          prop="SKPZ_SKR"
          width="150"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="作废信息" prop="SKPZ_SKBS">
          <template slot-scope="scope">
            <span class="spanBlcok" @click="detailsfunc(scope.row)" size="small"
              >查看</span
            >
          </template>
        </u-table-column>
        <u-table-column label="备注" prop="SKPZ_BZ"></u-table-column>
      </u-table>
    </div>
    <!-- 表格列表end -->
    <!-- 收款凭证明细start 不分页-->
    <section class="footer_bottomDetail">
      <div class="detail_wrap" ref="DetailRef">
        <div class="detail_txt">收款凭证明细</div>
        <el-button
          type="success"
          icon="el-icon-download"
          @click="downloadModel"
          :disabled="disableDown"
          >导出excel
        </el-button>
      </div>
      <u-table
        :data="tableDataDetail"
        border
        style="width: 100%"
        :max-height="300"
        class="tableContent commonTable"
        ref="mxRef"
        :summary-method="getSummaries"
        show-summary
      >
        <u-table-column
          label="收款费用"
          prop="SKMX_SKFYMC"
          width="150"
        ></u-table-column>
        <u-table-column
          label="所属年月"
          prop="SKMX_FYSSNY"
          width="120"
        ></u-table-column>
        <u-table-column
          label="收款方式"
          prop="SKMX_SKFS"
          width="120"
        ></u-table-column>
        <u-table-column prop="SKMX_SKJE" label="收款金额（含税）" width="150">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_SKJE) }}
          </template>
        </u-table-column>
        <u-table-column
          label="税率（%）"
          prop="SKMX_SL"
          width="100"
        ></u-table-column>
        <u-table-column prop="SKMX_BHSJE" label="金额（不含税）" width="150">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_BHSJE) }}
          </template>
        </u-table-column>
        <u-table-column prop="SKMX_KPJE" label="开票金额" width="150">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_KPJE) }}
          </template>
        </u-table-column>
        <u-table-column
          label="票据号"
          prop="SKMX_PJH"
          width="150"
        ></u-table-column>
        <u-table-column label="费用期间" prop="SKMX_SKZY"></u-table-column>
        <u-table-column label="备注" prop="SKMX_BZ"></u-table-column>
      </u-table>
    </section>
    <!-- 收款凭证明细end -->
  </div>
</template>
<script>
import CancellationDialog from "./components/CancellationDialog"; //作废弹窗
import TicketDialog from "../components/TicketDialog"; //开票弹窗
import ObsoleteInfoDialog from "./components/ObsoleteInfoDialog"; //作废信息
import { UTable, UTableColumn } from "umy-ui";
import {
  queryPayingProve,
  queryPayingProveDetails,
  isCancelProve,
  isCanMakeBill,
  queryisCanBill,
  exportExcelApi,
} from "@/api/FeeManagement/CollectionCredentials"; //收款凭证Api
import { getLastYearYestdy, currDate, formatMoney } from "@/utils/global.js";
export default {
  name: "CollectionCredentials",
  props: ["clickTreeObjVal", "resourceName", "TreeNavBar"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  data() {
    return {
      radio: "", //表格单选按钮
      CancelPop: "", //作废弹窗prop传值
      TicketlPop: "", //开票弹窗prop传值
      showdialog: false, //作废弹窗默认隐藏
      showTicket: false, //开票弹窗默认隐藏
      tableData: [], //表格列表
      tableDataDetail: [], //收款凭证明细
      disabledCancel: true, //作废按钮默认禁用
      disabledTicket: true, //开票按钮默认禁用
      titleCancel: "选择表格对应的数据", //作废title提示
      titleTicket: "选择表格对应的数据", //开票title提示
      tableRow: {},
      multipleSelection: [], //选中数据
      tableParameter: {
        //搜索列表参数
        QSNY: null,
        JZNY: null,
        FKGX_ZJ: null,
        KHDA_ZJ: null,
      },
      selectType: 1, //1按资源 2按客户
      isSelect: 1, //判断是否显示多选择按钮还是单选按钮
      showInfo: false, //作废信息默认隐藏
      disableDown: true,
    };
  },
  components: {
    CancellationDialog,
    TicketDialog,
    ObsoleteInfoDialog,
    UTable,
    UTableColumn,
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
      if (row.SKPZ_YXPZ == false) {
        //作废背景红色
        return "tabelBGRED";
      }
    },
    RecequeryByPage(obj, type) {
      //收款凭证表格列表
      this.clearTable();
      /**每次切换不重置 日期 start*/
      if (
        sessionStorage.getItem("collection_QSNY") &&
        sessionStorage.getItem("collection_QSNY") != "null"
      ) {
        obj.QSNY = sessionStorage.getItem("collection_QSNY");
      } else {
        obj.QSNY = getLastYearYestdy(new Date(), false); //当前日期的前一年
      }
      if (
        sessionStorage.getItem("collection_JZNY") &&
        sessionStorage.getItem("collection_JZNY") != "null"
      ) {
        obj.JZNY = sessionStorage.getItem("collection_JZNY");
      } else {
        obj.JZNY = currDate(false); //当前日期
      }
      /**每次切换不重置 日期 end*/
      let newRowData = JSON.parse(JSON.stringify(obj)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 1) {
        this.tableParameter.FKGX_ZJ = obj.FKGX_ZJ;
      } else {
        this.tableParameter.FKGX_ZJ = obj.KHDA_ZJ;
      }
      this.selectType = type;
      this.isSelect = type;
      this.getDataList(0);
    },
    getDataList(val) {
      queryPayingProve(this.tableParameter, this.selectType).then(
        (response) => {
          this.tableData = response; //显示表格列表
          if (this.tableData.length > 0) {
            if (this.selectType == 1) {
              if (val == 0) {
                //默认第一次选中
                if (this.$route.query.SKMX_SKPZWJ) {
                  //票据查询-前往收款登记--收款凭证，选中对应的票据
                  this.tableData.find((item, index) => {
                    if (item.SKPZ_ZJ == this.$route.query.SKMX_SKPZWJ) {
                      this.$refs.singleTable.setCurrentRow(
                        this.tableData[index]
                      ); //默认选中表格路由条件第index行
                      this.radio = this.tableData.indexOf(
                        this.tableData[index]
                      ); //单行点击单选按钮选中
                      this.tableRow = this.tableData[index];
                    }
                  });
                } else {
                  this.$refs.singleTable.setCurrentRow(this.tableData[0]); //默认选中表格第一个
                  this.radio = this.tableData.indexOf(this.tableData[0]); //单行点击单选按钮选中
                  this.tableRow = this.tableData[0];
                }
              } else {
                this.tableData.forEach((item) => {
                  if (item.SKPZ_ZJ == this.tableRow.SKPZ_ZJ) {
                    this.$refs.singleTable.setCurrentRow(item); //默认选中
                    this.radio = this.tableData.indexOf(item); //单行点击单选按钮选中
                  }
                });
              }
              //判断作废按钮是否可点击
              if (this.tableRow.SKPZ_YXPZ) {
                this.disabledCancel = false;
              } else {
                this.titleCancel = "不可作废";
                this.disabledCancel = true;
              }
              /**判断是否可以开票 start*/
              if (this.tableRow.SKPZ_YXPZ) {
                this.getisCanBill(this.tableRow.SKPZ_ZJ);
              } else {
                this.disabledTicket = true;
              }
              /**判断是否可以开票 end*/
              this.getListDetail(this.tableRow); //默认查询第一条票据明细
            } else {
              this.disabledCancel = true;
              this.disabledTicket = true;
            }
          } else {
            this.tableDataDetail = []; //清空票据明细数据
            this.disabledCancel = true;
            this.disabledTicket = true;
          }
        }
      );
    },
    getListDetail(obj) {
      //查询票据明细
      queryPayingProveDetails(obj.SKPZ_ZJ).then((response) => {
        this.tableDataDetail = response;
      });
    },
    getisCancelProve(obj) {
      //查询凭证是否可作废
      // isCancelProve(obj.SKPZ_ZJ).then(response => {
      //   if (response.returnStatus == "SUCCESS") {
      //     //this.disabledCancel = false;
      //     this.getisExisBill(obj);
      //   } else {
      //     this.$alert(response.message, {
      //       confirmButtonText: "确定"
      //     });
      //   }
      // });
      //查询凭证是否可作废
      isCancelProve(obj.SKPZ_ZJ).then((response) => {
        if (response.isCancel == "true") {
          //this.disabledCancel = false;
          this.getisExisBill(obj);
        } else {
          this.$alert("历史凭证不允许作废!", "收费管理", {
            confirmButtonText: "确定",
          });
        }
      });
    },
    IsSelectionban(row) {
      //多选按钮是否可选
      return row.show;
    },
    getisExisBill(val) {
      //判断凭证是否有开票
      isCanMakeBill(val.SKPZ_ZJ).then((response) => {
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
                this.tableParameter.FKGX_ZJ,
                val.SKPZ_ZJ,
                response,
                this.selectType
              );
            })
            .catch(() => {});
        } else {
          //为空表示没有开票
          this.showdialog = true;
          this.$refs.cancellChildren.getData(
            this.tableParameter.FKGX_ZJ,
            val.SKPZ_ZJ,
            response
          );
        }
      });
    },
    getisCanBill(val) {
      //判断是否可开票
      queryisCanBill(val).then((response) => {
        if (response.isCan == "true") {
          //true 可开票
          this.disabledTicket = false;
        } else {
          this.disabledTicket = true;
        }
      });
    },
    submit() {
      //保存开始/结束日期   每次切换不重置
      sessionStorage.setItem("collection_QSNY", this.tableParameter.QSNY);
      sessionStorage.setItem("collection_JZNY", this.tableParameter.JZNY);
      this.clearTable();
      this.getDataList(0);
      //查询
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        if (obj.data.FCDM_LX != "房间") {
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = []; //清空列表数据
          this.tableDataDetail = []; //清空明细列表数据
          this.disabledCancel = true;
        }
      }
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (
          columnIndex !== 3 &&
          columnIndex !== 5 &&
          columnIndex !== 6
        ) {
          means[columnIndex] = "";
        } else {
          const values = data.map((item) => Number(item[column.property]));
          // 合计
          if (!values.every((value) => isNaN(value))) {
            means[columnIndex] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                const realVal = Number(prev) + Number(curr);
                return parseFloat(realVal).toFixed(2);
              } else {
                return prev;
              }
            }, 0);
          } else {
            means[columnIndex] = "";
          }
        }
      });
      // 返回一个二维数组的表尾合计(不要平均值，你就不要在数组中添加)
      return [means];
    },
    rowClick(row) {
      if (this.selectType == 1) {
        //判断作废按钮是否可点击
        if (row.SKPZ_YXPZ) {
          this.disabledCancel = false;
        } else {
          this.titleCancel = "不可作废";
          this.disabledCancel = true;
        }

        /**判断开票按钮是否可点击 start*/
        if (row.SKPZ_YXPZ) {
          this.getisCanBill(row.SKPZ_ZJ);
        } else {
          this.disabledTicket = true;
        }
        /**判断开票按钮是否可点击 end*/

        //表格单行点击
        this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      }
      this.tableRow = row;
      this.getListDetail(row); //查询选中的收款凭证票据明细
    },
    changeFun(val) {
      //全选
      this.multipleSelection = val;
    },
    detailsfunc(row) {
      this.showInfo = true;
      this.$refs.infoChilren.getData(row);
    },
    PopCancelEmit(newRowObj) {
      //刷新
      this.tableRow = newRowObj;
      this.getDataList(1);
    },
    CancellationDialog() {
      //作废弹窗
      if (this.selectType == 1) {
        this.getisCancelProve(this.tableRow); //判断是否可作废查询
      } else {
        this.getisCancelProve(this.multipleSelection[0]);
      }
    },
    TicketDialog() {
      if (this.selectType == 1) {
        this.$refs.ticketChilren.getData(
          this.tableRow,
          this.tableParameter.FKGX_ZJ,
          2
        );
      } else {
        var jkr = "";
        var je = "";
        var tip_message = "";
        this.multipleSelection.forEach((item) => {
          if (!item.show) {
            jkr = item.SKPZ_JKR;
            je = item.SKPZ_SKJE;
            tip_message += "交款人:" + jkr + " 金额:" + je + ",";
          }
        });
        if (tip_message != "") {
          tip_message = tip_message.substring(0, tip_message.length - 1);
          this.$message({
            message: tip_message + "不可开票!",
            type: "warning",
          });
          return;
        }
        this.$refs.ticketChilren.getCientData(this.multipleSelection, 2);
      }

      //开票弹窗
      this.showTicket = true;
    },
    downloadModel() {
      //下载模板
      exportExcelApi(this.tableDataDetail).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `凭证明细.xls`;
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
    clearTable() {
      //清空选中数据
      this.tableDataDetail = []; //清空收款凭证明细
      this.tableRow = {};
      this.radio = "";
    },
  },
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection.length == 1) {
          //判断作废按钮是否可点击
          if (this.multipleSelection[0].SKPZ_YXPZ) {
            this.disabledCancel = false;
          } else {
            this.titleCancel = "不可作废";
            this.disabledCancel = true;
          }
        } else {
          this.disabledCancel = true;
        }
        this.disabledTicket = false;
      } else {
        this.disabledCancel = true;
        this.disabledTicket = true;
      }
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
};
</script>
<style lang="scss">
.tabelBGRED {
  background: #e36a6a !important;
}
.CollectionCredentials {
  position: relative;
  margin: 10px 20px 10px;
  .Resource_wrap {
    .current_resource {
      color: #666;
      font-size: 14px;
    }
    .current_client {
      margin-left: 10px;
      color: #666;
      font-size: 14px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 140px;
    }
  }
  .footer_bottomDetail {
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
  @media screen and (max-height: 900px) {
    .footer_bottomDetail {
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
