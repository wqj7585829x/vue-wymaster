<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="退款"
      class="el-dialog-double RefundDialog"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="100px"
        :model="refundForm"
        :rules="rules"
        ref="refundForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费金额：">
              <span class="TextColor">{{ refundForm.YCXSF_SFJE }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="现余额：">
              <span class="TextColor">{{ refundForm.YCXSFTKMX_TKXYE }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="退款方式：" prop="YCXSFTKMX_TKFS">
              <el-select v-model="refundForm.YCXSFTKMX_TKFS" clearable>
                <el-option
                  v-for="item in refundWayData"
                  :key="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                  :label="item.SFKM_SKFS"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="退款金额：" prop="YCXSFTKMX_TKJE">
              <el-input
                v-model="refundForm.YCXSFTKMX_TKJE"
                v-on:change="inputMouseblur(refundForm)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="退款日期：" prop="YCXSFTKMX_TKRQ">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="refundForm.YCXSFTKMX_TKRQ"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="退款经手人：">
              <span class="TextColor">{{ refundForm.YCXSFTKMX_TKJSR }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="退款备注：" prop="YCXSFTKMX_BZ">
              <el-input
                type="textarea"
                v-model="refundForm.YCXSFTKMX_BZ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure" :disabled="disabledSure"
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { querytPayWay, refundDetailsApi } from "@/api/Realtor/SecurityDeposit"; //一次性费用js
import { mapGetters } from "vuex";
import { onlynumberpoint } from "@/utils/validate.js";
import { currDate, currDateTime } from "@/utils/global.js";
export default {
  props: ["showRefund"],
  data() {
    return {
      visible: this.showRefund,
      refundWayData: [],
      refundForm: {},
      disabledSure: false, //默认确定按钮可以点击
      rules: {
        YCXSFTKMX_TKFS: [
          { required: true, message: "请选择退款方式", trigger: "blur" },
        ],
        YCXSFTKMX_TKJE: [
          { required: true, message: "请输入退款金额", trigger: "blur" },
          // { validator: onlynumberpoint, trigger: "blur" }
        ],
        YCXSFTKMX_TKRQ: [
          { required: true, message: "请选择退款时间", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    showRefund() {
      this.visible = this.showRefund;
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  methods: {
    getData(data) {
      this.refundForm.dbName = data.dbName;
      this.refundForm.GLCID = data.GLCID;
      this.refundForm.YXDID = data.YXDID;
      this.refundForm.YCXSF_ZJ = data.YCXSF_ZJ;
      this.refundForm.YCXSFTKMX_TKFS = data.YCXSF_TKFS;
      if (data.YCXSF_TFJSR) {
        this.refundForm.YCXSFTKMX_TKJSR = data.YCXSF_TFJSR;
      } else {
        this.refundForm.YCXSFTKMX_TKJSR = this.userName;
      }
      //if (data.YCXSF_TKRQ) {
      //this.refundForm.YCXSFTKMX_TKRQ = data.YCXSF_TKRQ;
      //} else {
      this.refundForm.YCXSFTKMX_TKRQ = currDateTime();
      //}
      this.refundForm.YCXSF_SFJE = data.YCXSF_SFJE;
      this.refundForm.YCXSFTKMX_TKXYE = data.YCXSF_TKYE;
      if (data.YCXSF_BZ != "null" && data.YCXSF_BZ != undefined) {
        this.refundForm.YCXSFTKMX_BZ = data.YCXSF_BZ;
      }
      this.refundForm.YCXSFTKMX_TKJE = 0;
      this.refundForm = JSON.parse(JSON.stringify(this.refundForm));
      this.findRefundWay();
    },
    // 获取退款方式
    findRefundWay() {
      querytPayWay(this.refundForm).then((response) => {
        this.refundWayData = response;
        if (!this.refundForm.YCXSFTKMX_TKFS) {
          this.refundForm.YCXSFTKMX_TKFS = response[0].SFKM_SKFS;
          this.refundForm = JSON.parse(JSON.stringify(this.refundForm));
        }
      });
    },
    inputMouseblur(val) {
      //鼠标离开事件
      var reg = /^(-?\d+)(\.\d{1,2})?$/; //小数点保留两位小数
      if (!Number(val.YCXSFTKMX_TKJE) && val.YCXSFTKMX_TKJE != 0) {
        this.$message({
          message: "" + val.YCXSFTKMX_TKJE + "不是有效的数字类型",
          type: "warning",
        });
        this.disabledSure = true;
        return false;
      } else {
        this.disabledSure = false;
      }

      if (
        Number(val.YCXSFTKMX_TKJE) > Number(this.refundForm.YCXSFTKMX_TKXYE)
      ) {
        this.$message({
          message: "退款金额不能大于现余额",
          type: "warning",
        });
        this.disabledSure = true;
        return false;
      } else {
        this.disabledSure = false;
      }

      if (Number(val.YCXSFTKMX_TKJE) <= 0) {
        this.$message({
          message: "退款金额不能小于或等于0",
          type: "warning",
        });
        this.disabledSure = true;
        return false;
      } else {
        this.disabledSure = false;
      }

      if (!reg.test(val.YCXSFTKMX_TKJE)) {
        this.$message({
          message: "退款金额最多只能保留两位小数",
          type: "warning",
        });
        this.disabledSure = true;
        return false;
      } else {
        this.disabledSure = false;
      }
    },
    sure() {
      if (Number(this.refundForm.YCXSFTKMX_TKJE) <= 0) {
        this.$message({
          message: "退款金额不能等于0",
          type: "warning",
        });
        return false;
      }
      this.$refs.refundForm.validate((valid) => {
        if (valid) {
          refundDetailsApi(this.refundForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showRefund", false);
      this.$nextTick(() => {
        this.$refs.refundForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
// .RefundDialog {
//   .el-row {
//     margin-bottom: 5px !important;
//   }
//   .el-dialog__body {
//     padding: 10px 0 !important;
//   }
// }
</style>
