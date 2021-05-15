<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="交款"
      class="el-dialog-double PaymentDialog"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="125px"
        :model="PaymentForm"
        :rules="rules"
        ref="PaymentForm"
      >
        <!-- <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="票据分类：" prop="YCXSF_PJLX">
              <el-select v-model="PaymentForm.YCXSF_PJLX" @change="captionChange">
                <el-option v-for="item in billTypeData" :key="item.Caption" :value="item.Caption" :label="item.Caption">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="票据名称：" prop="PJLY_ZJ">
              <el-select v-model="PaymentForm.PJLY_ZJ" @change="pjmcChange">
                <el-option v-for="item in billNameData" :key="item.PJLY_ZJ" :value="item.PJLY_ZJ"
                  :label="item.PJLY_PJMC"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="50">
          <!-- <el-col :span="12">
            <el-form-item label="票据号：" prop="YCXSF_PZH">
              <el-select v-model="PaymentForm.YCXSF_PZH" @change="pjhChange" :disabled="disablePJH" clearable>
                <el-option v-for="item in billNumberData" :key="item.PJLYMX_ZJ" :value="item.PJLYMX_PJH"
                  :label="item.PJLYMX_PJH"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="合同编码: " prop="contractId">
              <el-select
                v-model="PaymentForm.YCXSF_HTWJ"
                @change="contractChag"
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
          <el-col :span="12">
            <el-form-item label="房间名称: " prop="YCXSF_FJDAWJ">
              <el-select
                v-model="PaymentForm.YCXSF_FJDAWJ"
                @change="fjChange"
                filterable
                clearable
              >
                <el-option
                  v-for="item in resourceData"
                  :key="item.FJDA_ZJ"
                  :value="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目：" prop="YCXSF_SFXMWJ">
              <el-select
                v-model="PaymentForm.YCXSF_SFXMWJ"
                clearable
                @change="projectChange"
              >
                <el-option
                  v-for="item in FeedProjectData"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收费标准：" prop="YCXSF_BZWJ">
              <el-select
                v-model="PaymentForm.YCXSF_BZWJ"
                clearable
                @change="standChange"
                :disabled="disabledOption"
              >
                <el-option
                  v-for="item in FeedStandData"
                  :key="item.CGBZ_ZJ"
                  :label="item.CGBZ_BZMC"
                  :value="item.CGBZ_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计算面积：">
              <el-input
                type="number"
                v-model="PaymentForm.YCXSF_JSMJ"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计算单价：">
              <el-input
                type="number"
                v-model="PaymentForm.YCXSF_JSDJ"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计算倍数：" prop="YCXSF_ZDYCS">
              <el-input
                v-model="PaymentForm.YCXSF_ZDYCS"
                :disabled="disabledZDYCS"
                v-on:change="inputMouseblur(PaymentForm.YCXSF_ZDYCS)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交款金额(含税)：">
              <el-input
                v-model="PaymentForm.YCXSF_SFJE"
                :disabled="disabledSFJE"
                v-on:change="inputMouseblurSFJX(PaymentForm)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label-width="0">
              <span>(交款金额 = 计算面积 * 计算单价 * 计算倍数)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="税率：">
              <el-input v-model="PaymentForm.YCXSF_SL" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额(不含税)：">
              <el-input
                type="number"
                v-model="PaymentForm.YCXSF_BHSJE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="税额：">
              <el-input
                type="number"
                v-model="PaymentForm.YCXSF_SE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款方式：" prop="YCXSF_SKFS">
              <el-select v-model="PaymentForm.YCXSF_SKFS" clearable>
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
            <el-form-item label="交款日期：" prop="YCXSF_SFRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="PaymentForm.YCXSF_SFRQ"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款人：" prop="YCXSF_JKR">
              <el-input v-model="PaymentForm.YCXSF_JKR" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="入账时间：" prop="YCXSF_RZSJ">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="PaymentForm.YCXSF_RZSJ"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间发票号：" prop="SJFPH">
              <el-input v-model="PaymentForm.SJFPH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款备注：" prop="YCXSF_BZ">
              <el-input
                type="textarea"
                v-model="PaymentForm.YCXSF_BZ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="3">
            <el-checkbox v-model="isPayment" disabled>确认收款</el-checkbox>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { queryBillType, queryBillName, queryBillNumber } from "@/api/Realtor/CredentialsList"; //房屋租凭凭证列表api
