<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="收清选中"
      :visible="dialogFormVisible"
      @close="cancelForm"
      :close-on-click-modal="false"
      class="el-dialog-treble ReceiptedSelectDialog"
      :class="[selectType == 2 ? 'Receipt-clientDialog' : '']"
    >
      <!-- 制表人信息start -->
      <el-form
        label-width="105px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款人：" prop="paymentPle">
              <el-input v-model="formList.paymentPle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="selectType == 1">
            <el-form-item label="资源代码：" prop="resourceID">
              <el-input v-model="resourceID" disabled></el-input>
            </el-form-item>
          </el-col>
          <!--按客户显示金额-->
          <el-col :span="12" v-if="selectType == 2">
            <el-form-item label="金额：" prop="toallMoney">
              <el-input v-model="toallMoney" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收款方式：" prop="SFKM_SKFS">
              <el-select
                v-model="formList.SFKM_SKFS"
                @change="changeBatchSelect"
              >
                <el-option
                  v-for="item in PayWayData"
                  :key="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                  :label="item.SFKM_SKFS"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款日期：" prop="tabulation">
              <el-date-picker
                type="date"
                placeholder=""
                v-model="formList.tabulation"
                value-format="yyyy-MM-dd"
                :disabled="ReceiTabulationDate_has"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="入账时间：" prop="entryAccount">
              <el-date-picker
                type="datetime"
                placeholder=""
                v-model="formList.entryAccount"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="ReceientryDatetime_has"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制表人：" prop="tabulationPle">
              <el-input v-model="userName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <section v-if="selectType == 1">
        <!--按资源才显示 收费列表数据-->
        <!-- 空一行间距start -->
        <el-row></el-row>
        <!-- 空一行间距end -->
        <el-row>
          <u-table
            :data="tableData"
            height="350"
            border
            :summary-method="getSummaries"
            show-summary
            use-virtual
            :row-height="30"
          >
            <u-table-column
              label="类型"
              prop="typeName"
              width="100"
              fixed
            ></u-table-column>
            <u-table-column
              label="收费项目"
              prop="FYSQ_SFXMMC"
              width="120"
              fixed
              show-overflow-tooltip
            ></u-table-column>
            <u-table-column label="费用期间" width="320">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.FYSQ_ZY"></el-input>
              </template>
            </u-table-column>
            <u-table-column
              label="应收金额（含税）"
              width="100"
              prop="FYSQ_QSJE"
            ></u-table-column>
            <u-table-column label="本次收款" width="120" prop="SSJEHS">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  v-model="scope.row.SSJEHS"
                  v-on:change="inputMouseblur(scope.row)"
                  class="ssje_input"
                  :disabled="scope.row.SFXM_SFCWF"
                ></el-input>
              </template>
            </u-table-column>
            <u-table-column
              label="税率（%）"
              width="60"
              prop="FYSQ_YSSL"
            ></u-table-column>
            <u-table-column label="金额(不含税)" prop="FYSQ_YSBHS" width="100">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.FYSQ_YSBHS"
                  class="readonlyIpt"
                  readonly
                ></el-input>
              </template>
            </u-table-column>
            <u-table-column label="备注" prop="FYSQ_BZ" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.FYSQ_BZ"></el-input>
              </template>
            </u-table-column>
          </u-table>
        </el-row>
      </section>
      <div slot="footer" class="dialog-footer">
        <!-- <el-checkbox v-model="formList.posSync" class="pos-Check">pos机收清</el-checkbox> -->
        <el-button type="primary" :disabled="disableReceipt" @click="submit"
          >确定收清</el-button
        >
        <el-button @click="cancelForm">取消</el-button>
        <el-button
          type="primary"
          :disabled="disableTicket"
          @click="goTicketDialog"
          >开票</el-button
        >
      </div>
    </el-dialog>
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="cancelForm"
      ref="ticketChilren"
    ></TicketDialog>
  </div>
