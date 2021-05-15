<template>
  <div class="freezeDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="135px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="退款金额（含税）:" prop="YJMX_YJJE">
              <el-input-number
                v-model="TableForm.YJMX_YJJE"
                @change="YJJEchange"
                :precision="TableForm.YJFA_JQWS"
                :step="mathchange()"
                :controls="false"
                :min="0"
                :max="TableForm.oldYJMX_YJJE"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="税率:" prop="YJMX_SL">
              <el-input v-model="TableForm.YJMX_SL" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="退款金额（不含税）:" prop="YJMX_BHSJE">
              <el-input v-model="TableForm.YJMX_BHSJE" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="税额:" prop="YJMX_SE">
              <el-input v-model="TableForm.YJMX_SE" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="预交方式:" prop="index">
              <el-select
                v-model="TableForm.index"
                filterable
                clearable
                @change="YJFSchange"
              >
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="摘要:" prop="YJMX_ZY">
              <el-input v-model="TableForm.YJMX_ZY"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="退款人:" prop="payer">
              <el-input v-model="TableForm.payer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="备注:" prop="YJMX_YJBZ">
              <el-input v-model="TableForm.YJMX_YJBZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="填制日期:" prop="fillingDate">
              <el-date-picker
                type="date"
                placeholder="选择填制日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="TableForm.fillingDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="退款时间:" prop="YJPZ_RZRQ">
              <el-date-picker
                type="datetime"
                placeholder="选择退款时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="TableForm.YJPZ_RZRQ"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  prepay,
  queryPaymentMethod,
} from "@/api/PrepayManagement/PrepayCollection";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.rshow,
      title: "退款", //标题
      rules: {
        YJMX_YJJE: [{ required: true, trigger: "blur" }],
        index: [{ required: true, trigger: "blur" }],
        payer: [{ required: true, trigger: "blur" }],
        fillingDate: [{ required: true, trigger: "blur" }],
        YJPZ_RZRQ: [{ required: true, trigger: "blur" }],
      },
      TableForm: {},
      options1: [],
    };
  },
  props: {
    rshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    rshow() {
      this.visible = this.rshow;
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  mounted() {
    queryPaymentMethod({}).then((response) => {
      this.options1 = response;
    });
  },
  methods: {
    mathchange() {
      return parseFloat(
        Math.pow(0.1, this.TableForm.YJFA_JQWS).toFixed(
          this.TableForm.YJFA_JQWS
        )
      );
    },
    YJJEchange(val) {
      //预交金额改变事件
      this.$set(
        this.TableForm,
        "YJMX_BHSJE",
        (val / (1.0 + this.TableForm.YJMX_SL * 0.01)).toFixed(
          this.TableForm.YJFA_JQWS
        )
      );
      this.$set(
        this.TableForm,
        "YJMX_SE",
        (val - this.TableForm.YJMX_BHSJE).toFixed(this.TableForm.YJFA_JQWS)
      );
    },
    YJFSchange(index) {
      //预交方式改变事件
      this.TableForm.paymentMethod = this.options1[index].SFKM_SKFS;
      this.TableForm.YJMX_SFKMWJ = this.options1[index].SFKM_ZJ;
    },
    getNowFormatDate() {
      //获取当前日期
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getNowFormatTime() {
      //获取当前时间
      var date = new Date();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var ss = date.getSeconds();
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
      return currentdate;
    },
    //   判断新增，修改
    getReportData(data, data1) {
      var index = "";
      if (data1.YJPZ_YJFS) {
        const p = this.options1;
        const c = data1.YJMX_SFKMWJ;
        index = p.findIndex((d) => d.SFKM_ZJ === c); //寻找data的索引
      }
      this.TableForm = {
        oldYJMX_YJJE: (data1.YJMX_DQYE - data1.YJMX_DJJE).toFixed(
          data1.YJFA_JQWS
        ),
        KHDA_ZJ: data1.YJPZ_KHWJ,
        FKGX_ZJ: data1.YJPZ_FKGXWJ,
        YJPZ_PZLX: 1,
        payer: data.KHDA_KHMC,
        payee: this.userName,
        fillingDate: this.getNowFormatDate(),
        paymentMethod: "",
        YJMX_SFKMWJ: data1.YJMX_SFKMWJ,
        YJPZ_RZRQ: this.getNowFormatTime(),
        YJMX_YJFAWJ: data1.YJMX_YJFAWJ,
        YJMX_CDSX: data1.YJMX_CDSX,
        YJMX_YJJE: (data1.YJMX_DQYE - data1.YJMX_DJJE).toFixed(data1.YJFA_JQWS),
        YJMX_ZY: "",
        YJMX_YJBZ: "",
        YJMX_ZJ: data1.YJMX_ZJ,
        YJMX_SL: data1.YJMX_SL,
        YJMX_SE: 0,
        YJMX_BHSJE: 0,
        index: index,
        YJFA_JQWS: data1.YJFA_JQWS,
      };

      this.$set(
        this.TableForm,
        "YJMX_BHSJE",
        (
          this.TableForm.YJMX_YJJE /
          (1.0 + this.TableForm.YJMX_SL * 0.01)
        ).toFixed(this.TableForm.YJFA_JQWS)
      );
      this.$set(
        this.TableForm,
        "YJMX_SE",
        (this.TableForm.YJMX_YJJE - this.TableForm.YJMX_BHSJE).toFixed(
          this.TableForm.YJFA_JQWS
        )
      );
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (this.TableForm.YJMX_YJJE == 0) {
            this.$message({
              message: "退款金额不能为零，请重新输入!",
              type: "warning",
            });
            return;
          }
          prepay(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              _this.$emit("RefreshItem");
              _this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:rshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.freezeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.freezeDialog .el-input-number {
  width: 100%;
}

.freezeDialog .el-input-number input {
  text-align: left;
}

.freezeDialog .detail {
  padding: 0 20px;
}
</style>
