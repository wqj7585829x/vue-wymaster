<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      :visible="dialogFormVisible"
      @close="cancelForm"
      :close-on-click-modal="false"
      class="el-dialog-double"
    >
      <el-form
        label-width="120px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="维修单编号：" prop="WXD_NO">
              <el-input
                auto-complete="off"
                v-model="formList.WXD_NO"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修登记号：" prop="WXDJ_NO">
              <el-input
                auto-complete="off"
                v-model="formList.WXDJ_NO"
                :disabled="disabledInput"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="预算费用：" prop="WXD_YSFY">
              <el-input
                auto-complete="off"
                v-model="formList.WXD_YSFY"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单人:" prop="WXD_KDR">
              <el-input
                auto-complete="off"
                v-model="formList.WXD_KDR"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开单日期" prop="WXD_KDSJ">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="formList.WXD_KDSJ"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接单人：" prop="WXD_JDR">
              <el-input
                auto-complete="off"
                v-model="formList.WXD_JDR"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="接单日期" prop="WXD_JDSJ">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="formList.WXD_JDSJ"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约维修日期：" prop="WXD_YYXWSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.WXD_YYXWSJ"
                value-format="yyyy-MM-dd"
                format=""
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开工日期" prop="WXD_KGSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.WXD_KGSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完工日期：" prop="WXD_WGSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.WXD_WGSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="工程说明：" prop="WXD_GCSM">
              <el-input
                type="textarea"
                auto-complete="off"
                v-model="formList.WXD_GCSM"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancelForm()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRepairBillNo,
  addRepairApply,
  updateRepairApply,
} from "@/api/PublicRepairManager/RepairApply";
import { onlynumber } from "@/utils/validate.js";
import { mapGetters } from "vuex";
import { onlynumberpoint } from "@/utils/validate.js";
export default {
  props: ["showdialog", "getTreeDialogData"],
  data() {
    return {
      title: "新增",
      dialogFormVisible: this.showdialog,
      optType: 1, //1.新增 2.修改
      formList: {},
      disabledInput: false, //默认维修登记号可以输入
      rules: {
        WXD_NO: [
          { required: true, message: "请输入维修单编号", trigger: "blur" },
        ],
        WXD_YSFY: [{ validator: onlynumberpoint, trigger: "blur" }],
      },
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  methods: {
    queryNoData() {
      //维修年月查询
      getRepairBillNo().then((response) => {
        this.formList.WXD_NO = response.WXD_NO;
        let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
        this.formList = newRowData;
      });
    },
    getData(data, obj, type) {
      //data 维修登记数据,obj  维修单数据
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(obj)); //拷贝一份存储对象
      this.formList = newRowData;
      this.formList.WXDJ_ZJ = data.WXDJ_ZJ;
      this.formList.WXDJ_NO = data.WXDJ_NO;
      this.formList.WXDJ_XMMC = data.WXDJ_XMMC;
      this.formList.WXD_KDR = this.userName;
      this.formList.WXDJ_YSFY = data.WXDJ_YSFY;
      this.formList.WXDJ_KGSJ = data.WXDJ_KGSJ;
      this.formList.WXDJ_WGSJ = data.WXDJ_WGSJ;
      this.formList.WXDJ_WXJD = "维修申请";
      if (this.optType == 1) {
        this.formList.WXD_YSFY = 0;
        this.formList.WXD_KDSJ = this.currformatDate(Date.parse(new Date()));
        this.formList.WXD_JDSJ = this.currformatDate(Date.parse(new Date()));
        this.title = "新增";
        this.disabledInput = false;
        this.queryNoData();
      } else {
        this.title = "修改";
        this.disabledInput = true;
      }
      this.optType = type;
    },
    currformatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.optType == 1) {
            //新增
            addRepairApply(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          } else {
            updateRepairApply(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
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
<style lang="scss">
.line-btm {
  border-top: 1px solid #eeeeee;
  margin-bottom: 20px;
}
</style>
