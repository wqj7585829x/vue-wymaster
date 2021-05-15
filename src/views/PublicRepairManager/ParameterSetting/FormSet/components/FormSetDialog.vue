<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="新增"
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
            <el-form-item label="表单名称：" prop="WXJBDLY_BDMC">
              <el-input
                auto-complete="off"
                v-model="formList.WXJBDLY_BDMC"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表单类型：" prop="WXJBDLY_BDLX">
              <el-select v-model="formList.WXJBDLY_BDLX" placeholder="请选择">
                <el-option label="维修登记" value="维修登记"></el-option>
                <el-option label="维修申请" value="维修申请"></el-option>
                <el-option label="维修方案" value="维修方案"></el-option>
                <el-option label="工程验收" value="工程验收"></el-option>
                <el-option label="应付凭证" value="应付凭证"></el-option>
                <el-option label="利息分摊" value="利息分摊"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="编号前缀：" prop="WXJBDLY_BDBHQZ">
              <el-input
                auto-complete="off"
                v-model="formList.WXJBDLY_BDBHQZ"
                @change="qzChange(formList.WXJBDLY_BDBHQZ)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流水号长度:" prop="WXJBDLY_BDBHCD">
              <el-input
                auto-complete="off"
                v-model="formList.WXJBDLY_BDBHCD"
                @change="cdChange(formList.WXJBDLY_BDBHCD)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="维修年月" prop="WXJBDLY_NY">
              <el-input disabled v-model="WXJBDLY_NY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="示例：" prop="WXJBDLY_BDBHSL">
              <el-input
                auto-complete="off"
                v-model="formList.WXJBDLY_BDBHSL"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                auto-complete="off"
                v-model="formList.WXJBDLY_BZ"
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
  queryToTheYears,
  addForm,
} from "@/api/PublicRepairManager/ParameterSetting";
import { onlynumber } from "@/utils/validate.js";
export default {
  props: ["showdialog", "getTreeDialogData"],
  data() {
    return {
      dialogFormVisible: this.showdialog,
      radio: "",
      Theyears: "", //维修年月
      formList: {},
      WXJBDLY_NY: "",
      newDateSplit: "", //实例拼接年月
      rules: {
        WXJBDLY_BDLX: [
          { required: true, message: "请选择表单类型", trigger: "blur" },
        ],
        WXJBDLY_BDBHQZ: [
          { required: true, message: "请输入编号前缀", trigger: "blur" },
        ],
        WXJBDLY_BDBHCD: [
          { required: true, message: "请输入流水号长度", trigger: "blur" },
          { validator: onlynumber, trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
        this.queryOrgan();
      }
    },
  },
  methods: {
    queryOrgan() {
      queryToTheYears().then((response) => {
        this.formList.WXJBDLY_NY = response.yearAndMonth; //维修年月
        this.WXJBDLY_NY = response.yearAndMonth;
        var spliDate = this.WXJBDLY_NY.split("-");
        this.newDateSplit = spliDate[0] + "" + spliDate[1];
      });
    },
    getData(GLCID, YXDID) {
      this.formList.YXDID = YXDID;
      this.formList.GLCID = GLCID;
      this.formList.WXJBDLY_BDBHCD = 1;
    },
    qzChange(val) {
      //编号前缀改变事件
      if (
        this.formList.WXJBDLY_BDBHCD == undefined ||
        this.formList.WXJBDLY_BDBHCD == ""
      ) {
        this.formList.WXJBDLY_BDBHCD = 1;
      }
      this.formList.WXJBDLY_BDBHSL =
        val +
        this.newDateSplit +
        this.PrefixInteger(1, parseInt(this.formList.WXJBDLY_BDBHCD));
      this.formList = JSON.parse(JSON.stringify(this.formList));
    },
    cdChange(val) {
      //流水号长度改变事件
      if (val == "") {
        val = 1;
      }
      if (
        this.formList.WXJBDLY_BDBHQZ == undefined ||
        this.formList.WXJBDLY_BDBHQZ == ""
      ) {
        this.formList.WXJBDLY_BDBHQZ = "";
      }
      this.formList.WXJBDLY_BDBHSL =
        this.formList.WXJBDLY_BDBHQZ +
        this.newDateSplit +
        this.PrefixInteger(1, parseInt(val));
      this.formList = JSON.parse(JSON.stringify(this.formList));
    },
    PrefixInteger(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //新增
          addForm(this.formList).then((response) => {
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
    cancelForm() {
      //取消关闭
      //console.log(this)
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
