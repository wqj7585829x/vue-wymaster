<template>
  <div class="Realtor_ReceiptedSelectDialog">
    <el-dialog
      v-dialogDrag
      title="收清选中"
      :visible="dialogFormVisible"
      @close="cancelForm"
      :close-on-click-modal="false"
      class="el-dialog-treble"
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
          <el-col :span="12">
            <el-form-item label="资源代码：" prop="tabulationPle">
              <el-input v-model="resourceID" readonly></el-input>
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
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制表人：" prop="tabulationPle">
              <el-input v-model="userName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 制表人信息end -->
      <!-- 制表人表格start -->
      <section>
        <!-- 空一行间距start -->
        <el-row></el-row>
        <!-- 空一行间距end -->
        <el-row>
          <el-col>
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column
                label="类型"
                prop="typeName"
                width="80"
              ></el-table-column>
              <el-table-column
                label="收费项目"
                prop="FYSQ_SFXMMC"
                width="120"
              ></el-table-column>
              <el-table-column label="费用期间" width="200">
                <template slot-scope="scope">
                  <div class="zy_wrap">
                    <el-input
                      type="text"
                      v-model="scope.row.FYSQ_ZY"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="应收金额（含税）"
                width="80"
                prop="FYSQ_QSJE"
              ></el-table-column>
              <el-table-column label="本次收款" width="100" prop="SSJEHS">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    v-model="scope.row.SSJEHS"
                    v-on:change="inputMouseblur(scope.row)"
                    class="ssje_input"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="折扣/减免" width="240">
                <template slot-scope="scope">
                  <div class="dis_wrap">
                    <span
                      class="
                    "
                    >
                      <el-select
                        v-model="scope.row.type"
                        @click.stop.native
                        clearable
                        @change="disTypeChang(scope.row)"
                      >
                        <el-option :value="1" label="减免"></el-option>
                        <el-option :value="2" label="折扣"></el-option>
                      </el-select>
                    </span>
                    <span class="DisInput_wrap">
                      <el-input
                        type="number"
                        v-model="scope.row.FYSQ_JMJE"
                        class="ssje_input"
                        :disabled="!scope.row.type"
                        @change="disInputChange(scope.row)"
                      ></el-input>
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="实收金额" width="80" prop="FYSQ_NEWSSJE">
                <template slot-scope="scope">
                  <!-- <el-input v-model="scope.row.FYSQ_NEWSSJE" class="readonlyIpt" readonly></el-input> -->
                  {{ scope.row.FYSQ_NEWSSJE }}
                </template>
              </el-table-column>
              <el-table-column
                label="税率（%）"
                width="80"
                prop="FYSQ_YSSL"
              ></el-table-column>
              <el-table-column
                label="金额(不含税)"
                prop="FYSQ_YSBHS"
                width="80"
              >
                <template slot-scope="scope">
                  <!-- <el-input v-model="scope.row.FYSQ_YSBHS" class="readonlyIpt" readonly></el-input> -->
                  {{ scope.row.FYSQ_YSBHS }}
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="FYSQ_BZ">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    v-model="scope.row.FYSQ_BZ"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </section>
      <div slot="footer" class="dialog-footer">
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
} from "@/api/Realtor/ReceiptRegistration"; //房屋租赁收清选中Api
import { mapGetters } from "vuex";
import TicketDialog from "../../components/TicketDialog"; //开票弹窗
import { roundings } from "@/utils/global.js";
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
  },
  data() {
    return {
      typeName: "收款",
      dialogFormVisible: this.showdialog, //弹窗
      receiptAmount: "", //实收等于欠收
      formList: {
        PZPC: 0,
        SKPZ_FKGXWJ: null,
        paymentPle: "",
        entryAccount: null,
        tabulation: null,
        SKPZ_SFBZ: "人民币",
        SKPZ_SKR: "",
        SFKM_SKFS: "",
        SKPZ_LY: "",
        SFKM_SKFSLX: "",
        plotDbName: "",
        YXDID: "",
        GLCID: "",
      }, //表单信息
      tableData: [], //表格信息
      batchdisabled: true, //批量收款默认禁用
      value: "",
      disableTicket: true, //默认开票按钮不可点击
      disableReceipt: false, //默认确定收清按钮可点击
      showTicket: false, //默认开票弹出隐藏
      rules: {
        paymentPle: [
          { required: true, message: "请输入交款人", trigger: "blur" },
        ],
        entryAccount: [
          { required: true, message: "请选择入账时间", trigger: "change" },
        ],
        SFKM_SKFS: [
          { required: true, message: "请选择收款方式", trigger: "blur" },
        ],
        tabulation: [
          { required: true, message: "请选择制表日期", trigger: "change" },
        ],
      },
      PayWayData: [], //收款方式数据
      resourceID: "", //资源代码
      PayerName: "", //交款人
      queryObj: {}, //收清后刷新查询对象
      isSureReceipt: false, //默认确定收清没有点击
      submitOk: false, //点击确定，取消是否默认不刷新
      FYSQ_ZJ: "", //费用主键
      KHDA_ZJ: "", //客户主键
      FYSQ_FJDAWJ: "",
      SKPZ_ZJ: "", //收款凭证主键
      SKPZ_KHDAWJ: "",
      SKPZ_SKNY: "", //收款年月
      DLDA_DLMC: "", //大楼名称
      FJDA_FJMC: "", //房间名称
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
        this.disableReceipt = false;
      }
    },
  },
  methods: {
    getReceiptedSelect(multipleSelectionRow) {
      var _this = this;
      this.disableTicket = true;
      this.FYSQ_ZJ = ""; //费用主键清空
      this.KHDA_ZJ = ""; //客户主键清空
      this.FYSQ_FJDAWJ = "";
      multipleSelectionRow.forEach(function (item) {
        _this.FYSQ_ZJ += item.FYSQ_ZJ + ","; //费用主键
        _this.KHDA_ZJ += item.KHDA_ZJ + ","; //客户主键
        _this.FYSQ_FJDAWJ += item.FYSQ_FJDAWJ + ",";
      });
      this.formList.plotDbName = multipleSelectionRow[0].dbName;
      this.formList.YXDID = multipleSelectionRow[0].YXDID;
      this.formList.GLCID = multipleSelectionRow[0].GLCID;

      this.formList.entryAccount = this.getNowFormatDate(1); //入账时间
      this.formList.tabulation = this.getNowFormatDate(2); //填制日期
      this.formList.SKPZ_LY = "1"; //来源
      this.querUncollectRequest(); //查询未收清列表
      this.getGuestData(); // //获取客户资料  资源代码
    },
    querUncollectRequest() {
      //查询未收清列表
      var that = this;
      this.FYSQ_ZJ = this.FYSQ_ZJ.substring(0, this.FYSQ_ZJ.length - 1);
      queryUncollectedFeesByIdApi(this.FYSQ_ZJ, this.formList).then(
        (response) => {
          this.tableData = response.data;
          this.tableData.forEach((item) => {
            item.typeName = that.typeName;
            item.SSJEHS = item.FYSQ_QSJE;
            item.FYSQ_NEWSSJE = item.SSJEHS;
            item.FYSQ_JMJE = "";
          });
          let newRowData = JSON.parse(JSON.stringify(this.tableData)); //拷贝一份存储对象
          this.tableData = newRowData; //拷贝一份存储对象引用不同地址
          this.getDefaultWay(); //查询默认收款方式
        }
      );
    },
    getDefaultWay() {
      var that = this;
      //获取默认收款方式
      queryDefaultPayWay(this.formList).then((response) => {
        this.formList.SFKM_SKFS = response.SFCS_ZFX;
        this.getPayWay(); //查询收款方式
      });
    },
    getPayWay() {
      //收款方式
      querytPayWay(this.formList).then((response) => {
        this.PayWayData = response;
        if (this.PayWayData.length > 0) {
          this.PayWayData.forEach((item) => {
            if (this.formList.SFKM_SKFS == item.SFKM_SKFS) {
              this.formList.SFKM_SKFSLX = item.SFKM_SKFSLX;
            }
          });
        }
      });
    },
    getGuestData() {
      //获取客户资料  资源代码
      this.KHDA_ZJ = this.KHDA_ZJ.substring(0, this.KHDA_ZJ.length - 1);
      this.FYSQ_FJDAWJ = this.FYSQ_FJDAWJ.substring(
        0,
        this.FYSQ_FJDAWJ.length - 1
      );
      queryGuestData(this.KHDA_ZJ, this.FYSQ_FJDAWJ, this.formList).then(
        (response) => {
          this.FJDA_FJMC = response.FJDA_FJMC;
          this.DLDA_DLMC = response.DLDA_DLMC;
          this.resourceID = response.FJDA_FJID;
          this.formList.paymentPle = response.KHDA_KHMC;
        }
      );
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
    disTypeChang(val) {
      //折扣/减免类型改变事件
      val.FYSQ_JMJE = "";
      val.FYSQ_NEWSSJE = val.SSJEHS;
      val.FYSQ_YSBHS = roundings(
        val.SSJEHS - (val.SSJEHS - val.SSJEHS / (1 + val.FYSQ_YSSL / 100)),
        val.FYSQ_QZFS,
        val.FYSQ_JQWS
      );
    },
    inputMouseblur(val) {
      //本次收款输入事件
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

      if (Number(val.SSJEHS) < 0) {
        this.$message({
          message: "" + val.SSJEHS + "不能小于0",
          type: "warning",
        });
        //val.SSJEHS = 0;
        this.disableReceipt = true;
        return false;
      } else {
        this.disableReceipt = false;
      }

      if (Number(val.SSJEHS) > Number(val.FYSQ_QSJE)) {
        this.$message({ message: "实收金额不能大于欠收金额", type: "warning" });
        //val.SSJEHS = 0;
        this.disableReceipt = true;
        return false;
      } else {
        this.disableReceipt = false;
      }
      /**输入框根据精确位数校验 */
      if (val.FYSQ_JQWS == 0) {
        if (!regCount.test(val.SSJEHS)) {
          this.$message({
            message: "实收金额只能输入整数",
            type: "warning",
          });
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
          this.disableReceipt = true;
          return false;
        } else {
          this.disableReceipt = false;
        }
      }
      if (val.type && val.FYSQ_JMJE) {
        if (val.type == 1) {
          //减免
          val.FYSQ_NEWSSJE = val.SSJEHS - val.FYSQ_JMJE;
          val.FYSQ_YSBHS = roundings(
            val.FYSQ_NEWSSJE -
              (val.FYSQ_NEWSSJE - val.FYSQ_NEWSSJE / (1 + val.FYSQ_YSSL / 100)),
            val.FYSQ_QZFS,
            val.FYSQ_JQWS
          );
        } else {
          //折扣
          val.FYSQ_NEWSSJE = (val.SSJEHS * val.FYSQ_JMJE) / 10;
          val.FYSQ_YSBHS = roundings(
            val.FYSQ_NEWSSJE -
              (val.FYSQ_NEWSSJE - val.FYSQ_NEWSSJE / (1 + val.FYSQ_YSSL / 100)),
            val.FYSQ_QZFS,
            val.FYSQ_JQWS
          );
        }
      } else {
        val.FYSQ_NEWSSJE = val.SSJEHS;
        val.FYSQ_YSBHS = roundings(
          val.FYSQ_NEWSSJE -
            (val.FYSQ_NEWSSJE - val.FYSQ_NEWSSJE / (1 + val.FYSQ_YSSL / 100)),
          val.FYSQ_QZFS,
          val.FYSQ_JQWS
        );
      }
    },
    disInputChange(val) {
      //折扣/减免 输入框事件
      if (val.type == 1) {
        //减免
        if (Number(val.FYSQ_JMJE) < 0) {
          this.$message({
            message: "减免金额不能小于0",
            type: "warning",
          });
          val.FYSQ_JMJE = "";
          return false;
        }
        if (Number(val.FYSQ_JMJE) > Number(val.SSJEHS)) {
          this.$message({
            message: "减免金额不能大于本次收款",
            type: "warning",
          });
          val.FYSQ_JMJE = "";
          return false;
        }
        val.FYSQ_NEWSSJE = val.SSJEHS - val.FYSQ_JMJE;
        val.FYSQ_YSBHS = roundings(
          val.FYSQ_NEWSSJE -
            (val.FYSQ_NEWSSJE - val.FYSQ_NEWSSJE / (1 + val.FYSQ_YSSL / 100)),
          val.FYSQ_QZFS,
          val.FYSQ_JQWS
        );
      } else {
        //折扣
        var reg = /^(-?\d+)(\.\d{1,1})?$/; //小数点保留一位小数
        if (Number(val.FYSQ_JMJE) < 0) {
          this.$message({
            message: "折扣不能小于0",
            type: "warning",
          });
          val.FYSQ_JMJE = "";
          return false;
        }
        if (Number(val.FYSQ_JMJE) > 10) {
          this.$message({
            message: "折扣不能大于10",
            type: "warning",
          });
          val.FYSQ_JMJE = "";
          return false;
        }
        if (!reg.test(val.FYSQ_JMJE)) {
          this.$message({
            message: "折扣只能保留一位小数",
            type: "warning",
          });
          val.FYSQ_JMJE = "";
          return false;
        }
        val.FYSQ_NEWSSJE = (val.SSJEHS * val.FYSQ_JMJE) / 10;

        val.FYSQ_YSBHS = roundings(
          val.FYSQ_NEWSSJE -
            (val.FYSQ_NEWSSJE - val.FYSQ_NEWSSJE / (1 + val.FYSQ_YSSL / 100)),
          val.FYSQ_QZFS,
          val.FYSQ_JQWS
        );
      }
    },
    changeBatchSelect(val) {
      if (this.PayWayData.length > 0) {
        this.PayWayData.forEach((item) => {
          if (val == item.SFKM_SKFS) {
            this.formList.SFKM_SKFSLX = item.SFKM_SKFSLX;
          }
        });
      }
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
    getSummaries(param) {
      //合计
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 5 || index === 7) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              const realVal = Number(prev) + Number(curr);
              return parseFloat(realVal).toFixed(2);
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    submit() {
      this.isSureReceipt = true;
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
            obj.FYSQ_SSJE = this.tableData[i].SSJEHS;
            obj.FYSQ_ZSJE = this.tableData[i].FYSQ_ZSJE;
            obj.FYSQ_ZY = this.tableData[i].FYSQ_ZY;
            obj.FYSQ_QCRQ = this.tableData[i].FYSQ_QCRQ
              ? this.tableData[i].FYSQ_QCRQ
              : "";
            obj.FYSQ_QMRQ = this.tableData[i].FYSQ_QMRQ
              ? this.tableData[i].FYSQ_QMRQ
              : "";
            obj.FYSQ_YSSL = this.tableData[i].FYSQ_YSSL;
            obj.FYSQ_KHDAWJ = this.tableData[i].FYSQ_KHDAWJ;
            obj.FYSQ_JQWS = this.tableData[i].FYSQ_JQWS;

            obj.FYSQ_JMJE = this.tableData[i].FYSQ_JMJE;
            obj.type = this.tableData[i].type;

            obj.SKMX_BHSJE = roundings(
              this.tableData[i].FYSQ_NEWSSJE -
                (this.tableData[i].FYSQ_NEWSSJE -
                  this.tableData[i].FYSQ_NEWSSJE /
                    (1 + this.tableData[i].FYSQ_YSSL / 100)),
              this.tableData[i].FYSQ_QZFS,
              this.tableData[i].FYSQ_JQWS
            );

            if (this.tableData[i].FYSQ_QZFS == "四舍五入") {
              obj.SKMX_SE = roundings(
                this.tableData[i].FYSQ_NEWSSJE -
                  this.tableData[i].FYSQ_NEWSSJE /
                    (1 + this.tableData[i].FYSQ_YSSL / 100),
                this.tableData[i].FYSQ_QZFS,
                this.tableData[i].FYSQ_JQWS
              );
            } else {
              obj.SKMX_SE = this.tableData[i].FYSQ_NEWSSJE - obj.SKMX_BHSJE;
            }

            obj.FYSQ_FJDAWJ = this.tableData[i].FYSQ_FJDAWJ;
            obj.KHDA_KHMC = this.tableData[i].KHDA_KHMC;
            obj.FYSQ_HTWJ = this.tableData[i].FYSQ_HTWJ;
            list.push(obj);
          }
          submitFeeCollection(this.formList, list).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.disableTicket = false;
              this.disableReceipt = true;
              this.SKPZ_ZJ = response.data[0].SKPZ_ZJ;
              this.SKPZ_SKNY = response.data[0].SKPZ_SKNY;
              this.SKPZ_KHDAWJ = response.data[0].SKPZ_KHDAWJ;

              this.submitOk = true; //判断点击确定
            }
          });
        }
      });
    },
    goTicketDialog() {
      //开票
      this.showTicket = true;
      var data = {};
      data.SKPZ_ZJ = this.SKPZ_ZJ; //收款凭证主键
      data.SKPZ_SKNY = this.SKPZ_SKNY; //收款年月
      data.SKPZ_KHDAWJ = this.SKPZ_KHDAWJ; //客户主键
      //data.FJDA_FJID = this.resourceID;
      data.DLDA_DLMC = this.DLDA_DLMC; //大楼名称
      data.FJDA_FJMC = this.FJDA_FJMC; //房间名称

      data.plotDbName = this.formList.plotDbName;
      data.YXDID = this.formList.YXDID;
      data.GLCID = this.formList.GLCID;
      this.$refs.ticketChilren.getData(data, 1);
    },
    cancelForm() {
      //取消关闭
      this.isSureReceipt = false;
      if (this.submitOk) {
        //如果点击确定，取消才刷新接口
        this.$emit("RefreshItem", this.queryObj);
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
.Realtor_ReceiptedSelectDialog {
  .ssje_input input {
    padding: 0 !important;
    padding-left: 15px !important;
  }
  .dis_wrap {
    span {
      float: left;
      .el-input {
        width: 100px;
        .el-input__icon {
          height: 30px;
          line-height: 1px;
        }
      }
    }
    .Disselect_wrap {
      .el-input {
        width: 90px;
      }
    }
    .DisInput_wrap {
      margin-left: 5px;
    }
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
  .el-table {
    height: 300px;
    .el-table__body-wrapper {
      height: 230px;
      margin-bottom: 35px;
      overflow: auto;
    }
    .el-table__footer-wrapper {
      position: absolute;
      bottom: 0;
    }
  }
  .el-table td.is-hidden > *,
  .el-table th.is-hidden > * {
    visibility: visible;
  }
  .zy_wrap {
    .el-input {
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