</template>
<script>
import {
  queryUncollectedFeesByIdApi,
  querytPayWay,
  queryGuestData,
  queryDefaultPayWay,
  submitFeeCollection,
} from "@/api/FeeManagement/NotReceipted"; //未收清款项-收清选中Api
import { confirmTheStone } from "@/api/BankReconciliation/UnmatchedReconciliation"; //未收清对账-确认收账Api
import { mapGetters } from "vuex";
import TicketDialog from "../../components/TicketDialog"; //开票弹窗
import { roundings } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  props: ["showdialog"],
  computed: {
    ...mapGetters(["userName"]), //登录用户
    CheckowMoney() {
      var toallMoney = 0;
      this.tableData.forEach(function (item) {
        toallMoney += Number(item.SSJEHS);
      });
      return toallMoney.toFixed(2);
    },
  },
  components: {
    TicketDialog,
    UTable,
    UTableColumn,
  },
  data() {
    return {
      typeName: "收款",
      dialogFormVisible: this.showdialog, //弹窗
      receiptAmount: "", //实收等于欠收
      formList: {
        SFKM_SKFS: "",
        PZPC: 0,
        SKPZ_FKGXWJ: null,
        paymentPle: "",
        entryAccount: null,
        tabulation: null,
        SKPZ_SFBZ: "人民币",
        SKPZ_SKR: "",
        posSync: 0, //思源pos机收清  0不显示  1显示
      }, //表单信息
      tableData: [], //表格信息
      batchdisabled: true, //批量收款默认禁用
      value: "",
      disableTicket: true, //默认开票按钮不可点击
      disableReceipt: false, //默认确定收清按钮可点击
      showTicket: false, //默认开票弹出隐藏
      rules: {
        SFKM_SKFS: [
          { required: true, message: "请选择收款方式", trigger: "blur" },
        ],
        paymentPle: [
          { required: true, message: "请输入交款人", trigger: "blur" },
        ],
        entryAccount: [
          { required: true, message: "请选择入账时间", trigger: "change" },
        ],
        tabulation: [
          { required: true, message: "请选择制表日期", trigger: "change" },
        ],
      },
      PayWayData: [], //收款方式数据
      resourceID: "", //资源代码
      PayerName: "", //交款人
      FKGX_ZJ: "", //房客关系主键
      selectType: 1, //1 按资源 2按客户,
      queryObj: {}, //收清后刷新查询对象
      isSureReceipt: false, //默认确定收清没有点击
      bill_FKGX_ZJ: "", //按客户开票房客关系主键
      submitOk: false, //点击确定，取消是否默认不刷新
      fyzj: "", //费用主键
      SKPZ_ZJ: "", //收款凭证主键
      SKPZ_SKNY: "", //收款年月
      theWayTable: 1, //按年月  2按收费项目
      toallMoney: 0, //按客户  选中金额
      ReceientryDatetime_has: !(
        Number(
          sessionStorage
            .getItem("buttenpremissions")
            .indexOf("ReceientryDatetime_has")
        ) > -1
      ), //入帐时间权限
      ReceiTabulationDate_has: !(
        Number(
          sessionStorage
            .getItem("buttenpremissions")
            .indexOf("ReceiTabulationDate_has")
        ) > -1
      ), //收款日期权限
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
        this.disableReceipt = false;
        this.getGuestData();
      }
    },
  },
  methods: {
    getReceiptedSelect(multipleSelectionRow, FKGX_ZJ, obj, type, theWayTable) {
      var that = this;
      this.disableTicket = true;
      this.selectType = type; //1 按资源 2按客户,
      this.theWayTable = theWayTable; //按年月  2按收费项目
      this.queryObj = obj;
      this.bill_FKGX_ZJ = ""; //按客户房客关系主键拼接 清空
      this.fyzj = ""; //费用主键清空
      this.toallMoney = 0;
      this.formList.posSync = 0; //默认不选中思源pos机收清
      multipleSelectionRow.forEach(function (item) {
        //按客户开票 (房客关系主键、费用主键)多个有逗号隔开
        if (that.selectType == 2) {
          that.bill_FKGX_ZJ += item.FYSQ_FKGXWJ + ",";
          that.toallMoney += Number(item.FYSQ_QSJE);
        }
        that.fyzj += item.FYSQ_ZJ + ","; //费用主键
      });
      this.toallMoney = this.toallMoney.toFixed(2); //按客户显示金额
      //收清选中的传递过来的数据
      this.FKGX_ZJ = FKGX_ZJ; //按资源是房客关系主键    按客户是 客户档案主键
      this.formList.SKPZ_FKGXWJ = FKGX_ZJ; //房客关系主键
      this.formList.entryAccount = this.getNowFormatDate(1);
      this.formList.tabulation = this.getNowFormatDate(2);
      this.querUncollectRequest(); //查询未收清列表
    },
    querUncollectRequest() {
      //查询未收清列表
      var that = this;
      this.fyzj = this.fyzj.substring(0, this.fyzj.length - 1);
      queryUncollectedFeesByIdApi(this.fyzj).then((response) => {
        this.tableData = response.data;
        this.tableData.forEach((item) => {
          item.typeName = that.typeName;
          item.SSJEHS = item.FYSQ_QSJE;
        });
        let newRowData = JSON.parse(JSON.stringify(this.tableData)); //拷贝一份存储对象
        this.tableData = newRowData; //拷贝一份存储对象引用不同地址
        this.getDefaultWay();
      });
    },
    getDefaultWay() {
      var that = this;
      //获取默认收款方式
      queryDefaultPayWay().then((response) => {
        if (response.SFCS_ZFX) {
          this.formList.SFKM_SKFS = response.SFCS_ZFX;
        }
        this.$nextTick(() => {
          that.tableData.forEach(function (item) {
            item.ZFX = response.SFCS_ZFX;
          });
        });

        this.$nextTick(() => {
          this.getPayWay();
        });
      });
    },
    getPayWay() {
      //收款方式
      querytPayWay().then((response) => {
        this.PayWayData = response;
      });
    },
    getGuestData() {
      //获取客户资料  资源代码
      queryGuestData(this.FKGX_ZJ, this.selectType).then((response) => {
        if (this.selectType == 1) {
          this.resourceID = response.FKGX_FJID;
        } else {
          this.resourceID = "";
        }
        this.formList.paymentPle = response.KHDA_KHMC;
      });
    },
    getNowFormatDate(type) {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (type == 1) {
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          date.getHours() +
          seperator2 +
          date.getMinutes() +
          seperator2 +
          date.getSeconds();
        return currentdate;
      } else {
        var currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    },
    inputMouseblur(val) {
      //鼠标离开事件
      if (this.isSureReceipt) {
        return false;
      }
      var reg1 = /^(-?\d+)(\.\d{1,1})?$/; //小数点保留两位小数
      var reg2 = /^(-?\d+)(\.\d{1,2})?$/; //小数点保留两位小数
      var reg3 = /^(-?\d+)(\.\d{1,3})?$/; //小数点保留两位小数
      var reg4 = /^(-?\d+)(\.\d{1,4})?$/; //小数点保留两位小数
      var regCount = /^(-?\d+)?$/; //整数
      if (!Number(val.SSJEHS) && !val.SSJEHS == 0) {
        this.$message({
          message: "" + val.SSJEHS + "不是有效的数字类型",
          type: "warning",
        });
        //val.SSJEHS = 0;
        this.disableReceipt = true;
        return false;
      } else {
        this.disableReceipt = false;
      }

      // if (Number(val.SSJEHS) < 0) {
      //   this.$message({
      //     message: "" + val.SSJEHS + "不能小于0",
      //     type: "warning"
      //   });
      //   //val.SSJEHS = 0;
      //   this.disableReceipt = true;
      //   return false;
      // } else {
      //   this.disableReceipt = false;
      // }

      // if (Number(val.SSJEHS) > Number(val.FYSQ_QSJE)) {
      //   this.$message({ message: "实收金额不能大于欠收金额", type: "warning" });
      //   //val.SSJEHS = 0;
      //   this.disableReceipt = true;
      //   return false;
      // } else {
      //   this.disableReceipt = false;
      // }
      if (val.FYSQ_JQWS == 0) {
        if (!regCount.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额只能输入整数",
            type: "warning",
          });
          // val.SSJEHS = 0;
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      if (val.FYSQ_JQWS == 1) {
        if (!reg1.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额最多只能保留一位小数",
            type: "warning",
          });
          // val.SSJEHS = 0;
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      if (val.FYSQ_JQWS == 2) {
        if (!reg2.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额最多只能保留两位小数",
            type: "warning",
          });
          // val.SSJEHS = 0;
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      if (val.FYSQ_JQWS == 3) {
        if (!reg3.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额最多只能保留三位小数",
            type: "warning",
          });
          // val.SSJEHS = 0;
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      if (val.FYSQ_JQWS == 4) {
        if (!reg4.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额最多只能保留四位小数",
            type: "warning",
          });
          // val.SSJEHS = 0;
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      val.FYSQ_YSBHS = roundings(
        val.SSJEHS - (val.SSJEHS - val.SSJEHS / (1 + val.FYSQ_YSSL / 100)),
        val.FYSQ_QZFS,
        val.FYSQ_JQWS
      );
    },
    changeBatchSelect(val) {
      //批量修改收款方式下拉框 批量修改表格收款方式
      this.tableData.forEach(function (item) {
        item.ZFX = val;
      });
      let newRowData = JSON.parse(JSON.stringify(this.tableData)); //拷贝一份存储对象
      this.tableData = newRowData; //拷贝一份存储对象引用不同地址
    },
    changePay(obj, val) {
      this.tableData.forEach(function (item) {
        if (item.FYSQ_ZJ == obj.FYSQ_ZJ) {
          item.ZFX = val;
        }
      });
      let newRowData = JSON.parse(JSON.stringify(this.tableData)); //拷贝一份存储对象
      this.tableData = newRowData; //拷贝一份存储对象引用不同地址
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (
          columnIndex !== 3 &&
          columnIndex !== 4 &&
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
    submit() {
      this.isSureReceipt = true;
      if (this.selectType == 2) {
        //按客户收清时
        this.formList.PZPC = 1;
      }
      this.formList.SKPZ_SKR = this.userName;
      var list = [];
      //确定收清
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.tableData.length; i++) {
            var obj = {};
            obj.FYSQ_ZJ = this.tableData[i].FYSQ_ZJ;
            obj.FYSQ_SSNY = this.tableData[i].FYSQ_SSNY;
            obj.FYSQ_SFXMMC = this.tableData[i].FYSQ_SFXMMC;
            obj.FYSQ_SFXMWJ = this.tableData[i].FYSQ_SFXMWJ;
            obj.FYSQ_SFBZ = this.tableData[i].FYSQ_SFBZ;
            obj.SKMX_SKFS = this.tableData[i].ZFX;
            if (!obj.SKMX_SKFS) {
              this.$message({
                message: "请选择收款方式",
                type: "warning",
              });
              return false;
            }
            obj.FYSQ_SSJE = this.tableData[i].SSJEHS + "";
            obj.FYSQ_ZSJE = this.tableData[i].FYSQ_ZSJE;
            obj.FYSQ_ZY = this.tableData[i].FYSQ_ZY;
            obj.FYSQ_QCRQ = this.tableData[i].FYSQ_QCRQ
              ? this.tableData[i].FYSQ_QCRQ
              : "";
            obj.FYSQ_QMRQ = this.tableData[i].FYSQ_QMRQ
              ? this.tableData[i].FYSQ_QMRQ
              : "";
            obj.FYSQ_YSSL = this.tableData[i].FYSQ_YSSL + "";
            obj.FYSQ_BZ = this.tableData[i].FYSQ_BZ;
            obj.FYSQ_FKGXWJ = this.tableData[i].FYSQ_FKGXWJ;
            //obj.SKMX_SE = this.tableData[i].FYSQ_YSSE;
            //obj.SKMX_BHSJE = this.tableData[i].FYSQ_YSBHS;
            obj.FYSQ_QSJE = this.tableData[i].FYSQ_QSJE + "";
            obj.FYSQ_JQWS = this.tableData[i].FYSQ_JQWS;
            obj.SKMX_BHSJE =
              roundings(
                this.tableData[i].SSJEHS -
                  (this.tableData[i].SSJEHS -
                    this.tableData[i].SSJEHS /
                      (1 + this.tableData[i].FYSQ_YSSL / 100)),
                this.tableData[i].FYSQ_QZFS,
                this.tableData[i].FYSQ_JQWS
              ) + "";
            if (this.tableData[i].FYSQ_QZFS == "四舍五入") {
              obj.SKMX_SE =
                roundings(
                  this.tableData[i].SSJEHS -
                    this.tableData[i].SSJEHS /
                      (1 + this.tableData[i].FYSQ_YSSL / 100),
                  this.tableData[i].FYSQ_QZFS,
                  this.tableData[i].FYSQ_JQWS
                ) + "";
            } else {
              obj.SKMX_SE = this.tableData[i].SSJEHS - obj.SKMX_BHSJE + "";
            }
            list.push(obj);
          }
          submitFeeCollection(this.formList, list).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.disableTicket = false;
              this.disableReceipt = true;
              this.SKPZ_ZJ = response.data.SKPZ_ZJ;
              this.SKPZ_SKNY = response.data.SKPZ_SKNY;
              this.submitOk = true; //判断点击确定
              if (
                sessionStorage.getItem("subscribeBillId") &&
                sessionStorage.getItem("SKPZ_SKJE")
              ) {
                confirmTheStone({
                  SKPZ_ZJ: response.data.SKPZ_ZJ,
                  subscribeBillId: sessionStorage.getItem("subscribeBillId"),
                  SKPZ_SKJE: sessionStorage.getItem("SKPZ_SKJE"),
                }).then((response) => {
                  if (response.returnStatus == "SUCCESS") {
                    sessionStorage.removeItem("subscribeBillId");
                    sessionStorage.removeItem("SKPZ_SKJE");
                  }
                });
              }
            }
          });
        }
      });
    },
    goTicketDialog() {
      //开票
      this.showTicket = true;
      var data = {};
      data.SKPZ_ZJ = this.SKPZ_ZJ;
      data.SKPZ_SKNY = this.SKPZ_SKNY;
      if (this.selectType == 1) {
        //1:按资源   2:按客户
        this.$refs.ticketChilren.getData(data, this.FKGX_ZJ, 1);
      } else {
        this.bill_FKGX_ZJ = this.bill_FKGX_ZJ.substring(
          0,
          this.bill_FKGX_ZJ.length - 1
        );
        this.$refs.ticketChilren.getData(data, this.bill_FKGX_ZJ, 1);
      }
    },
    cancelForm() {
      //取消关闭
      this.isSureReceipt = false;
      if (this.submitOk) {
        //如果点击确定，取消才刷新接口
        this.$emit(
          "RefreshItem",
          this.queryObj,
          this.selectType,
          this.theWayTable
        );
      }
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
  filters: {
    //过滤器
    rounding(value, roundWay, preciseDigit) {
      if (roundWay == undefined) {
        return value.toFixed(2);
      }
      // 取整方式1:四舍五入,精确位数
      if (roundWay == "四舍五入" && preciseDigit == 0) {
        return value.toFixed(0);
      }
      if (roundWay == "四舍五入" && preciseDigit == 1) {
        return value.toFixed(1);
      }
      if (roundWay == "四舍五入" && preciseDigit == 2) {
        return value.toFixed(2);
      }
      if (roundWay == "四舍五入" && preciseDigit == 3) {
        return value.toFixed(3);
      }
      if (roundWay == "四舍五入" && preciseDigit == 4) {
        return value.toFixed(4);
      }
      if (roundWay == "四舍五入" && preciseDigit == 5) {
        var valueT = String(value);
        var str = "";
        if (valueT.indexOf(".") > -1) {
          str = valueT.split(".")[0];
        } else {
          str = valueT.split("");
        }
        var last = str[str.length - 1];
        if (last < 5) {
          valueT = valueT - last;
        }
        if (last == 5) {
          valueT = Number(valueT) + 5;
        }
        if (last == 6) {
          valueT = Number(valueT) + 4;
        }
        if (last == 7) {
          valueT = Number(valueT) + 3;
        }
        if (last == 8) {
          valueT = Number(valueT) + 2;
        }
        if (last == 9) {
          valueT = Number(valueT) + 1;
        }
        if (String(valueT).indexOf(".") > -1) {
          valueT = String(valueT).split(".")[0];
        }
        return valueT;
      }

      // 取整方式2:舍弃尾数,精确位数
      if (roundWay == "舍弃尾数" && preciseDigit == 0) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点0位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(0);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 1) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点1位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(1);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 2) {
        var num = (parseInt(value * 100) / 100).toFixed(2); //小数点2位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(1);
          num = Number(num) - Number(str) / 100;
        }
        return num.toFixed(2);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 3) {
        var num = (parseInt(value * 1000) / 1000).toFixed(3); //小数点3位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(2);
          num = Number(num) - Number(str) / 1000;
        }
        return num.toFixed(3);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 4) {
        var num = (parseInt(value * 10000) / 10000).toFixed(4); //小数点4位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(3);
          num = Number(num) - Number(str) / 10000;
        }
        return num.toFixed(4);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 5) {
        var num = value;
        if (String(num).indexOf(".") > -1) {
          var str = String(num).split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
          num = num.toFixed(0);
        }
        var lastnum = String(num).slice(-1);
        num = Number(num) - Number(lastnum);
        return num.toFixed(0);
      }
    },
  },
};
</script>
<style lang="scss">
.ReceiptedSelectDialog {
  .ssje_input input {
    padding: 0 !important;
    padding-left: 15px !important;
  }
  .el-dialog__body {
    padding: 10px 0;
  }
  .el-row {
    margin-bottom: 5px !important;
  }
  .readonlyIpt {
    input {
      border: none;
      outline: none;
      background: transparent;
      border: none;
      outline: medium;
      color: #666;
      font-size: 12px;
      text-align: center;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.Receipt-clientDialog {
  .el-dialog {
    width: 800px !important;
  }
}
.pos-Check {
  position: absolute;
  left: 25px;
  bottom: 10px;
}
</style>
