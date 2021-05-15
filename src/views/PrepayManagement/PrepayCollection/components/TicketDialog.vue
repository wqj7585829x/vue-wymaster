<template>
  <el-dialog
    v-dialogDrag
    title="开票"
    class="el-dialog-treble Receive-TicketDialog"
    :visible.sync="visible"
    @close="cancelForm"
    :close-on-click-modal="false"
    ref="ReceticketRef"
  >
    <!-- 票据对象 -->
    <el-form
      label-width="115px"
      :model="formList"
      :rules="rules"
      ref="formInfoRef"
    >
      <!-- {{TicketlPop}} -->
      <!-- {{formList}} -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="票据分类：" prop="billType">
            <el-select v-model="formList.billType" @change="captionChange">
              <el-option
                v-for="item in billTypeData"
                :key="item.Caption"
                :value="item.Caption"
                :label="item.Caption"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="票据名称：" prop="PJLY_ZJ">
            <el-select v-model="formList.PJLY_ZJ" @change="pjmcChange">
              <el-option
                v-for="item in billNameData"
                :key="item.PJLY_ZJ"
                :value="item.PJLY_ZJ"
                :label="item.PJLY_PJMC"
                :disabled="item.disabledBill"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="票据号：" prop="PJLYMX_PJH">
            <el-select
              v-model="formList.PJLYMX_PJH"
              @change="pjhChange"
              filterable
            >
              <!--filterable :filter-method="filterMethod"  如果数据过多会出现卡顿  需要过滤搜索-->
              <el-option
                v-for="item in billNumberData"
                :key="item.PJLYMX_ZJ"
                :value="item.PJLYMX_PJH"
                :label="item.PJLYMX_PJH"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="资源代码：">
            <el-input v-model="formList.FJID" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交款人：">
            <el-input v-model="formList.JKR" v-if="hometype"></el-input>
            <el-input v-model="formList.JKR" v-else></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增值税发票分类：" v-if="billSJZJ == '发票'">
            <el-select
              v-model="formList.ZZLFPFL"
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
      <el-row :gutter="30">
        <el-col :span="8" v-if="formList.LXNO == 101 && sess_kk_ktzzfp == 1">
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
      <el-row :gutter="30" ref="nsrRef">
        <el-col :span="8">
          <el-form-item label="纳税人信息：" v-if="billSJZJ == '发票'">
            <div class="TextColor taxWrap">
              <div class="taxCommon">
                名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="formList.KHDA_NSRMC"
                  placement="top-start"
                >
                  <div class="TextColor taxCommon_v">
                    {{ formList.KHDA_NSRMC }}
                  </div>
                </el-tooltip>
              </div>
              <div class="TextColor taxCommon">
                纳税人识别号：
                <div class="TextColor taxCommon_v">
                  {{ formList.KHDA_NSRSBH }}
                </div>
              </div>
            </div>
            <div class="TextColor taxWrap">
              <div class="taxCommon">
                地址、&nbsp;&nbsp;&nbsp;电话：
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="formList.KHDA_NSRDZDH"
                  placement="top-start"
                >
                  <div class="TextColor taxCommon_v">
                    {{ formList.KHDA_NSRDZDH }}
                  </div>
                </el-tooltip>
              </div>
              <div class="TextColor taxCommon">
                开户行及账号：
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="formList.KHDA_KHHJZH"
                  placement="top-start"
                >
                  <div class="TextColor taxCommon_v">
                    {{ formList.KHDA_KHHJZH }}
                  </div>
                </el-tooltip>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 开票表格start -->
      <el-row class="Receticket_wrap" ref="tableRef">
        <el-col>
          <u-table
            ref="multipleTable"
            :data="tableData"
            :height="tableHeight"
            border
            @selection-change="changeFun"
            @row-click="rowClick"
            :summary-method="getSummaries"
            show-summary
            use-virtual
            :row-height="25"
            class="el-table-ticket"
          >
            <u-table-column
              label="选择"
              type="selection"
              @selection-change="changeFun"
              width="60"
              fixed
            >
            </u-table-column>
            <u-table-column
              label="费用项目"
              width="150"
              prop="YJFA_FAMC"
              show-overflow-tooltip
            ></u-table-column>
            <u-table-column label="摘要" prop="YJMX_ZY" width="250">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.YJMX_ZY"
                  required
                ></el-input>
              </template>
            </u-table-column>
            <u-table-column
              label="收款方式"
              width="100"
              prop="SFKM_SKFS"
              show-overflow-tooltip
            ></u-table-column>
            <u-table-column
              label="实收金额(含税)"
              width="150"
              prop="YJMX_YJJE"
            ></u-table-column>
            <u-table-column
              label="税率(%)"
              width="100"
              prop="YJMX_SL"
            ></u-table-column>
            <u-table-column
              label="金额(不含税)"
              width="100"
              prop="YJMX_BHSJE"
            ></u-table-column>
            <u-table-column label="税额" prop="YJMX_SE"></u-table-column>
          </u-table>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
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
            label-width="75px"
            prop="makeBillDate"
          >
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formList.makeBillDate"
              :disabled="ReceiTicketDateTime_has"
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
  queryBillType,
  queryBillName,
  getMakeBillBelongCategory,
  checkInvoice,
  queryInvoiceResultsApi,
  ELqueryInvoiceResultsApi,
  queryGroupInfoByJTApi,
} from "@/api/FeeManagement/CollectionCredentials";
import {
  queryClassificationOfAddValueTaxInvoice,
  queryResourceCode,
  queryBillNumber,
  queryTaxpayerInformation,
  queryPrepayDetailByItemsDetail,
  ensureMakeBill,
} from "@/api/PrepayManagement/PrepayCollection";
import { successWriteBackDataApi } from "@/api/Ticket/index";
import {
  getPrintType,
  queryBillPrintTypeApi,
} from "@/api/FeeManagement/TicketBill"; //票据
import { mapGetters } from "vuex";
import { getToken } from "@/utils/Auth"; // 验权
import { currDateTime, PrefixInteger } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  components: { UTable, UTableColumn },
  data() {
    return {
      visible: this.showTicket,
      billTypeData: [], //票据分类数据
      billNameData: [], //票据名数据
      billNumberData: [], //票据号
      billNumberNewData: [],
      isBillchecked: true, //是否开票默认选中
      invoiceTypeDisabled: false,
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
        PJLY_ZJ: [
          { required: true, message: "请选择票据名称", trigger: "blur" },
        ],
        PJLYMX_PJH: [
          { required: true, message: "请选择票据号", trigger: "blur" },
        ],
        RZSJ: [{ required: true, message: "请选择入账时间", trigger: "blur" }],
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
        HJFS: 0,
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
        LXNO: null,
        SJFPH: null,
        ZZLFPFL: "增值税普通发票",
        PJMX_KPBZ: "",
        LDMC: "",
        FJMC: "",
        PJLYMX_SFGXJSP: "",
      },
      defaultProps: {
        children: "children",
        label: "Caption",
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
      ticketType: 1, //开票类型  1未收清开票   2凭证开票  3一次性收费
      disablePJH: false, //默认发票号可以选择
      timer: "", //定时器
      isRef: false, //取消按钮是否刷
      numberOptions: [],
      ReceiTicketDateTime_has: !(
        Number(
          sessionStorage
            .getItem("buttenpremissions")
            .indexOf("ReceiTicketDateTime_has")
        ) > -1
      ), //开票时间权限
      tableHeight: 310,
      hometype: false, //首页快速开票多选开票功能标志，从首页调用时则为ture，用于区分获取纳税人信息
      nsrform: {}, //首页快速快票传递过来的纳税人信息列表
    };
  },
  props: ["showTicket"],
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
    rounding(value, roundWay) {
      if (roundWay == undefined) {
        return value.toFixed(2);
      }
    },
  },
  watch: {
    showTicket() {
      // var that = this;
      this.visible = this.showTicket;
      if (this.visible) {
        this.getcheckInvoice(); //检测是否调用金税盘
        this.formList.makeBillDate = currDateTime();
        this.formList.PJMX_KPBZ = "";
        this.multipleSelection = []; //清空收费项目
        console.log(this.$refs.ReceticketRef.$el.offsetTop);
        this.tableHeight = window.innerHeight - 350;
      }
    },
  },
  methods: {
    getData(data, FKGX_ZJ, type) {
      this.diabledClick = false; //默认确定按钮可以
      this.isRef = false;
      this.ticketType = type;
      if (type != 3) {
        this.index = 0;
        this.formList.SKPZ_ZJ = data.SKPZ_ZJ;
        this.formList.SKPZ_SKNY = data.SKPZ_SKNY;
        this.formList.JKR = data.YJPZ_JKR;
        this.formList.RZSJ = data.YJPZ_RZSJ;
        this.formList.FKGX_ZJ = data.YJPZ_FKGXWJ;
        this.formList.YJPZ_ZJ = data.YJPZ_ZJ;
        if (data.SKPZ_YXPZ) {
          this.formList.SKPZ_YXPZ = data.SKPZ_YXPZ;
        }
        this.formList.operationType = "收款凭证";
        if (type == 2) {
          //如果是收款凭证开票
          this.isRef = true;
          this.getMakeBillBelongCategory(); //获取可开发票的种类
        } else {
          this.getBillType();
        }
      } else {
        //一次性开票  收费项目为列表带入的数据
        this.tableData = [];
        this.formList.HJFS = 0;
        this.formList.SKPZ_ZJ = data.YCXSF_ZJ;
        this.formList.SKPZ_SKNY = data.SKPZ_SKNY;
        this.formList.FKGX_ZJ = FKGX_ZJ;
        this.formList.JKR = data.YJPZ_JKR;
        this.formList.RZSJ = data.YJPZ_RZSJ;
        this.formList.FJID = "";
        this.formList.operationType = "一次性收费";
        //收费项目数组对象
        var obj = {};
        obj.SKMX_SKFYMC = data.YCXSF_SFXMMC;
        obj.SKMX_SKZY = data.YCXSF_SFRQ + "交款" + data.YCXSF_SFJE;
        obj.SKMX_SKFS = data.YCXSF_SKFS;
        obj.SKMX_SKJE = data.YCXSF_SFJE;
        obj.SKMX_SL = data.YCXSF_SL;
        obj.SKMX_BHSJE = data.YCXSF_BHSJE;
        obj.SKMX_SE = data.YCXSF_SE;
        obj.SKMX_ZJ = data.YCXSF_ZJ;
        obj.SKMX_SFXMWJ = data.YCXSF_SFXMWJ;
        obj.SKMX_SKBZ = data.YCXSF_SFBZ;
        this.tableData.push(obj);
        this.getBillType();
      }
      this.getPayPerson(); //交款人、入账时间查询
      this.getResourceCode(); //资源代码查询
      this.getGroupInfoByJT(); //获取是否是新同道
    },
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
    getCientData(mulArr) {
      //多选开票
      this.diabledClick = false; //默认确定按钮可以
      this.isRef = true;
      this.index = 0;
      this.formList.SKPZ_ZJ = "";
      this.formList.FKGX_ZJ = "";
      this.formList.SKPZ_SKNY = "";
      this.formList.operationType = "收款凭证";
      if (mulArr.length > 0) {
        mulArr.forEach((item) => {
          this.formList.SKPZ_ZJ += item.SKPZ_ZJ + ",";
          this.formList.FKGX_ZJ += item.FKGX_ZJ + ",";
          // this.formList.SKPZ_SKNY += item.SKPZ_SKNY + ",";
        });
        this.formList.SKPZ_SKNY = mulArr[0].SKPZ_SKNY; //多选开票获取第一条数据的收款年月
      }
      this.formList.SKPZ_ZJ = this.formList.SKPZ_ZJ.substring(
        0,
        this.formList.SKPZ_ZJ.length - 1
      );
      this.formList.FKGX_ZJ = this.formList.FKGX_ZJ.substring(
        0,
        this.formList.FKGX_ZJ.length - 1
      );
      this.getMakeBillBelongCategory(); //获取可开发票的种类
      this.getPayPerson();
      this.getResourceCode(1);
      this.getGroupInfoByJT(); //获取是否是新同道
    },
    homegetCientData(mulArr, nsrform) {
      //首页多选开票
      this.hometype = true;
      this.nsrform = nsrform;
      this.diabledClick = false; //默认确定按钮可以
      this.isRef = true;
      this.index = 0;
      this.formList.SKPZ_ZJ = "";
      this.formList.FKGX_ZJ = "";
      this.formList.SKPZ_SKNY = "";
      this.formList.operationType = "收款凭证";
      if (mulArr.length > 0) {
        mulArr.forEach((item) => {
          this.formList.SKPZ_ZJ += item.SKPZ_ZJ + ",";
          this.formList.FKGX_ZJ += item.FKGX_ZJ + ",";
          // this.formList.SKPZ_SKNY += item.SKPZ_SKNY + ",";
        });
        this.formList.SKPZ_SKNY = mulArr[0].SKPZ_SKNY; //多选开票获取第一条数据的收款年月
      }
      this.formList.SKPZ_ZJ = this.formList.SKPZ_ZJ.substring(
        0,
        this.formList.SKPZ_ZJ.length - 1
      );
      this.formList.FKGX_ZJ = this.formList.FKGX_ZJ.substring(
        0,
        this.formList.FKGX_ZJ.length - 1
      );
      this.getMakeBillBelongCategory(); //获取可开发票的种类
      this.getPayPerson();
      this.getResourceCode(1);
      this.getGroupInfoByJT(); //获取是否是新同道
    },
    getBillType() {
      //票据分类查询
      queryBillType().then((response) => {
        this.billTypeData = response;
        if (this.billTypeData.length > 0) {
          this.formList.billType = this.billTypeData[0].Caption;
          this.billSJZJ = this.billTypeData[0].SJZJ;
          if (this.ticketType != 3) {
            //如果是一次性费用开票  不调用获取项目列表接口
            this.getByDetail(); //按明细
          } else {
            this.getBillName();
          }
        }
      });
    },
    getBillName() {
      //票据名查询
      queryBillName(this.formList).then((response) => {
        this.billNameData = response.data;
        if (this.billNameData.length > 0) {
          this.billNameData.forEach((item) => {
            item.disabledBill = false;
          });
          this.$nextTick(() => {
            this.formList.PJLY_ZJ = this.billNameData[0].PJLY_ZJ;
            this.formList.PJMX_LX = this.billNameData[0].LXNO;
            this.formList.LXNO = this.billNameData[0].LXNO;
            this.formList.PJLY_PJMC = this.billNameData[0].PJLY_PJMC;
          });
        }

        if (this.billNameData.length > 0) {
          if (
            this.formList.LXNO == 101 &&
            this.isCheckTax &&
            this.sess_kk_ktzzfp == 1
          ) {
            this.getSPInfo();
          } else {
            this.$nextTick(() => {
              this.getBillNumber(); //查询票据号
            });
          }
        } else {
          this.formList.PJLY_ZJ = "";
          this.billNumberData = [];
          this.formList.PJLYMX_PJH = "";
          this.formList.PJLYMX_ZJ = "";
        }
        if (this.formList.is_el_invoice_new == 1) {
          //如果开启了新通道并且是动态电子发票  则票据号可不必输
          this.rules.PJLYMX_PJH[0].required = false;
          this.disablePJH = true;
        } else {
          this.rules.PJLYMX_PJH[0].required = true;
          this.disablePJH = false;
        }
      });
    },
    getBillNumber() {
      //票据号
      queryBillNumber(this.formList).then((response) => {
        //this.billNumberNewData = response;//此数组用于票据号过滤  默认显示50条数据  不然渲染过多数据页面会卡
        //this.billNumberData = response.slice(0, 50);
        this.billNumberData = response.data;
        if (this.billNumberData.length > 0) {
          if (this.formList.LXNO == 101 && this.isCheckTax) {
            //判断如果是纸质发票并且税票校验椒选中
            this.billNumberData.forEach((item) => {
              if (item.PJLYMX_PJH == this.infonumber) {
                //如果票据号与税盘号有一致 选中
                this.formList.PJLYMX_PJH = item.PJLYMX_PJH;
                this.formList.PJLYMX_ZJ = item.PJLYMX_ZJ;
              } else {
                //否则默认选中第一个
                this.$nextTick(() => {
                  this.formList.PJLYMX_PJH = this.billNumberData[0].PJLYMX_PJH;
                  this.formList.PJLYMX_ZJ = this.billNumberData[0].PJLYMX_ZJ;
                });
              }
            });
          } else {
            this.$nextTick(() => {
              this.formList.PJLYMX_PJH = this.billNumberData[0].PJLYMX_PJH;
              this.formList.PJLYMX_ZJ = this.billNumberData[0].PJLYMX_ZJ;
            });
          }
        } else {
          this.formList.PJLYMX_PJH = "";
          this.formList.PJLYMX_ZJ = "";
        }
      });
    },
    getPayPerson() {
      //交款人、入账时间查询
      queryClassificationOfAddValueTaxInvoice(this.formList).then(
        (response) => {
          if (response.data[0].KHDA_ZZSFPFL) {
            this.formList.ZZLFPFL = response.data[0].KHDA_ZZSFPFL;
          } else {
            this.formList.ZZLFPFL = "增值税普通发票";
          }
          this.$nextTick(() => {
            this.getTaxInfo();
          });
        }
      );
    },
    getResourceCode(val) {
      //资源代码查询
      this.formList.FJID = "";
      this.formList.LDMC = "";
      this.formList.FJMC = "";
      queryResourceCode(this.formList).then((response) => {
        if (response.data.length > 0) {
          if (val == 1) {
            //开票多开  (房间id  大楼名称  房间名称用逗号隔开)
            // response.forEach((item) => {
            //   this.formList.FJID += item.FJID + ",";
            //   this.formList.LDMC += item.LDMC + ",";
            //   this.formList.FJMC += item.FJMC + ",";
            // }),
            // this.formList.FJID = this.formList.FJID.substring(0, this.formList.FJID.length - 1);
            // this.formList.LDMC = this.formList.LDMC.substring(0, this.formList.LDMC.length - 1);
            // this.formList.FJMC = this.formList.FJMC.substring(0, this.formList.FJMC.length - 1);
            this.formList.FJID = response.data[0].FJID;
            this.formList.LDMC = response.data[1].DLMC;
            this.formList.FJMC = response.data[1].FJMC;
          } else {
            // this.formList.FJID = response[0].FJID;
            // this.formList.LDMC = response[0].DLMC;
            // this.formList.FJMC = response[0].FJMC;
            this.formList.FJID = response.data[0].FJID;
            this.formList.LDMC = response.data[1].DLMC;
            this.formList.FJMC = response.data[1].FJMC;
          }
        }
      });
    },
    getTaxInfo() {
      //纳税人信息
      var FKGX_ZJ = this.formList.FKGX_ZJ;
      if (FKGX_ZJ.indexOf(",") > -1) {
        FKGX_ZJ = FKGX_ZJ.split(",")[0];
      }
      // var _this = this;
      queryTaxpayerInformation({ FKGX_ZJ: FKGX_ZJ }).then((response) => {
        if (response.data.taxpayerInformation[0].KHDA_NSRMC) {
          //如果纳税人名称不为空则获取纳税人名称  否则获取交款人
          this.formList.KHDA_NSRMC = response.data.taxpayerInformation[0]
            .KHDA_NSRMC
            ? response.data.taxpayerInformation[0].KHDA_NSRMC
            : "";
        } else {
          this.formList.KHDA_NSRMC = this.formList.JKR;
        }
        this.formList.KHDA_KHMC = response.data.taxpayerInformation[0].KHDA_KHMC
          ? response.data.taxpayerInformation[0].KHDA_KHMC
          : "";
        this.formList.KHDA_NSRSBH = response.data.taxpayerInformation[0]
          .KHDA_NSRSBH
          ? response.data.taxpayerInformation[0].KHDA_NSRSBH
          : "";
        this.formList.KHDA_NSRDZDH = response.data.taxpayerInformation[0]
          .KHDA_NSRDZDH
          ? response.data.taxpayerInformation[0].KHDA_NSRDZDH
          : "";
        this.formList.KHDA_KHHJZH = response.data.taxpayerInformation[0]
          .KHDA_KHHJZH
          ? response.data.taxpayerInformation[0].KHDA_KHHJZH
          : "";

        this.infoselleraddressphone =
          response.data.configuration.kk_dz +
          " " +
          response.data.configuration.kk_dh; //销售方地址，电话
        this.infosellerbankaccount =
          response.data.configuration.kk_khhdz +
          " " +
          response.data.configuration.kk_yhzh; //销售方开户行及账号
      });
    },
    getMakeBillBelongCategory() {
      //收款凭证开票所属种类 11不可开票，12开电子发票，21开电子发票或纸质发票，22开纸质发票
      getMakeBillBelongCategory(this.formList.SKPZ_ZJ).then((response) => {
        this.billCateory = response.category;
        this.$nextTick(() => {
          this.getBillType();
        });
      });
    },
    TotalSelectType() {
      //合计方式下拉 0按明细，1按项目合计，2按项目强制合计，3按年月合计
      this.getByDetail(1);
    },
    getByDetail(val) {
      //收费项目查询（按明细）
      queryPrepayDetailByItemsDetail({
        YJPZ_ZJ: this.formList.YJPZ_ZJ,
      }).then((response) => {
        this.tableData = response.data;
        if (val != 1) {
          //如果是下拉改变票据分类 则不玩下执行
          if (this.tableData.length <= 0) {
            this.index++;
            if (this.billTypeData[this.index]) {
              this.formList.billType = this.billTypeData[this.index].Caption;
              this.billSJZJ = this.billTypeData[this.index].SJZJ;
              this.$nextTick(() => {
                this.getByDetail(); //查询
              });
            }
          }
        }
        if (this.tableData.length > 0) {
          //如果没有查询到收费项目  不调用获取票据名称接口
          this.getBillName();
        }
      });
    },
    isBillDone() {
      //是否有未开完的票据
      if (this.ticketType != 3) {
        //如果是一次性开票就不需要调用
        queryPrepayDetailByItemsDetail({
          YJPZ_ZJ: this.formList.YJPZ_ZJ,
        }).then((response) => {
          if (response.length > 0) {
            this.diabledClick = false;
            this.index = 0;
            this.getBillType();
          } else {
            let newobj = JSON.parse(JSON.stringify(this.formList));
            this.$emit("PopCancelEmit", newobj);
            this.cancelForm();
          }
        });
      } else {
        let newobj = JSON.parse(JSON.stringify(this.formList));
        this.$emit("PopCancelEmit", newobj);
        this.cancelForm();
      }
    },
    getSPInfo() {
      var _this = this;
      // eslint-disable-next-line no-undef
      $.ajax({
        type: "post",
        url: "http://localhost:8091/api/getinfo",
        data: {
          infokind: this.formList.ZZLFPFL == "增值税专用发票" ? 0 : 2,
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
    captionChange(val) {
      //票据分类改变事件
      /** 清空票据名称及票据号 start*/
      this.formList.PJLY_ZJ = null;
      this.formList.PJLY_PJMC = null;
      this.billNameData = [];
      this.formList.PJLYMX_PJH = null;
      this.billNumberData = [];
      /** 清空票据名称及票据号 end*/
      this.billTypeData.forEach((item) => {
        if (item.Caption == val) {
          this.billSJZJ = item.SJZJ;
        }
      });
      this.getBillName();
      //票据类型下拉
      this.formList.billType = val;
    },
    pjmcChange(val) {
      /**清空票据号 */
      this.formList.PJLYMX_PJH = null;
      this.billNumberData = [];

      //票据名称选择
      this.formList.PJLY_ZJ = val;
      this.billNameData.forEach((item) => {
        if (item.PJLY_ZJ == val) {
          this.formList.LXNO = item.LXNO;
          this.formList.PJMX_LX = item.LXNO;
          this.formList.PJLY_PJMC = item.PJLY_PJMC;
        }
      });
      if (this.formList.is_el_invoice_new == 1) {
        //如果开启了新通道并且是动态电子发票则票据号可不必输
        this.rules.PJLYMX_PJH[0].required = false;
        this.disablePJH = true;
      } else {
        this.rules.PJLYMX_PJH[0].required = true;
        this.disablePJH = false;
      }

      if (
        this.formList.LXNO == 101 &&
        this.isCheckTax &&
        this.sess_kk_ktzzfp == 1
      ) {
        this.getSPInfo();
      } else {
        this.getBillNumber(); //查询票据号
      }
    },
    pjhChange(val) {
      var _this = this;
      //票据号下拉
      // this.billNumberData = this.billNumberNewData;用于过滤后数组不会显示全部数据 需要重新赋值
      this.billNumberData.forEach(function (item) {
        if (item.PJLYMX_PJH == val) {
          _this.formList.PJLYMX_ZJ = item.PJLYMX_ZJ;
        }
      });
    },
    filterMethod(query) {
      //搜索默认显示50条数据 不然渲染过多数据页面会卡
      if (query == "") {
        this.billNumberData = this.billNumberNewData.slice(0, 50);
      } else {
        let result = []; //存储符合条件的下拉选项
        this.billNumberNewData.forEach((val) => {
          if (val.PJLYMX_PJH.indexOf(query) != -1) result.push(val);
        });
        this.billNumberData = result.slice(0, 50); //只取前10个
      }
    },
    rowClick(row) {
      //单行选中
      this.$refs.multipleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    changeFun(val) {
      this.multipleSelection = val;
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
      if (type === 1) {
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
        // eslint-disable-next-line no-redeclare
        var currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (
          columnIndex !== 4 &&
          columnIndex !== 6 &&
          columnIndex !== 7
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
    queryInvoiceRequest() {
      //查询电子发票
      // var that = this;
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
          this.diabledClick = false; //默认确定按钮可以
          that.isBillDone(); //查询是否还有未开具的数据
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
            }, 10000);
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
          }
          this.multipleSelection.forEach(function (item) {
            if (item.YJMX_ZY == undefined || item.YJMX_ZY == "") {
              isJump++;
            }
          });
          if (isJump > 0) {
            this.$message({
              message: "请输入摘要",
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
          this.diabledClick = true;
          this.getMakeBill();
        }
      });
    },
    getMakeBill() {
      var _this = this;
      this.formList.operationType = "预交凭证";

      /**清空开票信息 start*/
      this.formList.HJFS = 0;
      this.formList.YJMX_ZJ = "";
      this.formList.YJMX_YJFAWJ = "";
      this.formList.YJMX_FAMC = "";
      this.formList.YJMX_ZY = "";
      this.formList.YJMX_SKFS = "";
      this.formList.YJMX_SFBZ = "";
      this.formList.YJMX_YJJE = "";
      this.formList.YJMX_ZSJE = "";
      this.formList.YJMX_SL = "";
      this.formList.YJMX_SE = "";

      this.formList.YJMX_SE = "";
      this.formList.YJMX_BHSJE = "";
      /**清空开票信息 end*/
      this.multipleSelection.forEach(function (item) {
        _this.formList.YJMX_ZJ += item.YJMX_ZJ + "`";
        _this.formList.YJMX_YJFAWJ += item.YJMX_YJFAWJ + "`";
        _this.formList.YJMX_FAMC += item.YJFA_FAMC + "`";
        _this.formList.YJMX_ZY += item.YJMX_ZY + "`";
        _this.formList.YJMX_SKFS += item.SFKM_SKFS + "`";
        _this.formList.YJMX_SFBZ += item.YJMX_SFBZ + "`";
        _this.formList.YJMX_YJJE += item.YJMX_YJJE + "`";
        _this.formList.YJMX_ZSJE += item.YJMX_ZSJE + "`";
        _this.formList.YJMX_SL += item.YJMX_SL + "`";
        _this.formList.YJMX_SE += item.YJMX_SE + "`";
        _this.formList.YJMX_BHSJE += item.YJMX_BHSJE + "`";
      });
      //this.formList.SKMX_SKFS = this.formList.SKMX_SKFS.substring(0, 3);
      ensureMakeBill(this.formList).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          if (
            this.formList.is_el_invoice_new == 1 &&
            this.formList.PJLY_PJMC == "动态电子发票"
          ) {
            //如果是新通道并且是动态电子发票  PJLYMX_ZJ则在开票成功后返回
            this.formList.PJLYMX_ZJ = response.data.PJLYMX_ZJ;
          }
          if (this.isBillchecked) {
            //如果选中了是否打印 跳转到打印页面
            if (this.formList.LXNO == 101) {
              //如果是纸质发票勾选了税盘号  则调用开具发票
              if (this.sess_kk_ktzzfp == 1) {
                this.OpenCard_kp();
              } else {
                this.isBillDone(); //查询是否还有未开具的数据
              }
            } else {
              if (this.formList.LXNO == 201) {
                //如果是纸质收据   先获取billPrintType
                this.getBillTypeRequest();
              } else {
                this.BillPrint();
              }
            }
          } else {
            this.isBillDone(); //查询是否还有未开具的数据
          }
        } else {
          this.diabledClick = false;
        }
      });
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
        this.isBillDone(); //查询是否还有未开具的数据
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
        this.isBillDone(); //查询是否还有未开具的数据
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
        this.isBillDone(); //查询是否还有未开具的数据
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
      // var order = {
      //   infokind: this.formList.ZZLFPFL == "增值税专用发票" ? 0 : 2, //专票0，普票2
      //   infoclientname: this.formList.KHDA_KHMC, //纳税人名称--必填
      //   infoclienttaxcode: this.formList.KHDA_NSRSBH, //纳税人识别号--专票必填
      //   infoclientaddressphone: this.formList.KHDA_NSRDZDH, //纳税人地址电话--专票必填
      //   infoclientbankaccount: this.formList.KHDA_KHHJZH, //纳税人开户行及账号--专票必填
      //   infoselleraddressphone: this.infoselleraddressphone, //销售方地址，电话
      //   infosellerbankaccount: this.infosellerbankaccount, //销售方开户行及账号
      //   infonotes:
      //     this.formList.PJMX_KPBZ == undefined
      //       ? ""
      //       : this.formList.FJMC + this.formList.PJMX_KPBZ, //备注
      //   infoinvoicer: this.userName, //开票人
      //   infochecker: "", //复核人
      //   infocashier: this.userName, //收款人
      //   infolistname: "", //清单字样--可不输
      //   infobillnumber: "", //销售单据编号--可不输
      //   detail: detail,
      // };
      // var option = {
      //   checkform: 0, //是否弹窗校验0代表不弹窗，1弹窗
      // };
      // //开具发票调用接口
      // var _this = this;
      // $.post(
      //   "http://localhost:8091/api/invoice",
      //   { order: order, option: option },
      //   function (json) {
      //     if (json.code == "4011") {
      //       _this.$set(_this.formList, "PJLYMX_FPDM", json.info.infotypecode);
      //       _this.$set(
      //         _this.formList,
      //         "PJLYMX_FPHM",
      //         _this.PrefixInteger(json.info.infonumber, 8)
      //       );
      //       _this.kpdisabled = true;
      //       _this.$message({ message: "开具成功", type: "success" });
      //     } else {
      //       _this.kpdisabled = false;
      //       _this.$message({ message: JSON.stringify(json), type: "warning" });
      //     }
      //     _this.setData(
      //       json.code,
      //       _this.Jspinfo.infotypecode,
      //       _this.PrefixInteger(_this.Jspinfo.infonumber, 8)
      //     ); //打印回写传入数据到服务器
      //   },
      //   "json"
      // );
    },
    //打印回写传入数据到服务器
    setData(RetCode, infotypecode, infonumber) {
      successWriteBackDataApi(
        this.formList.PJLYMX_ZJ,
        getToken(),
        RetCode,
        this.formList.ZZLFPFL,
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
      this.$emit("update:showTicket", false);
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
  .el-cascader {
    width: 100% !important;
  }
  .taxWrap {
    width: 1000px;
    line-height: 25px;
    .taxCommon {
      width: 40%;
      display: inline-block;
      text-align: left;
      height: 20px;
      .taxCommon_v {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 70%;
        display: inline-block;
        vertical-align: text-top;
        line-height: 20px;
      }
    }
  }
  .Receticket_wrap {
    .el-table-ticket {
      .el-input {
        height: 23px;
        .el-input__inner {
          height: 23px !important;
          line-height: 23px !important;
        }
      }
    }
  }
}
// @media screen and (min-width: 1366px) {
//   .Receticket_wrap {
//     .el-table {
//       height: 500px;
//       .el-table__body-wrapper {
//         height: 428px;
//         overflow: auto !important;
//       }
//     }
//   }
// }

// @media screen and (max-width: 1366px) {
//   .Receticket_wrap {
//     .el-table {
//       height: 310px;
//       .el-table__body-wrapper {
//         height: 239px;
//         overflow: auto !important;
//       }
//     }
//   }
// }
</style>
