<template>
  <div class="DealWithDialog">
    <el-dialog
      v-dialogDrag
      title="应付凭证"
      :visible="dialogFormVisible"
      @close="cancelForm"
      :close-on-click-modal="false"
      class="el-dialog-double"
    >
      <!-- 制表人信息start -->
      <el-form
        label-width="85px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="凭证编号：" prop="YFPZ_PZBH">
              <el-input v-model="formList.YFPZ_PZBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领款人：" prop="YFPZ_LKZRR">
              <el-input v-model="formList.YFPZ_LKZRR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="填制日期：" prop="YFPZ_TBRQ">
              <el-date-picker
                type="date"
                placeholder=""
                v-model="formList.YFPZ_TBRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣率：">
              <el-select
                v-model="formList.YFPZ_ZKL"
                @change="zkChange"
                clearable
              >
                <el-option :value="1">1</el-option>
                <el-option :value="2">2</el-option>
                <el-option :value="3">3</el-option>
                <el-option :value="4">4</el-option>
                <el-option :value="5">5</el-option>
                <el-option :value="6">6</el-option>
                <el-option :value="7">7</el-option>
                <el-option :value="8">8</el-option>
                <el-option :value="9">9</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="预算费用：" prop="WXFA_YSFY">
              <span class="TextColor">{{ formList.WXFA_YSFY }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已支金额：" prop="WXFA_YYZJE">
              <span class="TextColor">{{ formList.WXFA_YYZJE }}</span>
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
            <el-table :data="tableData" max-height="300" border>
              <el-table-column
                label="登记号"
                prop="SSGC_WXDJNO"
                width="150"
              ></el-table-column>
              <el-table-column
                label="分项名称"
                prop="SSGC_FXMC"
                width="150"
              ></el-table-column>
              <el-table-column
                label="部位"
                prop="SSGC_BW"
                width="200"
              ></el-table-column>
              <el-table-column
                label="单位"
                prop="SSGC_DW"
                width="100"
              ></el-table-column>
              <el-table-column
                label="数量"
                prop="SSGC_SL"
                width="150"
              ></el-table-column>
              <el-table-column
                label="单价"
                prop="SSGC_DJ"
                width="150"
              ></el-table-column>
              <el-table-column
                label="总价"
                prop="SSGC_ZJQ"
                width="150"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </section>
      <!-- 制表人表格end -->
      <!-- 制表人统计start -->
      <section class="money_wrap">
        <el-form :model="formList">
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="实际金额：">
                <span class="TextColor">{{ formList.SSGC_ZJQ }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应付费用：" prop="YFPZ_YFJE">
                <span class="TextColor">{{ formList.YFPZ_YFJE }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="减免金额：" prop="YFPZ_JMJE">
                <span class="TextColor">{{ formList.YFPZ_JMJE }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维修项目：" prop="SSGC_XMMC">
                <span class="TextColor">{{ formList.SSGC_XMMC }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="制表人：" prop="SKPZ_ZDYZD1">
                <span class="TextColor">{{ userName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <!-- 制表人统计end -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryDealWithCertificatesData,
  queryUpdateDealWithCertificatesData,
  insertDealWithCertificates,
  updateDealWithCertificates,
  getGenNumber,
} from "@/api/PublicRepairManager/ProjectSettlement"; //工程结算Api
import { mapGetters } from "vuex";
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
export default {
  props: ["showdialog"],
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  data() {
    return {
      dialogFormVisible: this.showdialog, //弹窗
      formList: {}, //表单信息
      parameObj: {},
      tableData: [], //表格信息
      optType: 1,
      rules: {
        YFPZ_PZBH: [
          { required: true, message: "请输入凭证编号", trigger: "blur" },
        ],
        YFPZ_LKZRR: [
          { required: true, message: "请输入领款人", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
      }
    },
  },
  methods: {
    getData(data, type) {
      this.tableData = [];
      var _this = this;
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
      this.parameObj = newRowData;
      this.formList.state = type;
      if (this.formList.SHOW == "true") {
        //true  代表修改凭证
        if (type == 1) {
          //1大项目 2小项目
          this.formList.YFPZ_WXWJ = this.formList.WXFA_ZJ;
        } else {
          this.formList.YFPZ_WXWJ = this.formList.WXDJ_ZJ;
        }
        queryUpdateDealWithCertificatesData(this.formList).then((response) => {
          //修改凭证数据
          this.tableData = response.data;
          this.formList.SSGC_ZJQ = response.YFPZ_SJFY; //实际金额
          this.formList.SSGC_XMMC = response.YFPZ_XMMC; //项目名称
          this.formList.YFPZ_PZBH = response.YFPZ_PZBH; //凭证编号
          this.formList.YFPZ_LKZRR = response.YFPZ_LKZRR; //领款人
          this.formList.YFPZ_TBRQ = response.YFPZ_TBRQ; //填制日期
          this.formList.YGXM = this.userName; //操作人
          this.formList.YFPZ_ZKL = response.YFPZ_ZKL; //折扣率
          this.formList.WXFA_YSFY = response.YFPZ_YSFY; //预算费用
          this.formList.WXFA_YYZJE = response.YFPZ_YZJE; //已支金额
          this.formList.YFPZ_YFJE = response.YFPZ_YFJE; //实际费用
          this.formList.YFPZ_JMJE = response.YFPZ_JMJE; //减免金额
          this.formList.YFPZ_ZJ = response.YFPZ_ZJ; //应付凭证主键
          if (this.formList.YFPZ_JMJE == undefined) {
            this.formList.YFPZ_JMJE = 0;
          }
          this.formList = JSON.parse(JSON.stringify(this.formList));
        });
      } else {
        //false   代表产生凭证
        if (type == 1) {
          //1大项目 2小项目
          this.formList.SSGC_WXWJ = this.formList.WXFA_ZJ;
        } else {
          this.formList.SSGC_WXWJ = this.formList.WXDJ_ZJ;
        }
        this.getNumber();
      }
    },
    getNumber() {
      //获取编号
      getGenNumber().then((response2) => {
        var YFPZ_PZBH = response2.num;
        this.$nextTick(() => {
          queryDealWithCertificatesData(this.formList).then((response) => {
            //产生凭证查询数据
            this.tableData = response.data;
            this.formList.YFPZ_LKZRR = this.userName; //领款人
            this.formList.YGXM = this.userName; //操作人
            this.formList.YFPZ_TBRQ = currDate(true); //当前日期
            this.formList.SSGC_ZJQ = response.SJFY; //实际费用
            this.formList.YFPZ_YFJE = response.SJFY; //应付费用
            this.formList.YFPZ_PZBH = YFPZ_PZBH; //凭证编号
            this.formList.WXFA_YSFY = response.WXFA_YSFY; //预算费用
            this.formList.WXFA_YYZJE = response.WXFA_YZFY; //已支金额
            this.formList.SSGC_XMMC = response.WXFA_XMMC; //项目名称
            this.formList.YFPZ_JMJE = 0; //减免金额
            this.formList.WXDJ_ZJ = response.WXDJ_ZJ;
            this.formList.WXDJ_XMLX = response.WXDJ_XMLX;
            this.formList.YFPZ_YZFY = response.WXFA_YZFY;
            if (this.formList.WXFA_YSFY == undefined) {
              this.formList.WXFA_YSFY = 0;
            }
            if (this.formList.WXFA_YYZJE == undefined) {
              this.formList.WXFA_YYZJE = 0;
            }
            this.formList = JSON.parse(JSON.stringify(this.formList));
          });
        });
      });
    },
    submit() {
      //提交
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.parameObj.SHOW == "true") {
            //修改
            updateDealWithCertificates(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", this.optType, newobj);
                this.cancelForm();
              }
            });
          } else {
            //生成
            insertDealWithCertificates(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", this.optType, newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    zkChange(val) {
      switch (val) {
        case 1:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.1).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.9).toFixed(2);
          break;
        case 2:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.2).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.8).toFixed(2);
          break;
        case 3:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.3).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.7).toFixed(2);
          break;
        case 4:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.4).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.6).toFixed(2);
          break;
        case 5:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.5).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.5).toFixed(2);
          break;
        case 6:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.6).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.4).toFixed(2);
          break;
        case 7:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.7).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.3).toFixed(2);
          break;
        case 8:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.8).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.2).toFixed(2);
          break;
        case 9:
          this.formList.YFPZ_YFJE = (this.formList.SSGC_ZJQ * 0.9).toFixed(2);
          this.formList.YFPZ_JMJE = (this.formList.SSGC_ZJQ * 0.1).toFixed(2);
          break;
        default:
          this.formList.YFPZ_YFJE = this.formList.SSGC_ZJQ;
          this.formList.YFPZ_JMJE = 0;
          break;
      }
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.DealWithDialog {
  .money_wrap {
    margin-top: 10px;
  }
}
</style>
