<template>
  <el-dialog
    v-dialogDrag
    title="开票"
    class="el-dialog-double Receive-TicketDialog"
    :visible.sync="visible"
    @close="cancelForm"
    :close-on-click-modal="false"
  >
    <!-- 票据对象 -->
    <el-form
      label-width="125px"
      :model="formList"
      :rules="rules"
      ref="formInfoRef"
    >
      <!-- {{TicketlPop}} -->
      <!-- {{formList}} -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="票据分类：">
            <el-select
              v-model="formList.index1"
              @change="PJFLchange"
              filterable
            >
              <el-option
                v-for="(item, index) in option1"
                :key="index"
                :value="index"
                :label="item.Caption"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="票据名称：" prop="index2">
            <el-select
              v-model="formList.index2"
              @change="PJMCchange"
              filterable
            >
              <el-option
                v-for="(item, index) in option2"
                :key="index"
                :value="index"
                :label="item.PJLY_PJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="票据号：" prop="index3">
            <el-select v-model="formList.index3" @change="PJHchange" filterable>
              <el-option
                v-for="(item, index) in option3"
                :key="index"
                :value="index"
                :label="item.PJLYMX_PJH"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="资源代码：">
            {{ formList.FJID | rounding }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交款人：">
            <el-input v-model="formList.SKPZ_JKR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增值税发票分类：" v-if="billSJZJ == 1">
            <el-select
              v-model="formList.PJLYMX_ZZSFPFL"
              :disabled="invoiceTypeDisabled"
              @change="invoiceTypeChange"
            >
              <el-option
                v-for="item in invoiceTypeArray"
                :key="item.value"
                :value="item.label"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-if="formList.LXNO == 101 && sess_kk_ktzzfp == 1">
        <el-col :span="8">
          <el-form-item label="税盘号：">
            <span class="TextColor" style="margin-right: 5px">{{
              infonumber
            }}</span>
            <el-checkbox
              v-model="isCheckTax"
              @change="infoNumbeChange"
            ></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col :span="24">
          <el-form-item label="纳税人信息：" v-if="billSJZJ == 1">
            <div class="TextColor taxWrap">
              <span class="taxCommon"
                >名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                <span class="TextColor taxCommon_v">{{
                  formList.KHDA_KHMC
                }}</span></span
              >
              <span class="TextColor taxCommon"
                >纳税人识别号：<span class="TextColor taxCommon_v">{{
                  formList.KHDA_NSRSBH
                }}</span></span
              >
            </div>
            <div class="TextColor taxWrap">
              <span class="taxCommon"
                >地址、&nbsp;&nbsp;&nbsp;电话：
                <span class="TextColor taxCommon_v">{{
                  formList.KHDA_NSRDZDH
                }}</span></span
              >
              <span class="TextColor taxCommon"
                >开户行及账号：<span class="TextColor taxCommon_v">{{
                  formList.KHDA_KHHJZH
                }}</span></span
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 开票表格start -->
      <el-row>
        <el-col>
          <el-table
            ref="multipleTable"
            :data="tableData"
            height="310"
            border
            @selection-change="changeFun"
            @row-click="rowClick"
            :summary-method="getSummaries"
            show-summary
          >
            <el-table-column
              label="选择"
              type="selection"
              fixed
              @selection-change="changeFun"
              width="60"
            >
            </el-table-column>
            <el-table-column
              label="费用项目"
              width="150"
              prop="SKMX_SKFYMC"
            ></el-table-column>
            <el-table-column label="费用期间" prop="SKMX_SKZY" width="250">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.SKMX_SKZY"
                  required
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="收款方式"
              width="100"
              prop="SKMX_SKFS"
            ></el-table-column>
            <el-table-column
              label="实收金额(含税)"
              width="150"
              prop="SKMX_SKJE"
            ></el-table-column>
            <el-table-column
              label="税率(%)"
              width="100"
              prop="SKMX_SL"
            ></el-table-column>
            <el-table-column
              label="金额(不含税)"
              width="100"
              prop="SKMX_BHSJE"
            ></el-table-column>
            <el-table-column label="税额" prop="SKMX_SE"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="" label-width="0">
            <el-checkbox v-model="isBillchecked" @change="printChange"
              >是否打印</el-checkbox
            >
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票人：" label-width="75px">
            <span>{{ userName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="开票时间："
            label-width="85px"
            prop="makeBillDate"
          >
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formList.makeBillDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="diabledClick"
        >确定</el-button
      >
      <el-button @click="cancelForm">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  checkInvoice,
  queryInvoiceResultsApi,
  ELqueryInvoiceResultsApi,
  queryGroupInfoByJTApi,
} from "@/api/FeeManagement/CollectionCredentials";
import {
  queryPayingItemsByForceTotal,
  queryResourceCode,
  queryTaxpayerInformation,
  unpaidInvoiceNew,
  paidInvoiceNew,
  queryBillTypes,
  queryBillBook,
  queryBillNumberNew,
} from "@/api/TicketPayment/Bill";
import { successWriteBackDataApi } from "@/api/Ticket/index";
import {
  getPrintType,
  queryBillPrintTypeApi,
} from "@/api/FeeManagement/TicketBill"; //票据
import { mapGetters } from "vuex";
import { getToken } from "@/utils/Auth"; // 验权
import { currDateTime, PrefixInteger } from "@/utils/global.js";
export default {
  data() {
    return {
      visible: this.OBshow,
      billTypeData: [], //票据分类数据
      billNameData: [], //票据名数据
      billNumberData: [], //票据号
      billNumberNewData: [],
      isBillchecked: true, //是否开票默认选中
      invoiceTypeDisabled: true,
      invoiceTypeArray: [
        {
          valeu: 1,
          label: "增值税普通发票",
        },
        {
          valeu: 2,
          label: "增值税专用发票",
        },
      ],
      tableData: [],
      multipleSelection: [],
      billSJZJ: "发票",
      rules: {
        index2: [{ required: true, trigger: "blur" }],
        index3: [{ required: true, trigger: "blur" }],
        makeBillDate: [
          { required: true, message: "请选择开票时间", trigger: "blur" },
        ],
      },
      formList: {
        billType: "",
        PJLYMX_PJH: null,
        JKR: null,
        RZSJ: null,
        PJLY_PJMC: null,
        PJLY_ZJ: null,
        SKPZ_ZJ: "",
        FJID: "",
        FKGX_ZJ: null,
        KHDA_KHMC: null,
        KHDA_NSRSBH: null,
        KHDA_NSRDZDH: null,
        KHDA_KHHJZH: null,
        HJFS: 2,
        SKMX_SFXMWJ: "",
        SKMX_SKFYMC: "",
        SKMX_SKZY: "",
        SKMX_SKFS: "",
        SKMX_SKBZ: "",
        SKMX_SKJE: "",
        SKMX_ZSJE: "",
        SKMX_SL: "",
        SKMX_SE: "",
        SKMX_BHSJE: "",
        SKMX_ZJ: "",
        makeBillDate: null,
        PJFL: 1,
        LXNO: null,
        SJFPH: null,
        PJLYMX_ZZSFPFL: "",
        PJMX_KPBZ: "",
        LDMC: "",
        FJMC: "",
        PJLYMX_SFGXJSP: "",
        index3: "",
        index2: "",
        SKPZ_JKR: "",
      },
      isCheckTax: true, //默认校验税盘号
      index: 0, //默认选中发票还是票据 变量,
      billCateory: "",
      infonumber: "", //税盘票号
      sess_kk_ktzzfp: 1, //1调用金税盘接口
      infoselleraddressphone: "",
      infosellerbankaccount: "",
      Jspinfo: {}, //金税盘库存信息
      count: 0, //定时统计
      time: "", //定时
      diabledClick: false, //默认确定按钮可以点击
      disablePJH: false, //默认发票号可以选择
      timer: "", //定时器
      isRef: false, //取消按钮是否刷
      numberOptions: [],
      billtype: 1,
      option1: [],
      option2: [],
      option3: [],
      billdata: [],
    };
  },
  props: ["OBshow"],
  computed: {
    ...mapGetters(["userName"]), //登录用户
    receiptAmountCount() {
      var AmountCount = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        AmountCount += Number(this.tableData[i].SKMX_SKJE);
      }
      return AmountCount;
    },
    amountCount() {
      var AmountCount = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        AmountCount += Number(this.tableData[i].SKMX_BHSJE);
      }
      return AmountCount;
    },
    taxCount() {
      var AmountCount = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        AmountCount += Number(this.tableData[i].SKMX_SE);
      }
      return AmountCount;
    },
  },
  filters: {
    //过滤器
    rounding(value) {
      return value.length > 20 ? value.slice(0, 20) + "..." : value;
    },
  },
  watch: {
    OBshow() {
      this.visible = this.OBshow;
      if (this.visible) {
        this.getcheckInvoice(); //检测是否调用金税盘
        this.formList.makeBillDate = currDateTime();
        this.formList.PJMX_KPBZ = "";
        this.multipleSelection = []; //清空收费项目
      }
    },
  },
  methods: {
    PJFLchange(index) {
      this.$forceUpdate();

      this.formList.PJFL = this.option1[index].PJFL;

      var list =
        this.billtype == 1
          ? {
              applyId: this.formList.applyId,
              PJLY_PJFL: this.option1[index].Caption,
            }
          : {
              SKPZ_ZJ: this.formList.SKPZ_ZJ,
              billApplyId: this.formList.billApplyId,
              PJLY_PJFL: this.option1[index].Caption,
            };

      this.billSJZJ = this.option1[index].PJFL;
      queryBillBook(list).then((response) => {
        if (response.data.length > 0) {
          this.option2 = response.data;
          this.formList.index2 = 0;
          this.formList.PJLY_PJFL = response.data[0].PJLY_PJFL;
          this.formList.PJLY_PJMC = response.data[0].PJLY_PJMC;
          this.formList.PJLY_ZJ = response.data[0].PJLY_ZJ;
          this.formList.PJMX_LX = response.data[0].PJMX_LX;
          this.formList.LXNO = response.data[0].PJMX_LX;
          queryBillNumberNew({
            PJLY_ZJ: response.data[0].PJLY_ZJ,
          }).then((response) => {
            if (response.data.length > 0) {
              this.option3 = response.data;
              this.formList.index3 = 0;
              this.formList.PJLYMX_PJH = response.data[0].PJLYMX_PJH;
              this.formList.PJLYMX_PJZT = response.data[0].PJLYMX_PJZT;
              this.formList.PJLYMX_ZJ = response.data[0].PJLYMX_ZJ;
            } else {
              this.option3 = [];
              this.formList.index3 = "";
              this.formList.PJLYMX_PJH = "";
              this.formList.PJLYMX_PJZT = "";
              this.formList.PJLYMX_ZJ = "";
            }
          });
        } else {
          this.option2 = [];
          this.formList.index2 = "";
          this.formList.PJLY_PJFL = "";
          this.formList.PJLY_PJMC = "";
          this.formList.PJLY_ZJ = "";
          this.formList.PJMX_LX = "";
          this.formList.LXNO = "";

          this.option3 = [];
          this.formList.index3 = "";
          this.formList.PJLYMX_PJH = "";
          this.formList.PJLYMX_PJZT = "";
          this.formList.PJLYMX_ZJ = "";
        }
      });
      queryPayingItemsByForceTotal(
        this.billtype == 1
          ? {
              applyId: this.formList.applyId,
              PJFL: this.formList.PJFL,
            }
          : {
              SKPZ_ZJ: this.formList.SKPZ_ZJ,
              billApplyId: this.formList.billApplyId,
              PJFL: this.formList.PJFL,
            }
      ).then((response) => {
        this.tableData = response;
      });
    },
    PJMCchange(index) {
      this.$forceUpdate();
      this.formList.PJLY_PJFL = this.option2[index].PJLY_PJFL;
      this.formList.PJLY_PJMC = this.option2[index].PJLY_PJMC;
      this.formList.PJLY_ZJ = this.option2[index].PJLY_ZJ;
      this.formList.PJMX_LX = this.option2[index].PJMX_LX;
      this.formList.LXNO = this.option2[index].PJMX_LX;
      var _this = this;
      queryBillNumberNew({
        PJLY_ZJ: this.option2[index].PJLY_ZJ,
      }).then((response) => {
        if (response.data.length > index) {
          this.option3 = response.data;
          this.formList.index3 = 0;
          this.formList.PJLYMX_PJH = response.data[index].PJLYMX_PJH;
          this.formList.PJLYMX_PJZT = response.data[index].PJLYMX_PJZT;
          this.formList.PJLYMX_ZJ = response.data[index].PJLYMX_ZJ;
        } else {
          _this.option3 = [];
          this.formList.index3 = "";
          _this.formList.PJLYMX_PJH = "";
          _this.formList.PJLYMX_PJZT = "";
          _this.formList.PJLYMX_ZJ = "";
        }
      });
    },
    PJHchange(index) {
      this.$forceUpdate();
      this.formList.PJLYMX_PJH = this.option3[index].PJLYMX_PJH;
      this.formList.PJLYMX_PJZT = this.option3[index].PJLYMX_PJZT;
      this.formList.PJLYMX_ZJ = this.option3[index].PJLYMX_ZJ;
    },
    getData(data, type) {
      this.tableData = [];
      this.formList.PJLYMX_SKR = this.userName;
      this.billdata = data;
      this.billtype = type;
      this.isRef = false;
      if (type == 1) {
        this.formList.applyId = data.applyId;
      } else {
        this.formList.SKPZ_ZJ = data.SKPZ_ZJ;
        this.formList.billApplyId = data.billApplyId;
      }
      this.formList.index2 = "";
      this.formList.index3 = "";
      queryBillTypes().then((response) => {
        this.option1 = response.data;
        this.gettable(data, type, 0);
      });
      this.getResourceCode(data, type); //资源代码查询
      this.getTaxInfo(data, type);
      this.getGroupInfoByJT(); //获取是否是新同道
    },
    gettable(data, type, index) {
      var list =
        type == 1
          ? {
              applyId: data.applyId,
              PJFL: this.option1[index].PJFL,
            }
          : {
              SKPZ_ZJ: data.SKPZ_ZJ,
              billApplyId: data.billApplyId,
              PJFL: this.option1[index].PJFL,
            };
      var _this = this;
      queryPayingItemsByForceTotal(list).then((response) => {
        if (response.length == 0) {
          if (index < _this.option1.length - 1) {
            this.gettable(data, type, index + 1);
          }
        } else {
          this.formList.index1 = index;
          this.formList.Caption = this.option1[index].Caption;
          this.formList.PJFL = this.option1[index].PJFL;
          list.PJLY_PJFL = this.option1[index].Caption;
          this.billSJZJ = this.option1[index].PJFL;
          this.tableData = response;

          queryBillBook(list).then((response) => {
            if (response.data.length > 0) {
              this.option2 = response.data;
              this.formList.index2 = 0;

              this.formList.PJLY_PJFL = response.data[0].PJLY_PJFL;
              this.formList.PJLY_PJMC = response.data[0].PJLY_PJMC;
              this.formList.PJLY_ZJ = response.data[0].PJLY_ZJ;
              this.formList.PJMX_LX = response.data[0].PJMX_LX;
              this.formList.LXNO = response.data[0].PJMX_LX;

              queryBillNumberNew({
                PJLY_ZJ: response.data[0].PJLY_ZJ,
              }).then((response) => {
                if (response.data.length > 0) {
                  this.option3 = response.data;
                  this.formList.index3 = 0;
                  this.formList.PJLYMX_PJH = response.data[0].PJLYMX_PJH;
                  this.formList.PJLYMX_PJZT = response.data[0].PJLYMX_PJZT;
                  this.formList.PJLYMX_ZJ = response.data[0].PJLYMX_ZJ;
                } else {
                  this.option3 = [];
                  _this.formList.index3 = "";
                  this.formList.PJLYMX_PJH = "";
                  this.formList.PJLYMX_PJZT = "";
                  this.formList.PJLYMX_ZJ = "";
                }
              });
            } else {
              this.option2 = [];
              this.formList.index2 = "";
              this.formList.PJLY_PJFL = "";
              this.formList.PJLY_PJMC = "";
              this.formList.PJLY_ZJ = "";
              this.formList.PJMX_LX = "";
              this.formList.LXNO = "";
            }
          });
        }
      });
    },
    gettables(data, type, index) {
      var list =
        type == 1
          ? {
              applyId: data.applyId,
              PJFL: this.option1[index].PJFL,
            }
          : {
              SKPZ_ZJ: data.SKPZ_ZJ,
              billApplyId: data.billApplyId,
              PJFL: this.option1[index].PJFL,
            };
      var _this = this;
      if (
        this.formList.PJFL == this.option1[index].PJFL &&
        index < this.option1.length - 1
      ) {
        this.gettables(data, type, index + 1);
      }
      if (index == this.option1.length - 1) {
        this.$emit("PopCancelEmit");
        this.cancelForm();
      }
      queryPayingItemsByForceTotal(list).then((response) => {
        if (response.length == 0) {
          if (index < _this.option1.length - 1) {
            this.gettables(data, type, index + 1);
          } else {
            this.$emit("PopCancelEmit");
            this.cancelForm();
          }
        } else {
          this.formList.index1 = index;
          this.formList.Caption = this.option1[index].Caption;
          this.formList.PJFL = this.option1[index].PJFL;
          list.PJLY_PJFL = this.option1[index].Caption;
          this.billSJZJ = this.option1[index].PJFL;
          this.tableData = response;

          queryBillBook(list).then((response) => {
            if (response.data.length > 0) {
              this.option2 = response.data;
              this.formList.index2 = 0;

              this.formList.PJLY_PJFL = response.data[0].PJLY_PJFL;
              this.formList.PJLY_PJMC = response.data[0].PJLY_PJMC;
              this.formList.PJLY_ZJ = response.data[0].PJLY_ZJ;
              this.formList.PJMX_LX = response.data[0].PJMX_LX;
              this.formList.LXNO = response.data[0].PJMX_LX;

              queryBillNumberNew({
                PJLY_ZJ: response.data[0].PJLY_ZJ,
              }).then((response) => {
                if (response.data.length > 0) {
                  this.option3 = response.data;
                  this.formList.index3 = 0;
                  this.formList.PJLYMX_PJH = response.data[0].PJLYMX_PJH;
                  this.formList.PJLYMX_PJZT = response.data[0].PJLYMX_PJZT;
                  this.formList.PJLYMX_ZJ = response.data[0].PJLYMX_ZJ;
                } else {
                  this.option3 = [];
                  this.formList.index3 = "";
                  this.formList.PJLYMX_PJH = "";
                  this.formList.PJLYMX_PJZT = "";
                  this.formList.PJLYMX_ZJ = "";
                }
              });
            } else {
              this.option2 = [];
              this.formList.index2 = "";
              this.formList.PJLY_PJFL = "";
              this.formList.PJLY_PJMC = "";
              this.formList.PJLY_ZJ = "";
              this.formList.PJMX_LX = "";
              this.formList.LXNO = "";

              this.option3 = [];
              this.formList.index3 = "";
              this.formList.PJLYMX_PJH = "";
              this.formList.PJLYMX_PJZT = "";
              this.formList.PJLYMX_ZJ = "";
            }
          });
        }
      });
    },
    getqueryBillBook() {},
    getcheckInvoice() {
      //检测是否调用金税盘
      checkInvoice().then((response) => {
        this.sess_kk_ktzzfp = response.sess_kk_ktzzfp;
        if (this.sess_kk_ktzzfp == 1) {
          //保存标识  如果没有勾选税盘号 则票据列表纸质发票不可打印预览 1可以打印  0不能打印
          this.formList.PJLYMX_SFGXJSP = 1;
        } else {
          this.formList.PJLYMX_SFGXJSP = 0;
        }
      });
    },
    getGroupInfoByJT() {
      //获取是否是新同道  电子发票 0否 1是
      queryGroupInfoByJTApi().then((response) => {
        this.formList.is_el_invoice_new = response.is_el_invoice_new;
      });
    },
    infoNumbeChange(val) {
      //税票号改变事件
      this.isBillchecked = val;
      if (val) {
        this.formList.PJLYMX_SFGXJSP = 1;
      } else {
        this.formList.PJLYMX_SFGXJSP = 0;
      }
    },
    printChange(val) {
      //打印预览改变事件
      this.isCheckTax = val;
      if (this.formList.LXNO == 101) {
        //纸质发票判断是否有勾选税盘号
        if (val) {
          this.formList.PJLYMX_SFGXJSP = 1;
        } else {
          this.formList.PJLYMX_SFGXJSP = 0;
        }
      } else {
        this.formList.PJLYMX_SFGXJSP = "";
      }
    },
    getResourceCode(data, type) {
      //资源代码查询
      this.formList.FJID = "";
      this.formList.LDMC = "";
      this.formList.FJMC = "";
      var list =
        type == 1
          ? {
              applyId: data.applyId,
            }
          : {
              SKPZ_ZJ: data.SKPZ_ZJ,
              billApplyId: data.billApplyId,
            };
      queryResourceCode(list).then((response) => {
        this.formList.FJID = response.data.FJDA_FJID;
        this.formList.FJMC = response.data.FJDA_FJMC;
        this.formList.FKGX_ZJ = response.data.FKGX_ZJ;
        this.formList.JKR = response.data.SKPZ_JKR;
        this.formList.SKPZ_JKR = response.data.SKPZ_JKR;
        this.formList.KHMC = response.data.KHMC;
        this.formList.FJDA_FJMC = response.data.FJDA_FJMC;
        this.formList.FJDA_FJID = response.data.FJDA_FJID;
      });
    },
    getTaxInfo(data, type) {
      //纳税人信息
      var list =
        type == 1
          ? {
              applyId: data.applyId,
            }
          : {
              billApplyId: data.billApplyId,
              SKPZ_ZJ: data.SKPZ_ZJ,
            };
      queryTaxpayerInformation(list).then((response) => {
        this.formList.KHDA_KHMC = response.data.invoice_nsrmc;
        this.formList.KHDA_NSRSBH = response.data.invoice_nsrsbh;
        this.formList.KHDA_NSRDZDH = response.data.invoice_nsrdzdh;
        this.formList.KHDA_KHHJZH = response.data.invoice_khhjzh;
        this.formList.PJLYMX_ZZSFPFL = response.data.PJLYMX_ZZSFPFL;

        this.formList.PJLYMX_NSRMC = response.data.invoice_nsrmc;
        this.formList.PJLYMX_NSRSBH = response.data.invoice_nsrsbh;
        this.formList.PJLYMX_NSRDZDH = response.data.invoice_nsrdzdh;
        this.formList.PJLYMX_KHHJZH = response.data.invoice_khhjzh;
      });
    },
    getSPInfo() {
      var _this = this;
      // eslint-disable-next-line no-undef
      $.ajax({
        type: "post",
        url: "http://localhost:8091/api/getinfo",
        data: {
          infokind: this.formList.PJLYMX_ZZSFPFL == "增值税专用发票" ? 0 : 2,
        },
        success: function (json) {
          _this.Jspinfo = json.info;
          _this.infonumber = PrefixInteger(json.info.infonumber, 8);
          _this.getBillNumber();
        },
        error: function () {
          _this.getBillNumber();
        },
      });
    },
    invoiceTypeChange() {
      //增值税发票分类改变事件
      if (
        this.formList.LXNO == 101 &&
        this.isCheckTax &&
        this.sess_kk_ktzzfp == 1
      ) {
        //纸质发票且勾选了税盘号
        this.getSPInfo();
      } else {
        this.getBillNumber();
      }
      this.getTaxInfo();
    },
    rowClick(row) {
      //单行选中
      this.$refs.multipleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    getSummaries(param) {
      //表格合计
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
    queryInvoiceRequest() {
      //查询电子发票
      if (this.formList.is_el_invoice_new == 0) {
        //is_el_invoice_new为0时
        queryInvoiceResultsApi(this.formList.PJLYMX_ZJ).then((response) => {
          this.InvoiceResult(response);
        });
      } else {
        //新通道 is_el_invoice_new为1时
        ELqueryInvoiceResultsApi(this.formList.PJLYMX_ZJ).then((response) => {
          this.InvoiceResult(response);
        });
      }
    },
    InvoiceResult(response) {
      //电子发票开票如果失败循环返回接口
      var that = this;
      if (response.returnStatus == "SUCCESS") {
        if (response.data[0].invoiceImageUrl != "") {
          that.diabledClick = false; //默认确定按钮可以
          clearTimeout(that.timer);
          window.open(`http://${response.data[0].invoiceImageUrl}`);
        } else {
          //如果返回的url空 关闭开票弹窗
          let newobj = JSON.parse(JSON.stringify(this.formList));
          this.$emit("PopCancelEmit", newobj);
          this.cancelForm();
        }
      } else {
        if (response) {
          //如果有返回结果  并且失败关闭定时器 关闭开票弹窗
          clearTimeout(that.timer);
          let newobj = JSON.parse(JSON.stringify(this.formList));
          this.$emit("PopCancelEmit", newobj);
          this.cancelForm();
        } else {
          if (that.count >= 12) {
            clearTimeout(that.timer);
            let newobj = JSON.parse(JSON.stringify(this.formList));
            this.$emit("PopCancelEmit", newobj);
            this.cancelForm();
          } else {
            that.timer = setTimeout(function () {
              that.count++;
              that.queryInvoiceRequest();
            }, 5000);
          }
        }
      }
    },
    submit() {
      // var _this = this;
      var isJump = 0;
      this.formList.makeBillMan = this.userName; //开票人
      this.$refs.formInfoRef.validate((valid) => {
        if (valid) {
          if (this.multipleSelection.length == 0) {
            this.$message({ type: "warning", message: "请选中开票明细" });
            return false;
          } else {
            this.multipleSelection.forEach(function (item) {
              if (item.SKMX_SKZY == undefined) {
                isJump++;
              }
            });
          }
          if (isJump > 0) {
            this.$message({
              message: "请输入费用期间",
              type: "warning",
            });
            return false;
          }
          if (
            this.formList.LXNO == 101 &&
            this.isCheckTax &&
            this.sess_kk_ktzzfp == 1
          ) {
            if (this.formList.PJLYMX_PJH != this.infonumber) {
              this.$message({
                type: "warning",
                message: "票据号与税盘号不一致",
              });
              return false;
            }
          }
          this.getMakeBill();
        }
      });
    },
    getMakeBill() {
      var _this = this;

      this.formList.list = JSON.stringify(this.multipleSelection);

      if (this.billtype == 1) {
        unpaidInvoiceNew(this.formList).then((response) => {
          if (response.returnStatus == "SUCCESS") {
            this.isRef = true;
            if (
              this.formList.is_el_invoice_new == 1 &&
              this.formList.PJLY_PJMC == "动态电子发票"
            ) {
              //如果是新通道并且是动态电子发票  PJLYMX_ZJ则在开票成功后返回
              this.formList.PJLYMX_ZJ = response.data.PJLYMX_ZJ;
            }
            if (this.multipleSelection.length != this.tableData.length) {
              queryPayingItemsByForceTotal(
                this.billtype == 1
                  ? {
                      applyId: this.formList.applyId,
                      PJFL: this.formList.PJFL,
                    }
                  : {
                      SKPZ_ZJ: this.formList.SKPZ_ZJ,
                      billApplyId: this.formList.billApplyId,
                      PJFL: this.formList.PJFL,
                    }
              ).then((response) => {
                this.tableData = response;
              });
            } else {
              this.gettables(this.billdata, this.billtype, 0);
            }

            if (this.isBillchecked) {
              //如果选中了是否打印 跳转到打印页面
              if (this.formList.LXNO == 101) {
                //如果是纸质发票勾选了税盘号  则调用开具发票
                if (this.sess_kk_ktzzfp == 1) {
                  this.OpenCard_kp();
                }
              } else {
                if (this.formList.LXNO == 201) {
                  //如果是纸质收据   先获取billPrintType
                  this.getBillTypeRequest();
                } else {
                  this.BillPrint();
                }
              }
            }
          } else {
            _this.diabledClick = false;
          }
        });
      } else {
        paidInvoiceNew(this.formList).then((response) => {
          if (response.returnStatus == "SUCCESS") {
            if (
              this.formList.is_el_invoice_new == 1 &&
              this.formList.PJLY_PJMC == "动态电子发票"
            ) {
              //如果是新通道并且是动态电子发票  PJLYMX_ZJ则在开票成功后返回
              this.formList.PJLYMX_ZJ = response.data.PJLYMX_ZJ;
            }
            if (this.multipleSelection.length != this.tableData.length) {
              queryPayingItemsByForceTotal(
                this.billtype == 1
                  ? {
                      applyId: this.formList.applyId,
                      PJFL: this.formList.PJFL,
                    }
                  : {
                      SKPZ_ZJ: this.formList.SKPZ_ZJ,
                      billApplyId: this.formList.billApplyId,
                      PJFL: this.formList.PJFL,
                    }
              ).then((response) => {
                this.tableData = response;
              });
            } else {
              this.gettables(this.billdata, this.billtype, 0);
            }
            if (this.isBillchecked) {
              //如果选中了是否打印 跳转到打印页面
              if (this.formList.LXNO == 101) {
                //如果是纸质发票勾选了税盘号  则调用开具发票
                if (this.sess_kk_ktzzfp == 1) {
                  this.OpenCard_kp();
                }
              } else {
                if (this.formList.LXNO == 201) {
                  //如果是纸质收据   先获取billPrintType
                  this.getBillTypeRequest();
                } else {
                  this.BillPrint();
                }
              }
            }
          } else {
            _this.diabledClick = false;
          }
        });
      }
    },
    getBillTypeRequest() {
      //获取billPrintType
      queryBillPrintTypeApi(this.formList.PJLYMX_ZJ).then((response) => {
        this.formList.billPrintType = response.billPrintType;
        this.BillPrint();
      });
    },
    BillPrint() {
      //打印票据
      var routeData;
      if (this.formList.LXNO == 101) {
        //纸质发票
        routeData = this.$router.resolve({
          path: "Ticket",
          name: "开票预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.formList.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      } else if (this.formList.LXNO == 102) {
        //电子发票
        this.queryInvoiceRequest();
      } else if (this.formList.LXNO == 201) {
        getPrintType().then((response) => {
          if (response.orgPrintType) {
            var routeData;
            routeData = this.$router.resolve({
              path: "ReceiptPrint/pwy_test_jjshequ_com",
              name: "收据套打",
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
            if (this.formList.billPrintType == "CommonReceiptTemp") {
              //三明城发纸质收据带表格--根据域名hostname判断（修改根据billPrintType等于1通用三明城发模板）
              routeData = this.$router.resolve({
                path: "/ReceiptPrint/smctwy",
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
            } else if (response.billPrintType == "jindiReceiptTemp") {
              //金帝物业纸质收据带表格
              routeData = this.$router.resolve({
                path: "/ReceiptPrint/jindiwy",
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
                  this.formList.PJLYMX_ZJ +
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
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.formList.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      }
    },
    //开具发票   10301050104   30.0
    OpenCard_kp() {
      this.kpdisabled = true;
      var detail = [];
      this.multipleSelection.forEach((item) => {
        this.formList.PJMX_KPBZ += item.SKMX_SKFYMC + item.SKMX_SKZY + ";";
        var obj = {};
        (obj.listgoodsname = item.SKMX_SKFYMC), //商品名称--修改输入
          (obj.listtaxitem = ""), //税目
          (obj.liststandard = ""), //规格型号名称
          (obj.listunit = ""), //计量单位号码
          (obj.listnumber = ""), //数量
          (obj.listprice = ""), //单价
          (obj.listpricekind = 0), //含税价标志
          (obj.listamount = item.SKMX_BHSJE), //金额--修改输入
          (obj.listtaxamount = item.SKMX_SE), //税额--修改输入
          (obj.infotaxrate = item.SKMX_SL), //税率-----有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数
          (obj.goodsnover = ""), //编码版本号--固定33--有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数 33
          (obj.goodstaxno = ""), //税收分类编码--国税要求必须----有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数10301050104
          (obj.taxpre = ""), //是否享受税收优惠政策 0：不享受，1：享受
          (obj.taxprecon = ""), //享受税收优惠政策内容
          (obj.zerotax = ""), //零税率标识 空：非零税率，0：出口退税，1：免税，2：不征税，3：普通零税率
          (obj.cropgoodsno = ""), //企业自编码
          (obj.taxdeduction = ""); //扣除额
        detail.push(obj);
      });
      var order = {
        infokind: this.formList.PJLYMX_ZZSFPFL == "增值税专用发票" ? 0 : 2, //专票0，普票2
        infoclientname: this.formList.KHDA_KHMC, //纳税人名称--必填
        infoclienttaxcode: this.formList.KHDA_NSRSBH, //纳税人识别号--专票必填
        infoclientaddressphone: this.formList.KHDA_NSRDZDH, //纳税人地址电话--专票必填
        infoclientbankaccount: this.formList.KHDA_KHHJZH, //纳税人开户行及账号--专票必填
        infoselleraddressphone: this.infoselleraddressphone, //销售方地址，电话
        infosellerbankaccount: this.infosellerbankaccount, //销售方开户行及账号
        infonotes:
          this.formList.PJMX_KPBZ == undefined
            ? ""
            : this.formList.FJMC + this.formList.PJMX_KPBZ, //备注
        infoinvoicer: this.userName, //开票人
        infochecker: "", //复核人
        infocashier: this.userName, //收款人
        infolistname: "", //清单字样--可不输
        infobillnumber: "", //销售单据编号--可不输
        detail: detail,
      };
      var option = {
        checkform: 0, //是否弹窗校验0代表不弹窗，1弹窗
      };
      //开具发票调用接口
      var _this = this;
      // eslint-disable-next-line no-undef
      $.post(
        "http://localhost:8091/api/invoice",
        { order: order, option: option },
        function (json) {
          if (json.code == "4011") {
            _this.$set(_this.formList, "PJLYMX_FPDM", json.info.infotypecode);
            _this.$set(
              _this.formList,
              "PJLYMX_FPHM",
              _this.PrefixInteger(json.info.infonumber, 8)
            );
            _this.kpdisabled = true;
            _this.$message({ message: "开具成功", type: "success" });
          } else {
            _this.kpdisabled = false;
            _this.$message({ message: JSON.stringify(json), type: "warning" });
          }
          _this.setData(
            json.code,
            _this.Jspinfo.infotypecode,
            _this.PrefixInteger(_this.Jspinfo.infonumber, 8)
          ); //打印回写传入数据到服务器
        },
        "json"
      );
    },
    //打印回写传入数据到服务器
    setData(RetCode, infotypecode, infonumber) {
      successWriteBackDataApi(
        this.formList.PJLYMX_ZJ,
        getToken(),
        RetCode,
        this.formList.PJLYMX_ZZSFPFL,
        infotypecode,
        infonumber
      ).then((response) => {
        if (response) {
          this.BillPrint();
        }
      });
    },
    //前面数字补0
    PrefixInteger(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    // 取消
    cancelForm() {
      this.$emit("update:OBshow", false);
      if (this.isRef) {
        let newobj = JSON.parse(JSON.stringify(this.formList));
        this.$emit("PopCancelEmit", newobj);
      }
      this.$nextTick(() => {
        this.$refs.formInfoRef.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss">
.Receive-TicketDialog {
  margin-bottom: 5px;
  .el-dialog {
    width: 1170px !important;
  }
  .el-dialog__body {
    padding: 10px 0;
  }

  .el-cascader {
    width: 100% !important;
  }
  .taxWrap {
    .taxCommon {
      width: 40%;
      display: inline-block;
      text-align: left;
      .taxCommon_v {
        overflow: hidden;
        text-overflow: ellipsis;
        /* white-space: nowrap; */
        width: 70%;
        display: inline-block;
        vertical-align: text-top;
        line-height: 20px;
      }
    }
  }
  .el-table {
    margin-top: 20px;
    .el-table__footer-wrapper {
      position: absolute;
      bottom: 0;
    }
  }
  .el-row {
    margin-bottom: 5px !important;
  }
}
</style>
