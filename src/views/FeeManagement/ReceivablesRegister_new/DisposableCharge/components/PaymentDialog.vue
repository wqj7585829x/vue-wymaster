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
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目：" prop="YCXSF_SFXMMC">
              <el-select
                v-model="PaymentForm.YCXSF_SFXMMC"
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
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款金额(含税)：" prop="YCXSF_SFJE">
              <el-input
                v-model="PaymentForm.YCXSF_SFJE"
                :disabled="disabledSFJE"
                v-on:change="inputMouseblurSFJX(PaymentForm)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="0">
              <span>(交款金额 = 计算面积 * 计算单价 * 计算倍数)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="税率：" prop="YCXSF_SL">
              <el-input v-model="PaymentForm.YCXSF_SL" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额(不含税)：" prop="YCXSF_BHSJE">
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
            <el-form-item label="税额：" prop="YCXSF_SE">
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
                :disabled="DisposPaySfrqDate_has"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款人：" prop="YCXSF_JKR">
              <el-input v-model="PaymentForm.YCXSF_JKR"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴费经手人：" prop="YCXSF_JFJSR">
              <el-input v-model="PaymentForm.YCXSF_JFJSR" disabled></el-input>
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
                :disabled="DisposPayRzsjDateTime_has"
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
          <el-col :span="12">
            <el-form-item label="自定义字段1：" prop="SJFPH">
              <el-input v-model="PaymentForm.YCXSF_ZDYZD1"></el-input>
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
import {
  querytPayWay,
  queryOneTimeFeeProject,
  queryOneTimeFeeStandard,
  postOneTimeFee,
} from "@/api/FeeManagement/DisposableCharge"; //一次性费用js
import { currDate, currDateTime, PrefixInteger } from "@/utils/global.js";
import { getToken } from "@/utils/Auth"; // 验权
import { number, onlynumber } from "@/utils/validate.js";
import { mapGetters } from "vuex";
import { roundings } from "@/utils/global.js";
import { queryDefaultPayWay } from "@/api/FeeManagement/NotReceipted"; //未收清款项-收清选中Api
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
      disablePJH: false, //默认发票号可以选择
      DisposPayRzsjDateTime_has: !(
        Number(
          sessionStorage
            .getItem("buttenpremissions")
            .indexOf("DisposPayRzsjDateTime_has")
        ) > -1
      ), //入帐时间权限
      DisposPaySfrqDate_has: !(
        Number(
          sessionStorage
            .getItem("buttenpremissions")
            .indexOf("DisposPaySfrqDate_has")
        ) > -1
      ), //交款日期权限
      rules: {
        YCXSF_PJLX: [
          { required: true, message: "请选择票据分类", trigger: "blur" },
        ],
        YCXSF_ZDYCS: [
          { required: true, message: "请输入计算倍数", trigger: "blur" },
        ],
        PJLY_ZJ: [
          { required: true, message: "请选择票据名称", trigger: "blur" },
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
        this.getPayWay(); //交款
        this.getFeedProject(); //收费项目
        this.getDefaultWay(); //默认收款方式
      }
    },
  },
  methods: {
    getData(FJDA_SFMJ, FKGX_ZJ, KHDA_KHMC) {
      this.PaymentForm.YCXSF_FKGXWJ = FKGX_ZJ;
      this.PaymentForm.YCXSF_SFBZ = "人民币";
      this.PaymentForm.YCXSF_JSMJ = FJDA_SFMJ; //收费面积
      this.PaymentForm.YCXSF_JFJSR = this.userName; //交费经手人
      this.PaymentForm.YCXSF_JKR = KHDA_KHMC; //交款人
      this.PaymentForm.YCXSF_SFJE = "";
      this.PaymentForm.YCXSF_SFRQ = currDate(true);
      this.PaymentForm.YCXSF_RZSJ = currDateTime();
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
    },
    getDefaultWay() {
      var that = this;
      //获取默认收款方式
      queryDefaultPayWay().then((response) => {
        this.PaymentForm.YCXSF_SKFS = response.SFCS_ZFX;
      });
    },
    getPayWay() {
      //交款方式
      querytPayWay().then((response) => {
        this.PayWayData = response;
      });
    },
    getFeedProject() {
      //收费项目下拉框
      queryOneTimeFeeProject().then((response) => {
        this.FeedProjectData = response;
      });
    },
    getFeedStandard() {
      //收费标准下拉框
      queryOneTimeFeeStandard(this.PaymentForm.CGBZ_SFXMWJ).then((response) => {
        this.FeedStandData = response;
      });
    },
    projectChange(val) {
      //收费项目改变
      this.PaymentForm.CGBZ_SFXMWJ = val;
      this.FeedProjectData.forEach((item) => {
        if (item.SFXM_ZJ == val) {
          this.PaymentForm.SFXM_QZFS = item.SFXM_QZFS;
          this.PaymentForm.SFXM_JQWS = item.SFXM_JQWS;
          this.PaymentForm.SFXM_JQWS2 = item.SFXM_JQWS2;
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
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
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
            if (!this.PaymentForm.YCXSF_ZDYCS) {
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
              this.PaymentForm.SFXM_JQWS2
            );

            //税额
            this.PaymentForm.YCXSF_SE = roundings(
              this.PaymentForm.YCXSF_SFJE -
                this.PaymentForm.YCXSF_SFJE /
                  (1 + this.PaymentForm.YCXSF_SL / 100),
              this.PaymentForm.SFXM_QZFS,
              this.PaymentForm.SFXM_JQWS2
            );
          }
        });
      } else {
        this.PaymentForm.YCXSF_ZDYCS = "";
      }
      this.PaymentForm = JSON.parse(JSON.stringify(this.PaymentForm));
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
        this.PaymentForm.SFXM_JQWS2
      );

      //税额
      this.PaymentForm.YCXSF_SE = roundings(
        this.PaymentForm.YCXSF_SFJE -
          this.PaymentForm.YCXSF_SFJE / (1 + this.PaymentForm.YCXSF_SL / 100),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS2
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
        this.PaymentForm.SFXM_JQWS2
      );
      //税额
      this.PaymentForm.YCXSF_SE = roundings(
        val.YCXSF_SFJE - val.YCXSF_SFJE / (1 + this.PaymentForm.YCXSF_SL / 100),
        this.PaymentForm.SFXM_QZFS,
        this.PaymentForm.SFXM_JQWS2
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
          postOneTimeFee(this.PaymentForm).then((response) => {
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