import {
  queryZLRoomApi,
  queryClientsApi,
  queryAllChargeItemApi,
  queryOneTimeFeeStandard,
  queryDepositPaymentProjectApi,
  payDepositApi,
  queryDefaultPayWay,
  querytPayWay,
} from "@/api/Realtor/SecurityDeposit"; //押金保证金js
import { currDate, currDateTime, PrefixInteger } from "@/utils/global.js";
import { getToken } from "@/utils/Auth"; // 验权
import { number, onlynumber } from "@/utils/validate.js";
import { mapGetters } from "vuex";
import { roundings } from "@/utils/global.js";
export default {
  data() {
    var validateHaveTo = (rule, value, callback) => {
      if (this.ishaveTo) {
        if (
          this.PaymentForm.YCXSF_BZWJ == undefined ||
          this.PaymentForm.YCXSF_BZWJ == ""
        ) {
          callback(new Error("收费标准不能为空"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      visible: this.showPayment,
      expitemArray: [], //收费项目
      receiptWayData: [], //交款方式
      billTypeData: [], //票据分类
      billNameData: [], //票据名
      billNumberData: [], //票据号
      PayWayData: [], //收款方式数据
      FeedProjectData: [], //收费项目数据
      FeedStandData: [], //收费标准数据
      billSJZJ: "发票",
      PaymentForm: {},
      isBillchecked: true, //是否打印默认选中
      isPayment: true, //确认收款默认选中
      ishaveTo: false, //默认收费标准不必输
      disabledOption: false, //默认收费标准下拉可以选择
      disabledSFJE: true, //默认交款金额含税不可输入
      disabledZDYCS: true,
      infonumber: "", //税盘票号
      sess_kk_ktzzfp: 1, //1调用金税盘接口
      isCheckTax: true, //默认校验税盘号
      resourceData: [], //资源名称数据
      clientData: [], //客户名称数据,
      proChargeData: [], //合同编码数据
      disablePJH: false, //默认发票号可以选择
      rules: {
        YCXSF_PJLX: [
          { required: true, message: "请选择票据分类", trigger: "blur" },
        ],
        YCXSF_ZDYCS: [
          { required: true, message: "请输入计算倍数", trigger: "blur" },
        ],
        YCXSF_SFXMWJ: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        PJLY_ZJ: [
          { required: true, message: "请选择票据名称", trigger: "blur" },
        ],
        YCXSF_FJDAWJ: [
          { required: true, message: "请选择房间", trigger: "blur" },
        ],
        YCXSF_SFXMMC: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        YCXSF_BZWJ: [{ validator: validateHaveTo, trigger: "blur" }],
        YCXSF_SKFS: [
          { required: true, message: "请选择交款方式", trigger: "blur" },
        ],
        YCXSF_SFRQ: [
          { required: true, message: "请选择交款日期", trigger: "blur" },
        ],
        YCXSF_RZSJ: [
          { required: true, message: "请选择入账时间", trigger: "blur" },
        ],
        YCXSF_KHDAWJ: [
          { required: true, message: "请选择交款人", trigger: "blur" },
        ],
        YCXSF_ZDYCS: [{ validator: onlynumber, trigger: "blur" }],
      },
    };
  },
  props: {
    showPayment: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  watch: {
    showPayment() {
      this.visible = this.showPayment;
      if (this.visible) {
        this.queryContractRequest(); //合同编号查询
        //this.getBillType(); //票据类型
        this.getPayWay(); //交款
        this.getFeedProject(); //收费项目
        this.getDefaultWay(); //默认收款方式
      }
    },
  },
  methods: {
    getData(data) {
      this.PaymentForm.YCXSF_JFJSR = this.userName; //交费经手人
      this.PaymentForm.YCXSF_SFJE = ""; //收费金额清空
      this.PaymentForm.YCXSF_HTWJ = ""; //合同外键清空
      this.PaymentForm.YCXSF_SFRQ = currDate(true);
      this.PaymentForm.YCXSF_RZSJ = currDateTime();
      this.PaymentForm.dbName = data.dbName;
      this.PaymentForm.GLCID = data.GLCID;
      this.PaymentForm.YXDID = data.YXDID;
    },
    getBillType() {
      //票据分类查询
      queryBillType(this.PaymentForm).then((response) => {
        this.billTypeData = response;
        if (this.billTypeData.length > 0) {
          this.PaymentForm.YCXSF_PJLX = this.billTypeData[0].Caption; //默认选中第一个票据类型
          this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
          this.$nextTick(() => {
            this.getBillName();
          });
        }
      });
    },
    getBillName() {
      //票据名查询
      queryBillName(this.PaymentForm).then((response) => {
        this.billNameData = response.data;
        if (this.billNameData.length > 0) {
          this.PaymentForm.PJLY_ZJ = this.billNameData[0].PJLY_ZJ;
          this.PaymentForm.LXNO = this.billNameData[0].LXNO;
          this.$nextTick(() => {
            this.getBillNumber(); //查询票据号
          });
        } else {
          //如果票据名称为空  则清空票据号
          this.PaymentForm.PJLY_ZJ = "";
          this.billNumberData = [];
          this.PaymentForm.YCXSF_PZH = "";
          this.PaymentForm.PJLYMX_ZJ = "";
        }
        if (this.PaymentForm.LXNO == 102) {
          this.disablePJH = true;
        } else {
          this.disablePJH = false;
        }
      });
    },
    getBillNumber() {
      //票据号
      queryBillNumber(this.PaymentForm).then((response) => {
        this.billNumberData = response;
        if (this.billNumberData.length > 0) {
          this.PaymentForm.YCXSF_PZH = this.billNumberData[0].PJLYMX_PJH;
          this.PaymentForm.PJLYMX_ZJ = this.billNumberData[0].PJLYMX_ZJ;
        } else {
          this.PaymentForm.YCXSF_PZH = "";
          this.PaymentForm.PJLYMX_ZJ = "";
          this.isBillchecked = false;
        }
      });
    },
    queryContractRequest() {
      //合同编码查询
      queryAllChargeItemApi(this.PaymentForm).then((response) => {
        this.proChargeData = response;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.PaymentForm).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.PaymentForm).then((response) => {
        this.clientData = response;
      });
    },
    getDefaultWay() {
      var that = this;
      //获取默认收款方式
      queryDefaultPayWay(this.PaymentForm).then((response) => {
        this.PaymentForm.YCXSF_SKFS = response.SFCS_ZFX;
      });
    },
    getPayWay() {
      //交款方式
      querytPayWay(this.PaymentForm).then((response) => {
        this.PayWayData = response;
      });
    },
    getFeedProject() {
      //收费项目下拉框
      queryDepositPaymentProjectApi(this.PaymentForm).then((response) => {
        this.FeedProjectData = response;
      });
    },
    getFeedStandard() {
      //收费标准下拉框
      queryOneTimeFeeStandard(this.PaymentForm).then((response) => {
        this.FeedStandData = response;
      });
    },
    captionChange(val) {
      /** 清空票据名称及票据号 start*/
      this.PaymentForm.PJLY_PJMC = null;
      this.billNameData = [];
      this.PaymentForm.PJLYMX_PJH = null;
      this.billNumberData = [];
      /** 清空票据名称及票据号 end*/
      this.billTypeData.forEach((item) => {
        if (item.Caption == val) {
          this.billSJZJ = item.SJZJ;
        }
      });
      //票据类型下拉
      this.PaymentForm.YCXSF_PJLX = val;
      this.getBillName(val);
    },
    pjmcChange(val) {
      /**清空票据号 */
      this.PaymentForm.YCXSF_PZH = null;
      this.billNumberData = [];

      //票据名称选择
      this.PaymentForm.PJLY_ZJ = val;
      this.billNameData.forEach((item) => {
        if (item.PJLY_ZJ == val) {
          this.PaymentForm.LXNO = item.LXNO;
        }
      });
      if (this.PaymentForm.LXNO == 102) {
        //电子发票不可选择发票号
        this.disablePJH = true;
      } else {
        this.disablePJH = false;
      }
      this.getBillNumber(); //查询票据号
    },
    pjhChange(val) {
      //票据号下拉
      var _this = this;
      if (val) {
        this.PaymentForm.YCXSF_PZH = val;
        this.billNumberData.forEach(function (item) {
          if (item.PJLYMX_PJH == val) {
            _this.PaymentForm.PJLYMX_ZJ = item.PJLYMX_ZJ;
          }
        });
      } else {
        this.PaymentForm.YCXSF_PZH = "";
        this.PaymentForm.PJLYMX_ZJ = "";
        this.isBillchecked = false;
      }
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
    },
    projectChange(val) {
      //收费项目改变
      this.PaymentForm.CGBZ_SFXMWJ = val;
      this.FeedProjectData.forEach((item) => {
        if (item.SFXM_ZJ == val) {
          this.PaymentForm.SFXM_QZFS = item.SFXM_QZFS;
          this.PaymentForm.SFXM_JQWS = item.SFXM_JQWS;
          this.PaymentForm.YCXSF_SL = item.SFXM_SL;
          this.PaymentForm.YCXSF_SFXMMC = item.SFXM_SFXMMC;
          if (item.SFXM_SFBXBZ) {
            //为true  收费标准必须选  交款金额含税不可输入
            this.ishaveTo = true;
            this.disabledSFJE = true;
            this.disabledOption = false;
          } else {
            //为false  收费标准不能选  交款金额含税可以输入
            this.ishaveTo = false;
            this.disabledOption = true;
            this.disabledSFJE = false;
            this.disabledZDYCS = true;
          }
        }
      });
      this.PaymentForm.YCXSF_BZWJ = null;
      this.getFeedStandard();
    },
    standChange(val) {
      //收费标准改变
      this.disabledZDYCS = false;
      this.PaymentForm.YCXSF_BZWJ = val;
      if (val != "") {
        this.FeedStandData.forEach((item) => {
          if (item.CGBZ_ZJ == val) {
            if (item.CGBZ_DJFS == "设定计算公式") {
              this.PaymentForm.YCXSF_JSDJ = item.CGBZ_JSDJ;
            } else {
              this.PaymentForm.YCXSF_JSMJ = item.CGBZ_SDJE; //收费面积
              this.PaymentForm.YCXSF_JSDJ = 1;
            }
            this.PaymentForm.YCXSF_ZDYCS = item.CGBZ_JSBS; //自定义参数默认为1
            if (this.PaymentForm.YCXSF_ZDYCS == "") {
              this.PaymentForm.YCXSF_ZDYCS = 0;
            }
            this.PaymentForm.YCXSF_SFJE = roundings(
              this.PaymentForm.YCXSF_JSMJ *
                this.PaymentForm.YCXSF_JSDJ *
                this.PaymentForm.YCXSF_ZDYCS,
              this.PaymentForm.SFXM_QZFS,
              this.PaymentForm.SFXM_JQWS
            );

            //费用金额 不含税
            this.PaymentForm.YCXSF_BHSJE = roundings(
              this.PaymentForm.YCXSF_SFJE -
                (this.PaymentForm.YCXSF_SFJE -
                  this.PaymentForm.YCXSF_SFJE /
                    (1 + this.PaymentForm.YCXSF_SL / 100)),
              this.PaymentForm.SFXM_QZFS,
              this.PaymentForm.SFXM_JQWS
            );

            //税额
            this.PaymentForm.YCXSF_SE = roundings(
              this.PaymentForm.YCXSF_SFJE -
                this.PaymentForm.YCXSF_SFJE /
                  (1 + this.PaymentForm.YCXSF_SL / 100),
              this.PaymentForm.SFXM_QZFS,
              this.PaymentForm.SFXM_JQWS
            );
          }
        });
      } else {
        this.PaymentForm.YCXSF_ZDYCS = "";
      }
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
    },
    contractChag(val) {
      //合同编码选择事件
      this.PaymentForm.YCXSF_FJDAWJ = "";
      if (val) {
        var obj = this.proChargeData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.contract_id === val; //筛选出匹配数据
        });
        this.PaymentForm.YCXSF_KHDAWJ = obj.KHDA_ZJ;
        this.PaymentForm.YCXSF_JKR = obj.KHDA_KHMC;
        let newRowData = JSON.parse(JSON.stringify(this.PaymentForm)); //拷贝一份存储对象
        this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
        this.queryResoureceRequest();
      } else {
        this.PaymentForm.YCXSF_KHDAWJ = "";
        this.PaymentForm.YCXSF_JKR = "";
        this.resourceData = [];
      }
    },
    fjChange(val) {
      //资源名称改变事件
      if (val) {
        var obj = this.resourceData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.FJDA_ZJ === val; //筛选出匹配数据
        });
        this.PaymentForm.YCXSF_JSMJ = obj.FJDA_SFMJ;
        /**计算 */
        if (this.FeedStandData.length > 0) {
          this.FeedStandData.forEach((item) => {
            if (item.CGBZ_ZJ == this.PaymentForm.YCXSF_BZWJ) {
              if (item.CGBZ_DJFS == "设定计算公式") {
                this.PaymentForm.YCXSF_JSDJ = item.CGBZ_JSDJ;
              } else {
                this.PaymentForm.YCXSF_JSMJ = item.CGBZ_SDJE; //收费面积
                this.PaymentForm.YCXSF_JSDJ = 1;
              }
              this.PaymentForm.YCXSF_ZDYCS = item.CGBZ_JSBS; //自定义参数默认为1
              if (this.PaymentForm.YCXSF_ZDYCS == "") {
                this.PaymentForm.YCXSF_ZDYCS = 0;
              }
              this.PaymentForm.YCXSF_SFJE = roundings(
                this.PaymentForm.YCXSF_JSMJ *
                  this.PaymentForm.YCXSF_JSDJ *
                  this.PaymentForm.YCXSF_ZDYCS,
                this.PaymentForm.SFXM_QZFS,
                this.PaymentForm.SFXM_JQWS
              );

              //费用金额 不含税
              this.PaymentForm.YCXSF_BHSJE = roundings(
                this.PaymentForm.YCXSF_SFJE -
                  (this.PaymentForm.YCXSF_SFJE -
                    this.PaymentForm.YCXSF_SFJE /
                      (1 + this.PaymentForm.YCXSF_SL / 100)),
                this.PaymentForm.SFXM_QZFS,
                this.PaymentForm.SFXM_JQWS
              );

              //税额
              this.PaymentForm.YCXSF_SE = roundings(
                this.PaymentForm.YCXSF_SFJE -
                  this.PaymentForm.YCXSF_SFJE /
                    (1 + this.PaymentForm.YCXSF_SL / 100),
                this.PaymentForm.SFXM_QZFS,
                this.PaymentForm.SFXM_JQWS
              );
            }
          });
        } else {
          this.PaymentForm.YCXSF_ZDYCS = "";
        }
        this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
        this.queryClientRequest(); //客户名称查询
      }
    },
    inputMouseblur(val) {
      //鼠标离开事件

      //费用金额 含税
      this.PaymentForm.YCXSF_SFJE = roundings(
        this.PaymentForm.YCXSF_JSMJ *
          this.PaymentForm.YCXSF_JSDJ *
          this.PaymentForm.YCXSF_ZDYCS,
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS
      );
      //费用金额 不含税
      this.PaymentForm.YCXSF_BHSJE = roundings(
        this.PaymentForm.YCXSF_SFJE -
          (this.PaymentForm.YCXSF_SFJE -
            this.PaymentForm.YCXSF_SFJE /
              (1 + this.PaymentForm.YCXSF_SL / 100)),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS
      );

      //税额
      this.PaymentForm.YCXSF_SE = roundings(
        this.PaymentForm.YCXSF_SFJE -
          this.PaymentForm.YCXSF_SFJE / (1 + this.PaymentForm.YCXSF_SL / 100),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS
      );
    },
    inputMouseblurSFJX(val) {
      //鼠标离开事件
      var reg = /^(-?\d+)(\.\d{1,2})?$/; //小数点保留两位小数
      if (!Number(val.YCXSF_SFJE) && !val.FYSQ_FYJE == 0) {
        this.$message({
          message: "" + val.YCXSF_SFJE + "不是有效的数字类型",
          type: "warning",
        });
        val.YCXSF_SFJE = 0;
        return false;
      }
      if (Number(val.YCXSF_SFJE) < 0) {
        this.$message({
          message: "" + val.YCXSF_SFJE + "不能小于0",
          type: "warning",
        });
        val.YCXSF_SFJE = 0;
        return false;
      }
      if (!reg.test(val.YCXSF_SFJE)) {
        this.$message({
          message: "自定义参数最多只能保留两位小数",
          type: "warning",
        });
        val.YCXSF_SFJE = 0;
        return false;
      }
      //费用金额 不含税
      this.PaymentForm.YCXSF_BHSJE = roundings(
        val.YCXSF_SFJE -
          (val.YCXSF_SFJE -
            val.YCXSF_SFJE / (1 + this.PaymentForm.YCXSF_SL / 100)),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS
      );
      //税额
      this.PaymentForm.YCXSF_SE = roundings(
        val.YCXSF_SFJE - val.YCXSF_SFJE / (1 + this.PaymentForm.YCXSF_SL / 100),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS
      );
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
    },
    sure() {
      this.$refs.PaymentForm.validate((valid) => {
        if (valid) {
          if (Number(this.PaymentForm.YCXSF_SFJE) <= 0) {
            this.$message({
              type: "warning",
              message: "交款金额不能为0",
            });
            return false;
          }
          payDepositApi(this.PaymentForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
              this.cancelForm();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancelForm() {
      this.$emit("update:showPayment", false);
      this.$nextTick(() => {
        this.$refs.PaymentForm.resetFields(); //重置输入框提示
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
      if (roundWay == 1 && preciseDigit == 0) {
        return value.toFixed(0);
      }
      if (roundWay == 1 && preciseDigit == 1) {
        return value.toFixed(1);
      }
      if (roundWay == 1 && preciseDigit == 2) {
        return value.toFixed(2);
      }
      if (roundWay == 1 && preciseDigit == 3) {
        return value.toFixed(3);
      }
      if (roundWay == 1 && preciseDigit == 4) {
        return value.toFixed(4);
      }
      if (roundWay == 1 && preciseDigit == 5) {
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
      if (roundWay == 2 && preciseDigit == 0) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点0位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(0);
      }
      if (roundWay == 2 && preciseDigit == 1) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点1位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(1);
      }
      if (roundWay == 2 && preciseDigit == 2) {
        var num = (parseInt(value * 100) / 100).toFixed(2); //小数点2位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(1);
          num = Number(num) - Number(str) / 100;
        }
        return num.toFixed(2);
      }
      if (roundWay == 2 && preciseDigit == 3) {
        var num = (parseInt(value * 1000) / 1000).toFixed(3); //小数点3位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(2);
          num = Number(num) - Number(str) / 1000;
        }
        return num.toFixed(3);
      }
      if (roundWay == 2 && preciseDigit == 4) {
        var num = (parseInt(value * 10000) / 10000).toFixed(4); //小数点4位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(3);
          num = Number(num) - Number(str) / 10000;
        }
        return num.toFixed(4);
      }
      if (roundWay == 2 && preciseDigit == 5) {
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
.PaymentDialog {
}
</style>
